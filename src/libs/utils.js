// Rule assumes we don't want to leave it pending:
/* eslint-disable no-async-promise-executor */

import OptionsSync from 'webext-options-sync';

// For optionsBarEnabledOptions function
import sortStories from '../features/sort-stories';
import hideReadStories from '../features/hide-read-stories';
import autoRefresh from '../features/auto-refresh';

import {getItemInfo} from './api';
import features from './features';

export function getPageDom(url) {
	return new Promise(async resolve => {
		if (!navigator.onLine) {
			console.error('RHN:', `Network error: Cannot fetch ${url}.`, 'Your computer seems to be offline :/');
			return false;
		}

		const rawText = await fetch(url)
			.then(res => res.text())
			.catch(error => console.error(error));

		const tempEl = document.createElement('div');
		tempEl.innerHTML = rawText;

		resolve(tempEl);
	});
}

export function getAuthString(id) {
	return new Promise(async resolve => {
		const page = await getPageDom(`https://news.ycombinator.com/item?id=${id}`);
		if (!page) {
			return false;
		}

		const row = page.querySelector('table.fatitem td.subtext') || page.querySelector('table.fatitem span.comhead');
		const target = row.querySelector('a[href^="hide"]') || row.querySelector('a[href^="fave"]');
		const auth = getUrlParams('auth', target.href);

		resolve(auth);
	});
}

export function isLoggedIn() {
	return Boolean(document.querySelector('a#me'));
}

export function getLoggedInUser() {
	return document.querySelector('a#me').innerText.split(' ')[0];
}

export function getUrlParams(param, url) {
	const params = new URLSearchParams((url || window.location.search).replace('?', '&'));
	return param ? params.get(param) : params;
}

export function getItemType(id) {
	return new Promise(async resolve => {
		id = id || getUrlParams('id');
		const details = await getItemInfo(id);

		resolve(details.type);
	});
}

export function optionsBarEnabledOptions(metadata) {
	const enabledOptions = [];
	metadata.logSkip = false;

	[sortStories, hideReadStories, autoRefresh].forEach(feat => {
		if (features.isEnabled(feat, metadata)) {
			enabledOptions.push(feat.id);
		}
	});

	return enabledOptions;
}

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

export const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
