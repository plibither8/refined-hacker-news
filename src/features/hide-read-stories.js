import OptionsSync from 'webext-options-sync';

import {optionsBarEnabledOptions} from '../libs/utils';
import {createOrGetOptionsBar, getGroupedStories} from '../libs/dom-utils';
import {paths} from '../libs/paths';

/**
 * Collects links from the stories and sends a message to background script
 * with these collected links
 * @param {Object} options - Extension options
 */
function requestVisitedStories(options) {
	const itemList = document.querySelector('table.itemlist');
	const stories = getGroupedStories(itemList);
	const links = {};

	for (const story of stories) {
		links[story.id] = [story.storyUrl];

		// if the option to hide those stories who's comments page had been visited
		// without visiting the story link is enabled (in the popup), then add the
		// comments link too
		if (story.commentsLink && options.hideStoryCommentsPage) {
			links[story.id].push(story.commentsLink.href);
		}
	}

	// Send!
	browser.runtime.sendMessage({searchHistory: links});
}

/**
 * Main "hide" function, the place where the hiding happens
 * @param {Array} idList - list of story ID's who's visits were found in the history
 * @param {Boolean} hide - whether to hide or show the stories (depending on the checklist) 
 */
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
	const {options} = metadata;
	
	// create all necessary elements
	const optionsBar = createOrGetOptionsBar();
	const form = document.createElement('form');
	const check = document.createElement('input');
	const label = document.createElement('label');

	check.type = 'checkbox';
	check.id = 'hide-read-stories-check';
	check.style.marginLeft = '0px';
	check.name = 'hideReadStories';
	check.checked = options.hideReadStories; // set previously saved value

	label.innerHTML = 'hide read stories';
	label.setAttribute('for', 'hide-read-stories-check');

	// hacky and messy styling
	const enabledOptions = optionsBarEnabledOptions(options);
	if (enabledOptions.includes('sort-stories')) {
		check.style.marginLeft = '8px';

		form.append('|');
		form.style.marginLeft = '10px';
	}

	form.id = 'hideReadStoriesForm';
	form.append(check, label);
	optionsBar.append(form);

	requestVisitedStories(options); // initial request
	check.addEventListener('input', () => {
		requestVisitedStories(options); // and every subsequent request
	});

	// once a request for visited stories has been generated, the background script
	// will send back a list of the story IDs, which is then used in to hide/display
	// the stories
	browser.runtime.onMessage.addListener(request => {
		if (request.visitedIds) {
			hideStories(request.visitedIds, check.checked);
		}
	});

	// sync form with extension options
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
