
function photographerTemplate(photographer) {
    const { name, city, country, price, tagline, id, portrait } =  photographer;
    const format = portrait.replace('jpg', 'webp');
    const picture = `/assets/images/Photographers/${format}`;

    function getUserCardDOM() {
        const link = document.createElement('a');
        link.setAttribute('href', `/photographer.html?id=${id}`);
        link.setAttribute('aria-label', name);
        link.setAttribute('class', 'profile-card');

        const container = document.createElement('div');
        container.setAttribute('class', 'profile-container');
        link.appendChild(container);

        const img = new Image(200, 200);
        img.src = picture;
        img.setAttribute("aria-label", name);
        img.setAttribute("class", "profile");
        container.appendChild(img);

        const h2 = document.createElement('h2');
        h2.textContent = name;
        link.appendChild(h2);

        const local = document.createElement('h3');
        local.setAttribute("class", 'locality')
        local.textContent = `${city}, ${country}`;
        link.appendChild(local);

        const tag = document.createElement('p');
        tag.setAttribute("class", 'tagline')
        tag.textContent = tagline;
        link.appendChild(tag);

        const hono = document.createElement('p');
        hono.setAttribute("class", 'price')
        hono.textContent = `${price}/jours`;
        link.appendChild(hono);

        return (link);
    }

    function getUserImage() {
        const link = document.createElement('a');
        link.setAttribute('href', `/photographer.html?id=${id}`);
        link.setAttribute('aria-label', name);
        link.setAttribute('class', 'profile-card');

        const container = document.createElement('div');
        container.setAttribute('class', 'profile-container');
        link.appendChild(container);

        const img = new Image(200, 200);
        img.src = picture;
        img.setAttribute("aria-label", name);
        img.setAttribute("class", "profile");
        container.appendChild(img);
        return container;
    }

    function getUserInfos() {
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

        return headerInfo;
    }

    return {
        name,
        picture,
        getUserCardDOM,
        getUserImage,
        getUserInfos
    }
}

export default photographerTemplate;