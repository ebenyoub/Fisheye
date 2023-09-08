/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/no-unresolved
import BASE_URL from "@src/scripts/utils/constant";

const overlay = document.querySelector(".modal-overlay");
const elementsToHide = document.querySelectorAll("body > :not(.modal-overlay");
let currentModalIndex = null;

function mediaTemplate(sortedMedias, photographerName, index) {
  const media = sortedMedias[index];
  const { title, likes, date } = media;

  // *****************************
  //     FUnCTIONS
  // *****************************

  function accessibilityHide() {
    elementsToHide.forEach((element) => {
      element.setAttribute("aria-hidden", "true");
    });
  }

  function accessibilityShow() {
    elementsToHide.forEach((element) => {
      element.removeAttribute("aria-hidden");
    });
  }

  function createLegend(parent, newTitle) {
    const legend = document.createElement("figcaption");
    legend.setAttribute("class", "legend");
    const legendTitle = document.createElement("p");
    legendTitle.setAttribute("class", "legend-title");
    legendTitle.innerText = newTitle;
    legend.appendChild(legendTitle);
    parent.appendChild(legend);
    return legend;
  }

  function createArrow(parent, direction) {
    const arrow = document.createElement("img");
    arrow.setAttribute("class", `arrow ${direction}`);
    arrow.setAttribute("aria-label", "close modale");
    arrow.src = `${BASE_URL}/src/assets/icons/chevron-up-solid.svg`;
    parent.appendChild(arrow);
    return arrow;
  }

  // évite de créér des evenements à l'infini
  function stopKeyboardHandler() {
    document.removeEventListener("keydown", keyboardHandler);
  }

  function closeModale() {
    overlay.innerHTML = null;
    overlay.style.display = "none";
    accessibilityShow();
    document.body.classList.remove("modal-open");
    stopKeyboardHandler();
  }

  // passe à la photo suivante/précédente
  function next(direction, modalIndex) {
    const newIndex = modalIndex + direction;
    const lastIndex = sortedMedias.length - 1;
    const newModalIndex = newIndex < 0 ? lastIndex : newIndex % sortedMedias.length;
    stopKeyboardHandler();
    return getItemModal(newModalIndex);
  }

  function keyboardHandler(e) {
    switch (e.key) {
      case "ArrowLeft":
        next(-1, currentModalIndex);
        break;
      case "ArrowRight":
        next(1, currentModalIndex);
        break;
      case "Escape":
        e.preventDefault();
        closeModale();
        break;
      default:
    }
  }

  function createXMark(parent) {
    const xmark = document.createElement("img");
    xmark.setAttribute("class", "xmark");
    xmark.setAttribute("aria-label", "close modale");
    xmark.src = `${BASE_URL}/src/assets/icons/close.svg`;
    // close modal event
    xmark.addEventListener("click", closeModale);
    parent.appendChild(xmark);
  }

  // Evenements click des fleches de la modale
  function switchItem(arrow, direction, modalIndex) {
    arrow.addEventListener("click", () => next(direction, modalIndex), {
      once: true,
    });
  }

  function createItem(newIndex) {
    const newMedia = sortedMedias[newIndex];
    const isImage = !!newMedia.image;
    const file = "image" in newMedia ? newMedia.image : newMedia.video;
    const firstName = photographerName.split(" ")[0];
    const newMediaPath = `${BASE_URL}/src/assets/images/${firstName}/${file}`;
    const container = document.createElement("figure");
    let item;
    // create the image/video
    if (isImage) {
      item = new Image();
      const imgWebp = newMediaPath.replace("jpg", "webp");
      item.src = imgWebp;
      container.setAttribute("class", "image");
    } else {
      item = document.createElement("video");
      item.src = `${BASE_URL}/src/assets/images/${firstName}/${newMedia.video}`;
      item.poster = "";
      item.controls = false;
      const track = item.addTextTrack("subtitles", "Sous-titres", "en");
      track.addCue(new VTTCue(0, 5, media.title));
      track.mode = "hidden";
      container.setAttribute("class", "video");
    }
    item.setAttribute("class", "media");
    item.setAttribute("aria-label", title);
    item.setAttribute("data-index", newIndex);
    item.title = date;
    container.appendChild(item);
    const legend = createLegend(container, newMedia.title);
    return { container, legend, isImage };
  }

  // crée la modale de l'image
  function getItemModal(modalIndex) {
    currentModalIndex = modalIndex;
    const item = createItem(modalIndex);
    accessibilityHide();
    item.container.setAttribute("class", "modal-item-container");
    // ajoute les controles de la video
    if (item.container.isImage) {
      item.container.querySelector(".media").controls = true;
    }
    // crée les boutons de la modale
    createXMark(item.container);
    const arrowRight = createArrow(item.container, "right");
    const arrowLeft = createArrow(item.container, "left");
    switchItem(arrowRight, 1, modalIndex);
    switchItem(arrowLeft, -1, modalIndex);
    // efface la modale puis rajoute la nouvelle
    overlay.style.display = "flex";
    overlay.innerHTML = null;
    overlay.appendChild(item.container);
    document.body.appendChild(overlay);
    // ajoute les évenements à la modale
    document.addEventListener("keydown", keyboardHandler);
    document.body.classList.add("modal-open");
  }

  // créé les vignettes de présentation des medias
  function getCardItem() {
    const item = createItem(index);
    const icon = document.createElement("span");
    const likeCount = document.createElement("span");

    icon.setAttribute("class", "icon");
    item.container.appendChild(icon);
    item.container.classList.add("item-container");
    item.container.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === "Space") {
        getItemModal(index);
      }
    });
    likeCount.setAttribute("class", "like-count");
    likeCount.innerText = likes;
    item.legend.appendChild(likeCount);
    icon.addEventListener("click", () => getItemModal(index));
    return item.container;
  }

  return {
    getCardItem,
  };
}

export default mediaTemplate;
