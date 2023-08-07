async function displayData(data) {
    const photographersSection = document.querySelector(".photographer_section");
    const photographers = data.photographers;
    console.log(photographers)

    for (const photographer of photographers) {
        const photographerModel = await photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    }
}

async function init() {
    // Récupère les datas des photographes
    const data = await DataFactory.create()
    displayData(data)
}

init();

