// Crée une classe de gestion des données

import { BASE_URL } from "../utils/constant";

async function loadData() {
    // récupère les données depuis le sessionStorage
    const cachedData = sessionStorage.getItem("data")
    if (cachedData) {
        console.log('Get from cache')
        return JSON.parse(cachedData)
    }

    console.log('Get from JSON')

    // récupère les données depuis le fichier JSON
    const data = await fetch(`${BASE_URL}/src/data/photographers.json`)
        .then(response => response.json());

    sessionStorage.setItem("data", JSON.stringify(data))

    return data;
}

export default loadData;