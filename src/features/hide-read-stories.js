import OptionsSync from 'webext-options-sync';

import {initialiseSome} from '../libs/initialise';
import {getPageDom} from '../libs/utils';
import {createOptionsBar, getGroupedStories} from '../libs/dom-utils';
import {paths} from '../libs/paths';

import sortStories from './sort-stories';

function requestVisitedStories() {
	const itemList = document.querySelector('table.itemlist');
	const stories = getGroupedStories(itemList);
	const links = {};

	for (const story of stories) {
		links[story.id] = [story.storyUrl, story.commentsLink.href];
	}

	browser.runtime.sendMessage({
		searchHistory: links
	});
}

function hideStories(idList, hide) {
	const itemList = document.querySelector('table.itemlist');
	const stories = getGroupedStories(itemList);

	for (const id of idList) {
		const story = stories.find(obj => obj.id === id);

		if (!story) {
			continue;
		}

		for (const el of story.elements) {
			if (hide) {
				el.classList.add('__rhn__no-display');
			} else {
				el.classList.remove('__rhn__no-display');
			}
		}
	}
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

	check.addEventListener('input', requestVisitedStories);

	browser.runtime.onMessage.addListener(request => {
		if (request.visitedIds) {
			hideStories(request.visitedIds, check.checked);
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
