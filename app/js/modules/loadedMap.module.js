import interact from "interactjs";
import {
  DEFAULT_COORDINATES,
  DEFAULT_ZOOM,
  MAP_OPTIONS,
  SHAPES_CONTROLS,
  SHAPE_SETTINGS,
} from "../constants";
import * as HELPERS from "../helpers";

// Elements
let google,
  map,
  drawingManager,
  mapElements = [],
  selectedShape = null,
  mapContainer,
  addressSearchContainer,
  addressContainer,
  addressResultsContainer,
  plottingResultsContainer,
  plottingTooltip,
  plottingShapes,
  searchField,
  newSearchBtn,
  savePaddockBtn,
  setPlottingBtn,
  deletePlottingBtn,
  resetBtn,
  printBtn,
  mapTools,
  dragMapTool,
  lineMapTool,
  shapeMapTool,
  zoomInTool,
  zoomOutTool,
  currentAddressLabel,
  plottingPerimiterLabel,
  plottingPerimiterTrigger,
  hasConfirmedTotal = false,
  shapeMenuContainer,
  sidebar;

// tools
let mapStorage = "fence-estimator";

// Values
let addressMarker,
  plotPerimiter = 0;

// UI
const calculatePlot = (storePlot = true) => {
  let totalPerimeter = 0;

  // re-draw table and recalculate
  // go through each shape/line and:
  // 1. add length to toal
  // 2. create row (button handlers have been assigned to table wrapper)
  // 3. display total
  // 4. update caching

  plottingShapes.innerHTML = "";

  deletePlottingBtn.setAttribute("aria-hidden", !mapElements.length);
  plottingTooltip.setAttribute("aria-hidden", !!mapElements.length);

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
  storePlot && storePaddocks();

  if (hasConfirmedTotal) {
    // if the user wants to use the list of shapes/lines created, use it.
    handleUsePlotting();
  }
};

const clearPlotShape = (idx) => {
  if (mapElements.length && mapElements[idx]) {
    mapElements[idx].setMap(null);
    google.maps.event.clearInstanceListeners(mapElements[idx]);

    mapElements.splice(idx, 1);
  }

  calculatePlot();

  if (!mapElements.length) {
    resetMapTools();
  }
};

const resetPlot = () => {
  // go through all shapes and remove them from the map before clearing the array
  if (mapElements.length) {
    mapElements.forEach((shape) => {
      shape.setMap(null);
    });

    mapElements = [];
  }

  plotPerimiter = 0;

  removeStoredPaddocks();
};

const resetMapTools = () => {
  // plottingStep1.setAttribute("aria-hidden", false);
  // .setAttribute("aria-hidden", true);
  // savePaddockBtn.setAttribute("aria-hidden", false);
  drawingManager.setDrawingMode(null);

  plottingShapes.innerHTML = "";
  plottingPerimiterLabel.innerHTML = "";

  removePaddockMenu();
};

const resetEstimator = () => {
  resetPlot();
  resetMapTools();

  addressMarker.setVisible(false);

  map.setZoom(DEFAULT_ZOOM);
  map.setCenter({
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  });

  // plottingStep1.setAttribute("aria-hidden", true);
  // .setAttribute("aria-hidden", true);
  // addressResultsContainer.setAttribute("aria-hidden", true);
  // savePaddockBtn.setAttribute("aria-hidden", true);

  // addressSearchContainer.setAttribute("aria-hidden", false);

  currentAddressLabel.innerHTML = "";
  searchField.value = "";

  plottingTooltip.setAttribute("aria-hidden", false);
  removePaddockMenu();
};

// events
const handleResetSearch = (e) => {
  e.preventDefault();
  resetEstimator();

  addressSearchContainer.setAttribute("aria-hidden", false);
  addressContainer.setAttribute("aria-hidden", true);
  // addressResultsContainer.setAttribute("aria-hidden", true);

  newSearchBtn.classList.remove("d-block");
  newSearchBtn.classList.add("d-none");

  deletePlottingBtn.setAttribute("aria-hidden", true);
  plottingTooltip.setAttribute("aria-hidden", false);
};

export const handleStartPlotting = () => {
  // initialise the drawing manager by assigning it to the map
  drawingManager.setMap(map);
  drawingManager.setDrawingMode(null);

  // plottingStep1.setAttribute("aria-hidden", true);
  // .setAttribute("aria-hidden", false);
  // savePaddockBtn.setAttribute("aria-hidden", false);
};

const handleDragTool = (e) => {
  e.preventDefault();

  drawingManager.setDrawingMode(null);

  HELPERS.clearEdits(mapElements);
  removePaddockMenu();
};

const handleLineTool = (e) => {
  e.preventDefault();

  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);

  HELPERS.clearEdits(mapElements);
  removePaddockMenu();
};

const handleShapeTool = (e) => {
  e.preventDefault();

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
  storePaddocks();
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

  resetPlot();
  resetMapTools();
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

const createPaddockMapShape = (
  paddockIdx,
  paddockName,
  type,
  pathCoordinates
) => {
  let currentShape;

  const shapeDetails = {
    ...SHAPE_SETTINGS.DEFAULT,
    paddockIdx,
    paddockName,
    type,
    map,
    // path,
    path: pathCoordinates,
  };

  if (type === google.maps.drawing.OverlayType.POLYLINE) {
    currentShape = new google.maps.Polyline(shapeDetails);
  }
  if (type === google.maps.drawing.OverlayType.POLYGON) {
    currentShape = new google.maps.Polygon(shapeDetails);
  }

  // set up paddock with listening events
  bindPaddockShapeEvents(currentShape);

  mapElements.push(currentShape);
  plottingTooltip.setAttribute("aria-hidden", true);
};

// map
export const createMap = () => {
  map = new google.maps.Map(mapContainer, MAP_OPTIONS);

  google.maps.event.addListenerOnce(map, "tilesloaded", function () {
    // get elements from cache
    getStoredPaddocks();
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
    var place = autocomplete.getPlace();

    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(16);
    }

    // display the marker on map
    addressMarker.setPosition(place.geometry.location);
    addressMarker.setVisible(true);

    // show the address on map controllers
    currentAddressLabel.innerHTML = place.adr_address.replace(/\,/g, "");

    addressSearchContainer.setAttribute("aria-hidden", true);
    addressContainer.setAttribute("aria-hidden", false);
    addressResultsContainer.setAttribute("aria-hidden", false);
    newSearchBtn.classList.remove("d-none");
    newSearchBtn.classList.add("d-block");

    handleStartPlotting();
  });

  // Drawing
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYLINE,
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
      createPaddockMapShape(
        mapElements.length,
        `${mapElements.length + 1}--Boundary Fence`,
        google.maps.drawing.OverlayType.POLYLINE,
        e.getPath().getArray()
      );

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
      createPaddockMapShape(
        mapElements.length,
        `${mapElements.length + 1}--Paddock Fence`,
        google.maps.drawing.OverlayType.POLYGON,
        e.getPath().getArray()
      );

      e.setMap(null);

      calculatePlot();
    }
  );

  google.maps.event.addListener(map, "click", function (e) {
    removePaddockMenu();
  });
};

// caching
const storePaddocks = () => {
  let fences = [];
  mapElements.forEach((element) => {
    const shape = {
      paths: element.getPath().getArray(),
      paddockIdx: element.paddockIdx,
      paddockName: element.paddockName,
      type: element.type,
    };

    fences.push(shape);
  });

  localStorage.setItem(`${mapStorage}`, JSON.stringify(fences));
};

const getStoredPaddocks = () => {
  const currentPaddocks = localStorage.getItem(mapStorage);

  if (currentPaddocks) {
    JSON.parse(currentPaddocks).forEach((shape) => {
      const { type, paddockIdx, paddockName, paths } = shape;

      // setup paddock and add it to map
      createPaddockMapShape(paddockIdx, paddockName, type, paths);
    });

    calculatePlot(false);
    addressContainer.setAttribute("aria-hidden", false);
    addressResultsContainer.setAttribute("aria-hidden", false);
    handleStartPlotting();
  }
};

const removeStoredPaddocks = () => {
  localStorage.removeItem(mapStorage);
};

// print
const printMap = () => {
  // 1. remove controls
  map.setOptions({
    zoom: DEFAULT_ZOOM,
  });

  const popUpAndPrint = function () {
    window.print();
  };

  // 2. trigger print function - timeout to give time to the zoom reset
  setTimeout(popUpAndPrint, 1000);
};

// SETUP
export const setup = (googleAPI) => {
  mapContainer = document.getElementById("fence-estimator-map");
  google = googleAPI;

  addressSearchContainer = document.querySelectorAll(
    ".map-search-controller__searcher"
  )[0];
  addressContainer = document.querySelectorAll(
    ".map-search-results__step-1"
  )[0];
  addressResultsContainer = document.querySelectorAll(
    ".map-search-results-controller"
  )[0];
  plottingResultsContainer = document.querySelectorAll(
    ".map-plotting-results-controller"
  )[0];
  plottingTooltip = document.querySelectorAll(
    ".map-search-results__shapes-tip"
  )[0];

  plottingShapes = document.querySelectorAll(
    ".map-search-results__shapes-table"
  )[0];

  searchField = document.querySelectorAll(".search-address__field")[0];
  newSearchBtn = document.querySelectorAll(
    ".search-address__new-search-button"
  )[0];
  currentAddressLabel = document.querySelectorAll(
    ".map-search-results__address"
  )[0];

  savePaddockBtn = document.querySelectorAll(
    ".plotting__save-paddock-button"
  )[0];
  setPlottingBtn = document.querySelectorAll(".plotting__accept-button")[0];
  deletePlottingBtn = document.querySelectorAll(".plotting__delete-button")[0];
  plottingPerimiterLabel = document.querySelectorAll(
    ".map-plotting-results__perimiter"
  )[0];

  resetBtn = document.querySelectorAll(".reset-button");
  printBtn = document.querySelectorAll(".plotting__print-button")[0];

  dragMapTool = document.querySelectorAll(".map-tool-drag")[0];
  lineMapTool = document.querySelectorAll(".map-tool-line")[0];
  shapeMapTool = document.querySelectorAll(".map-tool-shape")[0];
  zoomInTool = document.querySelectorAll(".map-tool-zoomin")[0];
  zoomOutTool = document.querySelectorAll(".map-tool-zoomout")[0];

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
  mapTools = document.querySelectorAll(".map-search-tools-controller")[0];
  let x = 0;
  let y = 0;

  interact(mapTools)
    .draggable({
      modifiers: [
        interact.modifiers.snap({
          targets: [interact.snappers.grid({ x: 30, y: 30 })],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }],
        }),
        interact.modifiers.restrict({
          restriction: mapTools.parentNode,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true,
        }),
      ],
      inertia: true,
    })
    .on("dragmove", function (event) {
      x += event.dx;
      y += event.dy;

      event.target.style.transform = "translate(" + x + "px, " + y + "px)";
    });

  sidebar = document.querySelectorAll(".map-search-sidebar")[0];
  let sidebarX = 0;
  let sidebarY = 0;

  interact(sidebar)
    .draggable({
      modifiers: [
        interact.modifiers.snap({
          targets: [interact.snappers.grid({ x: 30, y: 30 })],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }],
        }),
        interact.modifiers.restrict({
          restriction: mapTools.parentNode,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true,
        }),
      ],
      inertia: true,
    })
    .on("dragmove", function (event) {
      sidebarX += event.dx;
      sidebarY += event.dy;

      event.target.style.transform =
        "translate(" + sidebarX + "px, " + sidebarY + "px)";
    })
    .on("click", removePaddockMenu);

  shapeMenuContainer = document.querySelectorAll(".paddock-menu-container")[0];
  shapeMenuContainer.addEventListener("click", handleShapesTable);

  window.addEventListener("fence-estimator-shape-menu", function (e) {
    if (!e.detail.paddock) {
      return false;
    }

    const paddock = e.detail.paddock;
    console.info(paddock);

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

  // PRINT
  printBtn.addEventListener("click", printMap);
};

export { google };
