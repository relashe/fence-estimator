import {
  DEFAULT_COORDINATES,
  DEFAULT_ZOOM,
  EXPORT_ZOOM,
  MAP_OPTIONS,
  SHAPES_CONTROLS,
  SHAPE_SETTINGS,
} from "../constants";
import * as HELPERS from "../helpers";

import { google } from "./starter.module";

import {
  validateDownloadEmail,
  validateDownloadForm,
  validateDownloadName,
} from "../helpers";
import {
  addressContainer,
  addressResultsContainer,
  addressSearchContainer,
  assignElements,
  currentAddressLabel,
  deletePlottingBtn,
  downloadBtn,
  downloadFormEmail,
  downloadFormName,
  dragMapTool,
  lineMapTool,
  mapContainer,
  mapTools,
  newSearchBtn,
  plottingPerimiterLabel,
  plottingShapes,
  plottingTooltip,
  printBtn,
  resetBtn,
  savePaddockBtn,
  searchField,
  setPlottingBtn,
  shapeMapTool,
  shapeMenuContainer,
  sidebar,
  zoomInTool,
  zoomOutTool,
} from "./mapElements.module";

let map,
  drawingManager,
  mapElements = [],
  mapLengths = [],
  selectedShape = null,
  addressMapPlace,
  hasConfirmedTotal = false,
  plottingPerimiterTrigger;

// flags
let mapSet = false;

// Values
let addressMarker,
  mapCanvasAction,
  plotPerimiter = 0;

// ui
const calculatePlot = (storePlot = true) => {
  let totalPerimeter = 0;

  // re-draw table and recalculate
  // go through each shape/line and:
  // 1. add length to total
  // 2. create row (button handlers have been assigned to table wrapper)
  // 3. display total
  // 4. update caching

  plottingShapes.innerHTML = "";

  mapElements.forEach((shape, index) => {
    const shapeLength = google.maps.geometry.spherical.computeLength(
      shape.getPath().getArray()
    );

    // 1.
    totalPerimeter += shapeLength;
    // 2.
    plottingShapes.innerHTML += HELPERS.drawShapeRow(
      shape.paddockName,
      shapeLength,
      index
    );
  });

  // 3.
  plotPerimiter = totalPerimeter.toFixed(0);
  plottingPerimiterLabel.innerHTML = `${plotPerimiter || 0}m`;
  // 4.
  storePlot && HELPERS.storePaddocks(mapElements);

  // update available action buttons
  deletePlottingBtn.setAttribute("aria-hidden", !mapElements.length);
  plottingTooltip.setAttribute("aria-hidden", !!mapElements.length);

  if (!mapElements.length) {
    printBtn.setAttribute("disabled", true);
    downloadBtn.setAttribute("disabled", true);
    setPlottingBtn.setAttribute("disabled", true);
  } else {
    printBtn.removeAttribute("disabled");
    downloadBtn.removeAttribute("disabled");
    setPlottingBtn.removeAttribute("disabled");
  }

  if (hasConfirmedTotal) {
    // if the user wants to use the list of shapes/lines created, use it.
    handleUsePlotting();
  }
};

const clearPlotShape = (idx) => {
  if (mapElements.length && mapElements[idx]) {
    mapElements[idx].setMap(null);
    mapLengths[idx].setMap(null);
    google.maps.event.clearInstanceListeners(mapElements[idx]);

    mapElements.splice(idx, 1);
  }

  calculatePlot();

  if (!mapElements.length) {
    resetMapTools();
  }
};

// remove all shapes from the map
const resetFencesTable = () => {
  // go through all shapes and remove them from the map before clearing the array
  if (mapElements.length) {
    mapElements.forEach((shape) => {
      shape.setMap(null);
    });

    mapLengths.forEach((length) => {
      length.setMap(null);
    });

    mapElements = [];
    mapLengths = [];
  }

  plotPerimiter = 0;

  plottingShapes.innerHTML = "";
  plottingPerimiterLabel.innerHTML = "";

  deletePlottingBtn.setAttribute("aria-hidden", !mapElements.length);

  // update cache
  HELPERS.removeFenceEstimatorData();
};

const resetMapTools = () => {
  drawingManager.setDrawingMode(null);
};

// this is for when the estimator has an address and
// the user can start adding fences
export const setMapReadyForPlotting = (isReady) => {
  const mapIsReady = isReady !== undefined ? !!isReady : !!addressMapPlace;

  if (!addressMapPlace) {
    return;
  }

  // show/hide address and address search field
  addressSearchContainer.setAttribute("aria-hidden", !!mapIsReady);
  addressContainer.setAttribute("aria-hidden", !mapIsReady);
  addressResultsContainer.setAttribute("aria-hidden", !mapIsReady);

  // show/hide search tooltip
  plottingTooltip.setAttribute("aria-hidden", !!mapIsReady ? true : false);

  // show/hide reset button
  newSearchBtn.classList.remove(!!mapIsReady ? "d-none" : "d-block");
  newSearchBtn.classList.add(!!mapIsReady ? "d-block" : "d-none");

  // set the map to drawing state
  drawingManager.setDrawingMode(null);
};

const resetEstimator = () => {
  resetFencesTable();
  resetMapTools();
  removePaddockMenu();

  addressMarker.setVisible(false);

  map.setZoom(DEFAULT_ZOOM);
  map.setCenter({
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  });

  currentAddressLabel.innerHTML = "";
  searchField.value = "";

  calculatePlot(false);
  setMapReadyForPlotting(false);
};

// caching
const getFenceEstimatorData = () => {
  const mapStorageData = HELPERS.getMapStorageData();

  if (mapStorageData) {
    addressMapPlace = mapStorageData.place;

    // 1. display stored address
    HELPERS.displayAddressOnMap(
      addressMapPlace,
      map,
      addressMarker,
      currentAddressLabel
    );

    // 2. create fences on map
    mapStorageData.fences?.forEach((shape) => {
      const { type, paddockIdx, paddockName, paths } = shape;

      // setup paddock and add it to map
      createPaddockMapShape(paddockIdx, paddockName, type, paths);
    });

    // 3. set map ready to draw more fences
    setMapReadyForPlotting();
  }

  // update table and total based on current data
  calculatePlot(false);

  mapSet = true;
};

// paddocks
const removePaddockMenu = () => {
  map.setOptions({
    draggable: true,
  });

  shapeMenuContainer.setAttribute("aria-hidden", true);
  shapeMenuContainer.innerHTML = "";
};

const bindPaddockShapeEvents = (paddock) => {
  // when the shape is left
  // (re)calculate the measurements
  google.maps.event.addListener(paddock, "mouseup", () => {
    calculatePlot();
  });

  // when hovering over the shape
  google.maps.event.addListener(paddock, "mouseover", () => {
    if (
      drawingManager.getDrawingMode() ===
        google.maps.drawing.OverlayType.POLYLINE ||
      drawingManager.getDrawingMode() ===
        google.maps.drawing.OverlayType.POLYGON
    ) {
      HELPERS.clearEdits(mapElements);
      HELPERS.editShape(paddock, true, drawingManager, selectedShape);
      savePaddockBtn.setAttribute("aria-hidden", true);
    }
  });

  // when clicking on a shape
  google.maps.event.addListener(paddock, "click", () => {
    if (drawingManager.getDrawingMode() === null) {
      HELPERS.clearEdits(mapElements);
      HELPERS.editShape(paddock, true, drawingManager, selectedShape);
      savePaddockBtn.setAttribute("aria-hidden", true);

      removePaddockMenu();
    }
  });

  // this listener is for right click events
  // documentation says rightclick has been deprecated
  // (https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=en#Polyline.rightclick)
  // NOTE - no sure if other events may call this
  paddock.addListener("contextmenu", (event) => {
    const rightClick = new CustomEvent("fence-estimator-shape-menu", {
      detail: {
        paddock: {
          name: paddock.paddockName,
          index: paddock.paddockIdx,
          coordinates: event.latLng,
        },
        top: event.domEvent.clientY,
        left: event.domEvent.clientX,
      },
    });

    window.dispatchEvent(rightClick);
  });
};

export const createPaddockMapShape = (
  paddockIdx,
  paddockName,
  type,
  pathCoordinates
) => {
  /**
   * Custom overlay for shape menu
   */
  class PaddockLengthLabelOverlay extends google.maps.OverlayView {
    length;
    coordinates;
    p;
    constructor(coordinates, length) {
      super();
      this.length = length;
      this.coordinates = coordinates;
    }

    /**
     * onAdd is called when the map's panes are ready and the overlay has been
     * added to the map.
     */
    onAdd() {
      this.p = document.createElement("p");

      // style contents
      this.p.classList.add("paddock-length");
      this.p.innerHTML = `${this.length.toFixed()}m`;

      // Add the element to the "overlayLayer" pane.
      const panes = this.getPanes();

      panes.overlayLayer.appendChild(this.p);
    }

    draw() {
      // We use the south-west and north-east
      // coordinates of the overlay to peg it to the correct position and size.
      // To do this, we need to retrieve the projection from the overlay.
      const overlayProjection = this.getProjection();

      // Retrieve the south-west and north-east coordinates of this overlay
      // in LatLngs and convert them to pixel coordinates.
      // We'll use these coordinates to resize the div.
      const sw = overlayProjection.fromLatLngToDivPixel(this.coordinates);
      if (this.p) {
        this.p.style.left = sw.x + 10 + "px";
        this.p.style.top = sw.y + 10 + "px";
      }
    }
    /**
     * The onRemove() method will be called automatically from the API if
     * we ever set the overlay's map property to 'null'.
     */
    onRemove() {
      if (this.p) {
        this.p.parentNode.removeChild(this.p);
        delete this.p;
      }
    }
    /**
     *  Set the visibility to 'hidden' or 'visible'.
     */
    hide() {
      if (this.p) {
        this.p.style.visibility = "hidden";
      }
    }
    show() {
      if (this.p) {
        this.p.style.visibility = "visible";
      }
    }
    toggle() {
      if (this.p) {
        if (this.p.style.visibility === "hidden") {
          this.show();
        } else {
          this.hide();
        }
      }
    }
    toggleDOM(map) {
      if (this.getMap()) {
        this.setMap(null);
      } else {
        this.setMap(map);
      }
    }
    updateLength(length) {
      this.length = length;
      this.p.innerHTML = `${this.length.toFixed()}m`;
    }
  }

  let currentShape;

  let path = new google.maps.MVCArray();

  if (Array.isArray(pathCoordinates)) {
    pathCoordinates.forEach((segment) => {
      if (typeof segment.lat === "function") {
        path.push(segment);
      } else {
        const segmentCoordinates = new google.maps.LatLng(
          segment.lat,
          segment.lng
        );
        path.push(segmentCoordinates);
      }
    });
  } else {
    if (typeof pathCoordinates.lat === "function") {
      path.push(pathCoordinates);
    } else {
      const segmentCoordinates = new google.maps.LatLng(
        pathCoordinates.lat,
        pathCoordinates.lng
      );
      path.push(segmentCoordinates);
    }
  }

  const shapeLength = google.maps.geometry.spherical.computeLength(
    path.getArray()
  );

  const lengthLabel = new PaddockLengthLabelOverlay(
    { lat: path.getArray()[0].lat(), lng: path.getArray()[0].lng() },
    shapeLength
  );

  google.maps.event.addListener(path, "insert_at", function (vertex) {
    lengthLabel.updateLength(
      google.maps.geometry.spherical.computeLength(path.getArray())
    );
  });

  google.maps.event.addListener(path, "set_at", function (vertex) {
    lengthLabel.updateLength(
      google.maps.geometry.spherical.computeLength(path.getArray())
    );
  });

  google.maps.event.addListener(path, "mousedown", function (vertex) {
    lengthLabel.updateLength(
      google.maps.geometry.spherical.computeLength(path.getArray())
    );
  });

  const shapeDetails = {
    ...SHAPE_SETTINGS.DEFAULT,
    paddockIdx,
    paddockName,
    type,
    map,
    path,
  };

  if (type === google.maps.drawing.OverlayType.POLYLINE) {
    currentShape = new google.maps.Polyline(shapeDetails);
  }
  if (type === google.maps.drawing.OverlayType.POLYGON) {
    currentShape = new google.maps.Polygon(shapeDetails);
  }

  // set up paddock with listening events
  bindPaddockShapeEvents(currentShape);

  lengthLabel.setMap(map);

  mapElements.push(currentShape);
  mapLengths.push(lengthLabel);
  plottingTooltip.setAttribute("aria-hidden", true);
};

// adjust map to prepare canvas image
const exportCanvas = (action) => {
  mapCanvasAction = action;

  if (addressMapPlace.geometry.viewport) {
    map.fitBounds(addressMapPlace.geometry.viewport);
  } else {
    map.setCenter(addressMapPlace.geometry.location);
  }

  map.setZoom(EXPORT_ZOOM);

  setTimeout(() => {
    HELPERS.exportMap(mapContainer, mapCanvasAction, mapElements);
  }, 500);
};

// events
const handleResetSearch = (e) => {
  e.preventDefault();
  resetEstimator();
};

const handleDragTool = (e) => {
  e.preventDefault();

  dragMapTool.classList.add("map-tool--active");
  lineMapTool.classList.remove("map-tool--active");
  shapeMapTool.classList.remove("map-tool--active");

  drawingManager.setDrawingMode(null);

  HELPERS.clearEdits(mapElements);
  removePaddockMenu();
};

const handleLineTool = (e) => {
  e.preventDefault();

  lineMapTool.classList.add("map-tool--active");
  dragMapTool.classList.remove("map-tool--active");
  shapeMapTool.classList.remove("map-tool--active");

  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);

  HELPERS.clearEdits(mapElements);
  removePaddockMenu();
};

const handleShapeTool = (e) => {
  e.preventDefault();

  shapeMapTool.classList.add("map-tool--active");
  dragMapTool.classList.remove("map-tool--active");
  lineMapTool.classList.remove("map-tool--active");

  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);

  HELPERS.clearEdits(mapElements);
  removePaddockMenu();
};

const handleZoomInTool = (e) => {
  e.preventDefault();

  map.setZoom(map.getZoom() + 1);

  HELPERS.clearEdits(mapElements);
  removePaddockMenu();
};

const handleZoomOutTool = (e) => {
  e.preventDefault();

  map.setZoom(map.getZoom() - 1);

  HELPERS.clearEdits(mapElements);
  removePaddockMenu();
};

const handleShapesTable = (e) => {
  const element =
    e.target.tagName.toLowerCase() === "button" ||
    e.target.tagName.toLowerCase() === "input"
      ? e.target
      : e.target.parentElement;

  if (element.dataset.shape === undefined || !element.dataset.action) {
    return;
  }

  const shapeIndex = parseInt(element.dataset.shape);
  const shape = mapElements[shapeIndex];

  if (!shape) {
    return;
  }

  removePaddockMenu();

  switch (element.dataset.action) {
    case SHAPES_CONTROLS.HIGHLIGHT:
      HELPERS.highlightShape(shape);
      break;
    case SHAPES_CONTROLS.EDIT:
    case SHAPES_CONTROLS.EDIT_NAME:
      HELPERS.clearEdits(mapElements);
      HELPERS.editShape(shape, true, drawingManager, selectedShape);
      savePaddockBtn.setAttribute("aria-hidden", true);
      break;
    case SHAPES_CONTROLS.DELETE:
      HELPERS.clearEdits(mapElements);
      HELPERS.editShape(shape, true, drawingManager, selectedShape);
      savePaddockBtn.setAttribute("aria-hidden", true);

      clearPlotShape(shapeIndex);
      drawingManager.setDrawingMode(null);
      break;
  }
};

const handleEditPaddockName = (e) => {
  const element =
    e.target.tagName.toLowerCase() === "input"
      ? e.target
      : e.target.parentElement;

  if (element.dataset.shape === undefined || !element.dataset.action) {
    return;
  }

  const shapeIndex = parseInt(element.dataset.shape);
  const shape = mapElements[shapeIndex];

  if (!shape) {
    return;
  }

  shape.paddockName = element.value;

  // update local storage
  HELPERS.storePaddocks(mapElements);
};

const handleAddPlotting = (e) => {
  e.preventDefault();

  drawingManager.setDrawingMode(null);
  HELPERS.clearEdits(mapElements);

  savePaddockBtn.setAttribute("aria-hidden", false);
};

const handleUsePlotting = (e) => {
  e && e.preventDefault();

  hasConfirmedTotal = true;

  plottingPerimiterTrigger = new CustomEvent("fence-estimator-results", {
    detail: { perimiter: plotPerimiter },
  });
  window.dispatchEvent(plottingPerimiterTrigger);
  plottingPerimiterTrigger = null;

  if (typeof elementorProFrontend !== "undefined") {
    elementorProFrontend.modules.popup.closePopup({}, e);
  }
};

const handleDeleteAllPlotting = (e) => {
  e.preventDefault();

  resetFencesTable();
  resetMapTools();
};

const handlePrintMap = (e) => {
  e?.preventDefault();

  exportCanvas("print");
};

const handleDownloadMap = async (e) => {
  e?.preventDefault();

  const formIsValid = await validateDownloadForm();

  if (formIsValid) {
    exportCanvas("download");
  }
};

// map
export const createMap = () => {
  map = new google.maps.Map(mapContainer, MAP_OPTIONS);

  google.maps.event.addListenerOnce(map, "tilesloaded", function () {
    // get elements from cache
    !mapSet && getFenceEstimatorData();
  });

  google.maps.event.addListener(map, "zoom_changed", function () {
    //only wait for zoom change on print
    // mapCanvasAction === "print" &&
    // HELPERS.exportMap(mapContainer, mapCanvasAction, mapElements);
  });

  // Marker
  addressMarker = new google.maps.Marker({
    position: new google.maps.LatLng(
      DEFAULT_COORDINATES.lat,
      DEFAULT_COORDINATES.lng
    ),
    map: map,
    animation: google.maps.Animation.DROP,
    clickable: false,
    visible: false,
  });

  // Auto complete
  const autocomplete = new google.maps.places.Autocomplete(searchField);

  autocomplete.bindTo("bounds", map);
  autocomplete.setFields([
    "address_components",
    "adr_address",
    "geometry",
    "icon",
    "name",
  ]);

  autocomplete.addListener("place_changed", function () {
    addressMarker.setVisible(false);
    addressMapPlace = autocomplete.getPlace();

    if (!addressMapPlace.geometry) {
      window.alert(
        "No details available for input: '" + addressMapPlace.name + "'"
      );
      return;
    }

    // 1. add the place to the location storage
    HELPERS.storeFenceEstimatorData({
      place: addressMapPlace,
    });

    // 2. display location
    HELPERS.displayAddressOnMap(
      addressMapPlace,
      map,
      addressMarker,
      currentAddressLabel
    );

    // 3. begin drawing fences
    setMapReadyForPlotting();
  });

  // Drawing
  drawingManager = new google.maps.drawing.DrawingManager({
    map,
    drawingMode: null,
    drawingControl: false,
    drawingControlOptions: {
      drawingModes: [
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.POLYGON,
      ],
    },
    polylineOptions: {
      ...SHAPE_SETTINGS.DEFAULT,
    },
    polygonOptions: {
      ...SHAPE_SETTINGS.DEFAULT,
    },
  });

  google.maps.event.addListener(
    drawingManager,
    "polylinecomplete",
    function (e) {
      // create polyline and add it to array of elements
      // to display totals in table as lines are added
      const path = e.getPath().getArray();

      createPaddockMapShape(
        mapElements.length,
        `${mapElements.length + 1}--Boundary Fence`,
        google.maps.drawing.OverlayType.POLYLINE,
        path
      );

      drawingManager.setDrawingMode(null);

      e.setMap(null);

      calculatePlot();
    }
  );

  google.maps.event.addListener(
    drawingManager,
    "polygoncomplete",
    function (e) {
      // create polygon and add it to array of elements
      // to display totals in table as lines are added
      const path = e.getPath().getArray();

      createPaddockMapShape(
        mapElements.length,
        `${mapElements.length + 1}--Paddock Fence`,
        google.maps.drawing.OverlayType.POLYGON,
        path
      );

      drawingManager.setDrawingMode(null);

      e.setMap(null);

      calculatePlot();
    }
  );

  google.maps.event.addListener(map, "click", function (e) {
    removePaddockMenu();
  });

  window.addEventListener("fence-estimator-shape-menu", function (e) {
    if (!e.detail.paddock) {
      return false;
    }

    const paddock = e.detail.paddock;

    const div = document.createElement("div");

    // style contents
    div.classList.add("paddock-menu");
    div.style.top = e.detail.top;
    div.style.left = e.detail.left;
    div.innerHTML = `
        <p class="paddock-menu__title">${paddock.name}</p>
        <button type="button" data-action="${SHAPES_CONTROLS.DELETE}" data-shape="${paddock.index}" class="paddock-menu__button paddock-menu__button--delete">
          Delete fence
        </button>
      `;
    shapeMenuContainer.appendChild(div);

    shapeMenuContainer.setAttribute("aria-hidden", false);

    map.setOptions({
      draggable: false,
    });
  });
};

// SETUP

const bindMapEvents = () => {
  // bind functions
  const ignoreKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  searchField.addEventListener("keypress", ignoreKeyPress);

  plottingShapes.addEventListener("click", handleShapesTable);
  // plottingShapes.addEventListener("focus", handleEditSelectPaddockName);
  plottingShapes.addEventListener("input", handleEditPaddockName);
  newSearchBtn.addEventListener("click", handleResetSearch);
  savePaddockBtn.addEventListener("click", handleAddPlotting);
  setPlottingBtn.addEventListener("click", handleUsePlotting);
  deletePlottingBtn.addEventListener("click", handleDeleteAllPlotting);

  resetBtn.forEach((button) => {
    button.addEventListener("click", handleResetSearch);
  });

  dragMapTool.addEventListener("click", handleDragTool);
  lineMapTool.addEventListener("click", handleLineTool);
  shapeMapTool.addEventListener("click", handleShapeTool);
  zoomInTool.addEventListener("click", handleZoomInTool);
  zoomOutTool.addEventListener("click", handleZoomOutTool);

  // UI

  HELPERS.setDraggableMapTools(mapTools);

  HELPERS.setClosableSidebar(sidebar, removePaddockMenu);

  shapeMenuContainer.addEventListener("click", handleShapesTable);

  // PRINT
  printBtn.addEventListener("click", handlePrintMap);
  downloadBtn.addEventListener("click", handleDownloadMap);

  downloadFormName.addEventListener("change", validateDownloadName);
  downloadFormEmail.addEventListener("change", validateDownloadEmail);
};

export const setup = () => {
  assignElements();
  bindMapEvents();
};

export { google };
