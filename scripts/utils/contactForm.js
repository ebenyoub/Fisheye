const elementsToHide = document.querySelectorAll('body > :not(#contact_modal');
const contactModal = document.querySelector('#contact_modal');
const contactButton = document.querySelector('.contact_button');
console.log(contactButton)

contactModal.addEventListener('click', e => {
    if (e.target === contactModal) {
        closeModal();
    }
});

contactButton.addEventListener('click', e => {
    e.preventDefault();
    console.log(e.target)
})

document.addEventListener('keydown', e => {
    if (document.body.classList.contains('modal-open')) {
        e.key === 'Escape' && closeModal();
    }
})

function displayModal() {
    const modal = document.getElementById("contact_modal");
    document.body.classList.add('modal-open');
    accessibilityHide();
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    document.body.classList.remove('modal-open');
    accessibilityShow();
    modal.style.display = "none";
}

function accessibilityHide() {
    elementsToHide.forEach(element => {
        element.setAttribute('aria-hidden', 'true');
    })
}

function accessibilityShow() {
    elementsToHide.forEach(element => {
        element.removeAttribute('aria-hidden');
    })
}
