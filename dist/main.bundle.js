/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
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
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_starter_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/starter.module */ \"./app/js/modules/starter.module.js\");\n\n\nconst mapStarter = function () {\n  let timing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;\n  setTimeout(() => {\n    Object(_modules_starter_module__WEBPACK_IMPORTED_MODULE_0__[\"init\"])();\n  }, timing);\n};\n\nvar fenceEstimatorTrigger = document.getElementById(\"fence-estimator-trigger\");\nfenceEstimatorTrigger && fenceEstimatorTrigger.addEventListener(\"click\", () => {\n  mapStarter();\n});\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  mapStarter(1200);\n});\n\n//# sourceURL=webpack:///./app/js/app.build.js?");

/***/ }),

/***/ "./app/js/constants/colors.constants.js":
/*!**********************************************!*\
  !*** ./app/js/constants/colors.constants.js ***!
  \**********************************************/
/*! exports provided: COLORS, OPACITY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"COLORS\", function() { return COLORS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OPACITY\", function() { return OPACITY; });\nconst COLORS = {\n  DEFAULT: \"#c99700\",\n  STROKE: \"#c99700\",\n  EDIT: \"#ff0000\",\n  HIGHLIGHT: \"#c99700\"\n};\nconst OPACITY = {\n  DEFAULT: 0.25,\n  EDIT: 0.8,\n  HIGHLIGHT: 0.8\n};\n\n//# sourceURL=webpack:///./app/js/constants/colors.constants.js?");

/***/ }),

/***/ "./app/js/constants/icons.constants.js":
/*!*********************************************!*\
  !*** ./app/js/constants/icons.constants.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// export { default as IconDelete } from \"../../../public/assets/tool-bin.svg\";\n// export { default as IconBoundaryFence } from \"../../../public/assets/tool-boundary-fence.svg\";\n// export { default as IconClosedPaddock } from \"../../../public/assets/tool-closed-paddock-fence.svg\";\n// export { default as IconDrag } from \"../../../public/assets/tool-move.svg\";\n// export { default as IconPrint } from \"../../../public/assets/tool-print.svg\";\n// export { default as IconZoomIn } from \"../../../public/assets/tool-zoom-in.svg\";\n// export { default as IconZoomOut } from \"../../../public/assets/tool-zoom-out.svg\";\n\n//# sourceURL=webpack:///./app/js/constants/icons.constants.js?");

/***/ }),

/***/ "./app/js/constants/index.js":
/*!***********************************!*\
  !*** ./app/js/constants/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _colors_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors.constants */ \"./app/js/constants/colors.constants.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"COLORS\", function() { return _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"OPACITY\", function() { return _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"OPACITY\"]; });\n\n/* harmony import */ var _map_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.constants */ \"./app/js/constants/map.constants.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"MAP_SETTINGS\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"MAP_SETTINGS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_COORDINATES\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"DEFAULT_COORDINATES\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_ZOOM\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"DEFAULT_ZOOM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"EXPORT_ZOOM\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"EXPORT_ZOOM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"MAP_OPTIONS\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"MAP_OPTIONS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SHAPE_SETTINGS\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPE_SETTINGS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SHAPES_CONTROLS\", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__[\"SHAPES_CONTROLS\"]; });\n\n/* harmony import */ var _icons_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons.constants */ \"./app/js/constants/icons.constants.js\");\n/* harmony import */ var _icons_constants__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_icons_constants__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _icons_constants__WEBPACK_IMPORTED_MODULE_2__) if([\"default\",\"COLORS\",\"OPACITY\",\"MAP_SETTINGS\",\"DEFAULT_COORDINATES\",\"DEFAULT_ZOOM\",\"EXPORT_ZOOM\",\"MAP_OPTIONS\",\"SHAPE_SETTINGS\",\"SHAPES_CONTROLS\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _icons_constants__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n\n\n//# sourceURL=webpack:///./app/js/constants/index.js?");

/***/ }),

/***/ "./app/js/constants/map.constants.js":
/*!*******************************************!*\
  !*** ./app/js/constants/map.constants.js ***!
  \*******************************************/
/*! exports provided: MAP_SETTINGS, DEFAULT_COORDINATES, DEFAULT_ZOOM, EXPORT_ZOOM, MAP_OPTIONS, SHAPE_SETTINGS, SHAPES_CONTROLS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAP_SETTINGS\", function() { return MAP_SETTINGS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_COORDINATES\", function() { return DEFAULT_COORDINATES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_ZOOM\", function() { return DEFAULT_ZOOM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EXPORT_ZOOM\", function() { return EXPORT_ZOOM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAP_OPTIONS\", function() { return MAP_OPTIONS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SHAPE_SETTINGS\", function() { return SHAPE_SETTINGS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SHAPES_CONTROLS\", function() { return SHAPES_CONTROLS; });\n/* harmony import */ var _colors_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors.constants */ \"./app/js/constants/colors.constants.js\");\n\nconst MAP_SETTINGS = {\n  key: \"AIzaSyDKn1YutebCypgyFrQSP6gtACQ_LbCsEGs\",\n  options: {\n    libraries: [\"drawing\", \"places\", \"geometry\"],\n    version: \"3\"\n  }\n};\nconst DEFAULT_COORDINATES = {\n  lat: -37.8136276,\n  lng: 144.9630576\n};\nconst DEFAULT_ZOOM = 15;\nconst EXPORT_ZOOM = 16;\nconst MAP_OPTIONS = {\n  center: DEFAULT_COORDINATES,\n  zoom: DEFAULT_ZOOM,\n  fullscreenControl: false,\n  mapTypeControl: false,\n  mapTypeId: \"satellite\",\n  streetViewControl: false,\n  tilt: 0,\n  zoomControl: false\n};\nconst SHAPE_SETTINGS = {\n  DEFAULT: {\n    fillOpacity: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"OPACITY\"].DEFAULT,\n    fillColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"].DEFAULT,\n    strokeColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"].STROKE,\n    strokeWeight: 3,\n    editable: true,\n    draggable: true,\n    clickable: true,\n    visible: true\n  },\n  EDIT: {\n    fillOpacity: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"OPACITY\"].EDIT,\n    fillColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"].EDIT,\n    strokeColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"].EDIT\n  },\n  HIGHLIGHT: {\n    fillOpacity: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"OPACITY\"].HIGHLIGHT,\n    fillColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"].HIGHLIGHT,\n    strokeColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__[\"COLORS\"].HIGHLIGHT\n  }\n};\nconst SHAPES_CONTROLS = {\n  HIGHLIGHT: \"highlight\",\n  EDIT: \"edit\",\n  DELETE: \"delete\",\n  CONFIRM_DELETE: \"confirm-delete\",\n  EDIT_NAME: \"edit-name\"\n};\n\n//# sourceURL=webpack:///./app/js/constants/map.constants.js?");

/***/ }),

/***/ "./app/js/helpers/index.js":
/*!*********************************!*\
  !*** ./app/js/helpers/index.js ***!
  \*********************************/
/*! exports provided: highlightShape, editShape, clearEdits, drawShapeRow, displayAddressOnMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.helpers */ \"./app/js/helpers/map.helpers.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"highlightShape\", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__[\"highlightShape\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"editShape\", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__[\"editShape\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"clearEdits\", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__[\"clearEdits\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"drawShapeRow\", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__[\"drawShapeRow\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"displayAddressOnMap\", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__[\"displayAddressOnMap\"]; });\n\n\n\n//# sourceURL=webpack:///./app/js/helpers/index.js?");

/***/ }),

/***/ "./app/js/helpers/map.helpers.js":
/*!***************************************!*\
  !*** ./app/js/helpers/map.helpers.js ***!
  \***************************************/
/*! exports provided: highlightShape, editShape, clearEdits, drawShapeRow, displayAddressOnMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"highlightShape\", function() { return highlightShape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"editShape\", function() { return editShape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clearEdits\", function() { return clearEdits; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawShapeRow\", function() { return drawShapeRow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"displayAddressOnMap\", function() { return displayAddressOnMap; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./app/js/constants/index.js\");\n\nconst highlightShape = shape => {\n  if (!shape) {\n    return;\n  }\n\n  shape.setOptions(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPE_SETTINGS\"].HIGHLIGHT);\n  setTimeout(() => {\n    shape.setOptions(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPE_SETTINGS\"].DEFAULT);\n  }, 500);\n};\nconst editShape = function (shape) {\n  let edit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n  let drawingManager = arguments.length > 2 ? arguments[2] : undefined;\n  let selectedShape = arguments.length > 3 ? arguments[3] : undefined;\n\n  if (!shape || shape === selectedShape) {\n    return;\n  }\n\n  if (edit) {\n    drawingManager && drawingManager.setDrawingMode(null);\n    shape.setOptions(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPE_SETTINGS\"].EDIT);\n    selectedShape = shape;\n  } else {\n    shape.setOptions(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPE_SETTINGS\"].DEFAULT);\n    selectedShape = null;\n  }\n};\nconst clearEdits = mapShapes => {\n  if (!mapShapes) {\n    return;\n  }\n\n  mapShapes.forEach(shape => {\n    editShape(shape, false);\n  });\n  document.querySelectorAll(\"[data-action=\\\"\".concat(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPES_CONTROLS\"].CONFIRM_DELETE, \"\\\"]\")).forEach(confirmDeleteButton => {\n    confirmDeleteButton.classList.remove(\"d-block\");\n    confirmDeleteButton.classList.add(\"d-none\");\n  });\n  document.querySelectorAll(\"[data-action=\\\"\".concat(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPES_CONTROLS\"].DELETE, \"\\\"]\")).forEach(deleteButton => {\n    deleteButton.classList.remove(\"d-none\");\n    deleteButton.classList.add(\"d-block\");\n  });\n};\nconst drawShapeRow = (paddockName, shapeLength, index) => {\n  return \"\\n    <div class=\\\"created-fence\\\" data-action=\\\"\".concat(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPES_CONTROLS\"].HIGHLIGHT, \"\\\" data-shape=\\\"\").concat(index, \"\\\">\\n      <div class=\\\"created-fence__section\\\">\\n        <p class=\\\"created-fence__section-label\\\">Name</p>\\n        <input id=\\\"paddock-name-\").concat(index, \"\\\" value=\\\"\").concat(paddockName, \"\\\" type=\\\"test\\\" data-shape=\\\"\").concat(index, \"\\\" data-action=\\\"\").concat(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPES_CONTROLS\"].EDIT_NAME, \"\\\" data-shape=\\\"\").concat(index, \"\\\"  class=\\\"created-fence__name\\\"/>\\n      </div>\\n      <div class=\\\"created-fence__section\\\">\\n        <p class=\\\"created-fence__section-label\\\">Length</p>\\n        <p class=\\\"created-fence__length\\\">\").concat(shapeLength.toFixed(0), \"m </p>\\n      </div>\\n      <div class=\\\"created-fence__section created-fence__section--actions\\\">\\n        <button type=\\\"button\\\" data-action=\\\"\").concat(_constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPES_CONTROLS\"].DELETE, \"\\\" data-shape=\\\"\").concat(index, \"\\\" class=\\\"btn-control-icons btn-control-icons--delete d-block created-fence__delete\\\">\\n          <img class=\\\"created-fence__icon\\\" src=\\\"assets/tool-bin.svg\\\"/>\\n        </button>\\n      </div>\\n    </div>\\n  \");\n};\n\nconst findAddressDetail = function (address, detail) {\n  let shortVersion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n\n  if (!address) {\n    return;\n  }\n\n  return address.find(element => element.types.some(type => type === detail))[shortVersion ? \"short_name\" : \"long_name\"];\n};\n\nconst displayAddressOnMap = (place, map, addressMarker, addressLabel) => {\n  if (!place || !map) {\n    return;\n  } // If the place has a geometry, then present it on a map.\n\n\n  if (place.geometry.viewport) {\n    map.fitBounds(place.geometry.viewport);\n  } else {\n    map.setCenter(place.geometry.location);\n    map.setZoom(16);\n  } // display the marker on map\n\n\n  if (addressMarker) {\n    addressMarker.setPosition(place.geometry.location);\n    addressMarker.setVisible(true);\n  } // show the address on map controllers\n\n\n  const address = place.address_components;\n\n  if (addressLabel) {\n    addressLabel.innerHTML = \"\\n    <span class=\\\"address-line-1\\\">\".concat(findAddressDetail(address, \"locality\"), \", \").concat(findAddressDetail(address, \"administrative_area_level_2\"), \"</span>\\n    <span class=\\\"address-line-2\\\">\").concat(findAddressDetail(address, \"postal_code\"), \" \").concat(findAddressDetail(address, \"administrative_area_level_1\"), \"  \").concat(findAddressDetail(address, \"country\", true), \"</span>\");\n    place.adr_address.replace(/\\,/g, \"\");\n    console.info(place);\n  }\n};\n\n//# sourceURL=webpack:///./app/js/helpers/map.helpers.js?");

/***/ }),

/***/ "./app/js/modules/loadedMap.module.js":
/*!********************************************!*\
  !*** ./app/js/modules/loadedMap.module.js ***!
  \********************************************/
/*! exports provided: setMapReadyForPlotting, createMap, setup, google */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setMapReadyForPlotting\", function() { return setMapReadyForPlotting; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createMap\", function() { return createMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setup\", function() { return setup; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"google\", function() { return google; });\n/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html2canvas */ \"./node_modules/html2canvas/dist/html2canvas.js\");\n/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var interactjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! interactjs */ \"./node_modules/interactjs/dist/interact.min.js\");\n/* harmony import */ var interactjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(interactjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jspdf */ \"./node_modules/jspdf/dist/jspdf.es.min.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants */ \"./app/js/constants/index.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers */ \"./app/js/helpers/index.js\");\n\n\n\n\n // const sgMail = require(\"@sendgrid/mail\");\n// Elements\n\nlet google,\n    map,\n    drawingManager,\n    mapElements = [],\n    mapLengths = [],\n    selectedShape = null,\n    mapContainer,\n    addressSearchContainer,\n    addressContainer,\n    addressResultsContainer,\n    addressMapPlace,\n    plottingResultsContainer,\n    plottingTooltip,\n    plottingShapes,\n    searchField,\n    newSearchBtn,\n    savePaddockBtn,\n    setPlottingBtn,\n    deletePlottingBtn,\n    resetBtn,\n    printBtn,\n    downloadBtn,\n    mapTools,\n    dragMapTool,\n    lineMapTool,\n    shapeMapTool,\n    zoomInTool,\n    zoomOutTool,\n    currentAddressLabel,\n    plottingPerimiterLabel,\n    plottingPerimiterTrigger,\n    hasConfirmedTotal = false,\n    shapeMenuContainer,\n    sidebar; // tools\n\nlet mapStorage = \"fence-estimator\",\n    mapStorageData = {},\n    mapSet = false; // Values\n\nlet addressMarker,\n    mapCanvasAction,\n    plotPerimiter = 0; // UI\n\nconst calculatePlot = function () {\n  let storePlot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n  let totalPerimeter = 0; // re-draw table and recalculate\n  // go through each shape/line and:\n  // 1. add length to total\n  // 2. create row (button handlers have been assigned to table wrapper)\n  // 3. display total\n  // 4. update caching\n\n  plottingShapes.innerHTML = \"\";\n  mapElements.forEach((shape, index) => {\n    const shapeLength = google.maps.geometry.spherical.computeLength(shape.getPath().getArray()); // 1.\n\n    totalPerimeter += shapeLength; // 2.\n\n    plottingShapes.innerHTML += _helpers__WEBPACK_IMPORTED_MODULE_4__[\"drawShapeRow\"](shape.paddockName, shapeLength, index);\n  }); // 3.\n\n  plotPerimiter = totalPerimeter.toFixed(0);\n  plottingPerimiterLabel.innerHTML = \"\".concat(plotPerimiter || 0, \"m\"); // 4.\n\n  storePlot && storePaddocks(); // update available action buttons\n\n  deletePlottingBtn.setAttribute(\"aria-hidden\", !mapElements.length);\n  plottingTooltip.setAttribute(\"aria-hidden\", !!mapElements.length);\n\n  if (!mapElements.length) {\n    printBtn.setAttribute(\"disabled\", true);\n    downloadBtn.setAttribute(\"disabled\", true);\n    setPlottingBtn.setAttribute(\"disabled\", true);\n  } else {\n    printBtn.removeAttribute(\"disabled\");\n    downloadBtn.removeAttribute(\"disabled\");\n    setPlottingBtn.removeAttribute(\"disabled\");\n  }\n\n  if (hasConfirmedTotal) {\n    // if the user wants to use the list of shapes/lines created, use it.\n    handleUsePlotting();\n  }\n};\n\nconst clearPlotShape = idx => {\n  if (mapElements.length && mapElements[idx]) {\n    mapElements[idx].setMap(null);\n    mapLengths[idx].setMap(null);\n    google.maps.event.clearInstanceListeners(mapElements[idx]);\n    mapElements.splice(idx, 1);\n  }\n\n  calculatePlot();\n\n  if (!mapElements.length) {\n    resetMapTools();\n  }\n}; // remove all shapes from the map\n\n\nconst resetFencesTable = () => {\n  // go through all shapes and remove them from the map before clearing the array\n  if (mapElements.length) {\n    mapElements.forEach(shape => {\n      shape.setMap(null);\n    });\n    mapLengths.forEach(length => {\n      length.setMap(null);\n    });\n    mapElements = [];\n    mapLengths = [];\n  }\n\n  plotPerimiter = 0;\n  plottingShapes.innerHTML = \"\";\n  plottingPerimiterLabel.innerHTML = \"\";\n  deletePlottingBtn.setAttribute(\"aria-hidden\", !mapElements.length); // update cache\n\n  removeFenceEstimatorData();\n};\n\nconst resetMapTools = () => {\n  drawingManager.setDrawingMode(null);\n}; // this is for when the estimator has an address and\n// the user can start adding fences\n\n\nconst setMapReadyForPlotting = isReady => {\n  const mapIsReady = isReady !== undefined ? !!isReady : !!addressMapPlace;\n\n  if (!addressMapPlace) {\n    return;\n  } // show/hide address and address search field\n\n\n  addressSearchContainer.setAttribute(\"aria-hidden\", !!mapIsReady);\n  addressContainer.setAttribute(\"aria-hidden\", !mapIsReady);\n  addressResultsContainer.setAttribute(\"aria-hidden\", !mapIsReady); // show/hide search tooltip\n\n  plottingTooltip.setAttribute(\"aria-hidden\", !!mapIsReady ? true : false); // show/hide reset button\n\n  newSearchBtn.classList.remove(!!mapIsReady ? \"d-none\" : \"d-block\");\n  newSearchBtn.classList.add(!!mapIsReady ? \"d-block\" : \"d-none\"); // set the map to drawing state\n\n  drawingManager.setDrawingMode(null);\n};\n\nconst resetEstimator = () => {\n  resetFencesTable();\n  resetMapTools();\n  removePaddockMenu();\n  addressMarker.setVisible(false);\n  map.setZoom(_constants__WEBPACK_IMPORTED_MODULE_3__[\"DEFAULT_ZOOM\"]);\n  map.setCenter({\n    lat: _constants__WEBPACK_IMPORTED_MODULE_3__[\"DEFAULT_COORDINATES\"].lat,\n    lng: _constants__WEBPACK_IMPORTED_MODULE_3__[\"DEFAULT_COORDINATES\"].lng\n  });\n  currentAddressLabel.innerHTML = \"\";\n  searchField.value = \"\";\n  calculatePlot(false);\n  setMapReadyForPlotting(false);\n}; // events\n\n\nconst handleResetSearch = e => {\n  e.preventDefault();\n  resetEstimator();\n};\n\nconst handleDragTool = e => {\n  e.preventDefault();\n  dragMapTool.classList.add(\"map-tool--active\");\n  lineMapTool.classList.remove(\"map-tool--active\");\n  shapeMapTool.classList.remove(\"map-tool--active\");\n  drawingManager.setDrawingMode(null);\n  _helpers__WEBPACK_IMPORTED_MODULE_4__[\"clearEdits\"](mapElements);\n  removePaddockMenu();\n};\n\nconst handleLineTool = e => {\n  e.preventDefault();\n  lineMapTool.classList.add(\"map-tool--active\");\n  dragMapTool.classList.remove(\"map-tool--active\");\n  shapeMapTool.classList.remove(\"map-tool--active\");\n  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);\n  _helpers__WEBPACK_IMPORTED_MODULE_4__[\"clearEdits\"](mapElements);\n  removePaddockMenu();\n};\n\nconst handleShapeTool = e => {\n  e.preventDefault();\n  shapeMapTool.classList.add(\"map-tool--active\");\n  dragMapTool.classList.remove(\"map-tool--active\");\n  lineMapTool.classList.remove(\"map-tool--active\");\n  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);\n  _helpers__WEBPACK_IMPORTED_MODULE_4__[\"clearEdits\"](mapElements);\n  removePaddockMenu();\n};\n\nconst handleZoomInTool = e => {\n  e.preventDefault();\n  map.setZoom(map.getZoom() + 1);\n  _helpers__WEBPACK_IMPORTED_MODULE_4__[\"clearEdits\"](mapElements);\n  removePaddockMenu();\n};\n\nconst handleZoomOutTool = e => {\n  e.preventDefault();\n  map.setZoom(map.getZoom() - 1);\n  _helpers__WEBPACK_IMPORTED_MODULE_4__[\"clearEdits\"](mapElements);\n  removePaddockMenu();\n};\n\nconst handleShapesTable = e => {\n  const element = e.target.tagName.toLowerCase() === \"button\" || e.target.tagName.toLowerCase() === \"input\" ? e.target : e.target.parentElement;\n\n  if (element.dataset.shape === undefined || !element.dataset.action) {\n    return;\n  }\n\n  const shapeIndex = parseInt(element.dataset.shape);\n  const shape = mapElements[shapeIndex];\n\n  if (!shape) {\n    return;\n  }\n\n  removePaddockMenu();\n\n  switch (element.dataset.action) {\n    case _constants__WEBPACK_IMPORTED_MODULE_3__[\"SHAPES_CONTROLS\"].HIGHLIGHT:\n      _helpers__WEBPACK_IMPORTED_MODULE_4__[\"highlightShape\"](shape);\n      break;\n\n    case _constants__WEBPACK_IMPORTED_MODULE_3__[\"SHAPES_CONTROLS\"].EDIT:\n    case _constants__WEBPACK_IMPORTED_MODULE_3__[\"SHAPES_CONTROLS\"].EDIT_NAME:\n      _helpers__WEBPACK_IMPORTED_MODULE_4__[\"clearEdits\"](mapElements);\n      _helpers__WEBPACK_IMPORTED_MODULE_4__[\"editShape\"](shape, true, drawingManager, selectedShape);\n      savePaddockBtn.setAttribute(\"aria-hidden\", true);\n      break;\n\n    case _constants__WEBPACK_IMPORTED_MODULE_3__[\"SHAPES_CONTROLS\"].DELETE:\n      _helpers__WEBPACK_IMPORTED_MODULE_4__[\"clearEdits\"](mapElements);\n      _helpers__WEBPACK_IMPORTED_MODULE_4__[\"editShape\"](shape, true, drawingManager, selectedShape);\n      savePaddockBtn.setAttribute(\"aria-hidden\", true);\n      clearPlotShape(shapeIndex);\n      drawingManager.setDrawingMode(null);\n      break;\n  }\n};\n\nconst handleEditPaddockName = e => {\n  const element = e.target.tagName.toLowerCase() === \"input\" ? e.target : e.target.parentElement;\n\n  if (element.dataset.shape === undefined || !element.dataset.action) {\n    return;\n  }\n\n  const shapeIndex = parseInt(element.dataset.shape);\n  const shape = mapElements[shapeIndex];\n\n  if (!shape) {\n    return;\n  }\n\n  shape.paddockName = element.value; // update local storage\n\n  storePaddocks();\n};\n\nconst handleAddPlotting = e => {\n  e.preventDefault();\n  drawingManager.setDrawingMode(null);\n  _helpers__WEBPACK_IMPORTED_MODULE_4__[\"clearEdits\"](mapElements);\n  savePaddockBtn.setAttribute(\"aria-hidden\", false);\n};\n\nconst handleUsePlotting = e => {\n  e && e.preventDefault();\n  hasConfirmedTotal = true;\n  plottingPerimiterTrigger = new CustomEvent(\"fence-estimator-results\", {\n    detail: {\n      perimiter: plotPerimiter\n    }\n  });\n  window.dispatchEvent(plottingPerimiterTrigger);\n  plottingPerimiterTrigger = null;\n\n  if (typeof elementorProFrontend !== \"undefined\") {\n    elementorProFrontend.modules.popup.closePopup({}, e);\n  }\n};\n\nconst handleDeleteAllPlotting = e => {\n  e.preventDefault();\n  resetFencesTable();\n  resetMapTools();\n}; // paddocks\n\n\nconst removePaddockMenu = () => {\n  map.setOptions({\n    draggable: true\n  });\n  shapeMenuContainer.setAttribute(\"aria-hidden\", true);\n  shapeMenuContainer.innerHTML = \"\";\n};\n\nconst bindPaddockShapeEvents = paddock => {\n  // when the shape is left\n  // (re)calculate the measurements\n  google.maps.event.addListener(paddock, \"mouseup\", () => {\n    calculatePlot();\n  }); // when hovering over the shape\n\n  google.maps.event.addListener(paddock, \"mouseover\", () => {\n    if (drawingManager.getDrawingMode() === google.maps.drawing.OverlayType.POLYLINE || drawingManager.getDrawingMode() === google.maps.drawing.OverlayType.POLYGON) {\n      _helpers__WEBPACK_IMPORTED_MODULE_4__[\"clearEdits\"](mapElements);\n      _helpers__WEBPACK_IMPORTED_MODULE_4__[\"editShape\"](paddock, true, drawingManager, selectedShape);\n      savePaddockBtn.setAttribute(\"aria-hidden\", true);\n    }\n  }); // when clicking on a shape\n\n  google.maps.event.addListener(paddock, \"click\", () => {\n    if (drawingManager.getDrawingMode() === null) {\n      _helpers__WEBPACK_IMPORTED_MODULE_4__[\"clearEdits\"](mapElements);\n      _helpers__WEBPACK_IMPORTED_MODULE_4__[\"editShape\"](paddock, true, drawingManager, selectedShape);\n      savePaddockBtn.setAttribute(\"aria-hidden\", true);\n      removePaddockMenu();\n    }\n  }); // this listener is for right click events\n  // documentation says rightclick has been deprecated\n  // (https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=en#Polyline.rightclick)\n  // NOTE - no sure if other events may call this\n\n  paddock.addListener(\"contextmenu\", event => {\n    const rightClick = new CustomEvent(\"fence-estimator-shape-menu\", {\n      detail: {\n        paddock: {\n          name: paddock.paddockName,\n          index: paddock.paddockIdx,\n          coordinates: event.latLng\n        },\n        top: event.domEvent.clientY,\n        left: event.domEvent.clientX\n      }\n    });\n    window.dispatchEvent(rightClick);\n  });\n};\n\nconst createPaddockMapShape = (paddockIdx, paddockName, type, pathCoordinates) => {\n  /**\n   * Custom overlay for shape menu\n   */\n  class PaddockLengthLabelOverlay extends google.maps.OverlayView {\n    constructor(coordinates, length) {\n      super();\n      this.length = void 0;\n      this.coordinates = void 0;\n      this.p = void 0;\n      this.length = length;\n      this.coordinates = coordinates;\n    }\n    /**\n     * onAdd is called when the map's panes are ready and the overlay has been\n     * added to the map.\n     */\n\n\n    onAdd() {\n      this.p = document.createElement(\"p\"); // style contents\n\n      this.p.classList.add(\"paddock-length\");\n      this.p.innerHTML = \"\".concat(this.length.toFixed(), \"m\"); // Add the element to the \"overlayLayer\" pane.\n\n      const panes = this.getPanes();\n      panes.overlayLayer.appendChild(this.p);\n    }\n\n    draw() {\n      // We use the south-west and north-east\n      // coordinates of the overlay to peg it to the correct position and size.\n      // To do this, we need to retrieve the projection from the overlay.\n      const overlayProjection = this.getProjection(); // Retrieve the south-west and north-east coordinates of this overlay\n      // in LatLngs and convert them to pixel coordinates.\n      // We'll use these coordinates to resize the div.\n\n      const sw = overlayProjection.fromLatLngToDivPixel(this.coordinates);\n\n      if (this.p) {\n        this.p.style.left = sw.x + 10 + \"px\";\n        this.p.style.top = sw.y + 10 + \"px\";\n      }\n    }\n    /**\n     * The onRemove() method will be called automatically from the API if\n     * we ever set the overlay's map property to 'null'.\n     */\n\n\n    onRemove() {\n      if (this.p) {\n        this.p.parentNode.removeChild(this.p);\n        delete this.p;\n      }\n    }\n    /**\n     *  Set the visibility to 'hidden' or 'visible'.\n     */\n\n\n    hide() {\n      if (this.p) {\n        this.p.style.visibility = \"hidden\";\n      }\n    }\n\n    show() {\n      if (this.p) {\n        this.p.style.visibility = \"visible\";\n      }\n    }\n\n    toggle() {\n      if (this.p) {\n        if (this.p.style.visibility === \"hidden\") {\n          this.show();\n        } else {\n          this.hide();\n        }\n      }\n    }\n\n    toggleDOM(map) {\n      if (this.getMap()) {\n        this.setMap(null);\n      } else {\n        this.setMap(map);\n      }\n    }\n\n    updateLength(length) {\n      this.length = length;\n      this.p.innerHTML = \"\".concat(this.length.toFixed(), \"m\");\n    }\n\n  }\n\n  let currentShape;\n  let path = new google.maps.MVCArray();\n\n  if (Array.isArray(pathCoordinates)) {\n    pathCoordinates.forEach(segment => {\n      if (typeof segment.lat === \"function\") {\n        path.push(segment);\n      } else {\n        const segmentCoordinates = new google.maps.LatLng(segment.lat, segment.lng);\n        path.push(segmentCoordinates);\n      }\n    });\n  } else {\n    if (typeof pathCoordinates.lat === \"function\") {\n      path.push(pathCoordinates);\n    } else {\n      const segmentCoordinates = new google.maps.LatLng(pathCoordinates.lat, pathCoordinates.lng);\n      path.push(segmentCoordinates);\n    }\n  }\n\n  const shapeLength = google.maps.geometry.spherical.computeLength(path.getArray());\n  const lengthLabel = new PaddockLengthLabelOverlay({\n    lat: path.getArray()[0].lat(),\n    lng: path.getArray()[0].lng()\n  }, shapeLength);\n  google.maps.event.addListener(path, \"insert_at\", function (vertex) {\n    lengthLabel.updateLength(google.maps.geometry.spherical.computeLength(path.getArray()));\n  });\n  google.maps.event.addListener(path, \"set_at\", function (vertex) {\n    lengthLabel.updateLength(google.maps.geometry.spherical.computeLength(path.getArray()));\n  });\n  google.maps.event.addListener(path, \"mousedown\", function (vertex) {\n    lengthLabel.updateLength(google.maps.geometry.spherical.computeLength(path.getArray()));\n  });\n  const shapeDetails = { ..._constants__WEBPACK_IMPORTED_MODULE_3__[\"SHAPE_SETTINGS\"].DEFAULT,\n    paddockIdx,\n    paddockName,\n    type,\n    map,\n    path // path: pathCoordinates,\n\n  };\n\n  if (type === google.maps.drawing.OverlayType.POLYLINE) {\n    currentShape = new google.maps.Polyline(shapeDetails);\n  }\n\n  if (type === google.maps.drawing.OverlayType.POLYGON) {\n    currentShape = new google.maps.Polygon(shapeDetails);\n  } // set up paddock with listening events\n\n\n  bindPaddockShapeEvents(currentShape);\n  lengthLabel.setMap(map);\n  mapElements.push(currentShape);\n  mapLengths.push(lengthLabel);\n  plottingTooltip.setAttribute(\"aria-hidden\", true);\n}; // export\n\n\nconst exportMap = () => {\n  const width = mapContainer.clientWidth;\n  const height = mapContainer.clientHeight;\n  html2canvas__WEBPACK_IMPORTED_MODULE_0___default()(mapContainer, {\n    useCORS: true,\n    imageTimeout: 0,\n    width,\n    height\n  }).then(function (canvas) {\n    const img = canvas.toDataURL(\"image/jpeg,1.0\");\n    let totalPerimeter = 0;\n    let table = [];\n\n    if (mapCanvasAction === \"download\") {\n      let pdf = new jspdf__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n      pdf.setFontSize(12);\n      pdf.addImage(img, \"JPEG\", 15, 40, 180, 180);\n      pdf.addPage();\n      mapElements.forEach((shape, index) => {\n        const shapeLength = google.maps.geometry.spherical.computeLength(shape.getPath().getArray());\n        table.push({\n          name: \"\".concat(shape.paddockName),\n          length: \"\".concat(shapeLength.toFixed(0))\n        });\n        totalPerimeter += shapeLength.toFixed(0);\n      });\n      pdf.table(10, 10, table, [\"name\", \"length\"]);\n      pdf.text([\"\", \"Total: \".concat(totalPerimeter, \"m\")], 10, 10); // pdf.save(\"a4.pdf\");\n      // save pdf to file\n      // var file = new tmp.File();\n      //     file.writeFile(res.text, function (err) {\n      //       if (err) { return cb(err); }\n      //       result.local_path = file.path;\n      //       cb(null, result);\n      //     });\n\n      const pdfOutput = pdf.output(\"dataurlstring\"); // const emailFile = URL.createObjectURL(pdfOutput);\n\n      Email.send({\n        SecureToken: \"25a36738-9b98-4ff7-9bc4-4b10ceb89033\",\n        // Host: \"smtp.gmail.com\",\n        // Username: \"pczcanda@gmail.com\",\n        // Password: \"lerpoeviryhvozos\",\n        // \"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\",\n        To: \"paciencia@relashe.com\",\n        From: \"developer@relashe.com\",\n        Subject: \"Fence\",\n        Body: \"fence\",\n        Attachments: [{\n          name: \"smtpjs.png\",\n          data: pdfOutput\n        }]\n      }).then(message => console.info(message)); // sgMail.setApiKey(\n      //   \"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\"\n      // );\n      // const msg = {\n      //   to: \"paciencia@relashe.com\", // Change to your recipient\n      //   from: \"developer@relashe.com\", // Change to your verified sender\n      //   subject: \"Fence\",\n      //   text: \"and easy to do anywhere, even with Node.js\",\n      //   // html: '<strong>and easy to do anywhere, even with Node.js</strong>',\n      // };\n      // sgMail\n      //   .send(msg)\n      //   .then(() => {\n      //     console.log(\"Email sent\");\n      //   })\n      //   .catch((error) => {\n      //     console.error(error);\n      //   });\n    }\n\n    if (mapCanvasAction === \"print\") {\n      document.querySelectorAll(\".print\")[0].innerHTML = \"\\n        <img src=\\\"\".concat(img, \"\\\" style=\\\"width: \").concat(width, \"px; height: \").concat(height, \"px;\\\" />\\n        \");\n      setTimeout(() => {\n        window.print();\n      }, 0);\n    }\n\n    mapCanvasAction = undefined;\n  });\n}; // adjust map to prepare canvas image\n\n\nconst exportCanvas = action => {\n  mapCanvasAction = action;\n\n  if (addressMapPlace.geometry.viewport) {\n    map.fitBounds(addressMapPlace.geometry.viewport);\n  } else {\n    map.setCenter(addressMapPlace.geometry.location);\n  } // set zoom firt or export map if already at the correct zoom\n\n\n  if (map.getZoom() !== _constants__WEBPACK_IMPORTED_MODULE_3__[\"EXPORT_ZOOM\"]) {\n    map.setZoom(_constants__WEBPACK_IMPORTED_MODULE_3__[\"EXPORT_ZOOM\"]);\n  } else {\n    exportMap();\n  }\n};\n\nconst printMap = async e => {\n  e === null || e === void 0 ? void 0 : e.preventDefault();\n  exportCanvas(\"print\");\n};\n\nconst downloadMap = async e => {\n  e === null || e === void 0 ? void 0 : e.preventDefault();\n  exportCanvas(\"download\");\n}; // map\n\n\nconst createMap = () => {\n  map = new google.maps.Map(mapContainer, _constants__WEBPACK_IMPORTED_MODULE_3__[\"MAP_OPTIONS\"]);\n  google.maps.event.addListenerOnce(map, \"tilesloaded\", function () {\n    // get elements from cache\n    !mapSet && getFenceEstimatorData();\n  });\n  google.maps.event.addListener(map, \"zoom_changed\", function () {\n    !!mapCanvasAction && exportMap();\n  }); // Marker\n\n  addressMarker = new google.maps.Marker({\n    position: new google.maps.LatLng(_constants__WEBPACK_IMPORTED_MODULE_3__[\"DEFAULT_COORDINATES\"].lat, _constants__WEBPACK_IMPORTED_MODULE_3__[\"DEFAULT_COORDINATES\"].lng),\n    map: map,\n    animation: google.maps.Animation.DROP,\n    clickable: false,\n    visible: false\n  }); // Auto complete\n\n  const autocomplete = new google.maps.places.Autocomplete(searchField);\n  autocomplete.bindTo(\"bounds\", map);\n  autocomplete.setFields([\"address_components\", \"adr_address\", \"geometry\", \"icon\", \"name\"]);\n  autocomplete.addListener(\"place_changed\", function () {\n    addressMarker.setVisible(false);\n    addressMapPlace = autocomplete.getPlace();\n\n    if (!addressMapPlace.geometry) {\n      window.alert(\"No details available for input: '\" + addressMapPlace.name + \"'\");\n      return;\n    } // 1. add the place to the location storage\n\n\n    storeFenceEstimatorData({\n      place: addressMapPlace\n    }); // 2. display location\n\n    _helpers__WEBPACK_IMPORTED_MODULE_4__[\"displayAddressOnMap\"](addressMapPlace, map, addressMarker, currentAddressLabel); // 3. begin drawing fences\n\n    setMapReadyForPlotting();\n  }); // Drawing\n\n  drawingManager = new google.maps.drawing.DrawingManager({\n    map,\n    drawingMode: null,\n    drawingControl: false,\n    drawingControlOptions: {\n      drawingModes: [google.maps.drawing.OverlayType.POLYLINE, google.maps.drawing.OverlayType.POLYGON]\n    },\n    polylineOptions: { ..._constants__WEBPACK_IMPORTED_MODULE_3__[\"SHAPE_SETTINGS\"].DEFAULT\n    },\n    polygonOptions: { ..._constants__WEBPACK_IMPORTED_MODULE_3__[\"SHAPE_SETTINGS\"].DEFAULT\n    }\n  });\n  google.maps.event.addListener(drawingManager, \"polylinecomplete\", function (e) {\n    // create polyline and add it to array of elements\n    // to display totals in table as lines are added\n    const path = e.getPath().getArray();\n    createPaddockMapShape(mapElements.length, \"\".concat(mapElements.length + 1, \"--Boundary Fence\"), google.maps.drawing.OverlayType.POLYLINE, path);\n    drawingManager.setDrawingMode(null);\n    e.setMap(null);\n    calculatePlot();\n  });\n  google.maps.event.addListener(drawingManager, \"polygoncomplete\", function (e) {\n    // create polygon and add it to array of elements\n    // to display totals in table as lines are added\n    const path = e.getPath().getArray();\n    createPaddockMapShape(mapElements.length, \"\".concat(mapElements.length + 1, \"--Paddock Fence\"), google.maps.drawing.OverlayType.POLYGON, path);\n    drawingManager.setDrawingMode(null);\n    e.setMap(null);\n    calculatePlot();\n  });\n  google.maps.event.addListener(map, \"click\", function (e) {\n    removePaddockMenu();\n  });\n}; // caching\n\nconst storePaddocks = () => {\n  let fences = [];\n  mapElements.forEach(element => {\n    const shape = {\n      paths: element.getPath().getArray(),\n      paddockIdx: element.paddockIdx,\n      paddockName: element.paddockName,\n      type: element.type\n    };\n    fences.push(shape);\n  });\n  storeFenceEstimatorData({\n    fences\n  });\n};\n\nconst getFenceEstimatorData = () => {\n  mapStorageData = JSON.parse(localStorage.getItem(mapStorage));\n\n  if (mapStorageData) {\n    var _mapStorageData$fence;\n\n    addressMapPlace = mapStorageData.place; // 1. display stored address\n\n    _helpers__WEBPACK_IMPORTED_MODULE_4__[\"displayAddressOnMap\"](addressMapPlace, map, addressMarker, currentAddressLabel); // 2. create fences on map\n\n    (_mapStorageData$fence = mapStorageData.fences) === null || _mapStorageData$fence === void 0 ? void 0 : _mapStorageData$fence.forEach(shape => {\n      const {\n        type,\n        paddockIdx,\n        paddockName,\n        paths\n      } = shape; // setup paddock and add it to map\n\n      createPaddockMapShape(paddockIdx, paddockName, type, paths);\n    }); // 3. set map ready to draw more fences\n\n    setMapReadyForPlotting();\n  } // update table and total based on current data\n\n\n  calculatePlot(false);\n  mapSet = true;\n};\n\nconst storeFenceEstimatorData = data => {\n  if (data) {\n    mapStorageData = { ...mapStorageData,\n      ...data\n    };\n  }\n\n  localStorage.setItem(\"\".concat(mapStorage), JSON.stringify(mapStorageData));\n};\n\nconst removeFenceEstimatorData = () => {\n  localStorage.removeItem(mapStorage);\n}; // SETUP\n\n\nconst setup = googleAPI => {\n  mapContainer = document.getElementById(\"fence-estimator-map\");\n  google = googleAPI;\n  addressSearchContainer = document.querySelectorAll(\".map-search-controller__searcher\")[0];\n  addressContainer = document.querySelectorAll(\".map-search-results__step-1\")[0];\n  addressResultsContainer = document.querySelectorAll(\".map-search-results-controller\")[0];\n  plottingResultsContainer = document.querySelectorAll(\".map-plotting-results-controller\")[0];\n  plottingTooltip = document.querySelectorAll(\".map-search-results__shapes-tip\")[0];\n  plottingShapes = document.querySelectorAll(\".map-search-results__shapes-table\")[0];\n  searchField = document.querySelectorAll(\".search-address__field\")[0];\n  newSearchBtn = document.querySelectorAll(\".search-address__new-search-button\")[0];\n  currentAddressLabel = document.querySelectorAll(\".map-search-results__address\")[0];\n  savePaddockBtn = document.querySelectorAll(\".plotting__save-paddock-button\")[0];\n  setPlottingBtn = document.querySelectorAll(\".plotting__accept-button\")[0];\n  deletePlottingBtn = document.querySelectorAll(\".plotting__delete-button\")[0];\n  plottingPerimiterLabel = document.querySelectorAll(\".map-plotting-results__perimiter\")[0];\n  resetBtn = document.querySelectorAll(\".reset-button\");\n  printBtn = document.querySelectorAll(\".plotting__print-button\")[0];\n  downloadBtn = document.querySelectorAll(\".plotting__download-button\")[0];\n  dragMapTool = document.querySelectorAll(\".map-tool-drag\")[0];\n  lineMapTool = document.querySelectorAll(\".map-tool-line\")[0];\n  shapeMapTool = document.querySelectorAll(\".map-tool-shape\")[0];\n  zoomInTool = document.querySelectorAll(\".map-tool-zoomin\")[0];\n  zoomOutTool = document.querySelectorAll(\".map-tool-zoomout\")[0];\n\n  const ignoreKeyPress = e => {\n    if (e.keyCode === 13) {\n      e.preventDefault();\n    }\n  };\n\n  searchField.addEventListener(\"keypress\", ignoreKeyPress);\n  plottingShapes.addEventListener(\"click\", handleShapesTable); // plottingShapes.addEventListener(\"focus\", handleEditSelectPaddockName);\n\n  plottingShapes.addEventListener(\"input\", handleEditPaddockName);\n  newSearchBtn.addEventListener(\"click\", handleResetSearch);\n  savePaddockBtn.addEventListener(\"click\", handleAddPlotting);\n  setPlottingBtn.addEventListener(\"click\", handleUsePlotting);\n  deletePlottingBtn.addEventListener(\"click\", handleDeleteAllPlotting);\n  resetBtn.forEach(button => {\n    button.addEventListener(\"click\", handleResetSearch);\n  });\n  dragMapTool.addEventListener(\"click\", handleDragTool);\n  lineMapTool.addEventListener(\"click\", handleLineTool);\n  shapeMapTool.addEventListener(\"click\", handleShapeTool);\n  zoomInTool.addEventListener(\"click\", handleZoomInTool);\n  zoomOutTool.addEventListener(\"click\", handleZoomOutTool); // UI\n\n  mapTools = document.querySelectorAll(\".map-search-tools-controller\")[0];\n  let x = 0;\n  let y = 0;\n  interactjs__WEBPACK_IMPORTED_MODULE_1___default()(mapTools).draggable({\n    modifiers: [interactjs__WEBPACK_IMPORTED_MODULE_1___default.a.modifiers.snap({\n      targets: [interactjs__WEBPACK_IMPORTED_MODULE_1___default.a.snappers.grid({\n        x: 30,\n        y: 30\n      })],\n      range: Infinity,\n      relativePoints: [{\n        x: 0,\n        y: 0\n      }]\n    }), interactjs__WEBPACK_IMPORTED_MODULE_1___default.a.modifiers.restrict({\n      restriction: mapTools.parentNode,\n      elementRect: {\n        top: 0,\n        left: 0,\n        bottom: 1,\n        right: 1\n      },\n      endOnly: true\n    })],\n    inertia: true\n  }).on(\"dragmove\", function (event) {\n    x += event.dx;\n    y += event.dy;\n    event.target.style.transform = \"translate(\" + x + \"px, \" + y + \"px)\";\n  });\n  sidebar = document.querySelectorAll(\".map-search-sidebar\")[0];\n  let sidebarX = 0;\n  let sidebarY = 0;\n  interactjs__WEBPACK_IMPORTED_MODULE_1___default()(sidebar).draggable({\n    modifiers: [interactjs__WEBPACK_IMPORTED_MODULE_1___default.a.modifiers.snap({\n      targets: [interactjs__WEBPACK_IMPORTED_MODULE_1___default.a.snappers.grid({\n        x: 30,\n        y: 30\n      })],\n      range: Infinity,\n      relativePoints: [{\n        x: 0,\n        y: 0\n      }]\n    }), interactjs__WEBPACK_IMPORTED_MODULE_1___default.a.modifiers.restrict({\n      restriction: mapTools.parentNode,\n      elementRect: {\n        top: 0,\n        left: 0,\n        bottom: 1,\n        right: 1\n      },\n      endOnly: true\n    })],\n    inertia: true\n  }).on(\"dragmove\", function (event) {\n    sidebarX += event.dx;\n    sidebarY += event.dy;\n    event.target.style.transform = \"translate(\" + sidebarX + \"px, \" + sidebarY + \"px)\";\n  }).on(\"click\", removePaddockMenu);\n  shapeMenuContainer = document.querySelectorAll(\".paddock-menu-container\")[0];\n  shapeMenuContainer.addEventListener(\"click\", handleShapesTable);\n  window.addEventListener(\"fence-estimator-shape-menu\", function (e) {\n    if (!e.detail.paddock) {\n      return false;\n    }\n\n    const paddock = e.detail.paddock;\n    const div = document.createElement(\"div\"); // style contents\n\n    div.classList.add(\"paddock-menu\");\n    div.style.top = e.detail.top;\n    div.style.left = e.detail.left;\n    div.innerHTML = \"\\n        <p class=\\\"paddock-menu__title\\\">\".concat(paddock.name, \"</p>\\n        <button type=\\\"button\\\" data-action=\\\"\").concat(_constants__WEBPACK_IMPORTED_MODULE_3__[\"SHAPES_CONTROLS\"].DELETE, \"\\\" data-shape=\\\"\").concat(paddock.index, \"\\\" class=\\\"paddock-menu__button paddock-menu__button--delete\\\">\\n          Delete fence\\n        </button>\\n      \");\n    shapeMenuContainer.appendChild(div);\n    shapeMenuContainer.setAttribute(\"aria-hidden\", false);\n    map.setOptions({\n      draggable: false\n    });\n  }); // PRINT\n\n  printBtn.addEventListener(\"click\", printMap);\n  downloadBtn.addEventListener(\"click\", downloadMap);\n};\n\n\n//# sourceURL=webpack:///./app/js/modules/loadedMap.module.js?");

/***/ }),

/***/ "./app/js/modules/starter.module.js":
/*!******************************************!*\
  !*** ./app/js/modules/starter.module.js ***!
  \******************************************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var google_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! google-maps */ \"./node_modules/google-maps/lib/esm/index.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./app/js/constants/index.js\");\n/* harmony import */ var _loadedMap_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loadedMap.module */ \"./app/js/modules/loadedMap.module.js\");\n\n\n\nconst mapLoader = new google_maps__WEBPACK_IMPORTED_MODULE_0__[\"Loader\"](_constants__WEBPACK_IMPORTED_MODULE_1__[\"MAP_SETTINGS\"].key, _constants__WEBPACK_IMPORTED_MODULE_1__[\"MAP_SETTINGS\"].options);\nlet google;\n\nconst start = () => {\n  Object(_loadedMap_module__WEBPACK_IMPORTED_MODULE_2__[\"setup\"])(google);\n  Object(_loadedMap_module__WEBPACK_IMPORTED_MODULE_2__[\"createMap\"])();\n};\n\nconst init = () => {\n  if (!document.getElementById(\"fence-estimator-map\")) {\n    return false;\n  }\n\n  if (!google) {\n    mapLoader.load().then(googleAPI => {\n      google = googleAPI;\n      start(google);\n    });\n  } else {\n    start(google);\n  }\n};\n\n//# sourceURL=webpack:///./app/js/modules/starter.module.js?");

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