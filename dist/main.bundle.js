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
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_app_build_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/app.build.js */ "./app/js/app.build.js");
// IMPORTS
// import "./styles/styles.scss";
// JS


/***/ }),

/***/ "./app/js/app.build.js":
/*!*****************************!*\
  !*** ./app/js/app.build.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_starter_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/starter.module */ "./app/js/modules/starter.module.js");


const mapStarter = function () {
  let timing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
  setTimeout(() => {
    Object(_modules_starter_module__WEBPACK_IMPORTED_MODULE_0__["init"])();
  }, timing);
};

var fenceEstimatorTrigger = document.getElementById("fence-estimator-trigger");
fenceEstimatorTrigger && fenceEstimatorTrigger.addEventListener("click", () => {
  mapStarter();
});
document.addEventListener("DOMContentLoaded", () => {
  mapStarter(1200);
});

/***/ }),

/***/ "./app/js/constants/colors.constants.js":
/*!**********************************************!*\
  !*** ./app/js/constants/colors.constants.js ***!
  \**********************************************/
/*! exports provided: COLORS, OPACITY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLORS", function() { return COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPACITY", function() { return OPACITY; });
const COLORS = {
  DEFAULT: "#c99700",
  STROKE: "#c99700",
  EDIT: "#ff0000",
  HIGHLIGHT: "#c99700"
};
const OPACITY = {
  DEFAULT: 0.25,
  EDIT: 0.8,
  HIGHLIGHT: 0.8
};

/***/ }),

/***/ "./app/js/constants/icons.constants.js":
/*!*********************************************!*\
  !*** ./app/js/constants/icons.constants.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// export { default as IconDelete } from "../../../public/assets/tool-bin.svg";
// export { default as IconBoundaryFence } from "../../../public/assets/tool-boundary-fence.svg";
// export { default as IconClosedPaddock } from "../../../public/assets/tool-closed-paddock-fence.svg";
// export { default as IconDrag } from "../../../public/assets/tool-move.svg";
// export { default as IconPrint } from "../../../public/assets/tool-print.svg";
// export { default as IconZoomIn } from "../../../public/assets/tool-zoom-in.svg";
// export { default as IconZoomOut } from "../../../public/assets/tool-zoom-out.svg";

/***/ }),

/***/ "./app/js/constants/index.js":
/*!***********************************!*\
  !*** ./app/js/constants/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors.constants */ "./app/js/constants/colors.constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "COLORS", function() { return _colors_constants__WEBPACK_IMPORTED_MODULE_0__["COLORS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OPACITY", function() { return _colors_constants__WEBPACK_IMPORTED_MODULE_0__["OPACITY"]; });

/* harmony import */ var _map_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.constants */ "./app/js/constants/map.constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MAP_SETTINGS", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__["MAP_SETTINGS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_COORDINATES", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_COORDINATES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_ZOOM", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_ZOOM"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EXPORT_ZOOM", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__["EXPORT_ZOOM"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MAP_OPTIONS", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__["MAP_OPTIONS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SHAPE_SETTINGS", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__["SHAPE_SETTINGS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SHAPES_CONTROLS", function() { return _map_constants__WEBPACK_IMPORTED_MODULE_1__["SHAPES_CONTROLS"]; });

/* harmony import */ var _icons_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons.constants */ "./app/js/constants/icons.constants.js");
/* harmony import */ var _icons_constants__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_icons_constants__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _icons_constants__WEBPACK_IMPORTED_MODULE_2__) if(["default","COLORS","OPACITY","MAP_SETTINGS","DEFAULT_COORDINATES","DEFAULT_ZOOM","EXPORT_ZOOM","MAP_OPTIONS","SHAPE_SETTINGS","SHAPES_CONTROLS"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _icons_constants__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./app/js/constants/map.constants.js":
/*!*******************************************!*\
  !*** ./app/js/constants/map.constants.js ***!
  \*******************************************/
/*! exports provided: MAP_SETTINGS, DEFAULT_COORDINATES, DEFAULT_ZOOM, EXPORT_ZOOM, MAP_OPTIONS, SHAPE_SETTINGS, SHAPES_CONTROLS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAP_SETTINGS", function() { return MAP_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_COORDINATES", function() { return DEFAULT_COORDINATES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_ZOOM", function() { return DEFAULT_ZOOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPORT_ZOOM", function() { return EXPORT_ZOOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAP_OPTIONS", function() { return MAP_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHAPE_SETTINGS", function() { return SHAPE_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHAPES_CONTROLS", function() { return SHAPES_CONTROLS; });
/* harmony import */ var _colors_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors.constants */ "./app/js/constants/colors.constants.js");

const MAP_SETTINGS = {
  key: "AIzaSyDKn1YutebCypgyFrQSP6gtACQ_LbCsEGs",
  options: {
    libraries: ["drawing", "places", "geometry"],
    version: "3"
  }
};
const DEFAULT_COORDINATES = {
  lat: -37.8136276,
  lng: 144.9630576
};
const DEFAULT_ZOOM = 15;
const EXPORT_ZOOM = 16;
const MAP_OPTIONS = {
  center: DEFAULT_COORDINATES,
  zoom: DEFAULT_ZOOM,
  fullscreenControl: false,
  mapTypeControl: false,
  mapTypeId: "satellite",
  streetViewControl: false,
  tilt: 0,
  zoomControl: false
};
const SHAPE_SETTINGS = {
  DEFAULT: {
    fillOpacity: _colors_constants__WEBPACK_IMPORTED_MODULE_0__["OPACITY"].DEFAULT,
    fillColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__["COLORS"].DEFAULT,
    strokeColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__["COLORS"].STROKE,
    strokeWeight: 3,
    editable: true,
    draggable: true,
    clickable: true,
    visible: true
  },
  EDIT: {
    fillOpacity: _colors_constants__WEBPACK_IMPORTED_MODULE_0__["OPACITY"].EDIT,
    fillColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__["COLORS"].EDIT,
    strokeColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__["COLORS"].EDIT
  },
  HIGHLIGHT: {
    fillOpacity: _colors_constants__WEBPACK_IMPORTED_MODULE_0__["OPACITY"].HIGHLIGHT,
    fillColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__["COLORS"].HIGHLIGHT,
    strokeColor: _colors_constants__WEBPACK_IMPORTED_MODULE_0__["COLORS"].HIGHLIGHT
  }
};
const SHAPES_CONTROLS = {
  HIGHLIGHT: "highlight",
  EDIT: "edit",
  DELETE: "delete",
  CONFIRM_DELETE: "confirm-delete",
  EDIT_NAME: "edit-name"
};

/***/ }),

/***/ "./app/js/helpers/cache.helpers.js":
/*!*****************************************!*\
  !*** ./app/js/helpers/cache.helpers.js ***!
  \*****************************************/
/*! exports provided: storePaddocks, initMapStorageData, getMapStorageData, storeFenceEstimatorData, removeFenceEstimatorData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storePaddocks", function() { return storePaddocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initMapStorageData", function() { return initMapStorageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMapStorageData", function() { return getMapStorageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeFenceEstimatorData", function() { return storeFenceEstimatorData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFenceEstimatorData", function() { return removeFenceEstimatorData; });
let mapStorage = "fence-estimator",
    mapStorageData = {}; // store paddocks data into session storage

const storePaddocks = mapElements => {
  let fences = [];
  mapElements.forEach(element => {
    const shape = {
      paths: element.getPath().getArray(),
      paddockIdx: element.paddockIdx,
      paddockName: element.paddockName,
      type: element.type
    };
    fences.push(shape);
  });
  storeFenceEstimatorData({
    fences
  });
};
const initMapStorageData = () => {
  mapStorageData = JSON.parse(localStorage.getItem(mapStorage));
};
const getMapStorageData = () => {
  initMapStorageData();
  return mapStorageData;
};
const storeFenceEstimatorData = data => {
  if (data) {
    mapStorageData = { ...mapStorageData,
      ...data
    };
  }

  localStorage.setItem("".concat(mapStorage), JSON.stringify(mapStorageData));
};
const removeFenceEstimatorData = () => {
  localStorage.removeItem(mapStorage);
};

/***/ }),

/***/ "./app/js/helpers/export.helpers.js":
/*!******************************************!*\
  !*** ./app/js/helpers/export.helpers.js ***!
  \******************************************/
/*! exports provided: exportMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportMap", function() { return exportMap; });
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");
/* harmony import */ var _modules_mapElements_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/mapElements.module */ "./app/js/modules/mapElements.module.js");
/* harmony import */ var _modules_starter_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/starter.module */ "./app/js/modules/starter.module.js");
/* harmony import */ var browser_image_compression__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! browser-image-compression */ "./node_modules/browser-image-compression/dist/browser-image-compression.mjs");






const generateMapElements = mapElements => {
  let totalPerimeter = 0;
  let table = [];
  mapElements.forEach((shape, index) => {
    const shapeLength = _modules_starter_module__WEBPACK_IMPORTED_MODULE_3__["google"].maps.geometry.spherical.computeLength(shape.getPath().getArray());
    table.push({
      name: "".concat(shape.paddockName),
      length: "".concat(shapeLength.toFixed(0))
    });
    totalPerimeter += shapeLength.toFixed(0);
  });
  return {
    table,
    totalPerimeter
  };
};

const generateMapPdf = async (img, mapElements) => {
  const {
    table,
    totalPerimeter
  } = generateMapElements(mapElements);
  const compressedImageDataUrl = await browser_image_compression__WEBPACK_IMPORTED_MODULE_4__["default"].getDataUrlFromFile(img);
  let pdf = new jspdf__WEBPACK_IMPORTED_MODULE_1__["default"]();
  pdf.setFontSize(12);
  pdf.addImage(compressedImageDataUrl, "JPEG", 15, 40, 150, 150);
  pdf.addPage();
  pdf.table(10, 10, table, ["name", "length"]);
  pdf.text(["Total: ".concat(totalPerimeter, "m")], 10, 10 * (table.length + 1) + 20);
  return Promise.resolve(pdf);
};

const ftpPdfNotification = async pdfOutpoutBlob => {
  const data = new FormData();
  data.append("pdfBlob", pdfOutpoutBlob);
  const ftping = await fetch("https://relashe-fence-estimator.netlify.app/.netlify/functions/ftp-file", {
    method: "POST",
    mode: "no-cors",
    headers: {
      Accept: "*/*"
    },
    body: data
  });
  return Promise.resolve(ftping);
};

const emailPdfNotification = async pdfOutpoutBlob => {
  const data = new FormData();
  data.append("destination", _modules_mapElements_module__WEBPACK_IMPORTED_MODULE_2__["downloadFormEmail"].value);
  data.append("pdfBlob", pdfOutpoutBlob);
  const emailing = await fetch("https://relashe-fence-estimator.netlify.app/.netlify/functions/email-file", {
    method: "POST",
    mode: "no-cors",
    headers: {
      Accept: "*/*"
    },
    body: data
  });
  return Promise.resolve(emailing);
};

const printMap = (mapImage, width, height) => {
  document.querySelectorAll(".print")[0].innerHTML = "\n          <img src=\"".concat(mapImage, "\" style=\"width: ").concat(width, "px; height: ").concat(height, "px;\" />\n          ");
  setTimeout(() => {
    window.print();
  }, 0);
};

const downloadMap = async (mapImage, mapElements) => {
  // generate PDF
  // email customer details
  // ftp to client
  const pdf = await generateMapPdf(mapImage, mapElements);
  const pdfOutpoutBlob = pdf.output("blob");
  console.log(pdfOutpoutBlob);
  await emailPdfNotification(pdfOutpoutBlob);
  await ftpPdfNotification(pdfOutpoutBlob); // TODO - PDF name

  pdf.save("Fence Estimator - my fence.pdf"); // close and clear

  _modules_mapElements_module__WEBPACK_IMPORTED_MODULE_2__["closeDownloadBtn"].click();
  _modules_mapElements_module__WEBPACK_IMPORTED_MODULE_2__["downloadFormName"].value = "";
  _modules_mapElements_module__WEBPACK_IMPORTED_MODULE_2__["downloadFormEmail"].value = "";
};

const exportMap = async (mapContainer, mapCanvasAction, mapElements) => {
  const width = mapContainer.clientWidth;
  const height = mapContainer.clientHeight;
  const mapCanvas = await html2canvas__WEBPACK_IMPORTED_MODULE_0___default()(mapContainer, {
    useCORS: true,
    imageTimeout: 0,
    width,
    height
  });
  const mapImage = mapCanvas.toDataURL("image/jpeg,1.0");

  if (mapCanvasAction === "download") {
    const imageFile = await browser_image_compression__WEBPACK_IMPORTED_MODULE_4__["default"].getFilefromDataUrl(mapImage, "fence-map");
    const compressedMapImage = await Object(browser_image_compression__WEBPACK_IMPORTED_MODULE_4__["default"])(imageFile, {});
    downloadMap(compressedMapImage, mapElements);
  }

  if (mapCanvasAction === "print") {
    printMap(mapImage, width, height);
  }

  mapCanvasAction = undefined;
};

/***/ }),

/***/ "./app/js/helpers/form.helpers.js":
/*!****************************************!*\
  !*** ./app/js/helpers/form.helpers.js ***!
  \****************************************/
/*! exports provided: validateDownloadName, validateDownloadEmail, validateDownloadForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateDownloadName", function() { return validateDownloadName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateDownloadEmail", function() { return validateDownloadEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateDownloadForm", function() { return validateDownloadForm; });
/* harmony import */ var _modules_mapElements_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/mapElements.module */ "./app/js/modules/mapElements.module.js");


const validateEmailFormat = email => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validateDownloadName = () => {
  let isNameValid = true; // validate name

  if (_modules_mapElements_module__WEBPACK_IMPORTED_MODULE_0__["downloadFormName"].value === "") {
    isNameValid = false;
    _modules_mapElements_module__WEBPACK_IMPORTED_MODULE_0__["downloadFormNameError"].innerHTML = "Please add your name";
  } else {
    isNameValid = true;
    _modules_mapElements_module__WEBPACK_IMPORTED_MODULE_0__["downloadFormNameError"].innerHTML = "";
  }

  _modules_mapElements_module__WEBPACK_IMPORTED_MODULE_0__["downloadFormNameError"].setAttribute("aria-hidden", !isNameValid);
  return isNameValid;
};
const validateDownloadEmail = () => {
  let isEmailValid = true; // validate email

  if (_modules_mapElements_module__WEBPACK_IMPORTED_MODULE_0__["downloadFormEmail"].value === "") {
    isEmailValid = false;
    _modules_mapElements_module__WEBPACK_IMPORTED_MODULE_0__["downloadFormEmailError"].innerHTML = "Please insert your email";
  } else if (!validateEmailFormat(_modules_mapElements_module__WEBPACK_IMPORTED_MODULE_0__["downloadFormEmail"].value)) {
    isEmailValid = false;
    _modules_mapElements_module__WEBPACK_IMPORTED_MODULE_0__["downloadFormEmailError"].innerHTML = "Please insert an email address in the right format.";
  } else {
    isEmailValid = true;
    _modules_mapElements_module__WEBPACK_IMPORTED_MODULE_0__["downloadFormEmailError"].innerHTML = "";
  }

  return isEmailValid;
};
const validateDownloadForm = () => {
  const isNameValid = validateDownloadName();
  const isEmailValid = validateDownloadEmail();
  return Promise.resolve(isNameValid && isEmailValid);
};

/***/ }),

/***/ "./app/js/helpers/index.js":
/*!*********************************!*\
  !*** ./app/js/helpers/index.js ***!
  \*********************************/
/*! exports provided: highlightShape, editShape, clearEdits, drawShapeRow, displayAddressOnMap, storePaddocks, initMapStorageData, getMapStorageData, storeFenceEstimatorData, removeFenceEstimatorData, setDraggableMapTools, setClosableSidebar, exportMap, validateDownloadName, validateDownloadEmail, validateDownloadForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _map_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.helpers */ "./app/js/helpers/map.helpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "highlightShape", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__["highlightShape"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "editShape", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__["editShape"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearEdits", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__["clearEdits"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawShapeRow", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__["drawShapeRow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "displayAddressOnMap", function() { return _map_helpers__WEBPACK_IMPORTED_MODULE_0__["displayAddressOnMap"]; });

/* harmony import */ var _cache_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cache.helpers */ "./app/js/helpers/cache.helpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "storePaddocks", function() { return _cache_helpers__WEBPACK_IMPORTED_MODULE_1__["storePaddocks"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initMapStorageData", function() { return _cache_helpers__WEBPACK_IMPORTED_MODULE_1__["initMapStorageData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMapStorageData", function() { return _cache_helpers__WEBPACK_IMPORTED_MODULE_1__["getMapStorageData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "storeFenceEstimatorData", function() { return _cache_helpers__WEBPACK_IMPORTED_MODULE_1__["storeFenceEstimatorData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeFenceEstimatorData", function() { return _cache_helpers__WEBPACK_IMPORTED_MODULE_1__["removeFenceEstimatorData"]; });

/* harmony import */ var _ui_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui.helpers */ "./app/js/helpers/ui.helpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setDraggableMapTools", function() { return _ui_helpers__WEBPACK_IMPORTED_MODULE_2__["setDraggableMapTools"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setClosableSidebar", function() { return _ui_helpers__WEBPACK_IMPORTED_MODULE_2__["setClosableSidebar"]; });

/* harmony import */ var _export_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./export.helpers */ "./app/js/helpers/export.helpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "exportMap", function() { return _export_helpers__WEBPACK_IMPORTED_MODULE_3__["exportMap"]; });

/* harmony import */ var _form_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form.helpers */ "./app/js/helpers/form.helpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateDownloadName", function() { return _form_helpers__WEBPACK_IMPORTED_MODULE_4__["validateDownloadName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateDownloadEmail", function() { return _form_helpers__WEBPACK_IMPORTED_MODULE_4__["validateDownloadEmail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateDownloadForm", function() { return _form_helpers__WEBPACK_IMPORTED_MODULE_4__["validateDownloadForm"]; });







/***/ }),

/***/ "./app/js/helpers/map.helpers.js":
/*!***************************************!*\
  !*** ./app/js/helpers/map.helpers.js ***!
  \***************************************/
/*! exports provided: highlightShape, editShape, clearEdits, drawShapeRow, displayAddressOnMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightShape", function() { return highlightShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editShape", function() { return editShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearEdits", function() { return clearEdits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawShapeRow", function() { return drawShapeRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayAddressOnMap", function() { return displayAddressOnMap; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./app/js/constants/index.js");

const highlightShape = shape => {
  if (!shape) {
    return;
  }

  shape.setOptions(_constants__WEBPACK_IMPORTED_MODULE_0__["SHAPE_SETTINGS"].HIGHLIGHT);
  setTimeout(() => {
    shape.setOptions(_constants__WEBPACK_IMPORTED_MODULE_0__["SHAPE_SETTINGS"].DEFAULT);
  }, 500);
};
const editShape = function (shape) {
  let edit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  let drawingManager = arguments.length > 2 ? arguments[2] : undefined;
  let selectedShape = arguments.length > 3 ? arguments[3] : undefined;

  if (!shape || shape === selectedShape) {
    return;
  }

  if (edit) {
    drawingManager && drawingManager.setDrawingMode(null);
    shape.setOptions(_constants__WEBPACK_IMPORTED_MODULE_0__["SHAPE_SETTINGS"].EDIT);
    selectedShape = shape;
  } else {
    shape.setOptions(_constants__WEBPACK_IMPORTED_MODULE_0__["SHAPE_SETTINGS"].DEFAULT);
    selectedShape = null;
  }
};
const clearEdits = mapShapes => {
  if (!mapShapes) {
    return;
  }

  mapShapes.forEach(shape => {
    editShape(shape, false);
  });
  document.querySelectorAll("[data-action=\"".concat(_constants__WEBPACK_IMPORTED_MODULE_0__["SHAPES_CONTROLS"].CONFIRM_DELETE, "\"]")).forEach(confirmDeleteButton => {
    confirmDeleteButton.classList.remove("d-block");
    confirmDeleteButton.classList.add("d-none");
  });
  document.querySelectorAll("[data-action=\"".concat(_constants__WEBPACK_IMPORTED_MODULE_0__["SHAPES_CONTROLS"].DELETE, "\"]")).forEach(deleteButton => {
    deleteButton.classList.remove("d-none");
    deleteButton.classList.add("d-block");
  });
};
const drawShapeRow = (paddockName, shapeLength, index) => {
  return "\n    <div class=\"created-fence\" data-action=\"".concat(_constants__WEBPACK_IMPORTED_MODULE_0__["SHAPES_CONTROLS"].HIGHLIGHT, "\" data-shape=\"").concat(index, "\">\n      <div class=\"created-fence__section\">\n        <p class=\"created-fence__section-label\">Name</p>\n        <input id=\"paddock-description-").concat(index, "\" value=\"").concat(paddockName, "\" type=\"test\" data-shape=\"").concat(index, "\" data-action=\"").concat(_constants__WEBPACK_IMPORTED_MODULE_0__["SHAPES_CONTROLS"].EDIT_NAME, "\" data-shape=\"").concat(index, "\"  class=\"created-fence__name\" autocomplete=\"off\"/>\n      </div>\n      <div class=\"created-fence__section\">\n        <p class=\"created-fence__section-label\">Length</p>\n        <p class=\"created-fence__length\">").concat(shapeLength.toFixed(0), "m </p>\n      </div>\n      <div class=\"created-fence__section created-fence__section--actions\">\n        <button type=\"button\" data-action=\"").concat(_constants__WEBPACK_IMPORTED_MODULE_0__["SHAPES_CONTROLS"].DELETE, "\" data-shape=\"").concat(index, "\" class=\"btn-control-icons btn-control-icons--delete d-block created-fence__delete\">\n          <img class=\"created-fence__icon\" src=\"https://staging-stockandnoble.kinsta.cloud/wp-content/themes/astra-stockandnoble/assets/tool-bin.svg\"/>\n        </button>\n      </div>\n    </div>\n  ");
};

const findAddressDetail = function (address, detail) {
  let shortVersion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!address) {
    return;
  }

  return address.find(element => element.types.some(type => type === detail))[shortVersion ? "short_name" : "long_name"];
};

const displayAddressOnMap = (place, map, addressMarker, addressLabel) => {
  if (!place || !map) {
    return;
  } // If the place has a geometry, then present it on a map.


  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(16);
  } // display the marker on map


  if (addressMarker) {
    addressMarker.setPosition(place.geometry.location);
    addressMarker.setVisible(true);
  } // show the address on map controllers


  const address = place.address_components;

  if (addressLabel) {
    addressLabel.innerHTML = "\n    <span class=\"address-line-1\">".concat(findAddressDetail(address, "locality"), ", ").concat(findAddressDetail(address, "administrative_area_level_2"), "</span>\n    <span class=\"address-line-2\">").concat(findAddressDetail(address, "postal_code"), " ").concat(findAddressDetail(address, "administrative_area_level_1"), "  ").concat(findAddressDetail(address, "country", true), "</span>");
    place.adr_address.replace(/\,/g, "");
  }
};

/***/ }),

/***/ "./app/js/helpers/ui.helpers.js":
/*!**************************************!*\
  !*** ./app/js/helpers/ui.helpers.js ***!
  \**************************************/
/*! exports provided: setDraggableMapTools, setClosableSidebar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDraggableMapTools", function() { return setDraggableMapTools; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setClosableSidebar", function() { return setClosableSidebar; });
/* harmony import */ var interactjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! interactjs */ "./node_modules/interactjs/dist/interact.min.js");
/* harmony import */ var interactjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(interactjs__WEBPACK_IMPORTED_MODULE_0__);

const setDraggableMapTools = mapTools => {
  let x = 0;
  let y = 0;
  interactjs__WEBPACK_IMPORTED_MODULE_0___default()(mapTools).draggable({
    modifiers: [interactjs__WEBPACK_IMPORTED_MODULE_0___default.a.modifiers.snap({
      targets: [interactjs__WEBPACK_IMPORTED_MODULE_0___default.a.snappers.grid({
        x: 30,
        y: 30
      })],
      range: Infinity,
      relativePoints: [{
        x: 0,
        y: 0
      }]
    }), interactjs__WEBPACK_IMPORTED_MODULE_0___default.a.modifiers.restrict({
      restriction: mapTools.parentNode,
      elementRect: {
        top: 0,
        left: 0,
        bottom: 1,
        right: 1
      },
      endOnly: true
    })],
    inertia: true
  }).on("dragmove", function (event) {
    x += event.dx;
    y += event.dy;
    event.target.style.transform = "translate(" + x + "px, " + y + "px)";
  });
};
const setClosableSidebar = (sidebar, onClick) => {
  let sidebarX = 0;
  let sidebarY = 0;
  interactjs__WEBPACK_IMPORTED_MODULE_0___default()(sidebar).draggable({
    modifiers: [interactjs__WEBPACK_IMPORTED_MODULE_0___default.a.modifiers.snap({
      targets: [interactjs__WEBPACK_IMPORTED_MODULE_0___default.a.snappers.grid({
        x: 30,
        y: 30
      })],
      range: Infinity,
      relativePoints: [{
        x: 0,
        y: 0
      }]
    }), interactjs__WEBPACK_IMPORTED_MODULE_0___default.a.modifiers.restrict({
      restriction: sidebar.parentNode,
      elementRect: {
        top: 0,
        left: 0,
        bottom: 1,
        right: 1
      },
      endOnly: true
    })],
    inertia: true
  }).on("dragmove", function (event) {
    sidebarX += event.dx;
    sidebarY += event.dy;
    event.target.style.transform = "translate(" + sidebarX + "px, " + sidebarY + "px)";
  }).on("click", onClick);
};

/***/ }),

/***/ "./app/js/modules/loadedMap.module.js":
/*!********************************************!*\
  !*** ./app/js/modules/loadedMap.module.js ***!
  \********************************************/
/*! exports provided: setMapReadyForPlotting, createPaddockMapShape, createMap, setup, google */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMapReadyForPlotting", function() { return setMapReadyForPlotting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPaddockMapShape", function() { return createPaddockMapShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMap", function() { return createMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./app/js/constants/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./app/js/helpers/index.js");
/* harmony import */ var _starter_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./starter.module */ "./app/js/modules/starter.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "google", function() { return _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"]; });

/* harmony import */ var _mapElements_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mapElements.module */ "./app/js/modules/mapElements.module.js");





let map,
    drawingManager,
    mapElements = [],
    mapLengths = [],
    selectedShape = null,
    addressMapPlace,
    hasConfirmedTotal = false,
    plottingPerimiterTrigger; // flags

let mapSet = false; // Values

let addressMarker,
    mapCanvasAction,
    plotPerimiter = 0; // ui

const calculatePlot = function () {
  let storePlot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  let totalPerimeter = 0; // re-draw table and recalculate
  // go through each shape/line and:
  // 1. add length to total
  // 2. create row (button handlers have been assigned to table wrapper)
  // 3. display total
  // 4. update caching

  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["plottingShapes"].innerHTML = "";
  mapElements.forEach((shape, index) => {
    const shapeLength = _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.geometry.spherical.computeLength(shape.getPath().getArray()); // 1.

    totalPerimeter += shapeLength; // 2.

    _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["plottingShapes"].innerHTML += _helpers__WEBPACK_IMPORTED_MODULE_1__["drawShapeRow"](shape.paddockName, shapeLength, index);
  }); // 3.

  plotPerimiter = totalPerimeter.toFixed(0);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["plottingPerimiterLabel"].innerHTML = "".concat(plotPerimiter || 0, "m"); // 4.

  storePlot && _helpers__WEBPACK_IMPORTED_MODULE_1__["storePaddocks"](mapElements); // update available action buttons

  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["deletePlottingBtn"].setAttribute("aria-hidden", !mapElements.length);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["plottingTooltip"].setAttribute("aria-hidden", !!mapElements.length);

  if (!mapElements.length) {
    _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["printBtn"].setAttribute("disabled", true);
    _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["downloadBtn"].setAttribute("disabled", true);
    _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["setPlottingBtn"].setAttribute("disabled", true);
  } else {
    _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["printBtn"].removeAttribute("disabled");
    _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["downloadBtn"].removeAttribute("disabled");
    _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["setPlottingBtn"].removeAttribute("disabled");
  }

  if (hasConfirmedTotal) {
    // if the user wants to use the list of shapes/lines created, use it.
    handleUsePlotting();
  }
};

const clearPlotShape = idx => {
  if (mapElements.length && mapElements[idx]) {
    mapElements[idx].setMap(null);
    mapLengths[idx].setMap(null);
    _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.event.clearInstanceListeners(mapElements[idx]);
    mapElements.splice(idx, 1);
  }

  calculatePlot();

  if (!mapElements.length) {
    resetMapTools();
  }
}; // remove all shapes from the map


const resetFencesTable = () => {
  // go through all shapes and remove them from the map before clearing the array
  if (mapElements.length) {
    mapElements.forEach(shape => {
      shape.setMap(null);
    });
    mapLengths.forEach(length => {
      length.setMap(null);
    });
    mapElements = [];
    mapLengths = [];
  }

  plotPerimiter = 0;
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["plottingShapes"].innerHTML = "";
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["plottingPerimiterLabel"].innerHTML = "";
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["deletePlottingBtn"].setAttribute("aria-hidden", !mapElements.length); // update cache

  _helpers__WEBPACK_IMPORTED_MODULE_1__["removeFenceEstimatorData"]();
};

const resetMapTools = () => {
  drawingManager.setDrawingMode(null);
}; // this is for when the estimator has an address and
// the user can start adding fences


const setMapReadyForPlotting = isReady => {
  const mapIsReady = isReady !== undefined ? !!isReady : !!addressMapPlace;

  if (!addressMapPlace) {
    return;
  } // show/hide address and address search field


  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["addressSearchContainer"].setAttribute("aria-hidden", !!mapIsReady);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["addressContainer"].setAttribute("aria-hidden", !mapIsReady);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["addressResultsContainer"].setAttribute("aria-hidden", !mapIsReady); // show/hide search tooltip

  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["plottingTooltip"].setAttribute("aria-hidden", !!mapIsReady ? true : false); // show/hide reset button

  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["newSearchBtn"].classList.remove(!!mapIsReady ? "d-none" : "d-block");
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["newSearchBtn"].classList.add(!!mapIsReady ? "d-block" : "d-none"); // set the map to drawing state

  drawingManager.setDrawingMode(null);
};

const resetEstimator = () => {
  resetFencesTable();
  resetMapTools();
  removePaddockMenu();
  addressMarker.setVisible(false);
  map.setZoom(_constants__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_ZOOM"]);
  map.setCenter({
    lat: _constants__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_COORDINATES"].lat,
    lng: _constants__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_COORDINATES"].lng
  });
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["currentAddressLabel"].innerHTML = "";
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["searchField"].value = "";
  calculatePlot(false);
  setMapReadyForPlotting(false);
}; // caching


const getFenceEstimatorData = () => {
  const mapStorageData = _helpers__WEBPACK_IMPORTED_MODULE_1__["getMapStorageData"]();

  if (mapStorageData) {
    var _mapStorageData$fence;

    addressMapPlace = mapStorageData.place; // 1. display stored address

    _helpers__WEBPACK_IMPORTED_MODULE_1__["displayAddressOnMap"](addressMapPlace, map, addressMarker, _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["currentAddressLabel"]); // 2. create fences on map

    (_mapStorageData$fence = mapStorageData.fences) === null || _mapStorageData$fence === void 0 ? void 0 : _mapStorageData$fence.forEach(shape => {
      const {
        type,
        paddockIdx,
        paddockName,
        paths
      } = shape; // setup paddock and add it to map

      createPaddockMapShape(paddockIdx, paddockName, type, paths);
    }); // 3. set map ready to draw more fences

    setMapReadyForPlotting();
  } // update table and total based on current data


  calculatePlot(false);
  mapSet = true;
}; // paddocks


const removePaddockMenu = () => {
  map.setOptions({
    draggable: true
  });
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["shapeMenuContainer"].setAttribute("aria-hidden", true);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["shapeMenuContainer"].innerHTML = "";
};

const bindPaddockShapeEvents = paddock => {
  // when the shape is left
  // (re)calculate the measurements
  _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.event.addListener(paddock, "mouseup", () => {
    calculatePlot();
  }); // when hovering over the shape

  _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.event.addListener(paddock, "mouseover", () => {
    if (drawingManager.getDrawingMode() === _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.drawing.OverlayType.POLYLINE || drawingManager.getDrawingMode() === _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.drawing.OverlayType.POLYGON) {
      _helpers__WEBPACK_IMPORTED_MODULE_1__["clearEdits"](mapElements);
      _helpers__WEBPACK_IMPORTED_MODULE_1__["editShape"](paddock, true, drawingManager, selectedShape);
      _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["savePaddockBtn"].setAttribute("aria-hidden", true);
    }
  }); // when clicking on a shape

  _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.event.addListener(paddock, "click", () => {
    if (drawingManager.getDrawingMode() === null) {
      _helpers__WEBPACK_IMPORTED_MODULE_1__["clearEdits"](mapElements);
      _helpers__WEBPACK_IMPORTED_MODULE_1__["editShape"](paddock, true, drawingManager, selectedShape);
      _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["savePaddockBtn"].setAttribute("aria-hidden", true);
      removePaddockMenu();
    }
  }); // this listener is for right click events
  // documentation says rightclick has been deprecated
  // (https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=en#Polyline.rightclick)
  // NOTE - no sure if other events may call this

  paddock.addListener("contextmenu", event => {
    const rightClick = new CustomEvent("fence-estimator-shape-menu", {
      detail: {
        paddock: {
          name: paddock.paddockName,
          index: paddock.paddockIdx,
          coordinates: event.latLng
        },
        top: event.domEvent.clientY,
        left: event.domEvent.clientX
      }
    });
    window.dispatchEvent(rightClick);
  });
};

const createPaddockMapShape = (paddockIdx, paddockName, type, pathCoordinates) => {
  /**
   * Custom overlay for shape menu
   */
  class PaddockLengthLabelOverlay extends _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.OverlayView {
    constructor(coordinates, length) {
      super();
      this.length = void 0;
      this.coordinates = void 0;
      this.p = void 0;
      this.length = length;
      this.coordinates = coordinates;
    }
    /**
     * onAdd is called when the map's panes are ready and the overlay has been
     * added to the map.
     */


    onAdd() {
      this.p = document.createElement("p"); // style contents

      this.p.classList.add("paddock-length");
      this.p.innerHTML = "".concat(this.length.toFixed(), "m"); // Add the element to the "overlayLayer" pane.

      const panes = this.getPanes();
      panes.overlayLayer.appendChild(this.p);
    }

    draw() {
      // We use the south-west and north-east
      // coordinates of the overlay to peg it to the correct position and size.
      // To do this, we need to retrieve the projection from the overlay.
      const overlayProjection = this.getProjection(); // Retrieve the south-west and north-east coordinates of this overlay
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
      this.p.innerHTML = "".concat(this.length.toFixed(), "m");
    }

  }

  let currentShape;
  let path = new _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.MVCArray();

  if (Array.isArray(pathCoordinates)) {
    pathCoordinates.forEach(segment => {
      if (typeof segment.lat === "function") {
        path.push(segment);
      } else {
        const segmentCoordinates = new _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.LatLng(segment.lat, segment.lng);
        path.push(segmentCoordinates);
      }
    });
  } else {
    if (typeof pathCoordinates.lat === "function") {
      path.push(pathCoordinates);
    } else {
      const segmentCoordinates = new _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.LatLng(pathCoordinates.lat, pathCoordinates.lng);
      path.push(segmentCoordinates);
    }
  }

  const shapeLength = _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.geometry.spherical.computeLength(path.getArray());
  const lengthLabel = new PaddockLengthLabelOverlay({
    lat: path.getArray()[0].lat(),
    lng: path.getArray()[0].lng()
  }, shapeLength);
  _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.event.addListener(path, "insert_at", function (vertex) {
    lengthLabel.updateLength(_starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.geometry.spherical.computeLength(path.getArray()));
  });
  _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.event.addListener(path, "set_at", function (vertex) {
    lengthLabel.updateLength(_starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.geometry.spherical.computeLength(path.getArray()));
  });
  _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.event.addListener(path, "mousedown", function (vertex) {
    lengthLabel.updateLength(_starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.geometry.spherical.computeLength(path.getArray()));
  });
  const shapeDetails = { ..._constants__WEBPACK_IMPORTED_MODULE_0__["SHAPE_SETTINGS"].DEFAULT,
    paddockIdx,
    paddockName,
    type,
    map,
    path
  };

  if (type === _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.drawing.OverlayType.POLYLINE) {
    currentShape = new _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.Polyline(shapeDetails);
  }

  if (type === _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.drawing.OverlayType.POLYGON) {
    currentShape = new _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.Polygon(shapeDetails);
  } // set up paddock with listening events


  bindPaddockShapeEvents(currentShape);
  lengthLabel.setMap(map);
  mapElements.push(currentShape);
  mapLengths.push(lengthLabel);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["plottingTooltip"].setAttribute("aria-hidden", true);
}; // adjust map to prepare canvas image

const exportCanvas = action => {
  mapCanvasAction = action;

  if (addressMapPlace.geometry.viewport) {
    map.fitBounds(addressMapPlace.geometry.viewport);
  } else {
    map.setCenter(addressMapPlace.geometry.location);
  }

  map.setZoom(_constants__WEBPACK_IMPORTED_MODULE_0__["EXPORT_ZOOM"]);
  setTimeout(() => {
    _helpers__WEBPACK_IMPORTED_MODULE_1__["exportMap"](_mapElements_module__WEBPACK_IMPORTED_MODULE_3__["mapContainer"], mapCanvasAction, mapElements);
  }, 500);
}; // events


const handleResetSearch = e => {
  e.preventDefault();
  resetEstimator();
};

const handleDragTool = e => {
  e.preventDefault();
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["dragMapTool"].classList.add("map-tool--active");
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["lineMapTool"].classList.remove("map-tool--active");
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["shapeMapTool"].classList.remove("map-tool--active");
  drawingManager.setDrawingMode(null);
  _helpers__WEBPACK_IMPORTED_MODULE_1__["clearEdits"](mapElements);
  removePaddockMenu();
};

const handleLineTool = e => {
  e.preventDefault();
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["lineMapTool"].classList.add("map-tool--active");
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["dragMapTool"].classList.remove("map-tool--active");
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["shapeMapTool"].classList.remove("map-tool--active");
  drawingManager.setDrawingMode(_starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.drawing.OverlayType.POLYLINE);
  _helpers__WEBPACK_IMPORTED_MODULE_1__["clearEdits"](mapElements);
  removePaddockMenu();
};

const handleShapeTool = e => {
  e.preventDefault();
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["shapeMapTool"].classList.add("map-tool--active");
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["dragMapTool"].classList.remove("map-tool--active");
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["lineMapTool"].classList.remove("map-tool--active");
  drawingManager.setDrawingMode(_starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.drawing.OverlayType.POLYGON);
  _helpers__WEBPACK_IMPORTED_MODULE_1__["clearEdits"](mapElements);
  removePaddockMenu();
};

const handleZoomInTool = e => {
  e.preventDefault();
  map.setZoom(map.getZoom() + 1);
  _helpers__WEBPACK_IMPORTED_MODULE_1__["clearEdits"](mapElements);
  removePaddockMenu();
};

const handleZoomOutTool = e => {
  e.preventDefault();
  map.setZoom(map.getZoom() - 1);
  _helpers__WEBPACK_IMPORTED_MODULE_1__["clearEdits"](mapElements);
  removePaddockMenu();
};

const handleShapesTable = e => {
  const element = e.target.tagName.toLowerCase() === "button" || e.target.tagName.toLowerCase() === "input" ? e.target : e.target.parentElement;

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
    case _constants__WEBPACK_IMPORTED_MODULE_0__["SHAPES_CONTROLS"].HIGHLIGHT:
      _helpers__WEBPACK_IMPORTED_MODULE_1__["highlightShape"](shape);
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_0__["SHAPES_CONTROLS"].EDIT:
    case _constants__WEBPACK_IMPORTED_MODULE_0__["SHAPES_CONTROLS"].EDIT_NAME:
      _helpers__WEBPACK_IMPORTED_MODULE_1__["clearEdits"](mapElements);
      _helpers__WEBPACK_IMPORTED_MODULE_1__["editShape"](shape, true, drawingManager, selectedShape);
      _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["savePaddockBtn"].setAttribute("aria-hidden", true);
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_0__["SHAPES_CONTROLS"].DELETE:
      _helpers__WEBPACK_IMPORTED_MODULE_1__["clearEdits"](mapElements);
      _helpers__WEBPACK_IMPORTED_MODULE_1__["editShape"](shape, true, drawingManager, selectedShape);
      _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["savePaddockBtn"].setAttribute("aria-hidden", true);
      clearPlotShape(shapeIndex);
      drawingManager.setDrawingMode(null);
      break;
  }
};

const handleEditPaddockName = e => {
  const element = e.target.tagName.toLowerCase() === "input" ? e.target : e.target.parentElement;

  if (element.dataset.shape === undefined || !element.dataset.action) {
    return;
  }

  const shapeIndex = parseInt(element.dataset.shape);
  const shape = mapElements[shapeIndex];

  if (!shape) {
    return;
  }

  shape.paddockName = element.value; // update local storage

  _helpers__WEBPACK_IMPORTED_MODULE_1__["storePaddocks"](mapElements);
};

const handleAddPlotting = e => {
  e.preventDefault();
  drawingManager.setDrawingMode(null);
  _helpers__WEBPACK_IMPORTED_MODULE_1__["clearEdits"](mapElements);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["savePaddockBtn"].setAttribute("aria-hidden", false);
};

const handleUsePlotting = e => {
  e && e.preventDefault();
  hasConfirmedTotal = true;
  plottingPerimiterTrigger = new CustomEvent("fence-estimator-results", {
    detail: {
      perimiter: plotPerimiter
    }
  });
  window.dispatchEvent(plottingPerimiterTrigger);
  plottingPerimiterTrigger = null;

  if (typeof elementorProFrontend !== "undefined") {
    elementorProFrontend.modules.popup.closePopup({}, e);
  }
};

const handleDeleteAllPlotting = e => {
  e.preventDefault();
  resetFencesTable();
  resetMapTools();
};

const handlePrintMap = e => {
  e === null || e === void 0 ? void 0 : e.preventDefault();
  exportCanvas("print");
};

const handleDownloadMap = async e => {
  e === null || e === void 0 ? void 0 : e.preventDefault();
  const formIsValid = await Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["validateDownloadForm"])();

  if (formIsValid) {
    exportCanvas("download");
  }
}; // map


const createMap = () => {
  map = new _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.Map(_mapElements_module__WEBPACK_IMPORTED_MODULE_3__["mapContainer"], _constants__WEBPACK_IMPORTED_MODULE_0__["MAP_OPTIONS"]);
  _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.event.addListenerOnce(map, "tilesloaded", function () {
    // get elements from cache
    getFenceEstimatorData();
  });
  _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.event.addListener(map, "zoom_changed", function () {//only wait for zoom change on print
    // mapCanvasAction === "print" &&
    // HELPERS.exportMap(mapContainer, mapCanvasAction, mapElements);
  }); // Marker

  addressMarker = new _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.Marker({
    position: new _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.LatLng(_constants__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_COORDINATES"].lat, _constants__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_COORDINATES"].lng),
    map: map,
    animation: _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.Animation.DROP,
    clickable: false,
    visible: false
  }); // Auto complete

  const autocomplete = new _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.places.Autocomplete(_mapElements_module__WEBPACK_IMPORTED_MODULE_3__["searchField"]);
  autocomplete.bindTo("bounds", map);
  autocomplete.setFields(["address_components", "adr_address", "geometry", "icon", "name"]);
  autocomplete.addListener("place_changed", function () {
    addressMarker.setVisible(false);
    addressMapPlace = autocomplete.getPlace();

    if (!addressMapPlace.geometry) {
      window.alert("No details available for input: '" + addressMapPlace.name + "'");
      return;
    } // 1. add the place to the location storage


    _helpers__WEBPACK_IMPORTED_MODULE_1__["storeFenceEstimatorData"]({
      place: addressMapPlace
    }); // 2. display location

    _helpers__WEBPACK_IMPORTED_MODULE_1__["displayAddressOnMap"](addressMapPlace, map, addressMarker, _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["currentAddressLabel"]); // 3. begin drawing fences

    setMapReadyForPlotting();
  }); // Drawing

  drawingManager = new _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.drawing.DrawingManager({
    map,
    drawingMode: null,
    drawingControl: false,
    drawingControlOptions: {
      drawingModes: [_starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.drawing.OverlayType.POLYLINE, _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.drawing.OverlayType.POLYGON]
    },
    polylineOptions: { ..._constants__WEBPACK_IMPORTED_MODULE_0__["SHAPE_SETTINGS"].DEFAULT
    },
    polygonOptions: { ..._constants__WEBPACK_IMPORTED_MODULE_0__["SHAPE_SETTINGS"].DEFAULT
    }
  });
  _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.event.addListener(drawingManager, "polylinecomplete", function (e) {
    // create polyline and add it to array of elements
    // to display totals in table as lines are added
    const path = e.getPath().getArray();
    createPaddockMapShape(mapElements.length, "".concat(mapElements.length + 1, "--Boundary Fence"), _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.drawing.OverlayType.POLYLINE, path);
    drawingManager.setDrawingMode(null);
    e.setMap(null);
    calculatePlot();
  });
  _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.event.addListener(drawingManager, "polygoncomplete", function (e) {
    // create polygon and add it to array of elements
    // to display totals in table as lines are added
    const path = e.getPath().getArray();
    createPaddockMapShape(mapElements.length, "".concat(mapElements.length + 1, "--Paddock Fence"), _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.drawing.OverlayType.POLYGON, path);
    drawingManager.setDrawingMode(null);
    e.setMap(null);
    calculatePlot();
  });
  _starter_module__WEBPACK_IMPORTED_MODULE_2__["google"].maps.event.addListener(map, "click", function (e) {
    removePaddockMenu();
  });
  window.addEventListener("fence-estimator-shape-menu", function (e) {
    if (!e.detail.paddock) {
      return false;
    }

    const paddock = e.detail.paddock;
    const div = document.createElement("div"); // style contents

    div.classList.add("paddock-menu");
    div.style.top = e.detail.top;
    div.style.left = e.detail.left;
    div.innerHTML = "\n        <p class=\"paddock-menu__title\">".concat(paddock.name, "</p>\n        <button type=\"button\" data-action=\"").concat(_constants__WEBPACK_IMPORTED_MODULE_0__["SHAPES_CONTROLS"].DELETE, "\" data-shape=\"").concat(paddock.index, "\" class=\"paddock-menu__button paddock-menu__button--delete\">\n          Delete fence\n        </button>\n      ");
    _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["shapeMenuContainer"].appendChild(div);
    _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["shapeMenuContainer"].setAttribute("aria-hidden", false);
    map.setOptions({
      draggable: false
    });
  });
}; // SETUP

const bindMapEvents = () => {
  // bind functions
  const ignoreKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["searchField"].addEventListener("keypress", ignoreKeyPress);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["plottingShapes"].addEventListener("click", handleShapesTable); // plottingShapes.addEventListener("focus", handleEditSelectPaddockName);

  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["plottingShapes"].addEventListener("input", handleEditPaddockName);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["newSearchBtn"].addEventListener("click", handleResetSearch);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["savePaddockBtn"].addEventListener("click", handleAddPlotting);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["setPlottingBtn"].addEventListener("click", handleUsePlotting);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["deletePlottingBtn"].addEventListener("click", handleDeleteAllPlotting);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["resetBtn"].forEach(button => {
    button.addEventListener("click", handleResetSearch);
  });
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["dragMapTool"].addEventListener("click", handleDragTool);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["lineMapTool"].addEventListener("click", handleLineTool);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["shapeMapTool"].addEventListener("click", handleShapeTool);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["zoomInTool"].addEventListener("click", handleZoomInTool);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["zoomOutTool"].addEventListener("click", handleZoomOutTool); // UI

  _helpers__WEBPACK_IMPORTED_MODULE_1__["setDraggableMapTools"](_mapElements_module__WEBPACK_IMPORTED_MODULE_3__["mapTools"]);
  _helpers__WEBPACK_IMPORTED_MODULE_1__["setClosableSidebar"](_mapElements_module__WEBPACK_IMPORTED_MODULE_3__["sidebar"], removePaddockMenu);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["shapeMenuContainer"].addEventListener("click", handleShapesTable); // PRINT

  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["printBtn"].addEventListener("click", handlePrintMap);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["downloadBtn"].addEventListener("click", handleDownloadMap);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["downloadFormName"].addEventListener("change", _helpers__WEBPACK_IMPORTED_MODULE_1__["validateDownloadName"]);
  _mapElements_module__WEBPACK_IMPORTED_MODULE_3__["downloadFormEmail"].addEventListener("change", _helpers__WEBPACK_IMPORTED_MODULE_1__["validateDownloadEmail"]);
};

const setup = () => {
  Object(_mapElements_module__WEBPACK_IMPORTED_MODULE_3__["assignElements"])();
  bindMapEvents();
};


/***/ }),

/***/ "./app/js/modules/mapElements.module.js":
/*!**********************************************!*\
  !*** ./app/js/modules/mapElements.module.js ***!
  \**********************************************/
/*! exports provided: assignElements, shapeMenuContainer, sidebar, mapTools, mapContainer, addressSearchContainer, addressContainer, addressResultsContainer, plottingResultsContainer, plottingTooltip, plottingShapes, searchField, newSearchBtn, savePaddockBtn, setPlottingBtn, deletePlottingBtn, resetBtn, printBtn, downloadBtn, closeDownloadBtn, dragMapTool, lineMapTool, shapeMapTool, zoomInTool, zoomOutTool, currentAddressLabel, plottingPerimiterLabel, downloadFormName, downloadFormNameError, downloadFormEmail, downloadFormEmailError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignElements", function() { return assignElements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shapeMenuContainer", function() { return shapeMenuContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sidebar", function() { return sidebar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapTools", function() { return mapTools; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapContainer", function() { return mapContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addressSearchContainer", function() { return addressSearchContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addressContainer", function() { return addressContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addressResultsContainer", function() { return addressResultsContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plottingResultsContainer", function() { return plottingResultsContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plottingTooltip", function() { return plottingTooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plottingShapes", function() { return plottingShapes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchField", function() { return searchField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newSearchBtn", function() { return newSearchBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "savePaddockBtn", function() { return savePaddockBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPlottingBtn", function() { return setPlottingBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deletePlottingBtn", function() { return deletePlottingBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetBtn", function() { return resetBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printBtn", function() { return printBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadBtn", function() { return downloadBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeDownloadBtn", function() { return closeDownloadBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dragMapTool", function() { return dragMapTool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineMapTool", function() { return lineMapTool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shapeMapTool", function() { return shapeMapTool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoomInTool", function() { return zoomInTool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoomOutTool", function() { return zoomOutTool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentAddressLabel", function() { return currentAddressLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plottingPerimiterLabel", function() { return plottingPerimiterLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadFormName", function() { return downloadFormName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadFormNameError", function() { return downloadFormNameError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadFormEmail", function() { return downloadFormEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadFormEmailError", function() { return downloadFormEmailError; });
let shapeMenuContainer, sidebar, mapTools, mapContainer, addressSearchContainer, addressContainer, addressResultsContainer, plottingResultsContainer, plottingTooltip, plottingShapes, searchField, newSearchBtn, savePaddockBtn, setPlottingBtn, deletePlottingBtn, resetBtn, printBtn, downloadBtn, closeDownloadBtn, dragMapTool, lineMapTool, shapeMapTool, zoomInTool, zoomOutTool, currentAddressLabel, plottingPerimiterLabel, downloadFormName, downloadFormNameError, downloadFormEmail, downloadFormEmailError;
const assignElements = () => {
  // find elements
  mapContainer = document.getElementById("fence-estimator-map");
  addressSearchContainer = document.querySelectorAll(".map-search-controller__searcher")[0];
  addressContainer = document.querySelectorAll(".map-search-results__step-1")[0];
  addressResultsContainer = document.querySelectorAll(".map-search-results-controller")[0];
  plottingResultsContainer = document.querySelectorAll(".map-plotting-results-controller")[0];
  plottingTooltip = document.querySelectorAll(".map-search-results__shapes-tip")[0];
  plottingShapes = document.querySelectorAll(".map-search-results__shapes-table")[0];
  searchField = document.querySelectorAll(".search-address__field")[0];
  newSearchBtn = document.querySelectorAll(".search-address__new-search-button")[0];
  currentAddressLabel = document.querySelectorAll(".map-search-results__address")[0];
  savePaddockBtn = document.querySelectorAll(".plotting__save-paddock-button")[0];
  setPlottingBtn = document.querySelectorAll(".plotting__accept-button")[0];
  deletePlottingBtn = document.querySelectorAll(".plotting__delete-button")[0];
  plottingPerimiterLabel = document.querySelectorAll(".map-plotting-results__perimiter")[0];
  resetBtn = document.querySelectorAll(".reset-button");
  printBtn = document.querySelectorAll(".plotting__print-button")[0];
  downloadBtn = document.querySelectorAll(".plotting__download-button")[0];
  closeDownloadBtn = document.querySelectorAll(".plotting__close-download-button")[0];
  dragMapTool = document.querySelectorAll(".map-tool-drag")[0];
  lineMapTool = document.querySelectorAll(".map-tool-line")[0];
  shapeMapTool = document.querySelectorAll(".map-tool-shape")[0];
  zoomInTool = document.querySelectorAll(".map-tool-zoomin")[0];
  zoomOutTool = document.querySelectorAll(".map-tool-zoomout")[0];
  mapTools = document.querySelectorAll(".map-search-tools-controller")[0];
  sidebar = document.querySelectorAll(".map-search-sidebar")[0];
  shapeMenuContainer = document.querySelectorAll(".paddock-menu-container")[0];
  downloadFormName = document.querySelectorAll(".plotting__download-name")[0];
  downloadFormNameError = document.querySelectorAll(".download-form__error--name")[0];
  downloadFormEmail = document.querySelectorAll(".plotting__download-email")[0];
  downloadFormEmailError = document.querySelectorAll(".download-form__error--email")[0];
};


/***/ }),

/***/ "./app/js/modules/starter.module.js":
/*!******************************************!*\
  !*** ./app/js/modules/starter.module.js ***!
  \******************************************/
/*! exports provided: init, google */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "google", function() { return google; });
/* harmony import */ var google_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! google-maps */ "./node_modules/google-maps/lib/esm/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./app/js/constants/index.js");
/* harmony import */ var _loadedMap_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loadedMap.module */ "./app/js/modules/loadedMap.module.js");



const mapLoader = new google_maps__WEBPACK_IMPORTED_MODULE_0__["Loader"](_constants__WEBPACK_IMPORTED_MODULE_1__["MAP_SETTINGS"].key, _constants__WEBPACK_IMPORTED_MODULE_1__["MAP_SETTINGS"].options);
let google;

const start = () => {
  Object(_loadedMap_module__WEBPACK_IMPORTED_MODULE_2__["setup"])();
  Object(_loadedMap_module__WEBPACK_IMPORTED_MODULE_2__["createMap"])();
};

const init = async () => {
  if (!document.getElementById("fence-estimator-map")) {
    return false;
  }

  if (!google) {
    google = await mapLoader.load();
  }

  start();
};


/***/ }),

/***/ 0:
/*!**********************************!*\
  !*** multi ./app/index.build.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/pacienciacanda/Documents/Relashe/git/freelance/fence-estimator/app/index.build.js */"./app/index.build.js");


/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map