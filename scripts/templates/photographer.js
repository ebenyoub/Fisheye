async function photographerTemplate(photographer) {
    console.log(photographer)
    const { name, portrait, city, country, price, tagline, id } = photographer;
    const portrait_webp = portrait.replace('.jpg', '.webp');
    const picture = `assets/images/Photographers/${portrait_webp}`;

    function getUserCardDOM() {
        
        const link = document.createElement('a');
        link.setAttribute('href', `/photographer.html?id=${id}`);
        link.setAttribute('aria-label', name);
        link.setAttribute('class', 'profile-card');

        const container = document.createElement('div')
        container.setAttribute('class', 'profile-container')
        link.appendChild(container);

        const img = new Image(200, 200);
        img.src = picture;
        img.setAttribute("aria-label", name);
        img.setAttribute("class", "profile")
        img.loading = 'eager'
        container.appendChild(img)

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
    return { name, picture, getUserCardDOM }
}
