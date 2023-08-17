function mediaTemplate(sortedMedias, photographerName, index) {
    const overlay = document.querySelector('.modal-overlay');
    const media = sortedMedias[index];
    const { title, likes, date } = media;

    function getCardItem() {
        const item = createItem(index, 350, 300);
        item.container.setAttribute('class', 'item-container');
        const likeCount = document.createElement('span');
        likeCount.setAttribute('class', 'like-count');
        likeCount.innerText = likes;
        item.legend.appendChild(likeCount)
        item.container.addEventListener('click', () => getItemModal(index))
        return item.container;
    }

    function getItemModal(modalIndex) {
        const height = 500;
        const width = (350 / 300) * height;
        const item = createItem(modalIndex, width, height);
        item.container.setAttribute('class', 'modal-item-container');
        createXMark(item.container, overlay);
        const arrowRight = createArrow(item.container, 'right');
        const arrowLeft = createArrow(item.container, 'left');
        switchItem(arrowRight, 1, modalIndex)
        switchItem(arrowLeft, -1, modalIndex)
        overlay.style.display = 'flex';
        overlay.innerHTML = null;
        overlay.appendChild(item.container);
        document.body.appendChild(overlay);
        document.body.classList.add('modal-open');
    }
    
    function switchItem(arrow, direction, modalIndex) {
        arrow.addEventListener('click', () => {
            const newIndex = modalIndex + direction;
            const lastIndex = sortedMedias.length - 1;
            const newModalIndex = newIndex < 0 ? lastIndex : newIndex % sortedMedias.length;
            getItemModal(newModalIndex);
        })
    }

    function createItem(newIndex, width, height) {
        const newMedia = sortedMedias[newIndex];
        const file = newMedia.hasOwnProperty('image') ? newMedia.image : newMedia.video;
        const firstName = photographerName.split(' ')[0];
        const newMediaPath = `/assets/images/${firstName}/${file}`;
        const container = document.createElement('figure');
        var item;
        // create the image/video
        if (newMedia.image) {
            item = new Image();
            const imgWebp = newMediaPath.replace('jpg', 'webp')
            item.src = imgWebp;
        } else {
            item = document.createElement('video');
            item.src = `/assets/images/${firstName}/${newMedia.video}`;
            item.controls = true;
        }
        item.width = width;
        item.height = height;
        item.setAttribute("class", "media");
        item.setAttribute("aria-label", title);
        item.setAttribute("data-index", newIndex)
        item.title = date;
        container.appendChild(item);
        const legend = createLegend(container, newMedia.title);
        return { container, legend };
    }
    
    return {
        getCardItem
    }
}

function createLegend(parent, title) {
    const legend = document.createElement('figcaption');
    legend.setAttribute('class', 'legend');
    const legendTitle = document.createElement('p');
    legendTitle.setAttribute('class', 'legend-title');
    legendTitle.innerText = title;
    legend.appendChild(legendTitle);
    parent.appendChild(legend);
    return legend;
}

function createArrow(parent, direction) {
    const arrow = document.createElement('img')
    arrow.setAttribute('class', `arrow ${direction}`);
    arrow.setAttribute('aria-label', 'close modale');
    arrow.src = "assets/icons/chevron-up-solid.svg";
    parent.appendChild(arrow);
    return arrow;
}

function createXMark(parent, overlay) {
    const xmark = document.createElement('img')
    xmark.setAttribute('class', 'xmark');
    xmark.setAttribute('aria-label', 'close modale');
    xmark.src = "assets/icons/close.svg";
    // close modal event
    xmark.addEventListener('click', () => {
        overlay.innerHTML = null;
        overlay.style.display = 'none';
        document.body.classList.remove('modal-open')
    })
    parent.appendChild(xmark);
}

export default mediaTemplate;