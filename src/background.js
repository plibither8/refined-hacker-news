import OptionsSync from 'webext-options-sync';

import defaultConfigs from './libs/default-configs';

new OptionsSync().define({
	defaults: defaultConfigs
});

function createTab(request, sender) {
	return new Promise(resolve => {
		browser.tabs.create({
			active: false,
			index: sender.tab.index + 1,
			...request
		}).then(async tab => {
			browser.tabs.onUpdated.addListener(function listener(tabId, info) {
				if (info.status === 'complete' && tabId === tab.id) {
					browser.tabs.onUpdated.removeListener(listener);
					resolve(tab);
				}
			});
		});
	});
}

browser.runtime.onMessage.addListener(
	async (request, sender) => {
		if (request.searchHistory) {
			const storyIds = request.searchHistory;
			const visitedIds = [];

			for (const [id, links] of Object.entries(storyIds)) {
				for (const link of links) {
					/* eslint-disable-next-line no-await-in-loop */
					const visits = await browser.history.getVisits({url: link});

					if (visits.length > 0) {
						visitedIds.push(Number(id));
						break;
					}
				}
			}

			browser.tabs.sendMessage(sender.tab.id, {visitedIds});
		}
	}
);
