import OptionsSync from 'webext-options-sync';

new OptionsSync().define({
	defaults: {
		disabledFeatures: '',
		customCSS: '',
		logging: true,
		autoRefreshEnabled: false,
		autoRefreshValue: 0,
		immediatelyCloseFavorite: false
	}
});

function createTab(url, sender) {
	return new Promise(resolve => {
		browser.tabs.create({
			url,
			active: false,
			index: sender.tab.index + 1
		}, async tab => {
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
			const tab = await createTab(request.url, sender);
			if (request.immediatelyCloseFavorite) {
				browser.tabs.remove(tab.id);
			}
		}
	}
);
