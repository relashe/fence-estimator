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
/******/ 	__webpack_require__.p = "";
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_loadedMapModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/loadedMapModule */ \"./app/js/modules/loadedMapModule.js\");\n\nvar fenceEstimatorTrigger = document.getElementById(\"fence-estimator-trigger\");\nfenceEstimatorTrigger && fenceEstimatorTrigger.addEventListener(\"click\", function () {\n  setTimeout(function () {\n    Object(_modules_loadedMapModule__WEBPACK_IMPORTED_MODULE_0__[\"init\"])();\n  }, 200);\n});\n\n//# sourceURL=webpack:///./app/js/app.build.js?");

/***/ }),

/***/ "./app/js/modules/loadedMapModule.js":
/*!*******************************************!*\
  !*** ./app/js/modules/loadedMapModule.js ***!
  \*******************************************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var google_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! google-maps */ \"./node_modules/google-maps/lib/esm/index.js\");\n/* harmony import */ var _loadedMapModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loadedMapModule */ \"./app/js/modules/loadedMapModule.js\");\n\n\nvar mapSetup = {\n  key: \"AIzaSyAUKRpb10Wh8VaN255y5Md_KiY-LH4FnkE\",\n  options: {\n    libraries: [\"drawing\", \"places\"],\n    version: \"3\"\n  }\n};\nvar mapLoader = new google_maps__WEBPACK_IMPORTED_MODULE_0__[\"Loader\"](mapSetup.key, mapSetup.options); // Elements\n\nvar google, mapElements, mapContainer, addressSearchContainer, addressResultsContainer, plottingResultsContainer, plottingStep1, plottingStep2, searchField, startPlotBtn, newSearchBtn, undoPlottingBtn, setPlottingBtn, resetBtn, currentAddressLabel, plottingPerimiterLabel, plottingPerimiterTrigger;\nvar defaultLat = -37.8136276;\nvar defaultLng = 144.9630576;\nvar defaultZoom = 14;\nvar mapOptions = {\n  center: {\n    lat: defaultLat,\n    lng: defaultLng\n  },\n  zoom: defaultZoom,\n  fullscreenControl: false,\n  mapTypeControl: false,\n  mapTypeId: \"satellite\",\n  streetViewControl: false,\n  tilt: 0\n};\nvar map, drawingManager; // Values\n\nvar addressMarker,\n    plot = null,\n    plotPerimiter = 0;\n\nvar calculatePlot = function calculatePlot(paths) {\n  var length = google.maps.geometry.spherical.computeLength(paths);\n  plotPerimiter = length.toFixed(0);\n  plottingPerimiterLabel.innerHTML = \"\".concat(plotPerimiter, \"m\");\n  plottingResultsContainer.setAttribute(\"aria-hidden\", false);\n};\n\nvar clearPlotShape = function clearPlotShape() {\n  if (plot) {\n    plot.setEditable(false);\n    plot.setMap(null);\n    plot = null;\n  }\n\n  plotPerimiter = 0;\n};\n\nvar resetPlot = function resetPlot() {\n  clearPlotShape();\n};\n\nvar resetEstimator = function resetEstimator() {\n  addressMarker.setVisible(false);\n  resetPlot();\n  map.setZoom(defaultZoom);\n  map.setCenter({\n    lat: defaultLat,\n    lng: defaultLng\n  });\n  plottingStep1.setAttribute(\"aria-hidden\", true);\n  plottingStep2.setAttribute(\"aria-hidden\", true);\n  addressSearchContainer.setAttribute(\"aria-hidden\", false);\n  addressResultsContainer.setAttribute(\"aria-hidden\", true);\n  plottingResultsContainer.setAttribute(\"aria-hidden\", true);\n  currentAddressLabel.innerHTML = \"\";\n  plottingPerimiterLabel.innerHTML = \"\";\n  searchField.value = \"\";\n}; // Button handlers\n\n\nvar handleResetSearch = function handleResetSearch(e) {\n  e.preventDefault();\n  resetEstimator();\n};\n\nvar handleStartPlotting = function handleStartPlotting(e) {\n  e.preventDefault();\n  resetPlot();\n  drawingManager.setMap(map);\n  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);\n  plottingStep1.setAttribute(\"aria-hidden\", true);\n  plottingStep2.setAttribute(\"aria-hidden\", false);\n};\n\nvar handleUndoPlotting = function handleUndoPlotting(e) {\n  e.preventDefault();\n  resetPlot();\n  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);\n  plottingResultsContainer.setAttribute(\"aria-hidden\", true);\n};\n\nvar handleUsePlotting = function handleUsePlotting(e) {\n  e.preventDefault();\n  plottingPerimiterTrigger = new CustomEvent(\"fence-estimator-results\", {\n    detail: {\n      perimiter: plotPerimiter\n    }\n  });\n  window.dispatchEvent(plottingPerimiterTrigger);\n  plottingPerimiterTrigger = null;\n\n  if (typeof elementorProFrontend !== \"undefined\") {\n    elementorProFrontend.modules.popup.closePopup({}, e);\n  }\n};\n\nvar createMap = function createMap() {\n  map = new google.maps.Map(mapContainer, mapOptions);\n  addressMarker = new google.maps.Marker({\n    position: new google.maps.LatLng(defaultLat, defaultLng),\n    // icon: image,\n    map: map,\n    animation: google.maps.Animation.DROP,\n    clickable: false,\n    visible: false\n  }); // Auto complete\n\n  var autocomplete = new google.maps.places.Autocomplete(searchField);\n  autocomplete.bindTo(\"bounds\", map);\n  autocomplete.setFields([\"address_components\", \"adr_address\", \"geometry\", \"icon\", \"name\"]);\n  autocomplete.addListener(\"place_changed\", function () {\n    addressMarker.setVisible(false);\n    var place = autocomplete.getPlace();\n\n    if (!place.geometry) {\n      window.alert(\"No details available for input: '\" + place.name + \"'\");\n      return;\n    } // If the place has a geometry, then present it on a map.\n\n\n    if (place.geometry.viewport) {\n      map.fitBounds(place.geometry.viewport);\n    } else {\n      map.setCenter(place.geometry.location);\n      map.setZoom(16);\n    }\n\n    addressMarker.setPosition(place.geometry.location);\n    addressMarker.setVisible(true);\n    currentAddressLabel.innerHTML = place.adr_address.replace(/\\,/g, \"\");\n    addressSearchContainer.setAttribute(\"aria-hidden\", true);\n    addressResultsContainer.setAttribute(\"aria-hidden\", false);\n    plottingStep1.setAttribute(\"aria-hidden\", false);\n  }); // drawing\n\n  drawingManager = new google.maps.drawing.DrawingManager({\n    drawingMode: google.maps.drawing.OverlayType.POLYGON,\n    drawingControl: false,\n    polygonOptions: {\n      strokeWeight: 0,\n      fillOpacity: 0.5,\n      fillColor: \"#c99700\",\n      strokeColor: \"#c99700\",\n      editable: true\n    }\n  });\n  google.maps.event.addListener(drawingManager, \"overlaycomplete\", function (e) {\n    if (e.type === google.maps.drawing.OverlayType.POLYGON) {\n      // Switch back to non-drawing mode after drawing a shape.\n      drawingManager.setDrawingMode(null);\n      var newShape = e.overlay;\n      newShape.type = e.type;\n      clearPlotShape();\n      plot = newShape;\n      newShape.setEditable(true);\n      newShape.set(\"strokeColor\", \"#c99700\");\n      newShape.set(\"fillColor\", \"#c99700\");\n      var paths = newShape.getPath().getArray();\n      calculatePlot(paths);\n      google.maps.event.addListener(newShape, \"mouseup\", function () {\n        console.log(\"mouse up\");\n        var paths = newShape.getPath().getArray();\n        calculatePlot(paths);\n      });\n    }\n  });\n};\n\nvar setup = function setup() {\n  addressSearchContainer = document.querySelectorAll(\".map-search-controller\")[0];\n  addressResultsContainer = document.querySelectorAll(\".map-search-results-controller\")[0];\n  plottingResultsContainer = document.querySelectorAll(\".map-plotting-results-controller\")[0];\n  plottingStep1 = document.querySelectorAll(\".map-search-results__step-1\")[0];\n  plottingStep2 = document.querySelectorAll(\".map-search-results__step-2\")[0];\n  searchField = document.querySelectorAll(\".search-address__field\")[0];\n  newSearchBtn = document.querySelectorAll(\".search-address__new-search-button\")[0];\n  currentAddressLabel = document.querySelectorAll(\".map-search-results__address\")[0];\n  startPlotBtn = document.querySelectorAll(\".plotting__start-button\")[0];\n  undoPlottingBtn = document.querySelectorAll(\".plotting__undo-button\")[0];\n  setPlottingBtn = document.querySelectorAll(\".plotting__accept-button\")[0];\n  plottingPerimiterLabel = document.querySelectorAll(\".map-plotting-results__perimiter\")[0];\n  resetBtn = document.querySelectorAll(\".reset-button\")[0];\n  startPlotBtn.addEventListener(\"keypress\", function (e) {\n    if (e.keyCode === 13) {\n      e.preventDefault();\n    }\n  });\n  startPlotBtn.addEventListener(\"click\", handleStartPlotting);\n  newSearchBtn.addEventListener(\"click\", handleResetSearch);\n  undoPlottingBtn.addEventListener(\"click\", handleUndoPlotting);\n  setPlottingBtn.addEventListener(\"click\", handleUsePlotting);\n  resetBtn.addEventListener(\"click\", handleResetSearch);\n};\n\nvar start = function start() {\n  setup(); // mapElements.map(createMap);\n\n  createMap();\n};\n\nvar init = function init() {\n  mapContainer = document.getElementById(\"fence-estimator-map\");\n\n  if (!mapContainer) {\n    return false;\n  } // Cache the map elements -\n  // mapElements = Array.prototype.slice.call(mapContainer);\n\n\n  if (!google) {\n    mapLoader.load().then(function (googleAPI) {\n      google = googleAPI;\n      start();\n    });\n  } else {\n    start();\n  }\n};\n\n//# sourceURL=webpack:///./app/js/modules/loadedMapModule.js?");

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

eval("module.exports = __webpack_require__(/*! /Users/pczcanda1/Documents/Relashe/Work/GIT/freelancing/fence.estimator/fence-estimator/javascript/app/index.build.js */\"./app/index.build.js\");\n\n\n//# sourceURL=webpack:///multi_./app/index.build.js?");

/***/ })

/******/ });