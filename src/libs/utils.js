// Rule assumes we don't want to leave it pending:
/* eslint-disable no-async-promise-executor */

import OptionsSync from 'webext-options-sync';

export const getPageDom = url => new Promise(async resolve => {
	const rawText = await fetch(url).then(res => res.text());
	const tempEl = document.createElement('div');
	tempEl.innerHTML = rawText;

	resolve(tempEl);
});

export const getAuthString = id => new Promise(async resolve => {
	const page = await getPageDom(`https://news.ycombinator.com/item?id=${id}`);
	const row = page.querySelector('table.fatitem td.subtext') || page.querySelector('table.fatitem span.comhead');
	const target = row.querySelector('a[href^="hide"]') || row.querySelector('a[href^="fave"]');
	const params = new URLSearchParams(target.href.replace('?', '&'));
	const auth = params.get('auth');
	resolve(auth);
});

export const isLoggedIn = () => Boolean(document.querySelector('a#me'));

export const getLoggedInUser = () => document.querySelector('a#me').innerText.split(' ')[0];

export const getOptions = new Promise(async resolve => {
	// Options defaults
	const options = {
		disabledFeatures: '',
		customCSS: '',
		logging: true,
		...await new OptionsSync().getAll()
	};

	if (options.customCSS.trim().length > 0) {
		const style = document.createElement('style');
		style.innerHTML = options.customCSS;
		document.head.append(style);
	}

	// Create logging function
	options.log = options.logging ? console.info : () => {};

	resolve(options);
});
