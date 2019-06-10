import {createSiblingLoader} from '../libs/dom-utils';

async function fetchTitle() {
	const apiUrl = 'https://textance.herokuapp.com/title/';

	const titleInput = document.querySelector('input[name="title"]');
	const urlInput = document.querySelector('input[name="url"]');
	const loader = document.querySelector('img.__rhn__loader');

	const {value} = urlInput;
	if (value.length === 0) {
		return;
	}

	loader.classList.remove('__rhn__no-display');

	const endpoint = encodeURI(value);

	const title = await fetch(apiUrl + endpoint).then(res => res.text());
	if (!title.startsWith('org.takes.HttpException:') &&
		!title.startsWith('Empty label is not a legal name')) {
		titleInput.value = title;
	}

	loader.classList.add('__rhn__no-display');
}

function init() {
	const urlInput = document.querySelector('input[name="url"]');
	const urlInputParent = urlInput.parentElement;

	const fetchTitleBtn = document.createElement('span');
	fetchTitleBtn.classList.add('__rhn__fetch-title');
	fetchTitleBtn.innerHTML = '<a href="javascript:void(0)">fetch title</a>';
	fetchTitleBtn.addEventListener('click', fetchTitle);

	urlInputParent.append(fetchTitleBtn);

	const loaderCustomStyle = `
		height: 12px;
		vertical-align: middle;
		margin-left: -5px;
	`;
	const loader = createSiblingLoader(fetchTitleBtn, loaderCustomStyle);
	loader.classList.add('__rhn__no-display');

	return true;
}

const details = {
	id: 'fetch-submission-title-from-url',
	pages: {
		include: ['/submit'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
