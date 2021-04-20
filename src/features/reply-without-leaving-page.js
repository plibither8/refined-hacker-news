import { getPageDom, isClickModified } from "../libs/utils";
import { getAllComments, createSiblingLoader } from "../libs/dom-utils";
import { paths } from "../libs/paths";

function init(metadata) {
  const searchParams = new URLSearchParams(window.location.search);
  if (metadata.path === "/item" && !searchParams.get("p")) {
    const replyForm = document.querySelector("table.fatitem form");
    if (!replyForm) {
      return false;
    }
  }

  const comments = getAllComments();
  for (const comment of comments) {
    comment.dataset.rhnFormInjected = "0";

    const buttons = [];
    ["reply", "edit", "delete-confirm"].forEach((action) => {
      const link = comment.querySelector(`a[href^="${action}"]`);
      if (link) {
        buttons.push(link);
      }
    });

    const replyDiv = comment.querySelector("div.reply");
    const ACTIVE_DATA = {
      form: undefined,
      button: undefined,
    };

    for (const button of buttons) {
      button.dataset.rhnActionName = button.innerText;

      button.addEventListener("click", async (event) => {
        if (isClickModified(event)) {
          return;
        }

        event.preventDefault();

        const { italiceQuotedText = false } = metadata.options;
        const wrapperCharacter = italiceQuotedText ? "*" : "";

        // Add '> ' before every new block of selection
        const selection = window
          .getSelection()
          .toString()
          .trim()
          .split("\n")
          .filter((str) => str.length > 0)
          .map((str) => "> " + wrapperCharacter + str + wrapperCharacter)
          .join("\n\n");

        if (ACTIVE_DATA.form) {
          // Removing currently present form
          ACTIVE_DATA.form = undefined;
          replyDiv.querySelector("form").remove();

          if (ACTIVE_DATA.button) {
            ACTIVE_DATA.button.innerText =
              ACTIVE_DATA.button.dataset.rhnActionName;
          }

          // Adding newly clicked form
          // eslint-disable-next-line no-negated-condition
          if (ACTIVE_DATA.button !== button) {
            button.click();
          } else {
            ACTIVE_DATA.button = undefined;
          }
        } else {
          const loader = createSiblingLoader(
            button,
            "height:9px;margin-left:5px;"
          );
          const page = await getPageDom(button.href);
          loader.remove();

          const form = page.querySelector("form");
          form.classList.add("__rhn__injected-form");

          ACTIVE_DATA.form = form;
          ACTIVE_DATA.button = button;

          button.innerText = "hide " + button.dataset.rhnActionName;
          replyDiv.append(form);

          const textarea = form.querySelector("textarea");
          if (textarea) {
            if (selection.length > 0) {
              textarea.value += `${
                textarea.value.length > 0 ? "\n\n" : ""
              }${selection}\n\n`;
            }

            textarea.focus();
          }
        }
      });
    }
  }

  return true;
}

const details = {
  id: "reply-without-leaving-page",
  pages: {
    include: paths.comments,
    exclude: [],
  },
  loginRequired: true,
  init,
};

export default details;
