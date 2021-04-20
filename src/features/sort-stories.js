import { createOptionsBar, getGroupedStories } from "../libs/dom-utils";
import { paths } from "../libs/paths";

function updateStoriesHtml(stories) {
  const itemlistTable = document.querySelector("table.itemlist > tbody");
  const moreRow = itemlistTable.lastElementChild;
  const morespaceRow = moreRow.previousElementSibling;

  let extraItems = [];
  if (window.location.pathname === "/show") {
    extraItems = [
      ...document.querySelectorAll("table.itemlist > tbody > tr"),
    ].slice(0, 3);
  }

  itemlistTable.innerHTML = "";
  itemlistTable.append(...extraItems);

  for (const story of stories) {
    for (const element of story.elements) {
      itemlistTable.append(element);
    }
  }

  itemlistTable.append(morespaceRow, moreRow);
}

function sort() {
  const method = document.querySelector("#sort-stories-input").value;
  const stories = getGroupedStories(document.querySelector("table.itemlist"));

  switch (method) {
    case "time": {
      stories.sort((a, b) => (a.id < b.id ? 1 : -1));
      break;
    }

    case "score": {
      stories.sort((a, b) => (a.score < b.score ? 1 : -1));
      break;
    }

    case "comments/score ratio": {
      stories.sort((a, b) => {
        const ratioA = (a.commentsCount ? a.commentsCount : 0) / a.score;
        const ratioB = (b.commentsCount ? b.commentsCount : 0) / b.score;

        return ratioA < ratioB ? 1 : -1;
      });
      break;
    }

    case "default":
    default: {
      stories.sort((a, b) => (a.defaultRank > b.defaultRank ? 1 : -1));
      break;
    }
  }

  updateStoriesHtml(stories);
}

function init(metadata) {
  const optionsBar = createOptionsBar(metadata.options.optionsBarPosition);
  const sortLabel = document.createElement("label");
  const sortSelect = document.createElement("select");
  const reverseButton = document.createElement("a");

  sortLabel.innerHTML = "sort stories:&nbsp;";
  sortLabel.setAttribute("for", "sort-stories-input");

  sortSelect.id = "sort-stories-input";
  sortSelect.innerHTML = "";

  reverseButton.innerHTML = "reverse";
  reverseButton.href = "javascript:void(0)";

  ["default", "time", "score", "comments/score ratio"].forEach((opt) => {
    sortSelect.innerHTML += `<option value="${opt}">${opt}</option>`;
  });

  if (document.querySelector("#auto-refresh-input")) {
    const { firstChild } = optionsBar;
    optionsBar.insertBefore(sortLabel, firstChild);
    optionsBar.insertBefore(sortSelect, firstChild);
    optionsBar.insertBefore(reverseButton, firstChild);
  } else {
    optionsBar.append(sortLabel, sortSelect, reverseButton);
  }

  sortSelect.addEventListener("change", sort);
  reverseButton.addEventListener("click", () => {
    const stories = getGroupedStories(document.querySelector("table.itemlist"));
    updateStoriesHtml(stories.reverse());
  });

  return true;
}

const details = {
  id: "sort-stories",
  pages: {
    include: paths.stories,
    exclude: ["/front", "/jobs"],
  },
  loginRequired: false,
  awaitInit: true,
  init,
};

export default details;

export { sort as sortStories };
