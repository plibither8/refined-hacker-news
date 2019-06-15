import OptionsSync from 'webext-options-sync';

import {optionsBarEnabledOptions} from '../libs/utils';
import {createOptionsBar, getGroupedStories} from '../libs/dom-utils';
import {paths} from '../libs/paths';

function requestVisitedStories(options) {
	const itemList = document.querySelector('table.itemlist');
	const stories = getGroupedStories(itemList);
	const links = {};

	for (const story of stories) {
		links[story.id] = [story.storyUrl];

		if (story.commentsLink && options.hideStoryCommentsPage) {
			links[story.id].push(story.commentsLink.href);
		}
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

		for (const element of story.elements) {
			if (hide) {
				element.classList.add('__rhn__no-display');
			} else {
				element.classList.remove('__rhn__no-display');
			}
		}
	}
}

function init(metadata) {
	const {options} = metadata;

	const optionsBar = createOptionsBar(options.optionsBarPosition);
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

	const enabledOptions = optionsBarEnabledOptions(metadata);
	if (enabledOptions.includes('sort-stories')) {
		check.style.marginLeft = '8px';

		form.append('|');
		form.style.marginLeft = '10px';
	}

	form.id = 'hideReadStoriesForm';
	form.append(check, label);
	optionsBar.append(form);

	requestVisitedStories(options);
	check.addEventListener('input', () => {
		requestVisitedStories(options);
	});

	browser.runtime.onMessage.addListener(request => {
		if (request.visitedIds) {
			hideStories(request.visitedIds, check.checked);
		}
	});

	new OptionsSync({logging: false}).syncForm('#hideReadStoriesForm');
	return true;
}

const details = {
	id: 'hide-read-stories',
	pages: {
		include: paths.stories,
		exclude: ['/front']
	},
	loginRequired: false,
	init
};

export default details;

export {requestVisitedStories as hideStories};
