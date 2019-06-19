import {getAuthString, getPageDom, getUrlParams, isClickModified} from '../libs/utils';
import {getAllComments, createSiblingLoader} from '../libs/dom-utils';
import {paths} from '../libs/paths';

const loaderCustomStyle = `
	height: 9px;
	margin-left: 5px;
`;

async function defaultButtons() {
	// Query all faveButtons that are, by default, present on the page
	// and have not been injected by this extension. This is achieved
	// by initialising this feature before `more-accessible-favorite`
	const faveButtonsList = document.querySelectorAll('a[href^="fave"]');

	for (const faveButton of faveButtonsList) {
		const auth = getUrlParams('auth', faveButton.href);
		const id = getUrlParams('id', faveButton.href);

		let unfave = faveButton.innerText === 'un-favorite';
		let ongoingFavorite = false;

		faveButton.addEventListener('click', async event => {
			if (isClickModified(event)) {
				return;
			}

			event.preventDefault();

			if (ongoingFavorite) {
				return;
			}

			ongoingFavorite = true;

			const loader = createSiblingLoader(faveButton, loaderCustomStyle);
			await fetch(faveButton.href).then(() => loader.remove());

			unfave = !unfave;
			faveButton.innerHTML = unfave ? 'un-favorite' : 'favorite';
			faveButton.href = `fave?id=${id}&auth=${auth}${unfave ? '&un=t' : ''}`;

			ongoingFavorite = false;
		});
	}
}

async function commentButtons(metadata) {
	const items = getAllComments();

	for (const item of items) {
		const separatorPipe = document.createTextNode('| ');
		const faveButton = document.createElement('a');
		faveButton.innerText = 'favorite';
		faveButton.classList.add('__rhn__fave-button');

		const toggleButton = item.querySelector('a.togg');
		toggleButton.style.marginLeft = '4px';

		const headSpan = item.querySelector('span.comhead');
		headSpan.insertBefore(separatorPipe, toggleButton);
		headSpan.insertBefore(faveButton, toggleButton);
	}

	let alreadyFaveItems = metadata.favorites;

	if (!alreadyFaveItems) {
		const page = await getPageDom('https://news.ycombinator.com/favorites?comments=t&id=' + metadata.user);
		const fetchedPageItems = page.querySelectorAll('table.itemlist > tbody > tr.athing');
		alreadyFaveItems = [...fetchedPageItems].map(comm => comm.id);
	}

	for (const item of items) {
		const {id} = item;
		const faveButton = item.querySelector('.__rhn__fave-button');
		faveButton.href = 'javascript:void(0)';

		let unfave = false;

		if (alreadyFaveItems.includes(id)) {
			faveButton.innerHTML = 'un-favorite';
			unfave = true;
		} else {
			faveButton.innerHTML = 'favorite';
		}

		let ongoingFavorite = false;

		faveButton.addEventListener('click', async () => {
			if (ongoingFavorite) {
				return;
			}

			ongoingFavorite = true;

			const loader = createSiblingLoader(faveButton, loaderCustomStyle);

			const auth = await getAuthString(id);
			const url = `https://news.ycombinator.com/fave?id=${id}&auth=${auth}${unfave ? '&un=t' : ''}`;

			await fetch(url).then(() => loader.remove());

			unfave = !unfave;
			faveButton.innerHTML = unfave ? 'un-favorite' : 'favorite';

			ongoingFavorite = false;
		});
	}
}

async function storyButtons(metadata) {
	const items = document.querySelectorAll('td.subtext');

	for (const item of items) {
		const lastAnchorButton = item.lastElementChild;

		const separatorPipe = document.createTextNode(' | ');
		const faveButton = document.createElement('a');
		faveButton.innerText = 'favorite';
		faveButton.classList.add('__rhn__fave-button');

		item.insertBefore(faveButton, lastAnchorButton);
		item.insertBefore(separatorPipe, lastAnchorButton);
	}

	let alreadyFaveItems = metadata.favorites;

	if (!alreadyFaveItems) {
		const page = await getPageDom('https://news.ycombinator.com/favorites?id=' + metadata.user);
		const fetchedPageItems = page.querySelectorAll('table.itemlist > tbody > tr.athing');
		alreadyFaveItems = [...fetchedPageItems].map(story => story.id);
	}

	for (const item of items) {
		const faveButton = item.querySelector('.__rhn__fave-button');

		const hideUrl = item.querySelector('a[href^="hide"]').href.replace('?', '&');
		const auth = getUrlParams('auth', hideUrl);
		const id = getUrlParams('id', hideUrl);

		let unfave = false;

		if (alreadyFaveItems.includes(id)) {
			faveButton.href = `fave?id=${id}&auth=${auth}&un=t`;
			faveButton.innerHTML = 'un-favorite';
			unfave = true;
		} else {
			faveButton.href = `fave?id=${id}&auth=${auth}`;
		}

		let ongoingFavorite = false;

		faveButton.addEventListener('click', async event => {
			event.preventDefault();

			if (ongoingFavorite) {
				return;
			}

			ongoingFavorite = true;

			const loader = createSiblingLoader(faveButton, loaderCustomStyle);
			await fetch(faveButton.href).then(() => loader.remove());

			unfave = !unfave;
			faveButton.innerHTML = unfave ? 'un-favorite' : 'favorite';
			faveButton.href = `fave?id=${id}&auth=${auth}${unfave ? '&un=t' : ''}`;

			ongoingFavorite = false;
		});
	}
}

async function init(metadata) {
	const {path} = metadata;

	await defaultButtons();

	if (paths.comments.includes(path)) {
		await commentButtons(metadata);
	} else if (paths.stories.includes(path)) {
		await storyButtons(metadata);
	}

	return true;
}

const details = {
	id: 'more-accessible-favorite',
	pages: {
		include: [
			...paths.stories,
			...paths.comments,
			'/favorites'
		],
		exclude: ['/jobs']
	},
	loginRequired: true,
	init
};

export default details;
