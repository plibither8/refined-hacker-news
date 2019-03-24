import OptionsSync from 'webext-options-sync';

new OptionsSync().define({
	defaults: {
		disabledFeatures: '',
		customCSS: '',
		logging: true,
		autoRefreshEnabled: false,
		autoRefreshValue: 0
	}
});

browser.runtime.onMessage.addListener(
	(request, sender) => {
		if (request.url) {
			browser.tabs.create({
				url: request.url,
				active: false,
				index: sender.tab.index + 1
			});
		}
	}
);
