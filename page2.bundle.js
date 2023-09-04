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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constant */ \"./src/scripts/utils/constant.js\");\n\n\nasync function loadData() {\n    // récupère les données depuis le sessionStorage\n    const cachedData = sessionStorage.getItem(\"data\")\n    if (cachedData) {\n        console.log('Get from cache')\n        return JSON.parse(cachedData)\n    }\n\n    console.log('Get from JSON')\n\n    // récupère les données depuis le fichier JSON\n    const data = await fetch(`${_utils_constant__WEBPACK_IMPORTED_MODULE_0__.BASE_URL}/src/data/photographers.json`)\n        .then(response => response.json());\n\n    sessionStorage.setItem(\"data\", JSON.stringify(data))\n\n    return data;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadData);\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/factories/photographer.js?");

/***/ }),

/***/ "./src/scripts/pages/photographer.js":
/*!*******************************************!*\
  !*** ./src/scripts/pages/photographer.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_scripts_factories_photographer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/scripts/factories/photographer.js */ \"./src/scripts/factories/photographer.js\");\n/* harmony import */ var _src_scripts_templates_photographer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/scripts/templates/photographer.js */ \"./src/scripts/templates/photographer.js\");\n/* harmony import */ var _src_scripts_templates_media_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @src/scripts/templates/media.js */ \"./src/scripts/templates/media.js\");\n/* harmony import */ var _utils_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/constant */ \"./src/scripts/utils/constant.js\");\n\n\n\n\n\n\n// -----------------------------\n//         SORT HANDLE\n// -----------------------------\n\nconst selectBtn = document.querySelector('.select-btn');\nlet selectList = document.querySelectorAll('.options li');\nlet activeOption = document.querySelector('.option.active');\nlet medias = null;\nlet user = null;\n\ndocument.addEventListener('DOMContentLoaded', launch, { once: true });\n\nasync function launch() {\n    await init();\n    displayHeader();\n    updateContainer();\n    document.addEventListener('click', handleClick);\n}\n\nfunction handleClick(e) {\n    if (isListed(e.target) && e.target.classList.contains('active')) {\n        toggleSelectBtn();\n    } else if (isListed(e.target) && !e.target.classList.contains('active')) {\n        sortUpdate(e);\n        updateActiveOption(e.target);\n        moveActiveOptionToTop();\n        toggleSelectBtn();\n    } else {\n        closeSelectBtn();\n    }\n}\n\nasync function sortUpdate(event) {\n    event.preventDefault();\n    const sort = event.target.getAttribute('data-sort');\n    updateContainer(sort);\n}\n\nfunction sortMedia(medias, sort) {\n    switch (sort) {\n        case 'favorite':\n            return medias.sort((a, b) => b.likes - a.likes);\n        case 'date':\n            return medias.sort((a, b) => {\n                const aDate = new Date(a.date).getTime();\n                const bDate = new Date(b.date).getTime();\n                return bDate - aDate;\n            })\n        case 'title':\n            return medias.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));\n    }\n}\n\nfunction isListed(element) {\n    for (const li of selectList) {\n        if (li === element) {\n            return true;\n        }\n    }\n    return false;\n}\n\nfunction toggleSelectBtn() {\n    selectBtn.classList.toggle('open');\n}\n\nfunction closeSelectBtn() {\n    selectBtn.classList.remove('open');\n}\n\nfunction updateActiveOption(newActiveOption) {\n    activeOption.classList.remove('active');\n    newActiveOption.classList.add('active');\n    activeOption = newActiveOption;\n}\n\nfunction moveActiveOptionToTop() {\n    const optionsContainer = document.querySelector('.options');\n    optionsContainer.prepend(activeOption);\n    selectList = document.querySelectorAll('.options li');\n}\n\n// -----------------------------\n//         INITIALISATION\n// -----------------------------\n\nasync function init() {\n    const id = new URLSearchParams(document.location.search).get('id');\n    const data = await (0,_src_scripts_factories_photographer_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    user = data.photographers.find(user => user.id == id);\n    if (!user) {\n        alert(`Unknown id : ${id}`)\n        location.href = `${_utils_constant__WEBPACK_IMPORTED_MODULE_3__.BASE_URL}/src/pages/index.html`;\n    } \n    medias = data.media.filter(item => item.photographerId == id);\n    document.querySelector('.contact-name').innerHTML = user.name;\n}\n\nfunction displayHeader() {\n    const header = document.querySelector('.photograph-header');\n    const userModel = (0,_src_scripts_templates_photographer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(user);\n    insertInfosBeforeFirstChild(header, userModel.getUserInfos());\n    header.appendChild(userModel.getUserImage());\n}\n\nfunction updateContainer(sort = 'favorite') {\n    const container = document.querySelector('.media-container');\n    container.innerHTML = null;\n    const sortedMedias = sortMedia(medias, sort);\n\n    const indexedMedias = sortedMedias.map((media, index) => {\n        const mediaModel = (0,_src_scripts_templates_media_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(sortedMedias, user.name, index);\n        return mediaModel.getCardItem(index);\n    });\n\n    indexedMedias.forEach(media => {\n        container.appendChild(media);\n    });\n}\n\nfunction insertInfosBeforeFirstChild(parent, child) {\n    parent.insertBefore(child, parent.firstChild);\n}\n\n//# sourceURL=webpack://fisheye/./src/scripts/pages/photographer.js?");

/***/ }),

/***/ "./src/scripts/templates/media.js":
/*!****************************************!*\
  !*** ./src/scripts/templates/media.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constant */ \"./src/scripts/utils/constant.js\");\n\n\nconst overlay = document.querySelector('.modal-overlay');\nconst elementsToHide = document.querySelectorAll('body > :not(.modal-overlay');\nlet currentModalIndex = null;\n\nfunction mediaTemplate(sortedMedias, photographerName, index) {\n    const media = sortedMedias[index];\n    const { title, likes, date } = media;\n\n    // créé les vignettes de présentation des medias\n    function getCardItem() {\n        const item = createItem(index);\n        const icon = document.createElement('span');\n        icon.setAttribute('class', 'icon');\n        item.container.appendChild(icon);\n        item.container.classList.add('item-container');\n        const likeCount = document.createElement('span');\n        likeCount.setAttribute('class', 'like-count');\n        likeCount.innerText = likes;\n        item.legend.appendChild(likeCount)\n        icon.addEventListener('click', () => getItemModal(index))\n        return item.container;\n    }\n\n    // crée la modale de l'image\n    function getItemModal(modalIndex) {\n        currentModalIndex = modalIndex;\n        const item = createItem(modalIndex);\n        accessibilityHide();\n        item.container.setAttribute('class', 'modal-item-container');\n        // ajoute les controles de la video\n        !item.container.isImage && (item.container.querySelector('.media').controls = true);\n        // crée les boutons de la modale\n        createXMark(item.container);\n        const arrowRight = createArrow(item.container, 'right');\n        const arrowLeft = createArrow(item.container, 'left');\n        switchItem(arrowRight, 1, modalIndex)\n        switchItem(arrowLeft, -1, modalIndex)\n        // efface la modale puis rajoute la nouvelle\n        overlay.style.display = 'flex';\n        overlay.innerHTML = null;\n        overlay.appendChild(item.container);\n        document.body.appendChild(overlay);\n        // ajoute les évenements à la modale\n        document.addEventListener('keydown', keyboardHandler);\n        document.body.classList.add('modal-open');\n    }\n    \n    // Evenements click des fleches de la modale\n    function switchItem(arrow, direction, modalIndex) {\n        arrow.addEventListener('click', () => next(direction, modalIndex), { once: true });\n    }\n    \n    function keyboardHandler(e) {\n        switch (e.key) {\n            case 'ArrowLeft':\n                next(-1, currentModalIndex);\n                break;\n            case 'ArrowRight':\n                next(1, currentModalIndex);\n                break;\n            case 'Escape':\n                closeModale();\n                break;\n            default:\n                return;\n        }\n    }\n\n    // passe à la photo suivante/précédente\n    function next(direction, modalIndex) {\n        const newIndex = modalIndex + direction;\n        const lastIndex = sortedMedias.length - 1;\n        const newModalIndex = newIndex < 0 ? lastIndex : newIndex % sortedMedias.length;\n        stopKeyboardHandler();\n        return getItemModal(newModalIndex);\n    }\n    \n    // évite de créér des evenements à l'infini\n    function stopKeyboardHandler() {\n        document.removeEventListener('keydown', keyboardHandler);\n    }\n\n    function createItem(newIndex) {\n        const newMedia = sortedMedias[newIndex];\n        const isImage = newMedia.image ? true : false;\n        const file = newMedia.hasOwnProperty('image') ? newMedia.image : newMedia.video;\n        const firstName = photographerName.split(' ')[0];\n        const newMediaPath = `${_utils_constant__WEBPACK_IMPORTED_MODULE_0__.BASE_URL}/src/assets/images/${firstName}/${file}`;\n        const container = document.createElement('figure');\n        var item;\n        // create the image/video\n        if (isImage) {\n            item = new Image();\n            const imgWebp = newMediaPath.replace('jpg', 'webp')\n            item.src = imgWebp;\n            container.setAttribute(\"class\", \"image\");\n        } else {\n            item = document.createElement('video');\n            item.src = `${_utils_constant__WEBPACK_IMPORTED_MODULE_0__.BASE_URL}/src/assets/images/${firstName}/${newMedia.video}`;\n            item.poster = '';\n            item.controls = false;\n            const track = item.addTextTrack('subtitles', 'Sous-titres', 'en');\n            track.addCue(new VTTCue(0, 5, media.title));\n            track.mode = 'hidden';\n            container.setAttribute(\"class\", \"video\");\n        }\n        item.setAttribute(\"class\", \"media\");\n        item.setAttribute(\"aria-label\", title);\n        item.setAttribute(\"data-index\", newIndex)\n        item.title = date;\n        container.appendChild(item);\n        const legend = createLegend(container, newMedia.title);\n        return { container, legend, isImage };\n    }\n\n    function createLegend(parent, title) {\n        const legend = document.createElement('figcaption');\n        legend.setAttribute('class', 'legend');\n        const legendTitle = document.createElement('p');\n        legendTitle.setAttribute('class', 'legend-title');\n        legendTitle.innerText = title;\n        legend.appendChild(legendTitle);\n        parent.appendChild(legend);\n        return legend;\n    }\n\n    function createArrow(parent, direction) {\n        const arrow = document.createElement('img')\n        arrow.setAttribute('class', `arrow ${direction}`);\n        arrow.setAttribute('aria-label', 'close modale');\n        arrow.src = `${_utils_constant__WEBPACK_IMPORTED_MODULE_0__.BASE_URL}/src/assets/icons/chevron-up-solid.svg`;\n        parent.appendChild(arrow);\n        return arrow;\n    }\n\n    function createXMark(parent) {\n        const xmark = document.createElement('img')\n        xmark.setAttribute('class', 'xmark');\n        xmark.setAttribute('aria-label', 'close modale');\n        xmark.src = `${_utils_constant__WEBPACK_IMPORTED_MODULE_0__.BASE_URL}/src/assets/icons/close.svg`;\n        // close modal event\n        xmark.addEventListener('click', closeModale);\n        parent.appendChild(xmark);\n    }\n\n    function closeModale() {\n        overlay.innerHTML = null;\n        overlay.style.display = 'none';\n        accessibilityShow();\n        document.body.classList.remove('modal-open')\n        stopKeyboardHandler();\n    }\n\n    function accessibilityHide() {\n        elementsToHide.forEach(element => {\n            element.setAttribute('aria-hidden', 'true');\n        })\n    }\n\n    function accessibilityShow() {\n        elementsToHide.forEach(element => {\n            element.removeAttribute('aria-hidden');\n        })\n    }\n\n    return {\n        getCardItem\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mediaTemplate);\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/templates/media.js?");

/***/ }),

/***/ "./src/scripts/templates/photographer.js":
/*!***********************************************!*\
  !*** ./src/scripts/templates/photographer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constant */ \"./src/scripts/utils/constant.js\");\n\n\nfunction photographerTemplate(photographer) {\n    const { name, city, country, price, tagline, id, portrait } =  photographer;\n    const format = portrait.replace('jpg', 'webp');\n    const picture = `${_utils_constant__WEBPACK_IMPORTED_MODULE_0__.BASE_URL}/src/assets/images/Photographers/${format}`;\n\n    function getUserCardDOM() {\n        const link = document.createElement('a');\n        link.setAttribute('href', `${_utils_constant__WEBPACK_IMPORTED_MODULE_0__.BASE_URL}/src/pages/photographer.html?id=${id}`);\n        link.setAttribute('aria-label', name);\n        link.setAttribute('class', 'profile-card');\n\n        const container = document.createElement('div');\n        container.setAttribute('class', 'profile-container');\n        link.appendChild(container);\n\n        const img = new Image(200, 200);\n        img.src = picture;\n        img.setAttribute(\"aria-label\", name);\n        img.setAttribute(\"class\", \"profile\");\n        container.appendChild(img);\n\n        const h2 = document.createElement('h2');\n        h2.textContent = name;\n        link.appendChild(h2);\n\n        const local = document.createElement('h3');\n        local.setAttribute(\"class\", 'locality')\n        local.textContent = `${city}, ${country}`;\n        link.appendChild(local);\n\n        const tag = document.createElement('p');\n        tag.setAttribute(\"class\", 'tagline')\n        tag.textContent = tagline;\n        link.appendChild(tag);\n\n        const hono = document.createElement('p');\n        hono.setAttribute(\"class\", 'price')\n        hono.textContent = `${price}/jours`;\n        link.appendChild(hono);\n\n        return (link);\n    }\n\n    function getUserImage() {\n        const link = document.createElement('a');\n        link.setAttribute('href', `${_utils_constant__WEBPACK_IMPORTED_MODULE_0__.BASE_URL}/src/pages/photographer.html?id=${id}`);\n        link.setAttribute('aria-label', name);\n        link.setAttribute('class', 'profile-card');\n\n        const container = document.createElement('div');\n        container.setAttribute('class', 'profile-container');\n        link.appendChild(container);\n\n        const img = new Image(200, 200);\n        img.src = picture;\n        img.setAttribute(\"aria-label\", name);\n        img.setAttribute(\"class\", \"profile\");\n        container.appendChild(img);\n        return container;\n    }\n\n    function getUserInfos() {\n        const headerInfo = document.createElement('div');\n        headerInfo.setAttribute('class', 'information');\n\n        const containerInfo = document.createElement('div');\n        headerInfo.setAttribute('class', 'information-container');\n\n        containerInfo.appendChild(headerInfo);\n\n        const h2 = document.createElement('h2');\n        h2.textContent = name;\n        headerInfo.appendChild(h2);\n\n        const local = document.createElement('h3');\n        local.setAttribute(\"class\", 'locality')\n        local.textContent = `${city}, ${country}`;\n        headerInfo.appendChild(local);\n\n        const tag = document.createElement('p');\n        tag.setAttribute(\"class\", 'tagline')\n        tag.textContent = tagline;\n        headerInfo.appendChild(tag);\n\n        return headerInfo;\n    }\n\n    return {\n        name,\n        picture,\n        getUserCardDOM,\n        getUserImage,\n        getUserInfos\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (photographerTemplate);\n\n//# sourceURL=webpack://fisheye/./src/scripts/templates/photographer.js?");

/***/ }),

/***/ "./src/scripts/utils/constant.js":
/*!***************************************!*\
  !*** ./src/scripts/utils/constant.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BASE_URL: () => (/* binding */ BASE_URL)\n/* harmony export */ });\nconst BASE_URL = window.location.origin + \"/Fisheye\";\n\n//# sourceURL=webpack://fisheye/./src/scripts/utils/constant.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/pages/photographer.js");
/******/ 	
/******/ })()
;