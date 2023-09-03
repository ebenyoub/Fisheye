export const BASE_URL = getUrl();

const getUrl = () => {
    if (window.location.origin === 'https://ebenyoub.github.io'){
        return window.location.origin + "/Fisheye";
    }
    return window.location.origin;
}