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

    get photographers() {
        return this.data.photographers
    }

    getPhotographerById(id) {
        return this.data.photographers.filter(data => data.photographerId == id)[0]
    }

    get media() {
        return this.data.media.filter(data => data.photographerId == this.id)
    }

    get name() {
        return this.data.photographers.filter(person => person.id == this.id)[0].name
    }

    get picture() {
        const image = this.data.photographers.filter(person => person.id == this.id)[0].portrait
        const image_webp = image.replace('.jpg', '.webp');
        return image_webp;
    }

    get image() {
        const container = document.createElement('div');
        const img = new Image(200, 200);
        container.setAttribute('class', 'profile-container');
        img.src = `assets/images/Photographers/${this.picture}`;
        img.setAttribute("aria-label", this.name);
        img.setAttribute("class", "profile");
        img.loading = 'eager';
        container.appendChild(img);
        return container;
    }

    get infos() {
        const photographer = this.data.photographers.filter(person => person.id == this.id)[0]
        const { name, city, country, tagline } = photographer;
        
        const headerInfo = document.createElement('div');
        headerInfo.setAttribute('class', 'information');

        const containerInfo = document.createElement('div');
        headerInfo.setAttribute('class', 'information-container');

        containerInfo.appendChild(headerInfo);

        const h2 = document.createElement('h2');
        h2.textContent = name;
        headerInfo.appendChild(h2);

        const local = document.createElement('h3');
        local.setAttribute("class", 'locality')
        local.textContent = `${city}, ${country}`;
        headerInfo.appendChild(local);

        const tag = document.createElement('p');
        tag.setAttribute("class", 'tagline')
        tag.textContent = tagline;
        headerInfo.appendChild(tag);

        return headerInfo
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


