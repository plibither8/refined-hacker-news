import { getAllComments } from "../libs/dom-utils";
import { paths } from "../libs/paths";

function getCommentIndentation(element) {
  const indentation = element.querySelector(".ind img").width / 40;
  return indentation;
}

function elementPosition(el) {
  const bodyRect = document.body.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  const top = rect.top - bodyRect.top;
  return { x: rect.left, y: top };
}

async function init() {
  const comments = getAllComments();
  let currentRootComment;

  for (const comment of comments) {
    const indentLevel = getCommentIndentation(comment);

    if (indentLevel === 0) {
      currentRootComment = comment;
      continue;
    }

    const instCurrentRootComment = currentRootComment;
    const toggle = document.createElement("a");

    toggle.innerText = "[collapse root]";
    toggle.href = "javascript:void(0)";
    toggle.classList.add("__rhn__collapse-root-comment");
    toggle.addEventListener("click", () => {
      instCurrentRootComment.querySelector("a.togg").click();
      const { x, y } = elementPosition(instCurrentRootComment);
      window.scrollTo(x, y);
    });

    comment.querySelector("span.comhead").append(toggle);
  }

  return true;
}

const details = {
  id: "collapse-root-comment",
  pages: {
    include: paths.comments,
    exclude: [],
  },
  loginRequired: false,
  init,
};

export default details;
