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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/scripts/utils/constant */ \"./src/scripts/utils/constant.js\");\n/* eslint-disable no-console */\n/* eslint-disable import/no-unresolved */\n\n\nasync function loadData() {\n  // récupère les données depuis le sessionStorage\n  const cachedData = sessionStorage.getItem('data');\n  if (cachedData) {\n    console.log('Get from cache');\n    return JSON.parse(cachedData);\n  }\n\n  console.log('Get from JSON');\n\n  // récupère les données depuis le fichier JSON\n  const data = await fetch(`${_src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/data/photographers.json`).then(\n    (response) => response.json(),\n  );\n\n  sessionStorage.setItem('data', JSON.stringify(data));\n\n  return data;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadData);\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/factories/photographer.js?");

/***/ }),

/***/ "./src/scripts/pages/photographer.js":
/*!*******************************************!*\
  !*** ./src/scripts/pages/photographer.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_scripts_factories_photographer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/scripts/factories/photographer */ \"./src/scripts/factories/photographer.js\");\n/* harmony import */ var _src_scripts_templates_photographer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/scripts/templates/photographer */ \"./src/scripts/templates/photographer.js\");\n/* harmony import */ var _src_scripts_templates_media__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @src/scripts/templates/media */ \"./src/scripts/templates/media.js\");\n/* harmony import */ var _src_scripts_utils_enventList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @src/scripts/utils/enventList */ \"./src/scripts/utils/enventList.js\");\n/* harmony import */ var _src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @src/scripts/utils/constant */ \"./src/scripts/utils/constant.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\n\n// -----------------------------\n//         SORT HANDLE\n// -----------------------------\n\nconst selectBtn = document.querySelector('.select-btn');\nlet selectList = document.querySelectorAll('.options li');\nlet activeOption = document.querySelector('.option.active');\nlet medias;\nlet user;\n\nfunction isListed(element) {\n  let result = false;\n  selectList.forEach((li) => {\n    if (li === element) {\n      result = true;\n    }\n  });\n  return result;\n}\n\nfunction itemFocus() {\n  let tabindex = 4;\n  const items = document.querySelectorAll('.item-container');\n  items.forEach((item) => {\n    if (document.body.classList.contains('.modal-open')) {\n      item.setAttribute('tabindex', '-1');\n    } else {\n      item.setAttribute('tabindex', tabindex);\n      item.addEventListener('focus', () => item.classList.add('class', 'item-focus'));\n      item.addEventListener('blur', () => item.classList.remove('item-focus'));\n      tabindex += 1;\n    }\n  });\n}\n\nfunction sortMedia(userMedias, sort) {\n  switch (sort) {\n    case 'favorite':\n      return userMedias.sort((a, b) => b.likes - a.likes);\n    case 'date':\n      return userMedias.sort((a, b) => {\n        const aDate = new Date(a.date).getTime();\n        const bDate = new Date(b.date).getTime();\n        return bDate - aDate;\n      });\n    default:\n      return userMedias.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));\n  }\n}\n\nfunction updateContainer(sort = 'favorite') {\n  const container = document.querySelector('.media-container');\n  container.innerHTML = null;\n  const sortedMedias = sortMedia(medias, sort);\n\n  const indexedMedias = sortedMedias.map((media, index) => {\n    const mediaModel = (0,_src_scripts_templates_media__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(sortedMedias, user.name, index);\n    return mediaModel.getCardItem(index);\n  });\n\n  indexedMedias.forEach((media) => {\n    container.appendChild(media);\n  });\n  itemFocus();\n}\n\nasync function sortUpdate(event) {\n  event.preventDefault();\n  const sort = event.target.getAttribute('data-sort');\n  updateContainer(sort);\n}\n\nfunction toggleSelectBtn() {\n  selectBtn.classList.toggle('open');\n}\n\nfunction closeSelectBtn() {\n  selectBtn.classList.remove('open');\n}\n\nfunction updateActiveOption(newActiveOption) {\n  activeOption.classList.remove('active');\n  newActiveOption.classList.add('active');\n  activeOption = newActiveOption;\n}\n\nfunction moveActiveOptionToTop() {\n  const optionsContainer = document.querySelector('.options');\n  optionsContainer.prepend(activeOption);\n  selectList = document.querySelectorAll('.options li');\n}\n\nfunction handleClick(e) {\n  if (isListed(e.target) && e.target.classList.contains('active')) {\n    toggleSelectBtn();\n  } else if (isListed(e.target) && !e.target.classList.contains('active')) {\n    sortUpdate(e);\n    updateActiveOption(e.target);\n    moveActiveOptionToTop();\n    toggleSelectBtn();\n  } else {\n    closeSelectBtn();\n  }\n}\n\n// -----------------------------\n//         INITIALISATION\n// -----------------------------\n\nasync function init() {\n  const param = new URLSearchParams(document.location.search).get('id');\n  const id = parseInt(param, 10);\n  const data = await (0,_src_scripts_factories_photographer__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  user = data.photographers.find((photographer) => photographer.id === id);\n  if (!user) {\n    window.location.href = `${_src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_4__[\"default\"]}/index.html`;\n  }\n  medias = data.media.filter((item) => item.photographerId === id);\n  document.querySelector('.contact-name').innerHTML = user.name;\n  document.querySelector('.link_home').href = `${_src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_4__[\"default\"]}/index.html`;\n}\n\nfunction insertInfosBeforeFirstChild(parent, child) {\n  parent.insertAdjacentHTML('afterbegin', child);\n}\n\nfunction displayHeader() {\n  const header = document.querySelector('.photograph-header');\n  const userModel = (0,_src_scripts_templates_photographer__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(user);\n  insertInfosBeforeFirstChild(header, userModel.getUserInfos());\n  header.insertAdjacentHTML('beforeend', userModel.getUserImage());\n}\n\nasync function launch() {\n  await init();\n  displayHeader();\n  updateContainer();\n  document.addEventListener('click', handleClick);\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  launch();\n  window.addEventListener('resize', _src_scripts_utils_enventList__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n  (0,_src_scripts_utils_enventList__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n});\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/pages/photographer.js?");

/***/ }),

/***/ "./src/scripts/templates/media.js":
/*!****************************************!*\
  !*** ./src/scripts/templates/media.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/scripts/utils/constant */ \"./src/scripts/utils/constant.js\");\n/* eslint-disable no-use-before-define */\n// eslint-disable-next-line import/no-unresolved\n\n\nconst overlay = document.querySelector('.modal-overlay');\nconst elementsToHide = document.querySelectorAll('body > :not(.modal-overlay');\nlet currentModalIndex = null;\n\nfunction mediaTemplate(sortedMedias, photographerName, index) {\n  const media = sortedMedias[index];\n  const { title, likes, date } = media;\n\n  // *****************************\n  //     FUnCTIONS\n  // *****************************\n\n  function accessibilityHide() {\n    elementsToHide.forEach((element) => {\n      element.setAttribute('aria-hidden', 'true');\n    });\n  }\n\n  function accessibilityShow() {\n    elementsToHide.forEach((element) => {\n      element.removeAttribute('aria-hidden');\n    });\n  }\n\n  function createLegend(parent, newTitle) {\n    const legend = document.createElement('figcaption');\n    legend.setAttribute('class', 'legend');\n    const legendTitle = document.createElement('p');\n    legendTitle.setAttribute('class', 'legend-title');\n    legendTitle.innerText = newTitle;\n    legend.appendChild(legendTitle);\n    parent.appendChild(legend);\n    return legend;\n  }\n\n  function createArrow(parent, direction) {\n    const arrow = document.createElement('img');\n    arrow.setAttribute('class', `arrow ${direction}`);\n    arrow.setAttribute('aria-label', 'close modale');\n    arrow.src = `${_src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/assets/icons/chevron-up-solid.svg`;\n    parent.appendChild(arrow);\n    return arrow;\n  }\n\n  // évite de créér des evenements à l'infini\n  function stopKeyboardHandler() {\n    document.removeEventListener('keydown', keyboardHandler);\n  }\n\n  function closeModale() {\n    overlay.innerHTML = null;\n    overlay.style.display = 'none';\n    accessibilityShow();\n    document.body.classList.remove('modal-open');\n    stopKeyboardHandler();\n  }\n\n  function keyboardHandler(e) {\n    switch (e.key) {\n      case 'ArrowLeft':\n        next(-1, currentModalIndex);\n        break;\n      case 'ArrowRight':\n        next(1, currentModalIndex);\n        break;\n      case 'Escape':\n        e.preventDefault();\n        closeModale();\n        break;\n      default:\n    }\n  }\n\n  // passe à la photo suivante/précédente\n  function next(direction, modalIndex) {\n    const newIndex = modalIndex + direction;\n    const lastIndex = sortedMedias.length - 1;\n    const newModalIndex = newIndex < 0 ? lastIndex : newIndex % sortedMedias.length;\n    stopKeyboardHandler();\n    return getItemModal(newModalIndex);\n  }\n  function createXMark(parent) {\n    const xmark = document.createElement('img');\n    xmark.setAttribute('class', 'xmark');\n    xmark.setAttribute('aria-label', 'close modale');\n    xmark.src = `${_src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/assets/icons/close.svg`;\n    // close modal event\n    xmark.addEventListener('click', closeModale);\n    parent.appendChild(xmark);\n  }\n\n  // Evenements click des fleches de la modale\n  function switchItem(arrow, direction, modalIndex) {\n    arrow.addEventListener('click', () => next(direction, modalIndex), {\n      once: true,\n    });\n  }\n\n  function createItem(newIndex) {\n    const newMedia = sortedMedias[newIndex];\n    const isImage = !!newMedia.image;\n    const file = 'image' in newMedia ? newMedia.image : newMedia.video;\n    const firstName = photographerName.split(' ')[0];\n    const newMediaPath = `${_src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/assets/images/${firstName}/${file}`;\n    const container = document.createElement('figure');\n    let item;\n    // create the image/video\n    if (isImage) {\n      item = new Image();\n      const imgWebp = newMediaPath.replace('jpg', 'webp');\n      item.src = imgWebp;\n      container.setAttribute('class', 'image');\n    } else {\n      item = document.createElement('video');\n      item.src = `${_src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/assets/images/${firstName}/${newMedia.video}`;\n      item.poster = '';\n      item.controls = false;\n      const track = item.addTextTrack('subtitles', 'Sous-titres', 'en');\n      track.addCue(new VTTCue(0, 5, media.title));\n      track.mode = 'hidden';\n      container.setAttribute('class', 'video');\n    }\n    item.setAttribute('class', 'media');\n    item.setAttribute('aria-label', title);\n    item.setAttribute('data-index', newIndex);\n    item.title = date;\n    container.appendChild(item);\n    const legend = createLegend(container, newMedia.title);\n    return { container, legend, isImage };\n  }\n\n  // crée la modale de l'image\n  function getItemModal(modalIndex) {\n    currentModalIndex = modalIndex;\n    const item = createItem(modalIndex);\n    accessibilityHide();\n    item.container.setAttribute('class', 'modal-item-container');\n    // ajoute les controles de la video\n    if (item.container.isImage) {\n      item.container.querySelector('.media').controls = true;\n    }\n    // crée les boutons de la modale\n    createXMark(item.container);\n    const arrowRight = createArrow(item.container, 'right');\n    const arrowLeft = createArrow(item.container, 'left');\n    switchItem(arrowRight, 1, modalIndex);\n    switchItem(arrowLeft, -1, modalIndex);\n    // efface la modale puis rajoute la nouvelle\n    overlay.style.display = 'flex';\n    overlay.innerHTML = null;\n    overlay.appendChild(item.container);\n    document.body.appendChild(overlay);\n    // ajoute les évenements à la modale\n    document.addEventListener('keydown', keyboardHandler);\n    document.body.classList.add('modal-open');\n  }\n\n  // créé les vignettes de présentation des medias\n  function getCardItem() {\n    const item = createItem(index);\n    const icon = document.createElement('span');\n    const likeCount = document.createElement('span');\n\n    icon.setAttribute('class', 'icon');\n    item.container.appendChild(icon);\n    item.container.classList.add('item-container');\n    item.container.addEventListener('keydown', (e) => {\n      if (e.key === 'Enter' || e.key === 'Space') {\n        getItemModal(index);\n      }\n    });\n    likeCount.setAttribute('class', 'like-count');\n    likeCount.innerText = likes;\n    item.legend.appendChild(likeCount);\n    icon.addEventListener('click', () => getItemModal(index));\n    return item.container;\n  }\n\n  return {\n    getCardItem,\n  };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mediaTemplate);\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/templates/media.js?");

/***/ }),

/***/ "./src/scripts/templates/photographer.js":
/*!***********************************************!*\
  !*** ./src/scripts/templates/photographer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constant */ \"./src/scripts/utils/constant.js\");\n\n\nfunction photographerTemplate(photographer) {\n  const {\n    name, city, country, price, tagline, id, portrait,\n  } = photographer;\n  const format = portrait.replace('jpg', 'webp');\n  const picture = `${_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/assets/images/Photographers/${format}`;\n\n  function getUserCardDOM() {\n    return `\n            <a href=\"${_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/pages/photographer.html?id=${id}\" aria-label=\"${name}\"\n            class=\"profile-card\">\n                <div class=\"profile-container\">\n                    <img width=\"200\" height=\"200\"\n                        src=\"${picture}\"\n                        aria-label=\"${name}\"\n                        class=\"profile\">\n                </div>\n                <h2>${name}</h2>\n                <h3 class=\"locality\">${city}, ${country}</h3>\n                <p class=\"tagline\">${tagline}</p>\n                <p class=\"price\">${price}/jours</p>\n            </a>\n        `;\n  }\n\n  function getUserImage() {\n    return `\n            <div class=\"profile-container\">\n                <img width=\"200\" height=\"200\"\n                    src=\"${picture}\"\n                    aria-label=\"${name}\"\n                    class=\"profile\"\n                >\n            </div>\n        `;\n  }\n\n  function getUserInfos() {\n    return `\n            <div class=\"information\">\n                <div class=\"information-container\">\n                    <h2>${name}</h2>\n                    <h3 class=\"locality\">${city}, ${country}</h3>\n                    <p class=\"tagline\">${tagline}</p>\n                </div>\n            </div>\n        `;\n  }\n\n  return {\n    getUserCardDOM,\n    getUserImage,\n    getUserInfos,\n  };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (photographerTemplate);\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/templates/photographer.js?");

/***/ }),

/***/ "./src/scripts/utils/constant.js":
/*!***************************************!*\
  !*** ./src/scripts/utils/constant.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst getUrl = () => {\n  if (window.location.origin === 'https://ebenyoub.github.io') {\n    return `${window.location.origin}/Fisheye`;\n  }\n  return window.location.origin;\n};\n\nconst BASE_URL = getUrl();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BASE_URL);\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/utils/constant.js?");

/***/ }),

/***/ "./src/scripts/utils/enventList.js":
/*!*****************************************!*\
  !*** ./src/scripts/utils/enventList.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/scripts/utils/constant */ \"./src/scripts/utils/constant.js\");\n// eslint-disable-next-line import/no-unresolved\n\n\nfunction updateLogoSource() {\n  const logoImage = document.querySelector('.logo');\n\n  if (window.innerWidth < 500) {\n    logoImage.src = `${_src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/assets/icons/logo_min.png`;\n  } else {\n    logoImage.src = `${_src_scripts_utils_constant__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/src/assets/icons/logo.png`;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateLogoSource);\n\n\n//# sourceURL=webpack://fisheye/./src/scripts/utils/enventList.js?");

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