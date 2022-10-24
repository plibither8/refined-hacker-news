function init(metadata) {
  const links = [
    ...document.querySelectorAll("span.titleline a"),
    ...(metadata.options.openCommentsInNewTab
      ? document.querySelectorAll("table.itemlist td.subtext > span.subline > a:last-child")
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
  id: "open-story-links-in-new-tab",
  pages: {
    include: ["*"],
    exclude: [],
  },
  loginRequired: false,
  runOnJobItems: true,
  init,
};

export default details;
