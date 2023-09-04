import loadData from "@src/scripts/factories/photographer.js";
import photographerTemplate from "@src/scripts/templates/photographer.js";
import mediaTemplate from "@src/scripts/templates/media.js";
import { updateLogoSource } from "@src/scripts/utils/enventList";
import { BASE_URL } from "../utils/constant";


// -----------------------------
//         SORT HANDLE
// -----------------------------

const selectBtn = document.querySelector('.select-btn');
let selectList = document.querySelectorAll('.options li');
let activeOption = document.querySelector('.option.active');
let options = document.querySelector('.options');
let medias = null;
let user = null;

document.addEventListener('DOMContentLoaded', launch, { once: true });
window.addEventListener("resize", updateLogoSource);
updateLogoSource();

async function launch() {
    await init();
    displayHeader();
    updateContainer();
    document.addEventListener('click', handleClick);
}

function handleClick(e) {
    if (isListed(e.target) && e.target.classList.contains('active')) {
        toggleSelectBtn();
    } else if (isListed(e.target) && !e.target.classList.contains('active')) {
        sortUpdate(e);
        updateActiveOption(e.target);
        moveActiveOptionToTop();
        toggleSelectBtn();
    } else {
        closeSelectBtn();
    }
}

async function sortUpdate(event) {
    event.preventDefault();
    const sort = event.target.getAttribute('data-sort');
    updateContainer(sort);
}

function sortMedia(medias, sort) {
    switch (sort) {
        case 'favorite':
            return medias.sort((a, b) => b.likes - a.likes);
        case 'date':
            return medias.sort((a, b) => {
                const aDate = new Date(a.date).getTime();
                const bDate = new Date(b.date).getTime();
                return bDate - aDate;
            })
        case 'title':
            return medias.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));
    }
}

function isListed(element) {
    for (const li of selectList) {
        if (li === element) {
            return true;
        }
    }
    return false;
}

function toggleSelectBtn() {
    selectBtn.classList.toggle('open');
}

function closeSelectBtn() {
    selectBtn.classList.remove('open');
}

function updateActiveOption(newActiveOption) {
    activeOption.classList.remove('active');
    newActiveOption.classList.add('active');
    activeOption = newActiveOption;
}

function moveActiveOptionToTop() {
    const optionsContainer = document.querySelector('.options');
    optionsContainer.prepend(activeOption);
    selectList = document.querySelectorAll('.options li');
}

// -----------------------------
//         INITIALISATION
// -----------------------------

async function init() {
    const id = new URLSearchParams(document.location.search).get('id');
    const data = await loadData();
    user = data.photographers.find(user => user.id == id);
    if (!user) {
        location.href = `${BASE_URL}/index.html`;
    }
    medias = data.media.filter(item => item.photographerId == id);
    document.querySelector('.contact-name').innerHTML = user.name;
    document.querySelector(".link_home").href = `${BASE_URL}/index.html`;
}

function displayHeader() {
    const header = document.querySelector('.photograph-header');
    const userModel = photographerTemplate(user);
    insertInfosBeforeFirstChild(header, userModel.getUserInfos());
    header.appendChild(userModel.getUserImage());
}

function itemFocus() {
    let tabindex = 4;
    const items = document.querySelectorAll(".item-container");
    items.forEach(item => {
        if (document.body.classList.contains(".modal-open")) {
            item.setAttribute("tabindex", "-1");
        } else {
            item.setAttribute("tabindex", tabindex++);

            item.addEventListener('focus', () => item.classList.add('class', 'item-focus'));
            item.addEventListener('blur', () => item.classList.remove("item-focus"));
        }
    })
}

function updateContainer(sort = 'favorite') {
    const container = document.querySelector('.media-container');
    container.innerHTML = null;
    const sortedMedias = sortMedia(medias, sort);

    const indexedMedias = sortedMedias.map((media, index) => {
        const mediaModel = mediaTemplate(sortedMedias, user.name, index);
        return mediaModel.getCardItem(index);
    });

    indexedMedias.forEach(media => {
        container.appendChild(media);
    });
    itemFocus();
}

function insertInfosBeforeFirstChild(parent, child) {
    parent.insertBefore(child, parent.firstChild);
}
