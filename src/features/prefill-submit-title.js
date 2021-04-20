import { getUrlParams } from "../libs/utils";

function init(metadata) {
  switch (metadata.path) {
    case "/show":
    case "/shownew": {
      const pagetop = document.querySelector("span.pagetop");
      for (const link of pagetop.querySelectorAll("a")) {
        if (link.innerText === "submit") {
          link.href += "?title=Show HN:%20";
          break;
        }
      }

      break;
    }

    case "/ask": {
      const pagetop = document.querySelector("span.pagetop");
      for (const link of pagetop.querySelectorAll("a")) {
        if (link.innerText === "submit") {
          link.href += "?title=Ask HN:%20";
          break;
        }
      }

      break;
    }

    case "/submit": {
      const title = getUrlParams("title");
      document.querySelector('input[name="title"]').value = title ? title : "";

      break;
    }

    default:
      return false;
  }

  return true;
}

const details = {
  id: "prefill-submit-title",
  pages: {
    include: ["/show", "/shownew", "/ask", "/submit"],
    exclude: [],
  },
  loginRequired: false,
  init,
};

export default details;
