let shapeMenuContainer,
  sidebar,
  mapTools,
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
  downloadBtn,
  closeDownloadBtn,
  dragMapTool,
  lineMapTool,
  shapeMapTool,
  zoomInTool,
  zoomOutTool,
  currentAddressLabel,
  plottingPerimiterLabel,
  downloadFormName,
  downloadFormNameError,
  downloadFormEmail,
  downloadFormEmailError;

export const assignElements = () => {
  // find elements
  mapContainer = document.getElementById("fence-estimator-map");

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
  downloadBtn = document.querySelectorAll(".plotting__download-button")[0];
  closeDownloadBtn = document.querySelectorAll(
    ".plotting__close-download-button"
  )[0];

  dragMapTool = document.querySelectorAll(".map-tool-drag")[0];
  lineMapTool = document.querySelectorAll(".map-tool-line")[0];
  shapeMapTool = document.querySelectorAll(".map-tool-shape")[0];
  zoomInTool = document.querySelectorAll(".map-tool-zoomin")[0];
  zoomOutTool = document.querySelectorAll(".map-tool-zoomout")[0];

  mapTools = document.querySelectorAll(".map-search-tools-controller")[0];
  sidebar = document.querySelectorAll(".map-search-sidebar")[0];
  shapeMenuContainer = document.querySelectorAll(".paddock-menu-container")[0];

  downloadFormName = document.querySelectorAll(".plotting__download-name")[0];
  downloadFormNameError = document.querySelectorAll(
    ".download-form__error--name"
  )[0];
  downloadFormEmail = document.querySelectorAll(".plotting__download-email")[0];
  downloadFormEmailError = document.querySelectorAll(
    ".download-form__error--email"
  )[0];
};

export {
  shapeMenuContainer,
  sidebar,
  mapTools,
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
  downloadBtn,
  closeDownloadBtn,
  dragMapTool,
  lineMapTool,
  shapeMapTool,
  zoomInTool,
  zoomOutTool,
  currentAddressLabel,
  plottingPerimiterLabel,
  downloadFormName,
  downloadFormNameError,
  downloadFormEmail,
  downloadFormEmailError,
};
