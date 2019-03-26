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

browser.runtime.onMessage.addListener(
	(request, sender) => {
		if (request.url) {
			const newTab = browser.tabs.create({
				url: request.url,
				active: false,
				index: sender.tab.index + 1
			});

			if (request.immediatelyCloseFavorite) {
				newTab.then(tab => {
					browser.tabs.remove(tab.id);
				});
			}
		}
	}
);
