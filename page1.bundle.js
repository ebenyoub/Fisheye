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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Crée une classe de gestion des données\n\nasync function loadData() {\n    // récupère les données depuis le sessionStorage\n    const cachedData = sessionStorage.getItem(\"data\")\n    if (cachedData) {\n        console.log('Get from cache')\n        return JSON.parse(cachedData)\n    }\n\n    console.log('Get from JSON')\n\n    // récupère les données depuis le fichier JSON\n    const data = await fetch(`${window.location.origin}/src/data/photographers.json`)\n        .then(response => response.json());\n\n    sessionStorage.setItem(\"data\", JSON.stringify(data))\n\n    return data;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadData);\n\n//# sourceURL=webpack://fisheye/./src/scripts/factories/photographer.js?");

/***/ }),

/***/ "./src/scripts/pages/index.js":
/*!************************************!*\
  !*** ./src/scripts/pages/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_scripts_factories_photographer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/scripts/factories/photographer.js */ \"./src/scripts/factories/photographer.js\");\n/* harmony import */ var _src_scripts_templates_photographer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/scripts/templates/photographer.js */ \"./src/scripts/templates/photographer.js\");\n\n\n\nasync function displayData(data) {\n    const photographersSection = document.querySelector(\".photographer_section\");\n\n    for (const photographer of data.photographers) {\n        data.id = photographer.id;\n        const photographerModel = await (0,_src_scripts_templates_photographer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(photographer);\n        const userCardDOM = photographerModel.getUserCardDOM();\n        photographersSection.appendChild(userCardDOM);\n    }\n}\n\nasync function init() {\n    // Récupère les datas des photographes\n    const data = await (0,_src_scripts_factories_photographer_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    displayData(data)\n}\n\ninit();\n\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/pages/index.js?");

/***/ }),

/***/ "./src/scripts/templates/photographer.js":
/*!***********************************************!*\
  !*** ./src/scripts/templates/photographer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst baseUrl = window.location.origin;\n\nfunction photographerTemplate(photographer) {\n    const { name, city, country, price, tagline, id, portrait } =  photographer;\n    const format = portrait.replace('jpg', 'webp');\n    const picture = `${baseUrl}/src/assets/images/Photographers/${format}`;\n\n    function getUserCardDOM() {\n        const link = document.createElement('a');\n        link.setAttribute('href', `${baseUrl}/src/pages/photographer.html?id=${id}`);\n        link.setAttribute('aria-label', name);\n        link.setAttribute('class', 'profile-card');\n\n        const container = document.createElement('div');\n        container.setAttribute('class', 'profile-container');\n        link.appendChild(container);\n\n        const img = new Image(200, 200);\n        img.src = picture;\n        img.setAttribute(\"aria-label\", name);\n        img.setAttribute(\"class\", \"profile\");\n        container.appendChild(img);\n\n        const h2 = document.createElement('h2');\n        h2.textContent = name;\n        link.appendChild(h2);\n\n        const local = document.createElement('h3');\n        local.setAttribute(\"class\", 'locality')\n        local.textContent = `${city}, ${country}`;\n        link.appendChild(local);\n\n        const tag = document.createElement('p');\n        tag.setAttribute(\"class\", 'tagline')\n        tag.textContent = tagline;\n        link.appendChild(tag);\n\n        const hono = document.createElement('p');\n        hono.setAttribute(\"class\", 'price')\n        hono.textContent = `${price}/jours`;\n        link.appendChild(hono);\n\n        return (link);\n    }\n\n    function getUserImage() {\n        const link = document.createElement('a');\n        link.setAttribute('href', `${baseUrl}/src/pages/photographer.html?id=${id}`);\n        link.setAttribute('aria-label', name);\n        link.setAttribute('class', 'profile-card');\n\n        const container = document.createElement('div');\n        container.setAttribute('class', 'profile-container');\n        link.appendChild(container);\n\n        const img = new Image(200, 200);\n        img.src = picture;\n        img.setAttribute(\"aria-label\", name);\n        img.setAttribute(\"class\", \"profile\");\n        container.appendChild(img);\n        return container;\n    }\n\n    function getUserInfos() {\n        const headerInfo = document.createElement('div');\n        headerInfo.setAttribute('class', 'information');\n\n        const containerInfo = document.createElement('div');\n        headerInfo.setAttribute('class', 'information-container');\n\n        containerInfo.appendChild(headerInfo);\n\n        const h2 = document.createElement('h2');\n        h2.textContent = name;\n        headerInfo.appendChild(h2);\n\n        const local = document.createElement('h3');\n        local.setAttribute(\"class\", 'locality')\n        local.textContent = `${city}, ${country}`;\n        headerInfo.appendChild(local);\n\n        const tag = document.createElement('p');\n        tag.setAttribute(\"class\", 'tagline')\n        tag.textContent = tagline;\n        headerInfo.appendChild(tag);\n\n        return headerInfo;\n    }\n\n    return {\n        name,\n        picture,\n        getUserCardDOM,\n        getUserImage,\n        getUserInfos\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (photographerTemplate);\n\n//# sourceURL=webpack://fisheye/./src/scripts/templates/photographer.js?");

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