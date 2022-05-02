import { Loader } from "google-maps";
import {
  MAP_SETTINGS,
  MAP_OPTIONS,
  SHAPE_SETTINGS,
  DEFAULT_ZOOM,
  DEFAULT_COORDINATES,
  SHAPES_CONTROLS,
} from "../constants";
import * as HELPERS from "../helpers";

const mapLoader = new Loader(MAP_SETTINGS.key, MAP_SETTINGS.options);

// Elements
let google,
  map,
  drawingManager,
  mapElements = [],
  currentPaddock,
  selectedShape = null,
  mapContainer,
  addressSearchContainer,
  addressResultsContainer,
  plottingResultsContainer,
  plottingStep1,
  plottingStep2,
  plottingShapes,
  searchField,
  // startPlotBtn,
  newSearchBtn,
  addPlottingBtn,
  savePaddockBtn,
  undoPlottingBtn,
  setPlottingBtn,
  resetBtn,
  dragMapTool,
  lineMapTool,
  shapeMapTool,
  currentAddressLabel,
  plottingPerimiterLabel,
  plottingPerimiterTrigger,
  hasConfirmedTotal = false;

// Values
let addressMarker,
  plotPerimiter = 0;

// UI
const calculatePlot = () => {
  let totalPerimeter = 0;

  plottingShapes.innerHTML = "";

  mapElements.forEach((shape, index) => {
    const shapeLength = google.maps.geometry.spherical.computeLength(
      shape.getPath().getArray()
    );

    totalPerimeter += shapeLength;
    plottingShapes.innerHTML += `
    <tr>
      <th scope="row"><p data-action="${
        SHAPES_CONTROLS.HIGHLIGHT
      }" data-shape="${index}">
      <input id="paddock-name-${index}" value="${
      shape.paddockName
    }" type="test" data-action="${
      SHAPES_CONTROLS.EDIT_NAME
    }" data-shape="${index}" /></p></th>
      <th scope="col">${shapeLength.toFixed(0)}m </th>
      <td>
        <button type="button" data-action="${
          SHAPES_CONTROLS.EDIT
        }" data-shape="${index}" class="btn-control-icons">
          <i class="fa fa-edit">e</i>
        </button>
      </td>
      <td>
        <button type="button" data-action="${
          SHAPES_CONTROLS.DELETE
        }" data-shape="${index}" class="btn-control-icons d-block">
          <i class="fa fa-trash">d</i>
        </button>
        <button type="button" data-action="${
          SHAPES_CONTROLS.CONFIRM_DELETE
        }" data-shape="${index}" class="btn-control-icons d-none">
          <i class="fa fa-times"></i> Click to confirm
        </button>
      </td>
    </tr>
    `;
  });

  plotPerimiter = totalPerimeter.toFixed(0);
  plottingPerimiterLabel.innerHTML = `${plotPerimiter}m`;
  plottingResultsContainer.setAttribute("aria-hidden", false);

  if (hasConfirmedTotal) {
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
    backToStartDrawing();
  }
};

const clearPlotShapes = () => {
  if (mapElements.length) {
    mapElements.forEach((shape) => {
      shape.setMap(null);
    });

    mapElements = [];
  }

  plotPerimiter = 0;
};

const backToStartDrawing = () => {
  plottingStep1.setAttribute("aria-hidden", false);
  plottingStep2.setAttribute("aria-hidden", true);
  plottingResultsContainer.setAttribute("aria-hidden", true);
  savePaddockBtn.setAttribute("aria-hidden", false);
  plottingShapes.innerHTML = "";
  drawingManager.setDrawingMode(null);
};

const resetPlot = () => {
  clearPlotShapes();
};

const resetEstimator = () => {
  addressMarker.setVisible(false);

  resetPlot();

  map.setZoom(DEFAULT_ZOOM);
  map.setCenter({
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  });

  drawingManager.setDrawingMode(null);

  plottingStep1.setAttribute("aria-hidden", true);
  plottingStep2.setAttribute("aria-hidden", true);
  addressResultsContainer.setAttribute("aria-hidden", true);
  plottingResultsContainer.setAttribute("aria-hidden", true);
  savePaddockBtn.setAttribute("aria-hidden", true);

  addressSearchContainer.setAttribute("aria-hidden", false);

  currentAddressLabel.innerHTML = "";
  plottingPerimiterLabel.innerHTML = "";
  plottingShapes.innerHTML = "";

  searchField.value = "";
};

// events
const handleResetSearch = (e) => {
  e.preventDefault();
  resetEstimator();
};

const handleStartPlotting = () => {
  resetPlot();

  drawingManager.setMap(map);
  drawingManager.setDrawingMode(null);

  plottingStep1.setAttribute("aria-hidden", true);
  plottingStep2.setAttribute("aria-hidden", false);
  savePaddockBtn.setAttribute("aria-hidden", false);
};

const handleDragTool = (e) => {
  e.preventDefault();

  drawingManager.setDrawingMode(null);
};

const handleLineTool = (e) => {
  e.preventDefault();

  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
};

const handleShapeTool = (e) => {
  e.preventDefault();

  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
};

const handleShapes = (e) => {
  const element =
    e.target.tagName.toLowerCase() === "button"
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

  switch (element.dataset.action) {
    case SHAPES_CONTROLS.HIGHLIGHT:
      HELPERS.highlightShape(shape);
      break;
    case SHAPES_CONTROLS.EDIT:
      HELPERS.clearEdits(mapElements);
      HELPERS.editShape(shape, true, drawingManager, selectedShape);
      savePaddockBtn.setAttribute("aria-hidden", true);
      break;
    case SHAPES_CONTROLS.DELETE:
      HELPERS.clearEdits(mapElements);
      HELPERS.editShape(shape, true, drawingManager, selectedShape);
      savePaddockBtn.setAttribute("aria-hidden", true);

      element.classList.remove("d-block");
      element.classList.add("d-none");

      const confirmDelete = element.parentElement.querySelectorAll(
        `[data-action="${SHAPES_CONTROLS.CONFIRM_DELETE}"]`
      )[0];
      confirmDelete.classList.remove("d-none");
      confirmDelete.classList.add("d-block");
      break;
    case SHAPES_CONTROLS.CONFIRM_DELETE:
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
};

const handleAddPlotting = (e) => {
  e.preventDefault();

  drawingManager.setDrawingMode(null);
  HELPERS.clearEdits(mapElements);

  savePaddockBtn.setAttribute("aria-hidden", false);
};

const handleUndoPlotting = (e) => {
  e.preventDefault();

  clearPlotShape(mapElements.length - 1);

  if (!mapElements.length) {
    backToStartDrawing();
  }
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

// paddocks
const setupNewPaddock = (paddock) => {
  google.maps.event.addListener(paddock, "mouseup", () => {
    calculatePlot();
  });

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

  google.maps.event.addListener(paddock, "click", () => {
    if (drawingManager.getDrawingMode() === null) {
      HELPERS.clearEdits(mapElements);
      HELPERS.editShape(paddock, true, drawingManager, selectedShape);
      savePaddockBtn.setAttribute("aria-hidden", true);
    }
  });
};

// map
const createMap = () => {
  map = new google.maps.Map(mapContainer, MAP_OPTIONS);

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
    addressResultsContainer.setAttribute("aria-hidden", false);

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
    polygonOptions: {
      ...SHAPE_SETTINGS.DEFAULT,
    },
  });

  google.maps.event.addListener(
    drawingManager,
    "polylinecomplete",
    function (e) {
      // if no paddock created, create polyline and add it to array of elements
      // to display totals in table as lines are added
      if (!currentPaddock) {
        currentPaddock = new google.maps.Polyline({
          ...SHAPE_SETTINGS.DEFAULT,
          paddockIdx: mapElements.length, // current length = new index
          paddockName: `New Paddock ${mapElements.length + 1}`,
          map,
        });
      }

      // replace current paddock created object with new connected path
      currentPaddock.setPath(e.getPath().getArray());
      mapElements.push(currentPaddock);

      const paddock = mapElements[mapElements.length - 1];

      // set up paddock with listening events
      setupNewPaddock(paddock, google.maps.drawing.OverlayType.POLYLINE);

      e.setMap(null);
      currentPaddock = undefined;

      calculatePlot();
    }
  );

  google.maps.event.addListener(
    drawingManager,
    "polygoncomplete",
    function (e) {
      // if no paddock created, create polyline and add it to array of elements
      // to display totals in table as lines are added
      if (!currentPaddock) {
        currentPaddock = new google.maps.Polygon({
          ...SHAPE_SETTINGS.DEFAULT,
          paddockIdx: mapElements.length, // current length = new index
          paddockName: `Paddock ${mapElements.length + 1}`,
          map,
        });
      }

      // replace current paddock created object with new connected path
      currentPaddock.setPath(e.getPath().getArray());
      mapElements.push(currentPaddock);

      const paddock = mapElements[mapElements.length - 1];

      // set up paddock with listening events
      setupNewPaddock(paddock, google.maps.drawing.OverlayType.POLYLIGON);

      e.setMap(null);
      currentPaddock = undefined;

      calculatePlot();
    }
  );
};

const setup = () => {
  addressSearchContainer = document.querySelectorAll(
    ".map-search-controller"
  )[0];
  addressResultsContainer = document.querySelectorAll(
    ".map-search-results-controller"
  )[0];
  plottingResultsContainer = document.querySelectorAll(
    ".map-plotting-results-controller"
  )[0];

  plottingStep1 = document.querySelectorAll(".map-search-results__step-1")[0];
  plottingStep2 = document.querySelectorAll(".map-search-results__step-2")[0];
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

  // startPlotBtn = document.querySelectorAll(".plotting__start-button")[0]; TO BE REMOVED
  addPlottingBtn = document.querySelectorAll(".plotting__add-button")[0];
  savePaddockBtn = document.querySelectorAll(
    ".plotting__save-paddock-button"
  )[0];
  undoPlottingBtn = document.querySelectorAll(".plotting__undo-button")[0];
  setPlottingBtn = document.querySelectorAll(".plotting__accept-button")[0];
  plottingPerimiterLabel = document.querySelectorAll(
    ".map-plotting-results__perimiter"
  )[0];

  resetBtn = document.querySelectorAll(".reset-button");

  dragMapTool = document.querySelectorAll(".map-tool-drag")[0];
  lineMapTool = document.querySelectorAll(".map-tool-line")[0];
  shapeMapTool = document.querySelectorAll(".map-tool-shape")[0];

  const ignoreKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  searchField.addEventListener("keypress", ignoreKeyPress);
  // startPlotBtn.addEventListener("keypress", ignoreKeyPress); TO BE REMOVED

  // startPlotBtn.addEventListener("click", handleStartPlotting); TO BE REMOVED
  plottingShapes.addEventListener("click", handleShapes);
  plottingShapes.addEventListener("focusout", handleEditPaddockName);
  newSearchBtn.addEventListener("click", handleResetSearch);
  addPlottingBtn.addEventListener("click", handleAddPlotting);
  savePaddockBtn.addEventListener("click", handleAddPlotting);
  undoPlottingBtn.addEventListener("click", handleUndoPlotting);
  setPlottingBtn.addEventListener("click", handleUsePlotting);

  resetBtn.forEach((button) => {
    button.addEventListener("click", handleResetSearch);
  });

  dragMapTool.addEventListener("click", handleDragTool);
  lineMapTool.addEventListener("click", handleLineTool);
  shapeMapTool.addEventListener("click", handleShapeTool);
};

const start = () => {
  setup();

  createMap();
};

export const init = () => {
  mapContainer = document.getElementById("fence-estimator-map");

  if (!mapContainer) {
    return false;
  }

  if (!google) {
    mapLoader.load().then((googleAPI) => {
      google = googleAPI;

      start();
    });
  } else {
    start();
  }
};
