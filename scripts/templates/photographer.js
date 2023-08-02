function photographerTemplate(data) {
    const { name, portrait, city, country, price, tagline, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        
        const link = document.createElement('a');
        link.setAttribute('href', `/photographer.html?id=${id}`);
        link.setAttribute('aria-label', name);

        article.appendChild(link);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("aria-label", name);
        link.appendChild(img);

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

        return (article);
    }
    return { name, picture, getUserCardDOM }
}
