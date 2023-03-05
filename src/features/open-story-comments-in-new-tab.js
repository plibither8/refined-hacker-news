function init(metadata) {
  const links = [
    ...(metadata.options.openCommentsInNewTab
      ? document.querySelectorAll("td.subtext .subline > a:last-child")
      : []),
  ];
  if (links.length === 0) {
    return false;
  }

  for (const link of links) {
    link.target = "_blank";
    link.rel = "noopener";
  }

  return true;
}

const details = {
  id: "open-story-comments-in-new-tab",
  pages: {
    include: ["*"],
    exclude: [],
  },
  loginRequired: false,
  runOnJobItems: true,
  init,
};

export default details;
