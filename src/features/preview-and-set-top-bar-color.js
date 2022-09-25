import { getPageDom } from "../libs/utils";
import { elementInScrollView, createSiblingLoader } from "../libs/dom-utils";

function loopAndCreate(colorRows, form) {
  const topbar = document.querySelector("table#hnmain > tbody > tr > td");
  const topColorInput = form.querySelector('input[name="topc"]');
  const loaderCustomStyle = `
		height: 10px;
		margin-top: 5px;
	`;

  for (const row of colorRows) {
    if (!elementInScrollView(row) && row.getBoundingClientRect().top >= 0) {
      break;
    }

    const color = row.innerText.trim();

    row.innerHTML +=
      '<td><a href="javascript:void(0)">preview</td><td><a href="javascript:void(0)">set</td>';
    const [preview, set] = row.querySelectorAll("a");

    preview.addEventListener("click", () => {
      topbar.bgColor = color;
    });

    set.addEventListener("click", async () => {
      topbar.bgColor = color;
      topColorInput.value = color;

      const loaderSibling = row.querySelector("td:last-child");
      const loader = createSiblingLoader(loaderSibling, loaderCustomStyle);

      await fetch("/xuser", {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
      });

      loader.remove();
    });

    row.classList.add("__rhn__is-set");
  }
}

async function init(metadata) {
  const userPage = await getPageDom(
    `https://news.ycombinator.com/user?id=${metadata.user}`
  );
  const form = userPage.querySelector("form.profileform");
  form.classList.add("__rhn__no-display");
  form.target = "_blank";
  document.body.append(form);

  const topColorInput = form.querySelector('input[name="topc"]');
  if (!topColorInput) {
    return false;
  }

  const colorRowTable = document
    .querySelectorAll("table#hnmain > tbody > tr")[2]
    .querySelector("table");
  let colorRows = colorRowTable.querySelectorAll("tbody > tr");
  colorRowTable.classList.add("__rhn__top-colors");

  loopAndCreate(colorRows, form);

  window.addEventListener("scroll", () => {
    colorRows = colorRowTable.querySelectorAll(
      "tbody > tr:not(.__rhn__is-set)"
    );
    loopAndCreate(colorRows, form);
  });

  return true;
}

const details = {
  id: "quickly-set-top-bar-color",
  pages: {
    include: ["/topcolors"],
    exclude: [],
  },
  loginRequired: true,
  init,
};

export default details;
