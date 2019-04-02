import OptionsSync from 'webext-options-sync';

new OptionsSync().define({
	defaults: {
		disabledFeatures: '',
		customCSS: '',
		logging: true,
		autoRefreshEnabled: false,
		autoRefreshValue: 0,
		immediatelyCloseFavorite: false,
		openReferenceLinksInNewTab: true
	}
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
		if (request.url) {
			const {immediatelyCloseFavorite} = request;
			delete request.immediatelyCloseFavorite;

			const tab = await createTab(request, sender);

			if (immediatelyCloseFavorite) {
				browser.tabs.remove(tab.id);
			}
		}

		else if (request.searchHistory) {
			const storyIds = request.searchHistory;
			const visitedIds = [];

			for (const [id, links] of Object.entries(storyIds)) {
				for (const link of links) {
					const visits = await browser.history.getVisits({ url: link });

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
