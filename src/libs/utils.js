// Rule assumes we don't want to leave it pending:
/* eslint-disable no-async-promise-executor */

import OptionsSync from "webext-options-sync";

// For optionsBarEnabledOptions function
import sortStories from "../features/sort-stories";
import hideReadStories from "../features/hide-read-stories";
import autoRefresh from "../features/auto-refresh";

import { paths } from "./paths";
import defaultConfigs from "./default-configs";
import features from "./features";

export function getPageDom(url) {
  return new Promise(async (resolve) => {
    if (!navigator.onLine) {
      console.error(
        "RHN:",
        `Network error: Cannot fetch ${url}.`,
        "Your computer seems to be offline :/"
      );
      return false;
    }

    const rawText = await fetch(url)
      .then((res) => res.text())
      .catch((error) => console.error(error));

    const tempEl = document.createElement("div");
    tempEl.innerHTML = rawText;

    resolve(tempEl);
  });
}

export function getAuthString(id) {
  return new Promise(async (resolve) => {
    const page = await getPageDom(`https://news.ycombinator.com/item?id=${id}`);
    if (!page) {
      return false;
    }

    const row =
      page.querySelector("table.fatitem td.subtext") ||
      page.querySelector("table.fatitem span.comhead");
    const target =
      row.querySelector('a[href^="hide"]') ||
      row.querySelector('a[href^="fave"]');
    const auth = getUrlParams("auth", target.href);

    resolve(auth);
  });
}

export function getUserData(path) {
  const BASE_URL = "https://news.ycombinator.com";

  return new Promise(async (resolve) => {
    let { username } = await browser.storage.local.get();
    let fetchedPage;
    let userElement;

    let favorites;

    if (username && [...paths.stories, ...paths.comments].includes(path)) {
      const FAVE_URL = `${BASE_URL}/favorites?${
        paths.comments.includes(path) ? "comments=t&" : ""
      }id=${username}`;
      fetchedPage = await getPageDom(FAVE_URL);
      userElement = fetchedPage.querySelector("a#me");

      if (userElement && username === userElement.innerText) {
        const favoriteElements = [
          ...fetchedPage.querySelectorAll("table.itemlist > tbody > tr.athing"),
        ];
        favorites = favoriteElements.map((item) => item.id);
      }
    } else {
      fetchedPage = await getPageDom(BASE_URL);
      userElement = fetchedPage.querySelector("a#me");
    }

    const topBarElements = fetchedPage.querySelectorAll(
      "table#hnmain > tbody > tr > td"
    );
    let actualTopBar = topBarElements[0];
    let topcolor = "#ff6600";
    if (
      actualTopBar.children.length === 1 &&
      actualTopBar.children[0].tagName === "IMG"
    ) {
      /**
       * We have a "black bar":
       *
       * HN sometimes places a black bar on top to honor notable people in the
       * CS/engineering space that have passed away. That bar is selector-
       * indistinguishable from the regular top bar.
       */
      actualTopBar = topBarElements[1];
    }
    if (
      !actualTopBar ||
      actualTopBar.children.length !== 1 ||
      actualTopBar.children[0].tagName !== "TABLE"
    ) {
      // Panic
      console.error(
        "RHN:",
        "Unexpedted DOM state: Our assumptions about the top bar have been broken",
        topBarElements
      );
    } else {
      topcolor = actualTopBar.getAttribute("bgcolor");
    }

    username = userElement ? userElement.innerText : undefined;
    await browser.storage.local.set({ username });

    resolve({
      username,
      topcolor,
      favorites,
    });
  });
}

export function getUrlParams(param, url) {
  const params = new URLSearchParams(
    (url || window.location.search).replace("?", "&")
  );
  return param ? params.get(param) : params;
}

export function optionsBarEnabledOptions(metadata) {
  const enabledOptions = [];
  metadata.logSkip = false;

  [sortStories, hideReadStories, autoRefresh].forEach((feat) => {
    if (features.isEnabled(feat, metadata)) {
      enabledOptions.push(feat.id);
    }
  });

  return enabledOptions;
}

export function isClickModified(event) {
  return (
    Boolean(event.button) ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  );
}

export const getOptions = new Promise(async (resolve) => {
  // Options defaults
  const options = {
    ...defaultConfigs,
    ...(await new OptionsSync().getAll()),
  };

  // Create logging function
  if (options.logging) {
    options.log = (method, ...content) => {
      console[method](...content);
    };
  } else {
    options.log = () => {};
  }

  resolve(options);
});

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
