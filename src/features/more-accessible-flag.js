import { getAuthString } from "../libs/utils";
import { getAllComments, createSiblingLoader } from "../libs/dom-utils";
import { paths } from "../libs/paths";

const loaderCustomStyle = `
	height: 9px;
	margin-right: 5px;
`;

function init() {
  const items = getAllComments();

  for (const item of items) {
    const separatorPipe = document.createTextNode("| ");
    const flagButton = document.createElement("a");
    flagButton.innerText = "flag";
    flagButton.classList.add("__rhn__flag-button");
    flagButton.style.marginRight = "4px";

    const headSpan = item.querySelector("span.comhead");
    const navsSpan = item.querySelector("span.navs");

    headSpan.insertBefore(separatorPipe, navsSpan);
    headSpan.insertBefore(flagButton, navsSpan);
  }

  for (const item of items) {
    const { id } = item;
    const flagButton = item.querySelector(".__rhn__flag-button");
    flagButton.href = "javascript:void(0)";

    let ongoingFlag = false;
    let flagged = false;

    flagButton.addEventListener("click", async () => {
      if (ongoingFlag) {
        return;
      }

      ongoingFlag = true;

      const loader = createSiblingLoader(flagButton, loaderCustomStyle);

      const auth = await getAuthString(id);
      const url = `https://news.ycombinator.com/flag?id=${id}&auth=${auth}${
        flagged ? "&un=t" : ""
      }`;

      await fetch(url).then(() => loader.remove());

      flagged = !flagged;
      flagButton.innerHTML = flagged ? "unflag" : "flag";

      ongoingFlag = false;
    });
  }

  return true;
}

const details = {
  id: "more-accessible-flag",
  pages: {
    include: paths.comments,
    exclude: ["/jobs"],
  },
  loginRequired: true,
  init,
};

export default details;
