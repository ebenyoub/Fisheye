const { BASE_URL } = require("./constant");

const logoImage = document.querySelector('.logo');

function updateLogoSource() {
    if (window.innerWidth < 500) {
        logoImage.src = `${BASE_URL}/src/assets/icons/logo_min.png`;
    } else {
        logoImage.src = `${BASE_URL}/src/assets/icons/logo.png`;
    }
}

// Appeler la fonction une fois au chargement de la page
updateLogoSource();

// Écouter les événements de redimensionnement de l'écran et mettre à jour la source de l'image
window.addEventListener("resize", updateLogoSource);
