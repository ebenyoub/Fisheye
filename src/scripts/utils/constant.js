const getUrl = () => {
  if (window.location.origin === "https://ebenyoub.github.io") {
    return `${window.location.origin}/Fisheye`;
  }
  return window.location.origin;
};

const BASE_URL = getUrl();

export default BASE_URL;
