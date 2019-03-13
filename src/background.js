browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({
		url: 'https://news.ycombinator.com'
	});
});
