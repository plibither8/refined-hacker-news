import OptionsSync from 'webext-options-sync';

import features from '../libs/features';
import {getOptions} from '../libs/utils';
import {createOptionsBar} from '../libs/dom-utils';
import showFavoriteLinkOnFrontpage from './show-favorite-link-on-frontpage';

const handleInterval = input => {
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
};

const refresh = async () => {
	const rawText = await fetch(window.location).then(res => res.text());
	const tempEl = document.createElement('div');
	tempEl.innerHTML = rawText;
	
	const newStories = tempEl.querySelector('table.itemlist');
	document.querySelector('table.itemlist').innerHTML = newStories.innerHTML;
	
	showFavoriteLinkOnFrontpage.init();
};

const init = async () => {
	const options = await getOptions;

	const optionsBar = createOptionsBar();
	const form = document.createElement('form');
	const check = document.createElement('input');
	const label = document.createElement('label');
	const input = document.createElement('input');

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
	
	if (!options.disabledFeatures.includes('sort-stories')) {
		check.style.marginLeft = '8px';
		form.append(document.createTextNode('|'));
	}

	form.id = 'autoRefreshForm';
	form.append(check);
	form.append(label);
	form.append(input);
	form.append(document.createTextNode('seconds'));
	optionsBar.append(form);

	input.disabled = !check.checked;
	handleInterval(input);

	input.addEventListener('input', () => {
		input.style.width = (input.value.length + 3) + 'ch';
	});

	form.addEventListener('change', () => {
		input.disabled = !check.checked;
		handleInterval(input);
	})

	new OptionsSync().syncForm('#autoRefreshForm');
	return true;
};

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

features.add(details);

export default details;
