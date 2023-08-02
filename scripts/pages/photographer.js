async function init() {
    const params = new URLSearchParams(document.location.search)
    const id = params.get('id')

    // Récupère les medias par id
    const media = await DataFactory.create(id)
        .then(data => data.getMedia)
    
    console.log(`media(id = ${id})`, media)
}

init();