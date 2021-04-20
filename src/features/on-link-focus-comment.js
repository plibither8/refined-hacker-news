function init() {
  let isEnabled = false;

  const comments = document.querySelectorAll("tr.athing");
  for (const comment of comments) {
    const { id } = comment;
    const onStory = comment.querySelector("span.storyon a");
    if (onStory && id) {
      isEnabled = true;
      onStory.href += "#" + id;
    }
  }

  return isEnabled;
}

const details = {
  id: "on-link-focus-comment",
  pages: {
    include: ["*"],
    exclude: [],
  },
  loginRequired: false,
  init,
};

export default details;
