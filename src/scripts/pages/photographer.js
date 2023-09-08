/* eslint-disable import/no-unresolved */
import loadData from "@src/scripts/factories/photographer";
import photographerTemplate from "@src/scripts/templates/photographer";
import mediaTemplate from "@src/scripts/templates/media";
import updateLogoSource from "@src/scripts/utils/enventList";
import BASE_URL from "@src/scripts/utils/constant";

// -----------------------------
//         SORT HANDLE
// -----------------------------

const selectBtn = document.querySelector(".select-btn");
let selectList = document.querySelectorAll(".options li");
let activeOption = document.querySelector(".option.active");
let medias;
let user;

function isListed(element) {
  let result = false;
  selectList.forEach((li) => {
    if (li === element) {
      result = true;
    }
  });
  return result;
}

function itemFocus() {
  let tabindex = 4;
  const items = document.querySelectorAll(".item-container");
  items.forEach((item) => {
    if (document.body.classList.contains(".modal-open")) {
      item.setAttribute("tabindex", "-1");
    } else {
      item.setAttribute("tabindex", tabindex);
      item.addEventListener("focus", () =>
        item.classList.add("class", "item-focus"),
      );
      item.addEventListener("blur", () => item.classList.remove("item-focus"));
      tabindex += 1;
    }
  });
}

function sortMedia(userMedias, sort) {
  switch (sort) {
    case "favorite":
      return userMedias.sort((a, b) => b.likes - a.likes);
    case "date":
      return userMedias.sort((a, b) => {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return bDate - aDate;
      });
    default:
      return userMedias.sort((a, b) =>
        a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
      );
  }
}

function updateContainer(sort = "favorite") {
  const container = document.querySelector(".media-container");
  container.innerHTML = null;
  const sortedMedias = sortMedia(medias, sort);

  const indexedMedias = sortedMedias.map((media, index) => {
    const mediaModel = mediaTemplate(sortedMedias, user.name, index);
    return mediaModel.getCardItem(index);
  });

  indexedMedias.forEach((media) => {
    container.appendChild(media);
  });
  itemFocus();
}

async function sortUpdate(event) {
  event.preventDefault();
  const sort = event.target.getAttribute("data-sort");
  updateContainer(sort);
}

function toggleSelectBtn() {
  selectBtn.classList.toggle("open");
}

function closeSelectBtn() {
  selectBtn.classList.remove("open");
}

function updateActiveOption(newActiveOption) {
  activeOption.classList.remove("active");
  newActiveOption.classList.add("active");
  activeOption = newActiveOption;
}

function moveActiveOptionToTop() {
  const optionsContainer = document.querySelector(".options");
  optionsContainer.prepend(activeOption);
  selectList = document.querySelectorAll(".options li");
}

function handleClick(e) {
  if (isListed(e.target) && e.target.classList.contains("active")) {
    toggleSelectBtn();
  } else if (isListed(e.target) && !e.target.classList.contains("active")) {
    sortUpdate(e);
    updateActiveOption(e.target);
    moveActiveOptionToTop();
    toggleSelectBtn();
  } else {
    closeSelectBtn();
  }
}

// -----------------------------
//         INITIALISATION
// -----------------------------

async function init() {
  const param = new URLSearchParams(document.location.search).get("id");
  const id = parseInt(param, 10);
  const data = await loadData();
  user = data.photographers.find((photographer) => photographer.id === id);
  if (!user) {
    window.location.href = `${BASE_URL}/index.html`;
  }
  medias = data.media.filter((item) => item.photographerId === id);
  document.querySelector(".contact-name").innerHTML = user.name;
  document.querySelector(".link_home").href = `${BASE_URL}/index.html`;
}

function insertInfosBeforeFirstChild(parent, child) {
  parent.insertAdjacentHTML("afterbegin", child);
}

function displayHeader() {
  const header = document.querySelector(".photograph-header");
  const userModel = photographerTemplate(user);
  insertInfosBeforeFirstChild(header, userModel.getUserInfos());
  header.insertAdjacentHTML("beforeend", userModel.getUserImage());
}

async function launch() {
  await init();
  displayHeader();
  updateContainer();
  document.addEventListener("click", handleClick);
}

document.addEventListener("DOMContentLoaded", () => {
  launch();
  window.addEventListener("resize", updateLogoSource);
  updateLogoSource();
});
