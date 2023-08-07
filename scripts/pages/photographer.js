async function init() {
    const params = new URLSearchParams(document.location.search)
    const id = params.get('id')
    const data = await DataFactory.create(id)
    const header = document.querySelector('.photograph-header')
    
    header.insertBefore(data.infos, header.firstChild)

    const container = document.createElement('div')
    container.setAttribute('class', 'profile-container')
    header.appendChild(container);

    const img = new Image(200, 200);
    img.src = `assets/images/Photographers/${data.picture}`;
    img.setAttribute("aria-label", data.name);
    img.setAttribute("class", "profile")
    img.loading = 'eager';
    container.appendChild(img);
}

init();