import OptionsSync from 'webext-options-sync';

import {initialiseSome} from '../libs/initialise';
import {getPageDom, optionsBarEnabledOptions} from '../libs/utils';
import {createOrGetOptionsBar} from '../libs/dom-utils';
import {paths} from '../libs/paths';

// For re-applying filters and sorting once new stories have been fetched
import {hideStories} from './hide-read-stories';
import {sortStories} from './sort-stories';

/**
 * Sets and clears the interval that refreshes items periodically
 * @param {Element} input - Checkbox which determines enables/disables auto-refresh interval
 * @param {Object} options - Extension options
 */
function handleInterval(input, options) {
	// Abort if input is disabled
	if (input.disabled) {
		return;
	}

	// If there already exists an interval, remove it to prevent multiple intervals being created
	if (window.refreshInterval) {
		clearInterval(window.refreshInterval);
	}

	// Minimum allowed duration is 1 second
	const duration = Math.ceil(Number(input.value) * 1000); // Milliseconds
	if (duration <= 0) {
		return;
	}

	window.refreshInterval = setInterval(() => {
		if (input.disabled) {
			clearInterval(window.refreshInterval);
			return;
		}

		refresh(options); // REFRESH!
	}, duration);
}

/**
 * Main refresh function, fetches new stories, inserts them into page DOM
 * and re-initialises a few features who's code was removed during the refresh
 * @param {Object} options - Extension options
 */
async function refresh(options) {
	// display loader gif
	const loader = document.querySelector('form#autoRefreshForm img');
	loader.classList.remove('__rhn__no-display');

	// fetch new stories and apply
	const page = await getPageDom(window.location);
	if (!page) {
		return false;
	}

	const newStories = page.querySelector('table.itemlist');
	document.querySelector('table.itemlist').innerHTML = newStories.innerHTML;

	// reinitialise a few features, namely:
	initialiseSome(
		'click-rank-to-vote-unvote',
		'open-story-links-in-new-tab',
		'more-accessible-favorite',
		'show-user-info-on-hover'
	);

	// thank you very much, hide loader gif please
	loader.classList.add('__rhn__no-display');

	// get all enabled features that are part of the options bar
	// and re-apply the filters and sorting
	const enabledOptions = optionsBarEnabledOptions(options);

	if (enabledOptions.includes('hide-read-stories')) {
		hideStories(options);
	}

	if (enabledOptions.includes('sort-stories')) {
		sortStories();
	}
}

function init(metadata) {
	const {options} = metadata;

	// create all necessary elements
	const optionsBar = createOrGetOptionsBar();
	const form = document.createElement('form');
	const check = document.createElement('input');
	const label = document.createElement('label');
	const input = document.createElement('input');
	const loader = document.createElement('img');

	check.type = 'checkbox';
	check.id = 'auto-refresh-check';
	check.style.marginLeft = '0px';
	check.name = 'autoRefreshEnabled';
	check.checked = options.autoRefreshEnabled; // set previously saved value

	label.innerHTML = 'auto refresh every&nbsp;';
	label.setAttribute('for', 'auto-refresh-check');

	input.type = 'number';
	input.id = 'auto-refresh-input';
	input.name = 'autoRefreshValue';
	input.value = options.autoRefreshValue; // set previously saved value

	// hide the loader gif initially
	loader.src = browser.extension.getURL('loader.gif');
	loader.classList.add('__rhn__no-display');

	// hacky and messy styling
	const enabledOptions = optionsBarEnabledOptions(options);
	if (enabledOptions.includes('hide-read-stories') || enabledOptions.includes('sort-stories')) {
		check.style.marginLeft = '8px';

		form.append('|');
		form.style.marginLeft = '10px';
	}

	form.id = 'autoRefreshForm';
	form.append(check, label, input, 'seconds', loader);
	optionsBar.append(form);

	input.disabled = !check.checked;
	handleInterval(input, options); // start the interval, please

	// dynamically change width (unnecessary but neat)
	input.addEventListener('input', () => {
		input.style.width = (input.value.length + 3) + 'ch';
	});

	// main listener for calling `handleInterval()`
	form.addEventListener('change', () => {
		const isChecked = check.checked;
		input.disabled = !isChecked;

		if (!isChecked) {
			loader.classList.add('__rhn__no-display');
		}

		handleInterval(input, options);
	});

	// sync form with extension options
	new OptionsSync({logging: false}).syncForm('#autoRefreshForm');
	return true;
}

const details = {
	id: 'auto-refresh',
	pages: {
		include: paths.stories,
		exclude: ['/front'] // no point in trying to refresh past stories
	},
	loginRequired: false,
	init
};

export default details;
