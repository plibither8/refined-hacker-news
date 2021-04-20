export default function(activeItem) {
  // The array that will collect all reference links found
  // in the form of an object, containing the link's URL and
  // the index number.
  const links = [];

  const commentSpan = activeItem.querySelector("span.commtext");
  const children = [...commentSpan.children]; // Only collect Elements, not all nodes

  // This means that there are no children in the <span> element
  // and hence it is useless to check any further for reference links
  // assuming that all reference links are mentioned in a separate
  // paragraph of their own, hence creating <p> children.
  if (children.length === 0) {
    return links;
  }

  // This expression had been made by observing the general
  // pattern and syntax of numbered reference links seen on HN.
  // If this can be refined further, it would be great :)
  const indexMarkerRegex = /^\[?((\d))[\]:.]?[:.]?$/;

  for (const child of children) {
    // Here we are making sure that the child contains an anchor element to
    // detect whether there is in fact a link or not.
    const link = child.querySelector("a");
    if (!link) {
      continue;
    }

    // The first word of the first text node of the <p> tag aftering trimming
    // trailing whitespace.
    const splitText = child.childNodes[0].textContent.trim().split(" ");
    const stringToMatch =
      ["-", "*"].includes(splitText[0]) && splitText[1]
        ? splitText[1]
        : splitText[0];
    const matches = stringToMatch.match(indexMarkerRegex);

    if (!matches) {
      continue;
    }

    const index = Number(matches[1]);

    links.push({
      index,
      href: link.href,
    });
  }

  return links;
}
