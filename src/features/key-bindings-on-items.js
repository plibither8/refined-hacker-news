import { keydown } from "../libs/handle-item-keydowns";
import { paths } from "../libs/paths";
import { getUrlParams } from "../libs/utils";

function init(metadata) {
  const { options, path } = metadata;

  const isCommentList = paths.comments.includes(path);

  const { openReferenceLinksInNewTab } = options;

  function getItemList() {
    const itemList = isCommentList
      ? [...document.querySelectorAll("tr.comtr:not(.noshow) td.default")]
      : [
          ...document.querySelectorAll(
            "table.itemlist tr.athing:not(.__rhn__no-display)"
          ),
        ];

    const moreLink = document.querySelector("a.morelink");
    if (moreLink) {
      itemList.push(moreLink);
    }

    return itemList;
  }

  function comboKeyCheck(event) {
    return event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
  }

  const itemData = {
    items: [],
    index: 0,
    activeItem: undefined,
    commentList: isCommentList,
  };

  window.addEventListener("keydown", (event) => {
    if (["TEXTAREA", "INPUT"].includes(document.activeElement.tagName)) {
      return;
    }

    if (document.activeElement.tagName === "A") {
      document.activeElement.blur();
    }

    itemData.items = getItemList();
    const combo = comboKeyCheck(event);

    // Universal
    switch (event.keyCode) {
      // J: Go down
      case 74:
        if (combo && !event.shiftKey) {
          return;
        }

        keydown.universal.down(itemData, event);
        return;

      // K: Go up
      case 75:
        if (combo && !event.shiftKey) {
          return;
        }

        keydown.universal.up(itemData, event);
        return;

      // Escape
      case 27:
        if (combo) {
          return;
        }

        keydown.universal.escape(itemData);
        return;

      // 0 - 9: Open Refence Links
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        if (combo && !event.shiftKey) {
          return;
        }

        if (
          [...paths.comments, ...paths.specialComments].includes(path) ||
          (paths.userSpecific.includes(path) &&
            getUrlParams("comments") === "t")
        ) {
          keydown.universal.openReferenceLink(
            event,
            itemData.activeItem,
            openReferenceLinksInNewTab
          );
        }

        return;

      default:
        break;
    }

    if (!itemData.activeItem) {
      return;
    }

    if (itemData.activeItem.matches("a.morelink")) {
      if (event.keyCode === 13) {
        if (event.ctrlKey || event.metaKey) {
          browser.runtime.sendMessage({
            url: itemData.activeItem.href,
          });
        } else {
          itemData.activeItem.click();
        }
      }

      return;
    }

    // If URL pathname is of the form: ".../[item|threads|etc]?id=..."
    // Basically, if it is a comment list
    if (isCommentList) {
      switch (event.keyCode) {
        // R: Reply
        case 82:
          if (combo) {
            return;
          }

          keydown.comment.reply(itemData.activeItem);

          return;

        // F: favorite comment/reply
        case 70:
          if (combo) {
            return;
          }

          keydown.comment.favorite(itemData.activeItem);

          return;

        // U: upvote comment/reply
        case 85:
          if (combo) {
            return;
          }

          keydown.comment.upvote(itemData.activeItem);

          return;

        // D: downvote comment/reply
        case 68:
          if (combo) {
            return;
          }

          keydown.comment.downvote(itemData.activeItem);

          return;

        // X: flag/unflag comment
        // Works only when 'Shift' key is pressed too
        case 88:
          if (!combo || (combo && !event.shiftKey)) {
            return;
          }

          keydown.comment.flag(itemData.activeItem);

          return;

        // Enter: Toggle
        case 13:
          if (combo) {
            return;
          }

          keydown.comment.toggle(itemData.activeItem);
          itemData.items = getItemList();
          break;

        default:
          break;
      }
      /* eslint-disable-next-line brace-style */
    }

    // For all other pages where this feature is active
    // Basically story lists
    else {
      const next = itemData.items[itemData.index].nextElementSibling;

      switch (event.keyCode) {
        // Enter: open story link
        case 13:
          if (combo && !(event.ctrlKey || event.metaKey)) {
            return;
          }

          keydown.story.open(itemData.activeItem, event);

          return;

        // U: upvote story
        case 85:
          if (combo) {
            return;
          }

          keydown.story.vote(itemData.activeItem, next);

          return;

        // H: hide story
        case 72:
          if (!combo || (combo && !event.shiftKey)) {
            return;
          }

          if (keydown.story.hide(next)) {
            itemData.items = getItemList();
            itemData.activeItem = itemData.items[itemData.index--];
          }

          return;

        // F: favorite story
        case 70:
          if (combo) {
            return;
          }

          keydown.story.favorite(itemData.activeItem, next);

          return;

        // X: flag/unflag story
        // Works only when 'Shift' key is pressed too
        case 88:
          if (!combo || (combo && !event.shiftKey)) {
            return;
          }

          keydown.story.flag(next);

          return;

        // C: open story comments
        // If 'Control/Command' key is pressed, comments will open in new tab
        case 67:
          if (combo && !(event.ctrlKey || event.metaKey)) {
            return;
          }

          keydown.story.comments(next, event);

          break;

        default:
          break;
      }
    }
  });

  return true;
}

const details = {
  id: "key-bindings-on-items",
  pages: {
    include: [
      ...paths.stories,
      ...paths.comments,
      ...paths.specialComments,
      ...paths.userSpecific,
    ],
    exclude: [],
  },
  loginRequired: false,
  init,
};

export default details;
