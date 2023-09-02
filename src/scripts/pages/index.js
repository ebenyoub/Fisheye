import loadData from "@src/scripts/factories/photographer.js";
import photographerTemplate from "@src/scripts/templates/photographer.js";

async function displayData(data) {
    const photographersSection = document.querySelector(".photographer_section");

    for (const photographer of data.photographers) {
        data.id = photographer.id;
        const photographerModel = await photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    }
}

async function init() {
    // Récupère les datas des photographes
    const data = await loadData();
    displayData(data)
}

init();

