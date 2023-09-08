// eslint-disable-next-line import/no-unresolved
import BASE_URL from "@src/scripts/utils/constant";

function updateLogoSource() {
  const logoImage = document.querySelector(".logo");

  if (window.innerWidth < 500) {
    logoImage.src = `${BASE_URL}/src/assets/icons/logo_min.png`;
  } else {
    logoImage.src = `${BASE_URL}/src/assets/icons/logo.png`;
  }
}

export default updateLogoSource;
