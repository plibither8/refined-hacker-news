import {
	createOptionsBar,
	getGroupedStories
} from '../libs/dom-utils';

const sort = (method, stories) => {
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
	const moreRow = itemlistTable.lastChild;
	const morespaceRow = moreRow.previousSibling;

	itemlistTable.innerHTML = '';

	for (const story of stories) {
		for (const el of story.elements) {
			itemlistTable.append(el);
		}
	}

	itemlistTable.append(morespaceRow);
	itemlistTable.append(moreRow);
};

const init = () => {
	const optionsBar = createOptionsBar();
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
		optionsBar.append(sortLabel);
		optionsBar.append(sortSelect);
	}

	let stories = getGroupedStories(document.querySelector('table.itemlist'));
	sort('default', stories);

	sortSelect.addEventListener('change', () => {
		stories = getGroupedStories(document.querySelector('table.itemlist'));
		sort(sortSelect.value, stories);
	});

	return true;
};

const details = {
	id: 'sort-stories',
	pages: {
		include: [
			'/',
			'/news',
			'/show',
			'/shownew',
			'/ask',
			'/active'
		],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
