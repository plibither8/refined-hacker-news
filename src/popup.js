import fitTextarea from 'fit-textarea';
import OptionsSync from 'webext-options-sync';
import indentTextarea from 'indent-textarea';

fitTextarea.watch('textarea');
indentTextarea.watch('textarea');

// Set border color of popup to topcolor of navbar on HN
(async () => {
	document.body.style.borderColor = (await browser.storage.sync.get()).topcolor || '#ff6000';
})();

// Live changing of indentation width on comments
let activeItemTabs;
(async () => {
	activeItemTabs = await browser.tabs.query({url: '*://news.ycombinator.com/item?id=*'});
})();

const indentWidthInput = document.querySelector('input[name="commentsIndentWidth"]');
indentWidthInput.addEventListener('input', () => {
	for (const tab of activeItemTabs) {
		browser.tabs.sendMessage(tab.id, {
			indentWidth: indentWidthInput.value
		});
	}
});

const links = document.querySelectorAll('a');
for (const link of links) {
	link.addEventListener('click', () => browser.tabs.create({url: link.href}));
}

new OptionsSync({logging: false}).syncForm('#options-form');
