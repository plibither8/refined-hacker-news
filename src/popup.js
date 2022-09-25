import fitTextarea from "fit-textarea";
import OptionsSync from "webext-options-sync";
import indentTextarea from "indent-textarea";

const optionsStorage = new OptionsSync({ logging: false });

fitTextarea.watch("textarea");
indentTextarea.watch("textarea");

// Set border color of popup to topcolor of navbar on HN
(async () => {
  document.body.style.borderColor =
    (await browser.storage.sync.get()).topcolor || "#ff6000";
})();

// Live changing of indentation width on comments
let activeItemTabs;
(async () => {
  activeItemTabs = await browser.tabs.query({
    url: "*://news.ycombinator.com/item?id=*",
  });
})();

const indentWidthInput = document.querySelector(
  'input[name="commentsIndentWidth"]'
);
indentWidthInput.addEventListener("input", () => {
  for (const tab of activeItemTabs) {
    browser.tabs.sendMessage(tab.id, {
      indentWidth: indentWidthInput.value,
    });
  }
});

// Enable opening of popup anchor links in a new tab
const links = document.querySelectorAll("a:not(.preset)");
for (const link of links) {
  link.addEventListener("click", () => browser.tabs.create({ url: link.href }));
}

// Custom CSS presets
const cssPresets = {
  darkMode: `
		body {
			background-color: black !important;
			filter: invert(90%) hue-rotate(180deg) !important;
		}
		.__rhn__profile-dropdown {
			background-color: #f6f6ef !important;
		}
	`,
};

const trim = (str) => str.replace(/\n\t\t/g, "\n");

const customCssTextarea = document.querySelector('textarea[name="customCSS"]');
const presetLinks = document.querySelectorAll("a.preset");
for (const link of presetLinks) {
  link.addEventListener("click", () => {
    const { preset } = link.dataset;
    customCssTextarea.value +=
      `\n\n/* Preset: ${preset} */` + trim(cssPresets[link.dataset.preset]);
    customCssTextarea.value = customCssTextarea.value.trim();
    optionsStorage.set({ customCSS: customCssTextarea.value });
  });
}

// Watch and sync the form
optionsStorage.syncForm("#options-form");
