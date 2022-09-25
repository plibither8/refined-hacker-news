import fitTextarea from "fit-textarea";

import { newReplyTextareasObserver } from "../libs/dom-utils";
import { paths } from "../libs/paths";

// Dynamically change textarea height
function watchTextareas() {
  const textareas = document.querySelectorAll("textarea");

  for (const textarea of textareas) {
    fitTextarea.watch(textarea);
  }

  newReplyTextareasObserver((event) => {
    fitTextarea.watch(event.target);
  });

  return true;
}

// Dynamically increase / decrease title field length
function dynamicallyChangeWidth(path) {
  if (["/reply", "/user", ...paths.comments].includes(path)) {
    return false;
  }

  const titleInput = document.querySelector('input[name="title"]');
  if (!titleInput) {
    return false;
  }

  titleInput.style.width = "49ch";

  titleInput.addEventListener("input", () => {
    const { length } = titleInput.value;
    titleInput.style.width = length < 49 ? "49ch" : length + 1 + "ch";
  });

  return true;
}

// Show characters remaining beside title field
function charactersRemainging(path) {
  if (["/reply", "/newpoll", "/user", ...paths.comments].includes(path)) {
    return false;
  }

  const titleInput = document.querySelector('input[name="title"]');
  if (!titleInput) {
    return false;
  }

  const titleLengthLimit = 80;

  const span = document.createElement("span");
  span.classList.add("__rhn__characters-under");
  titleInput.nextElementSibling.classList.add("__rhn__characters-over");
  titleInput.parentElement.append(span);

  titleInput.addEventListener("input", () => {
    const { length } = titleInput.value;

    span.innerHTML =
      length <= titleLengthLimit
        ? `${titleLengthLimit - length} remaining`
        : "";
  });

  return true;
}

function init(metadata) {
  watchTextareas();
  dynamicallyChangeWidth(metadata.path);
  charactersRemainging(metadata.path);

  return true;
}

const details = {
  id: "input-field-tweaks",
  pages: {
    include: [...paths.forms, ...paths.comments, "/user"],
    exclude: ["/delete-confirm", "/changepw"],
  },
  loginRequired: false,
  init,
};

export default details;
