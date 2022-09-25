import linkifyElement from "linkifyjs/element";

function init(metadata) {
  const currentUser = document.querySelector(".hnuser").innerText;
  if (currentUser === metadata.user) {
    return false;
  }

  const infoTable = document
    .querySelector("table#hnmain")
    .querySelectorAll("table")[1];
  for (const row of infoTable.querySelectorAll("tr")) {
    const headingsEl = row.querySelector("td");
    if (headingsEl.innerText === "about:") {
      linkifyElement(headingsEl.nextElementSibling, {
        attributes: {
          rel: "noopener",
        },
      });
    }
  }

  return true;
}

const details = {
  id: "linkify-user-about",
  pages: {
    include: ["/user"],
    exclude: [],
  },
  loginRequired: false,
  init,
};

export default details;
