import { getAllComments } from "../libs/dom-utils";
import { paths } from "../libs/paths";

function init() {
  // More refinement might be required to cater to minor exception
  const backtickRegex = /`(.*?)`/g;

  const comments = getAllComments();

  for (const comment of comments) {
    const commentSpan = comment.querySelector("div.comment span.commtext");
    const monospacedHtml = commentSpan.innerHTML.replace(
      backtickRegex,
      "<code>$1</code>"
    );
    commentSpan.innerHTML = monospacedHtml;
  }

  return true;
}

const details = {
  id: "backticks-to-monospace",
  pages: {
    include: [...paths.comments, ...paths.specialComments],
    exclude: [],
  },
  loginRequired: false,
  init,
};

export default details;
