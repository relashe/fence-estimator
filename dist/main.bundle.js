/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/index.build.js":
/*!****************************!*\
  !*** ./app/index.build.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_app_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/app.build.js */ \"./app/js/app.build.js\");\n// IMPORTS\n// import \"./styles/styles.scss\";\n// JS\n\n\n//# sourceURL=webpack:///./app/index.build.js?");

/***/ }),

/***/ "./app/js/app.build.js":
/*!*****************************!*\
  !*** ./app/js/app.build.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_loadedMapModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/loadedMapModule */ \"./app/js/modules/loadedMapModule.js\");\n\n\nvar mapStarter = function mapStarter() {\n  var timing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;\n  setTimeout(function () {\n    Object(_modules_loadedMapModule__WEBPACK_IMPORTED_MODULE_0__[\"init\"])();\n  }, timing);\n};\n\nvar fenceEstimatorTrigger = document.getElementById(\"fence-estimator-trigger\");\nfenceEstimatorTrigger && fenceEstimatorTrigger.addEventListener(\"click\", function () {\n  mapStarter();\n});\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  mapStarter(1200);\n});\n\n//# sourceURL=webpack:///./app/js/app.build.js?");

/***/ }),

/***/ "./app/js/constants/colors.constants.js":
/*!**********************************************!*\
  !*** ./app/js/constants/colors.constants.js ***!
  \**********************************************/
/*! exports provided: COLORS, OPACITY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"COLORS\", function() { return COLORS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OPACITY\", function() { return OPACITY; });\nvar COLORS = {\n  DEFAULT: \"#c99700\",\n  STROKE: \"#c99700\",\n  EDIT: \"#ff0000\",\n  HIGHLIGHT: \"#c99700\"\n};\nvar OPACITY = {\n  DEFAULT: 0.25,\n  EDIT: 0.8,\n  HIGHLIGHT: 0.8\n};\n\n//# sourceURL=webpack:///./app/js/constants/colors.constants.js?");

/***/ }),

/***/ "./app/js/constants/index.js":
/*!***********************************!*\
  !*** ./app/js/constants/index.js ***!
  \***********************************/
/*! exports provided: COLORS, OPACITY, MAP_SETTINGS, DEFAULT_COORDINATES, DEFAULT_ZOOM, MAP_OPTIONS, SHAPE_SETTINGS, SHAPES_CONTROLS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _colors_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors.constants */ \"./app/js/constants/colors.constants.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"COLORS\", function() { return _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"OPACITY\", function() { return _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"OPACITY\"]; });\n\n/* harmony import */ var _map_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.constants */ \"./app/js/constants/map.constants.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"MAP_SETTINGS\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"MAP_SETTINGS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_COORDINATES\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"DEFAULT_COORDINATES\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_ZOOM\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"DEFAULT_ZOOM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"MAP_OPTIONS\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"MAP_OPTIONS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SHAPE_SETTINGS\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPE_SETTINGS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SHAPES_CONTROLS\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPES_CONTROLS\"]; });\n\n\n\n\n//# sourceURL=webpack:///./app/js/constants/index.js?");

/***/ }),

/***/ "./app/js/constants/map.constants.js":
/*!*******************************************!*\
  !*** ./app/js/constants/map.constants.js ***!
  \*******************************************/
/*! exports provided: MAP_SETTINGS, DEFAULT_COORDINATES, DEFAULT_ZOOM, MAP_OPTIONS, SHAPE_SETTINGS, SHAPES_CONTROLS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAP_SETTINGS\", function() { return MAP_SETTINGS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_COORDINATES\", function() { return DEFAULT_COORDINATES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_ZOOM\", function() { return DEFAULT_ZOOM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAP_OPTIONS\", function() { return MAP_OPTIONS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SHAPE_SETTINGS\", function() { return SHAPE_SETTINGS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SHAPES_CONTROLS\", function() { return SHAPES_CONTROLS; });\n/* harmony import */ var _colors_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors.constants */ \"./app/js/constants/colors.constants.js\");\n\nvar MAP_SETTINGS = {\n  key: \"AIzaSyDKn1YutebCypgyFrQSP6gtACQ_LbCsEGs\",\n  options: {\n    libraries: [\"drawing\", \"places\", \"geometry\"],\n    version: \"3\"\n  }\n};\nvar DEFAULT_COORDINATES = {\n  lat: -37.8136276,\n  lng: 144.9630576\n};\nvar DEFAULT_ZOOM = 14;\nvar MAP_OPTIONS = {\n  center: DEFAULT_COORDINATES,\n  zoom: DEFAULT_ZOOM,\n  fullscreenControl: false,\n  mapTypeControl: false,\n  mapTypeId: \"satellite\",\n  streetViewControl: false,\n  tilt: 0\n};\nvar SHAPE_SETTINGS = {\n  DEFAULT: {\n    fillOpacity: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"OPACITY\"].DEFAULT,\n    fillColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"].DEFAULT,\n    strokeColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"].STROKE,\n    strokeWeight: 3,\n    editable: true\n  },\n  EDIT: {\n    fillOpacity: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"OPACITY\"].EDIT,\n    fillColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"].EDIT,\n    strokeColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"].EDIT\n  },\n  HIGHLIGHT: {\n    fillOpacity: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"OPACITY\"].HIGHLIGHT,\n    fillColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"].HIGHLIGHT,\n    strokeColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"].HIGHLIGHT\n  }\n};\nvar SHAPES_CONTROLS = {\n  HIGHLIGHT: \"highlight\",\n  EDIT: \"edit\",\n  DELETE: \"delete\",\n  CONFIRM_DELETE: \"confirm-delete\"\n};\n\n//# sourceURL=webpack:///./app/js/constants/map.constants.js?");

/***/ }),

/***/ "./app/js/helpers/index.js":
/*!*********************************!*\
  !*** ./app/js/helpers/index.js ***!
  \*********************************/
/*! exports provided: highlightShape, editShape, clearEdits */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.helpers */ \"./app/js/helpers/map.helpers.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"highlightShape\", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__[\"highlightShape\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"editShape\", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__[\"editShape\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"clearEdits\", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__[\"clearEdits\"]; });\n\n\n\n//# sourceURL=webpack:///./app/js/helpers/index.js?");

/***/ }),

/***/ "./app/js/helpers/map.helpers.js":
/*!***************************************!*\
  !*** ./app/js/helpers/map.helpers.js ***!
  \***************************************/
/*! exports provided: highlightShape, editShape, clearEdits */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"highlightShape\", function() { return highlightShape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"editShape\", function() { return editShape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clearEdits\", function() { return clearEdits; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./app/js/constants/index.js\");\n\nvar highlightShape = function highlightShape(shape) {\n  if (!shape) {\n    return;\n  }\n\n  shape.setOptions(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPE_SETTINGS\"].HIGHLIGHT);\n  setTimeout(function () {\n    shape.setOptions(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPE_SETTINGS\"].DEFAULT);\n  }, 500);\n};\nvar editShape = function editShape(shape) {\n  var edit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n  var drawingManager = arguments.length > 2 ? arguments[2] : undefined;\n  var selectedShape = arguments.length > 3 ? arguments[3] : undefined;\n\n  if (!shape || shape === selectedShape) {\n    return;\n  }\n\n  if (edit) {\n    drawingManager && drawingManager.setDrawingMode(null);\n    shape.setOptions(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPE_SETTINGS\"].EDIT);\n    selectedShape = shape;\n  } else {\n    shape.setOptions(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPE_SETTINGS\"].DEFAULT);\n    selectedShape = null;\n  }\n};\nvar clearEdits = function clearEdits(mapShapes) {\n  if (!mapShapes) {\n    return;\n  }\n\n  mapShapes.forEach(function (shape) {\n    editShape(shape, false);\n  });\n  document.querySelectorAll(\"[data-action=\\\"\".concat(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPES_CONTROLS\"].CONFIRM_DELETE, \"\\\"]\")).forEach(function (confirmDeleteButton) {\n    confirmDeleteButton.classList.remove(\"d-block\");\n    confirmDeleteButton.classList.add(\"d-none\");\n  });\n  document.querySelectorAll(\"[data-action=\\\"\".concat(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPES_CONTROLS\"].DELETE, \"\\\"]\")).forEach(function (deleteButton) {\n    deleteButton.classList.remove(\"d-none\");\n    deleteButton.classList.add(\"d-block\");\n  });\n};\n\n//# sourceURL=webpack:///./app/js/helpers/map.helpers.js?");

/***/ }),

/***/ "./app/js/modules/loadedMapModule.js":
/*!*******************************************!*\
  !*** ./app/js/modules/loadedMapModule.js ***!
  \*******************************************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var google_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! google-maps */ \"./node_modules/google-maps/lib/esm/index.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./app/js/constants/index.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers */ \"./app/js/helpers/index.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar mapLoader = new google_maps__WEBPACK_IMPORTED_MODULE_0__[\"Loader\"](_constants__WEBPACK_IMPORTED_MODULE_1__[\"MAP_SETTINGS\"].key, _constants__WEBPACK_IMPORTED_MODULE_1__[\"MAP_SETTINGS\"].options); // Elements\n\nvar google,\n    map,\n    drawingManager,\n    mapElements = [],\n    currentPaddock,\n    selectedShape = null,\n    mapContainer,\n    addressSearchContainer,\n    addressResultsContainer,\n    plottingResultsContainer,\n    plottingStep1,\n    plottingStep2,\n    plottingShapes,\n    searchField,\n    startPlotBtn,\n    newSearchBtn,\n    addPlottingBtn,\n    savePaddockBtn,\n    undoPlottingBtn,\n    setPlottingBtn,\n    resetBtn,\n    currentAddressLabel,\n    plottingPerimiterLabel,\n    plottingPerimiterTrigger,\n    hasConfirmedTotal = false; // Values\n\nvar addressMarker,\n    plotPerimiter = 0; // UI\n\nvar calculatePlot = function calculatePlot() {\n  var totalPerimeter = 0;\n  plottingShapes.innerHTML = \"\";\n  mapElements.forEach(function (shape, index) {\n    var shapeLength = google.maps.geometry.spherical.computeLength(shape.getPath().getArray());\n    totalPerimeter += shapeLength;\n    plottingShapes.innerHTML += \"\\n    <tr>\\n      <th scope=\\\"row\\\"><p data-action=\\\"\".concat(_constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPES_CONTROLS\"].HIGHLIGHT, \"\\\" data-shape=\\\"\").concat(index, \"\\\">Paddock \").concat(index + 1, \"</p></th>\\n      <th scope=\\\"col\\\">\").concat(shapeLength.toFixed(0), \"m </th>\\n      <td>\\n        <button type=\\\"button\\\" data-action=\\\"\").concat(_constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPES_CONTROLS\"].EDIT, \"\\\" data-shape=\\\"\").concat(index, \"\\\" class=\\\"btn-control-icons\\\">\\n          <i class=\\\"fa fa-edit\\\"></i>\\n        </button>\\n      </td>\\n      <td>\\n        <button type=\\\"button\\\" data-action=\\\"\").concat(_constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPES_CONTROLS\"].DELETE, \"\\\" data-shape=\\\"\").concat(index, \"\\\" class=\\\"btn-control-icons d-block\\\">\\n          <i class=\\\"fa fa-trash\\\"></i>\\n        </button>\\n        <button type=\\\"button\\\" data-action=\\\"\").concat(_constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPES_CONTROLS\"].CONFIRM_DELETE, \"\\\" data-shape=\\\"\").concat(index, \"\\\" class=\\\"btn-control-icons d-none\\\">\\n          <i class=\\\"fa fa-times\\\"></i> Click to confirm\\n        </button>\\n      </td>\\n    </tr>\\n    \");\n  });\n  plotPerimiter = totalPerimeter.toFixed(0);\n  plottingPerimiterLabel.innerHTML = \"\".concat(plotPerimiter, \"m\");\n  plottingResultsContainer.setAttribute(\"aria-hidden\", false);\n\n  if (hasConfirmedTotal) {\n    handleUsePlotting();\n  }\n};\n\nvar clearPlotShape = function clearPlotShape(idx) {\n  if (mapElements.length && mapElements[idx]) {\n    mapElements[idx].setMap(null);\n    google.maps.event.clearInstanceListeners(mapElements[idx]);\n    mapElements.splice(idx, 1);\n  }\n\n  calculatePlot();\n\n  if (!mapElements.length) {\n    backToStartDrawing();\n  }\n};\n\nvar clearPlotShapes = function clearPlotShapes() {\n  if (mapElements.length) {\n    mapElements.forEach(function (shape) {\n      shape.setMap(null);\n    });\n    mapElements = [];\n  }\n\n  plotPerimiter = 0;\n};\n\nvar backToStartDrawing = function backToStartDrawing() {\n  plottingStep1.setAttribute(\"aria-hidden\", false);\n  plottingStep2.setAttribute(\"aria-hidden\", true);\n  plottingResultsContainer.setAttribute(\"aria-hidden\", true);\n  savePaddockBtn.setAttribute(\"aria-hidden\", false);\n  plottingShapes.innerHTML = \"\";\n  drawingManager.setDrawingMode(null);\n};\n\nvar resetPlot = function resetPlot() {\n  clearPlotShapes();\n};\n\nvar resetEstimator = function resetEstimator() {\n  addressMarker.setVisible(false);\n  resetPlot();\n  map.setZoom(_constants__WEBPACK_IMPORTED_MODULE_1__[\"DEFAULT_ZOOM\"]);\n  map.setCenter({\n    lat: _constants__WEBPACK_IMPORTED_MODULE_1__[\"DEFAULT_COORDINATES\"].lat,\n    lng: _constants__WEBPACK_IMPORTED_MODULE_1__[\"DEFAULT_COORDINATES\"].lng\n  });\n  drawingManager.setDrawingMode(null);\n  plottingStep1.setAttribute(\"aria-hidden\", true);\n  plottingStep2.setAttribute(\"aria-hidden\", true);\n  addressResultsContainer.setAttribute(\"aria-hidden\", true);\n  plottingResultsContainer.setAttribute(\"aria-hidden\", true);\n  savePaddockBtn.setAttribute(\"aria-hidden\", true);\n  addressSearchContainer.setAttribute(\"aria-hidden\", false);\n  currentAddressLabel.innerHTML = \"\";\n  plottingPerimiterLabel.innerHTML = \"\";\n  plottingShapes.innerHTML = \"\";\n  searchField.value = \"\";\n}; // events\n\n\nvar handleResetSearch = function handleResetSearch(e) {\n  e.preventDefault();\n  resetEstimator();\n};\n\nvar handleStartPlotting = function handleStartPlotting(e) {\n  e.preventDefault();\n  resetPlot();\n  drawingManager.setMap(map);\n  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);\n  plottingStep1.setAttribute(\"aria-hidden\", true);\n  plottingStep2.setAttribute(\"aria-hidden\", false);\n  savePaddockBtn.setAttribute(\"aria-hidden\", false);\n};\n\nvar handleShapes = function handleShapes(e) {\n  var element = e.target.tagName.toLowerCase() === \"button\" ? e.target : e.target.parentElement;\n\n  if (element.dataset.shape === undefined || !element.dataset.action) {\n    return;\n  }\n\n  var shapeIndex = parseInt(element.dataset.shape);\n  var shape = mapElements[shapeIndex];\n\n  if (!shape) {\n    return;\n  }\n\n  switch (element.dataset.action) {\n    case _constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPES_CONTROLS\"].HIGHLIGHT:\n      _helpers__WEBPACK_IMPORTED_MODULE_2__[\"highlightShape\"](shape);\n      break;\n\n    case _constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPES_CONTROLS\"].EDIT:\n      _helpers__WEBPACK_IMPORTED_MODULE_2__[\"clearEdits\"](mapElements);\n      _helpers__WEBPACK_IMPORTED_MODULE_2__[\"editShape\"](shape, true, drawingManager, selectedShape);\n      savePaddockBtn.setAttribute(\"aria-hidden\", true);\n      break;\n\n    case _constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPES_CONTROLS\"].DELETE:\n      _helpers__WEBPACK_IMPORTED_MODULE_2__[\"clearEdits\"](mapElements);\n      _helpers__WEBPACK_IMPORTED_MODULE_2__[\"editShape\"](shape, true, drawingManager, selectedShape);\n      savePaddockBtn.setAttribute(\"aria-hidden\", true);\n      element.classList.remove(\"d-block\");\n      element.classList.add(\"d-none\");\n      var confirmDelete = element.parentElement.querySelectorAll(\"[data-action=\\\"\".concat(_constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPES_CONTROLS\"].CONFIRM_DELETE, \"\\\"]\"))[0];\n      confirmDelete.classList.remove(\"d-none\");\n      confirmDelete.classList.add(\"d-block\");\n      break;\n\n    case _constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPES_CONTROLS\"].CONFIRM_DELETE:\n      clearPlotShape(shapeIndex);\n      drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);\n      break;\n  }\n};\n\nvar handleAddPlotting = function handleAddPlotting(e) {\n  e.preventDefault();\n  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);\n  _helpers__WEBPACK_IMPORTED_MODULE_2__[\"clearEdits\"](mapElements);\n  savePaddockBtn.setAttribute(\"aria-hidden\", false);\n};\n\nvar handleUndoPlotting = function handleUndoPlotting(e) {\n  e.preventDefault();\n  clearPlotShape(mapElements.length - 1);\n\n  if (!mapElements.length) {\n    backToStartDrawing();\n  }\n};\n\nvar handleUsePlotting = function handleUsePlotting(e) {\n  e && e.preventDefault();\n  hasConfirmedTotal = true;\n  plottingPerimiterTrigger = new CustomEvent(\"fence-estimator-results\", {\n    detail: {\n      perimiter: plotPerimiter\n    }\n  });\n  window.dispatchEvent(plottingPerimiterTrigger);\n  plottingPerimiterTrigger = null;\n\n  if (typeof elementorProFrontend !== \"undefined\") {\n    elementorProFrontend.modules.popup.closePopup({}, e);\n  }\n}; // map\n\n\nvar storeShape = function storeShape() {};\n\nvar createMap = function createMap() {\n  map = new google.maps.Map(mapContainer, _constants__WEBPACK_IMPORTED_MODULE_1__[\"MAP_OPTIONS\"]); // Marker\n\n  addressMarker = new google.maps.Marker({\n    position: new google.maps.LatLng(_constants__WEBPACK_IMPORTED_MODULE_1__[\"DEFAULT_COORDINATES\"].lat, _constants__WEBPACK_IMPORTED_MODULE_1__[\"DEFAULT_COORDINATES\"].lng),\n    map: map,\n    animation: google.maps.Animation.DROP,\n    clickable: false,\n    visible: false\n  }); // Auto complete\n\n  var autocomplete = new google.maps.places.Autocomplete(searchField);\n  autocomplete.bindTo(\"bounds\", map);\n  autocomplete.setFields([\"address_components\", \"adr_address\", \"geometry\", \"icon\", \"name\"]);\n  autocomplete.addListener(\"place_changed\", function () {\n    addressMarker.setVisible(false);\n    var place = autocomplete.getPlace();\n\n    if (!place.geometry) {\n      window.alert(\"No details available for input: '\" + place.name + \"'\");\n      return;\n    } // If the place has a geometry, then present it on a map.\n\n\n    if (place.geometry.viewport) {\n      map.fitBounds(place.geometry.viewport);\n    } else {\n      map.setCenter(place.geometry.location);\n      map.setZoom(16);\n    }\n\n    addressMarker.setPosition(place.geometry.location);\n    addressMarker.setVisible(true);\n    currentAddressLabel.innerHTML = place.adr_address.replace(/\\,/g, \"\");\n    addressSearchContainer.setAttribute(\"aria-hidden\", true);\n    addressResultsContainer.setAttribute(\"aria-hidden\", false);\n    plottingStep1.setAttribute(\"aria-hidden\", false);\n  }); // Drawing\n\n  drawingManager = new google.maps.drawing.DrawingManager({\n    drawingMode: google.maps.drawing.OverlayType.POLYLINE,\n    drawingControl: false,\n    drawingControlOptions: {\n      drawingModes: [google.maps.drawing.OverlayType.POLYLINE]\n    },\n    polygonOptions: _objectSpread({}, _constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPE_SETTINGS\"].DEFAULT)\n  });\n  google.maps.event.addListener(drawingManager, \"polylinecomplete\", function (e) {\n    // if no paddock created, create polyline and add it to array of elements\n    // to display totals in table as lines are added\n    if (!currentPaddock) {\n      currentPaddock = new google.maps.Polyline(_objectSpread(_objectSpread({}, _constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPE_SETTINGS\"].DEFAULT), {}, {\n        paddockIdx: mapElements.length,\n        // current length = new index\n        map: map\n      }));\n    } // replace current paddock with new connected path\n\n\n    currentPaddock.setPath(e.getPath().getArray());\n    mapElements.push(currentPaddock);\n    var paddock = mapElements[mapElements.length - 1];\n    google.maps.event.addListener(paddock, \"mouseup\", function () {\n      calculatePlot();\n    });\n    google.maps.event.addListener(paddock, \"mouseover\", function () {\n      if (drawingManager.getDrawingMode() === google.maps.drawing.OverlayType.POLYLINE) {\n        _helpers__WEBPACK_IMPORTED_MODULE_2__[\"clearEdits\"](mapElements);\n        _helpers__WEBPACK_IMPORTED_MODULE_2__[\"editShape\"](paddock, true, drawingManager, selectedShape);\n        savePaddockBtn.setAttribute(\"aria-hidden\", true);\n      }\n    });\n    google.maps.event.addListener(paddock, \"click\", function () {\n      if (drawingManager.getDrawingMode() === null) {\n        _helpers__WEBPACK_IMPORTED_MODULE_2__[\"clearEdits\"](mapElements);\n        _helpers__WEBPACK_IMPORTED_MODULE_2__[\"editShape\"](paddock, true, drawingManager, selectedShape);\n        savePaddockBtn.setAttribute(\"aria-hidden\", true);\n      }\n    });\n    e.setMap(null);\n    currentPaddock = undefined;\n    calculatePlot();\n  });\n};\n\nvar setup = function setup() {\n  addressSearchContainer = document.querySelectorAll(\".map-search-controller\")[0];\n  addressResultsContainer = document.querySelectorAll(\".map-search-results-controller\")[0];\n  plottingResultsContainer = document.querySelectorAll(\".map-plotting-results-controller\")[0];\n  plottingStep1 = document.querySelectorAll(\".map-search-results__step-1\")[0];\n  plottingStep2 = document.querySelectorAll(\".map-search-results__step-2\")[0];\n  plottingShapes = document.querySelectorAll(\".map-search-results__shapes-table\")[0];\n  searchField = document.querySelectorAll(\".search-address__field\")[0];\n  newSearchBtn = document.querySelectorAll(\".search-address__new-search-button\")[0];\n  currentAddressLabel = document.querySelectorAll(\".map-search-results__address\")[0];\n  startPlotBtn = document.querySelectorAll(\".plotting__start-button\")[0];\n  addPlottingBtn = document.querySelectorAll(\".plotting__add-button\")[0];\n  savePaddockBtn = document.querySelectorAll(\".plotting__save-paddock-button\")[0];\n  undoPlottingBtn = document.querySelectorAll(\".plotting__undo-button\")[0];\n  setPlottingBtn = document.querySelectorAll(\".plotting__accept-button\")[0];\n  plottingPerimiterLabel = document.querySelectorAll(\".map-plotting-results__perimiter\")[0];\n  resetBtn = document.querySelectorAll(\".reset-button\");\n\n  var ignoreKeyPress = function ignoreKeyPress(e) {\n    if (e.keyCode === 13) {\n      e.preventDefault();\n    }\n  };\n\n  searchField.addEventListener(\"keypress\", ignoreKeyPress);\n  startPlotBtn.addEventListener(\"keypress\", ignoreKeyPress);\n  startPlotBtn.addEventListener(\"click\", handleStartPlotting);\n  plottingShapes.addEventListener(\"click\", handleShapes);\n  newSearchBtn.addEventListener(\"click\", handleResetSearch);\n  addPlottingBtn.addEventListener(\"click\", handleAddPlotting);\n  savePaddockBtn.addEventListener(\"click\", handleAddPlotting);\n  undoPlottingBtn.addEventListener(\"click\", handleUndoPlotting);\n  setPlottingBtn.addEventListener(\"click\", handleUsePlotting);\n  resetBtn.forEach(function (button) {\n    button.addEventListener(\"click\", handleResetSearch);\n  });\n};\n\nvar start = function start() {\n  setup();\n  createMap();\n};\n\nvar init = function init() {\n  mapContainer = document.getElementById(\"fence-estimator-map\");\n\n  if (!mapContainer) {\n    return false;\n  }\n\n  if (!google) {\n    mapLoader.load().then(function (googleAPI) {\n      google = googleAPI;\n      start();\n    });\n  } else {\n    start();\n  }\n};\n\n//# sourceURL=webpack:///./app/js/modules/loadedMapModule.js?");

/***/ }),

/***/ "./node_modules/google-maps/lib/esm/index.js":
/*!***************************************************!*\
  !*** ./node_modules/google-maps/lib/esm/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader */ \"./node_modules/google-maps/lib/esm/loader.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Loader\", function() { return _loader__WEBPACK_IMPORTED_MODULE_0__[\"Loader\"]; });\n\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ \"./node_modules/google-maps/lib/esm/types.js\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_1__) if([\"default\",\"Loader\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///./node_modules/google-maps/lib/esm/index.js?");

/***/ }),

/***/ "./node_modules/google-maps/lib/esm/loader.js":
/*!****************************************************!*\
  !*** ./node_modules/google-maps/lib/esm/loader.js ***!
  \****************************************************/
/*! exports provided: Loader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Loader\", function() { return Loader; });\nclass Loader {\n    constructor(apiKey = null, options = {}) {\n        this.apiKey = apiKey;\n        this.options = options;\n        if (typeof window === 'undefined') {\n            throw new Error('google-maps is supported only in browser environment');\n        }\n    }\n    load() {\n        if (typeof this.api !== 'undefined') {\n            return Promise.resolve(this.api);\n        }\n        if (typeof this.loader !== 'undefined') {\n            return this.loader;\n        }\n        window[Loader.CALLBACK_NAME] = () => {\n            this.api = window['google'];\n            if (typeof this.resolve === 'undefined') {\n                throw new Error('Should not happen');\n            }\n            this.resolve(this.api);\n        };\n        window['gm_authFailure'] = () => {\n            if (typeof this.reject === 'undefined') {\n                throw new Error('Should not happen');\n            }\n            this.reject(new Error('google-maps: authentication error'));\n        };\n        return this.loader = new Promise((resolve, reject) => {\n            this.resolve = resolve;\n            this.reject = reject;\n            const script = document.createElement('script');\n            script.src = this.createUrl();\n            script.async = true;\n            script.onerror = (e) => reject(e);\n            document.head.appendChild(script);\n        });\n    }\n    createUrl() {\n        const parameters = [\n            `callback=${Loader.CALLBACK_NAME}`,\n        ];\n        if (this.apiKey) {\n            parameters.push(`key=${this.apiKey}`);\n        }\n        for (let name in this.options) {\n            if (this.options.hasOwnProperty(name)) {\n                let value = this.options[name];\n                if (name === 'version') {\n                    name = 'v';\n                }\n                if (name === 'libraries') {\n                    value = value.join(',');\n                }\n                parameters.push(`${name}=${value}`);\n            }\n        }\n        return `//maps.googleapis.com/maps/api/js?${parameters.join('&')}`;\n    }\n}\nLoader.CALLBACK_NAME = '_dk_google_maps_loader_cb';\n//# sourceMappingURL=loader.js.map\n\n//# sourceURL=webpack:///./node_modules/google-maps/lib/esm/loader.js?");

/***/ }),

/***/ "./node_modules/google-maps/lib/esm/types.js":
/*!***************************************************!*\
  !*** ./node_modules/google-maps/lib/esm/types.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/// <reference types=\"googlemaps\" />\n//# sourceMappingURL=types.js.map\n\n//# sourceURL=webpack:///./node_modules/google-maps/lib/esm/types.js?");

/***/ }),

/***/ 0:
/*!**********************************!*\
  !*** multi ./app/index.build.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/pacienciacanda/Documents/Relashe/git/freelance/fence-estimator/app/index.build.js */\"./app/index.build.js\");\n\n\n//# sourceURL=webpack:///multi_./app/index.build.js?");

/***/ })

/******/ });