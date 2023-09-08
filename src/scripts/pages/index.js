/* eslint-disable import/no-unresolved */
import loadData from "@src/scripts/factories/photographer";
import photographerTemplate from "@src/scripts/templates/photographer";
import updateLogoSource from "@src/scripts/utils/enventList";

updateLogoSource();
window.addEventListener("resize", updateLogoSource);

async function displayData(originalData) {
  const photographersSection = document.querySelector(".photographer_section");
  const data = { ...originalData };
  // eslint-disable-next-line no-restricted-syntax
  for (const photographer of data.photographers) {
    data.id = photographer.id;
    // eslint-disable-next-line no-await-in-loop
    const photographerModel = await photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.insertAdjacentHTML("beforeend", userCardDOM);
  }
}

async function init() {
  // Récupère les datas des photographes
  const data = await loadData();
  displayData(data);
}

init();
