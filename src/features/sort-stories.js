import {createOptionsBar, getGroupedStories} from '../libs/dom-utils';
import {paths} from '../libs/paths';

function sort() {
	const method = document.querySelector('#sort-stories-input').value;
	const stories = getGroupedStories(document.querySelector('table.itemlist'));

	switch (method) {
		case 'time': {
			stories.sort((a, b) => a.id < b.id ? 1 : -1);
			break;
		}

		case 'score': {
			stories.sort((a, b) => a.score < b.score ? 1 : -1);
			break;
		}

		case 'default':
		default: {
			stories.sort((a, b) => a.defaultRank > b.defaultRank ? 1 : -1);
			break;
		}
	}

	const itemlistTable = document.querySelector('table.itemlist > tbody');
	const moreRow = itemlistTable.lastElementChild;
	const morespaceRow = moreRow.previousElementSibling;

	let extraItems = [];
	if (window.location.pathname === '/show') {
		extraItems = [...document.querySelectorAll('table.itemlist > tbody > tr')].slice(0, 3);
	}

	itemlistTable.innerHTML = '';

	itemlistTable.append(...extraItems);

	for (const story of stories) {
		for (const el of story.elements) {
			itemlistTable.append(el);
		}
	}

	itemlistTable.append(morespaceRow, moreRow);
}

function init(metadata) {
	const optionsBar = createOptionsBar(metadata.options.optionsBarPosition);
	const sortLabel = document.createElement('label');
	const sortSelect = document.createElement('select');

	sortLabel.innerHTML = 'sort stories:&nbsp;';
	sortLabel.setAttribute('for', 'sort-stories-input');

	sortSelect.id = 'sort-stories-input';
	sortSelect.innerHTML = '';
	['default', 'time', 'score'].forEach(o => {
		sortSelect.innerHTML += `<option value=${o}>${o}</option>`;
	});

	if (document.querySelector('#auto-refresh-input')) {
		const {firstChild} = optionsBar;
		optionsBar.insertBefore(sortLabel, firstChild);
		optionsBar.insertBefore(sortSelect, firstChild);
	} else {
		optionsBar.append(sortLabel, sortSelect);
	}

	sort();
	sortSelect.addEventListener('change', sort);

	return true;
}

const details = {
	id: 'sort-stories',
	pages: {
		include: paths.stories,
		exclude: [
			'/front',
			'/jobs'
		]
	},
	loginRequired: false,
	init
};

export default details;

export {sort as sortStories};
