class DataFactory {
    static async create(id = null) {
        return await getDatas()
            .then(data => new DataInstance(data, id))
    }
}

class DataInstance {
    constructor(data, id) {
        this.data = data
        this.id = id
    }

    get getPhotographers() {
        return this.data.photographers
    }

    get getMedia() {
        return this.data.media.filter(data => data.photographerId == this.id)
    }
}

async function getDatas() {
    // récupère les données depuis le sessionStorage
    const cachedData = sessionStorage.getItem("data")
    if (cachedData) {
        console.log('Get from cache')
        return JSON.parse(cachedData)
    }

    console.log('Get from JSON')

    // récupère les données depuis le fichier JSON
    const data = await fetch('data/photographers.json')
        .then(response => response.json())

    sessionStorage.setItem("data", JSON.stringify(data))

    return data;
}


