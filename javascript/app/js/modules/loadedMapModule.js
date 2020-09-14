import { Loader } from "google-maps";
import { init as startFenceEstimatorMap } from "./loadedMapModule";

const mapSetup = {
  key: "AIzaSyAUKRpb10Wh8VaN255y5Md_KiY-LH4FnkE",
  options: {
    libraries: ["drawing", "places"],
    version: "3"
  }
};

const mapLoader = new Loader(mapSetup.key, mapSetup.options);

// Elements
let google,
  mapElements,
  mapContainer,
  addressSearchContainer,
  addressResultsContainer,
  plottingResultsContainer,
  plottingStep1,
  plottingStep2,
  searchField,
  startPlotBtn,
  newSearchBtn,
  undoPlottingBtn,
  setPlottingBtn,
  resetBtn,
  currentAddressLabel,
  plottingPerimiterLabel,
  plottingPerimiterTrigger;

const defaultLat = -37.8136276;
const defaultLng = 144.9630576;
const defaultZoom = 14;

const mapOptions = {
  center: {
    lat: defaultLat,
    lng: defaultLng
  },
  zoom: defaultZoom,
  fullscreenControl: false,
  mapTypeControl: false,
  mapTypeId: "satellite",
  streetViewControl: false,
  tilt: 0
};

let map, drawingManager;

// Values
let addressMarker,
  plot = null,
  plotPerimiter = 0;

const calculatePlot = paths => {
  const length = google.maps.geometry.spherical.computeLength(paths);

  plotPerimiter = length.toFixed(0);
  plottingPerimiterLabel.innerHTML = `${plotPerimiter}m`;
  plottingResultsContainer.setAttribute("aria-hidden", false);
};

const clearPlotShape = () => {
  if (plot) {
    plot.setEditable(false);
    plot.setMap(null);
    plot = null;
  }
  plotPerimiter = 0;
};

const resetPlot = () => {
  clearPlotShape();
};

const resetEstimator = () => {
  addressMarker.setVisible(false);
  resetPlot();
  map.setZoom(defaultZoom);
  map.setCenter({
    lat: defaultLat,
    lng: defaultLng
  });

  plottingStep1.setAttribute("aria-hidden", true);
  plottingStep2.setAttribute("aria-hidden", true);
  addressSearchContainer.setAttribute("aria-hidden", false);
  addressResultsContainer.setAttribute("aria-hidden", true);
  plottingResultsContainer.setAttribute("aria-hidden", true);

  currentAddressLabel.innerHTML = "";
  plottingPerimiterLabel.innerHTML = "";

  searchField.value = "";
};

// Button handlers
const handleResetSearch = e => {
  e.preventDefault();
  resetEstimator();
};

const handleStartPlotting = e => {
  e.preventDefault();
  resetPlot();

  drawingManager.setMap(map);
  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);

  plottingStep1.setAttribute("aria-hidden", true);
  plottingStep2.setAttribute("aria-hidden", false);
};

const handleUndoPlotting = e => {
  e.preventDefault();

  resetPlot();

  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
  plottingResultsContainer.setAttribute("aria-hidden", true);
};

const handleUsePlotting = e => {
  e.preventDefault();

  plottingPerimiterTrigger = new CustomEvent("fence-estimator-results", { detail: { perimiter: plotPerimiter } });
  window.dispatchEvent(plottingPerimiterTrigger);
  plottingPerimiterTrigger = null;

  if (typeof elementorProFrontend !== "undefined") {
    elementorProFrontend.modules.popup.closePopup({}, e);
  }
};

const createMap = () => {
  map = new google.maps.Map(mapContainer, mapOptions);

  addressMarker = new google.maps.Marker({
    position: new google.maps.LatLng(defaultLat, defaultLng),
    // icon: image,
    map: map,
    animation: google.maps.Animation.DROP,
    clickable: false,
    visible: false
  });

  // Auto complete
  const autocomplete = new google.maps.places.Autocomplete(searchField);

  autocomplete.bindTo("bounds", map);
  autocomplete.setFields(["address_components", "adr_address", "geometry", "icon", "name"]);

  autocomplete.addListener("place_changed", function() {
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
    addressMarker.setPosition(place.geometry.location);
    addressMarker.setVisible(true);

    currentAddressLabel.innerHTML = place.adr_address.replace(/\,/g, "");

    addressSearchContainer.setAttribute("aria-hidden", true);
    addressResultsContainer.setAttribute("aria-hidden", false);
    plottingStep1.setAttribute("aria-hidden", false);
  });

  // drawing
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: false,
    polygonOptions: {
      strokeWeight: 0,
      fillOpacity: 0.5,
      fillColor: "#c99700",
      strokeColor: "#c99700",
      editable: true
    }
  });

  google.maps.event.addListener(drawingManager, "overlaycomplete", function(e) {
    if (e.type === google.maps.drawing.OverlayType.POLYGON) {
      // Switch back to non-drawing mode after drawing a shape.
      drawingManager.setDrawingMode(null);

      var newShape = e.overlay;
      newShape.type = e.type;

      clearPlotShape();
      plot = newShape;
      newShape.setEditable(true);
      newShape.set("strokeColor", "#c99700");
      newShape.set("fillColor", "#c99700");

      const paths = newShape.getPath().getArray();
      calculatePlot(paths);

      google.maps.event.addListener(newShape, "mouseup", () => {
        console.log("mouse up");
        const paths = newShape.getPath().getArray();
        calculatePlot(paths);
      });
    }
  });
};

const setup = () => {
  addressSearchContainer = document.querySelectorAll(".map-search-controller")[0];
  addressResultsContainer = document.querySelectorAll(".map-search-results-controller")[0];
  plottingResultsContainer = document.querySelectorAll(".map-plotting-results-controller")[0];

  plottingStep1 = document.querySelectorAll(".map-search-results__step-1")[0];
  plottingStep2 = document.querySelectorAll(".map-search-results__step-2")[0];

  searchField = document.querySelectorAll(".search-address__field")[0];
  newSearchBtn = document.querySelectorAll(".search-address__new-search-button")[0];
  currentAddressLabel = document.querySelectorAll(".map-search-results__address")[0];

  startPlotBtn = document.querySelectorAll(".plotting__start-button")[0];
  undoPlottingBtn = document.querySelectorAll(".plotting__undo-button")[0];
  setPlottingBtn = document.querySelectorAll(".plotting__accept-button")[0];
  plottingPerimiterLabel = document.querySelectorAll(".map-plotting-results__perimiter")[0];

  resetBtn = document.querySelectorAll(".reset-button")[0];

  startPlotBtn.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });

  startPlotBtn.addEventListener("click", handleStartPlotting);
  newSearchBtn.addEventListener("click", handleResetSearch);
  undoPlottingBtn.addEventListener("click", handleUndoPlotting);
  setPlottingBtn.addEventListener("click", handleUsePlotting);
  resetBtn.addEventListener("click", handleResetSearch);
};

const start = () => {
  setup();

  // mapElements.map(createMap);
  createMap();
};

export const init = () => {
  mapContainer = document.getElementById("fence-estimator-map");

  if (!mapContainer) {
    return false;
  }

  // Cache the map elements -
  // mapElements = Array.prototype.slice.call(mapContainer);
  if (!google) {
    mapLoader.load().then(googleAPI => {
      google = googleAPI;

      start();
    });
  } else {
    start();
  }
};
