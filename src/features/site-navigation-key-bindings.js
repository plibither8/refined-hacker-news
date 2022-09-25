import { isClickModified } from "../libs/utils";

function init(metadata) {
  const BASE_URL = "https://news.ycombinator.com";
  const { user } = metadata;

  window.addEventListener("keydown", (event) => {
    // Only accept 'ALT' + 'keycode'
    if ((!event.altKey || isClickModified(event)) && !event.altKey) {
      return;
    }

    let locationUrl;

    switch (event.keyCode) {
      // H: Home
      case 72: {
        locationUrl = BASE_URL;
        break;
      }

      // S: Submit
      case 83: {
        locationUrl = `${BASE_URL}/submit`;
        break;
      }

      // O: Show
      case 79: {
        locationUrl = `${BASE_URL}/show`;
        break;
      }

      // A: Ask
      case 65: {
        locationUrl = `${BASE_URL}/ask`;
        break;
      }

      // N: New
      case 78: {
        locationUrl = `${BASE_URL}/newest`;
        break;
      }

      // P: Profile
      case 80: {
        locationUrl = user ? `${BASE_URL}/user?id=${user}` : undefined;
        break;
      }

      // T: Threads
      case 84: {
        locationUrl = user ? `${BASE_URL}/threads?id=${user}` : undefined;
        break;
      }

      default:
        break;
    }

    if (locationUrl) {
      window.location.href = locationUrl;
    }
  });

  return true;
}

const details = {
  id: "site-navigation-key-bindings",
  pages: {
    include: ["*"],
    exclude: [],
  },
  loginRequired: false,
  init,
};

export default details;
