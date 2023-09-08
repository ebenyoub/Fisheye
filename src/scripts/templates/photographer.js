import BASE_URL from "../utils/constant";

function photographerTemplate(photographer) {
  const {
    name, city, country, price, tagline, id, portrait,
  } = photographer;
  const format = portrait.replace("jpg", "webp");
  const picture = `${BASE_URL}/src/assets/images/Photographers/${format}`;

  function getUserCardDOM() {
    return `
            <a href="${BASE_URL}/src/pages/photographer.html?id=${id}" aria-label="${name}"
            class="profile-card">
                <div class="profile-container">
                    <img width="200" height="200"
                        src="${picture}"
                        aria-label="${name}"
                        class="profile">
                </div>
                <h2>${name}</h2>
                <h3 class="locality">${city}, ${country}</h3>
                <p class="tagline">${tagline}</p>
                <p class="price">${price}/jours</p>
            </a>
        `;
  }

  function getUserImage() {
    return `
            <div class="profile-container">
                <img width="200" height="200"
                    src="${picture}"
                    aria-label="${name}"
                    class="profile"
                >
            </div>
        `;
  }

  function getUserInfos() {
    return `
            <div class="information">
                <div class="information-container">
                    <h2>${name}</h2>
                    <h3 class="locality">${city}, ${country}</h3>
                    <p class="tagline">${tagline}</p>
                </div>
            </div>
        `;
  }

  return {
    getUserCardDOM,
    getUserImage,
    getUserInfos,
  };
}

export default photographerTemplate;
