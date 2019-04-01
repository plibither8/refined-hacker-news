import OptionsSync from 'webext-options-sync';

import {initialiseSome} from '../libs/initialise';
import {getPageDom} from '../libs/utils';
import {createOptionsBar} from '../libs/dom-utils';
import {paths} from '../libs/paths';

import sortStories from './sort-stories';

function getVisitedStories() {
	const stories = document.querySelectorAll('tr.athing');
	const visited = [];
	for (const story of stories) {
		const title = story.querySelector('td.title');
		if (window.getComputedStyle(title).color === 'rgb(130, 130, 130)') {
			visited.push(
				story,
				story.nextElementSibling,
				story.nextElementSibling.nextElementSibling
			);
		}
	}

	return visited;
}

function init(metadata) {
	const {options, path} = metadata;

	const optionsBar = createOptionsBar();
	const form = document.createElement('form');
	const check = document.createElement('input');
	const label = document.createElement('label');

	check.type = 'checkbox';
	check.id = 'hide-read-stories-check';
	check.style.marginLeft = '0px';
	check.name = 'hideReadStories';
	check.checked = options.hideReadStories;

	label.innerHTML = 'hide read stories';
	label.setAttribute('for', 'hide-read-stories-check');

	if (!options.disabledFeatures.includes('sort-stories') &&
		sortStories.pages.include.includes(path)) {
		check.style.marginLeft = '8px';
		form.append('|');
	}

	form.id = 'hideReadStoriesForm';
	form.append(check, label);
	optionsBar.append(form);

	check.addEventListener('input', () => {
		const visitedStories = getVisitedStories();
		for (const story of visitedStories) {
			// Story.classList.toggle('__rhn__no-display');
		}
	});
	return true;
}

const details = {
	id: 'hide-read-stories',
	pages: {
		include: paths.stories,
		exclude: ['/past']
	},
	loginRequired: false,
	init
};

export default details;
