import OptionsSync from 'webext-options-sync';

import initialise from '../libs/initialise';
import {getOptions, getPageDom} from '../libs/utils';
import {createOptionsBar} from '../libs/dom-utils';

function handleInterval(input) {
	if (input.disabled) {
		return;
	}

	if (window.refreshInterval) {
		clearInterval(window.refreshInterval);
	}

	const duration = Number(input.value) * 1000; // Milliseconds
	if (duration <= 0) {
		return;
	}

	window.refreshInterval = setInterval(() => {
		if (input.disabled) {
			clearInterval(window.refreshInterval);
			return;
		}

		refresh();
	}, duration);
}

async function refresh() {
	const loader = document.querySelector('form#autoRefreshForm img');
	loader.classList.remove('__rhn__no-display');

	const page = await getPageDom(window.location);
	if (!page) {
		return false;
	}

	const newStories = page.querySelector('table.itemlist');
	document.querySelector('table.itemlist').innerHTML = newStories.innerHTML;

	initialise(
		'click-rank-to-vote-unvote',
		'open-story-links-in-new-tab',
		'more-accessible-favorite',
		'show-user-info-on-hover'
	);

	loader.classList.add('__rhn__no-display');
}

async function init() {
	const options = await getOptions;

	const optionsBar = createOptionsBar();
	const form = document.createElement('form');
	const check = document.createElement('input');
	const label = document.createElement('label');
	const input = document.createElement('input');
	const loader = document.createElement('img');

	check.type = 'checkbox';
	check.id = 'auto-refresh-check';
	check.style.marginLeft = '0px';
	check.name = 'autoRefreshEnabled';
	check.checked = options.autoRefreshEnabled;

	label.innerHTML = 'auto refresh every&nbsp;';
	label.setAttribute('for', 'auto-refresh-check');

	input.type = 'number';
	input.id = 'auto-refresh-input';
	input.name = 'autoRefreshValue';
	input.value = options.autoRefreshValue;

	loader.src = browser.extension.getURL('loader.gif');
	loader.classList.add('__rhn__no-display');

	if (!options.disabledFeatures.includes('sort-stories')) {
		check.style.marginLeft = '8px';
		form.append('|');
	}

	form.id = 'autoRefreshForm';
	form.append(check);
	form.append(label);
	form.append(input);
	form.append('seconds');
	form.append(loader);
	optionsBar.append(form);

	input.disabled = !check.checked;
	handleInterval(input, options);

	input.addEventListener('input', () => {
		input.style.width = (input.value.length + 3) + 'ch';
	});

	form.addEventListener('change', () => {
		const isChecked = check.checked;
		input.disabled = !isChecked;

		if (!isChecked) {
			loader.classList.add('__rhn__no-display');
		}

		handleInterval(input, options);
	});

	new OptionsSync().syncForm('#autoRefreshForm');
	return true;
}

const details = {
	id: 'auto-refresh',
	pages: {
		include: [
			'/',
			'/news',
			'/active'
		],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
