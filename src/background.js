browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({
		url: 'https://news.ycombinator.com'
	});
});

// chrome.webRequest.onHeadersReceived.addListener(info => {
// 		const headers = info.responseHeaders;
// 		for (const [i, header] of headers.entries()) {
// 			if (header.name.toLowerCase() === 'content-security-policy') {
// 				headers[i].value = headers[i].value.replace('default-src', 'default-src console.firebase.google.com accounts.google.com');
// 				break;
// 			}
// 		}

// 		return {
// 			responseHeaders: headers
// 		};
// 	},
// 	{
// 		urls: ['<all_urls>']
// 	},
// 	['blocking', 'responseHeaders']
// );
