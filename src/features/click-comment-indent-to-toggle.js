import { getAllComments } from "../libs/dom-utils";
import { paths } from "../libs/paths";

function init() {
  const comments = getAllComments();
  for (const comment of comments) {
    const indentCell = comment.querySelector("td.ind");
    const toggleBtn = comment.querySelector("a.togg");

    indentCell.classList.add("__rhn__clickable-indent");
    indentCell.addEventListener("click", () => {
      toggleBtn.click();
    });
  }

  return true;
}

const details = {
  id: "click-comment-indent-to-toggle",
  pages: {
    include: paths.comments,
    exclude: [],
  },
  loginRequired: false,
  init,
};

export default details;
