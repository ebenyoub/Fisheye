/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/factories/photographer.js":
/*!***********************************************!*\
  !*** ./src/scripts/factories/photographer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/scripts/utils/constant */ \"./src/scripts/utils/constant.js\");\n/* eslint-disable no-console */\n/* eslint-disable import/no-unresolved */\n\n\nasync function loadData() {\n  // récupère les données depuis le sessionStorage\n  const cachedData = sessionStorage.getItem(\"data\");\n  if (cachedData) {\n    console.log(\"Get from cache\");\n    return JSON.parse(cachedData);\n  }\n\n  console.log(\"Get from JSON\");\n\n  // récupère les données depuis le fichier JSON\n  const data = await fetch(`${_src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/data/photographers.json`).then(\n    (response) => response.json(),\n  );\n\n  sessionStorage.setItem(\"data\", JSON.stringify(data));\n\n  return data;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadData);\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/factories/photographer.js?");

/***/ }),

/***/ "./src/scripts/pages/index.js":
/*!************************************!*\
  !*** ./src/scripts/pages/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_scripts_factories_photographer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/scripts/factories/photographer */ \"./src/scripts/factories/photographer.js\");\n/* harmony import */ var _src_scripts_templates_photographer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/scripts/templates/photographer */ \"./src/scripts/templates/photographer.js\");\n/* harmony import */ var _src_scripts_utils_enventList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @src/scripts/utils/enventList */ \"./src/scripts/utils/enventList.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\n(0,_src_scripts_utils_enventList__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\nwindow.addEventListener(\"resize\", _src_scripts_utils_enventList__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n\nasync function displayData(originalData) {\n  const photographersSection = document.querySelector(\".photographer_section\");\n  const data = { ...originalData };\n  // eslint-disable-next-line no-restricted-syntax\n  for (const photographer of data.photographers) {\n    data.id = photographer.id;\n    // eslint-disable-next-line no-await-in-loop\n    const photographerModel = await (0,_src_scripts_templates_photographer__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(photographer);\n    const userCardDOM = photographerModel.getUserCardDOM();\n    photographersSection.insertAdjacentHTML(\"beforeend\", userCardDOM);\n  }\n}\n\nasync function init() {\n  // Récupère les datas des photographes\n  const data = await (0,_src_scripts_factories_photographer__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  displayData(data);\n}\n\ninit();\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/pages/index.js?");

/***/ }),

/***/ "./src/scripts/templates/photographer.js":
/*!***********************************************!*\
  !*** ./src/scripts/templates/photographer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constant */ \"./src/scripts/utils/constant.js\");\n\n\nfunction photographerTemplate(photographer) {\n  const {\n    name, city, country, price, tagline, id, portrait,\n  } = photographer;\n  const format = portrait.replace(\"jpg\", \"webp\");\n  const picture = `${_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/assets/images/Photographers/${format}`;\n\n  function getUserCardDOM() {\n    return `\n            <a href=\"${_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/pages/photographer.html?id=${id}\" aria-label=\"${name}\"\n            class=\"profile-card\">\n                <div class=\"profile-container\">\n                    <img width=\"200\" height=\"200\"\n                        src=\"${picture}\"\n                        aria-label=\"${name}\"\n                        class=\"profile\">\n                </div>\n                <h2>${name}</h2>\n                <h3 class=\"locality\">${city}, ${country}</h3>\n                <p class=\"tagline\">${tagline}</p>\n                <p class=\"price\">${price}/jours</p>\n            </a>\n        `;\n  }\n\n  function getUserImage() {\n    return `\n            <div class=\"profile-container\">\n                <img width=\"200\" height=\"200\"\n                    src=\"${picture}\"\n                    aria-label=\"${name}\"\n                    class=\"profile\"\n                >\n            </div>\n        `;\n  }\n\n  function getUserInfos() {\n    return `\n            <div class=\"information\">\n                <div class=\"information-container\">\n                    <h2>${name}</h2>\n                    <h3 class=\"locality\">${city}, ${country}</h3>\n                    <p class=\"tagline\">${tagline}</p>\n                </div>\n            </div>\n        `;\n  }\n\n  return {\n    getUserCardDOM,\n    getUserImage,\n    getUserInfos,\n  };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (photographerTemplate);\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/templates/photographer.js?");

/***/ }),

/***/ "./src/scripts/utils/constant.js":
/*!***************************************!*\
  !*** ./src/scripts/utils/constant.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst getUrl = () => {\n  if (window.location.origin === \"https://ebenyoub.github.io\") {\n    return `${window.location.origin}/Fisheye`;\n  }\n  return window.location.origin;\n};\n\nconst BASE_URL = getUrl();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BASE_URL);\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/utils/constant.js?");

/***/ }),

/***/ "./src/scripts/utils/enventList.js":
/*!*****************************************!*\
  !*** ./src/scripts/utils/enventList.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/scripts/utils/constant */ \"./src/scripts/utils/constant.js\");\n// eslint-disable-next-line import/no-unresolved\n\n\nfunction updateLogoSource() {\n  const logoImage = document.querySelector(\".logo\");\n\n  if (window.innerWidth < 500) {\n    logoImage.src = `${_src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/assets/icons/logo_min.png`;\n  } else {\n    logoImage.src = `${_src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/assets/icons/logo.png`;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateLogoSource);\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/utils/enventList.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/pages/index.js");
/******/ 	
/******/ })()
;