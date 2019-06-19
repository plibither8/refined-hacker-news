import {getAuthString, getPageDom, getUrlParams, isClickModified} from '../libs/utils';
import {getAllComments, createSiblingLoader} from '../libs/dom-utils';
import {paths} from '../libs/paths';

const loaderCustomStyle = `
	height: 9px;
	margin-left: 5px;
`;

async function defaultFavoriteLinks() {
	// Query all faveLinks that are, by default, present on the page
	// and have not been injected by this extension. This is achieved
	// by initialising this feature before `more-accessible-favorite`
	const faveLinksList = document.querySelectorAll('a[href^="fave"]');

	for (const faveLink of faveLinksList) {
		const auth = getUrlParams('auth', faveLink.href);
		const id = getUrlParams('id', faveLink.href);

		let unfave = faveLink.innerText === 'un-favorite';
		let ongoingFavorite = false;

		faveLink.addEventListener('click', async event => {
			if (isClickModified(event)) {
				return;
			}

			event.preventDefault();

			if (ongoingFavorite) {
				return;
			}

			ongoingFavorite = true;

			const loader = createSiblingLoader(faveLink, loaderCustomStyle);
			await fetch(faveLink.href).then(() => loader.remove());

			unfave = !unfave;
			faveLink.innerHTML = unfave ? 'un-favorite' : 'favorite';
			faveLink.href = `fave?id=${id}&auth=${auth}${unfave ? '&un=t' : ''}`;

			ongoingFavorite = false;
		});
	}
}

async function commentsFavoriteLinks(metadata) {
	const comments = getAllComments();
	for (const comment of comments) {
		const headSpan = comment.querySelector('span.comhead');

		const faveLink = document.createElement('a');
		const faveSeparator = document.createTextNode('| ');
		faveLink.innerText = 'favorite';
		faveLink.classList.add('__rhn__fave-link');

		const toggleBtn = comment.querySelector('a.togg');
		toggleBtn.style.marginLeft = '4px';
		headSpan.insertBefore(faveSeparator, toggleBtn);
		headSpan.insertBefore(faveLink, toggleBtn);
	}

	let alreadyFaveComments = metadata.favorites;

	if (!alreadyFaveComments) {
		const page = await getPageDom('https://news.ycombinator.com/favorites?comments=t&id=' + metadata.user);
		const items = page.querySelectorAll('table.itemlist > tbody > tr.athing');
		alreadyFaveComments = [...items].map(comm => comm.id);
	}

	for (const comment of comments) {
		const {id} = comment;
		const faveLink = comment.querySelector('.__rhn__fave-link');

		let unfave = false;

		faveLink.href = 'javascript:void(0)';
		faveLink.classList.add('__rhn__favelink');

		if (alreadyFaveComments.includes(id)) {
			faveLink.innerHTML = 'un-favorite';
			unfave = true;
		} else {
			faveLink.innerHTML = 'favorite';
		}

		let ongoingFavorite = false;

		faveLink.addEventListener('click', async () => {
			if (ongoingFavorite) {
				return;
			}

			ongoingFavorite = true;

			const loader = createSiblingLoader(faveLink, loaderCustomStyle);

			const auth = await getAuthString(id);
			const url = `https://news.ycombinator.com/fave?id=${id}&auth=${auth}${unfave ? '&un=t' : ''}`;

			await fetch(url).then(() => loader.remove());

			unfave = !unfave;
			faveLink.innerHTML = unfave ? 'un-favorite' : 'favorite';

			ongoingFavorite = false;
		});
	}
}

async function storiesFavoriteLinks(metadata) {
	const subtexts = document.querySelectorAll('td.subtext');
	for (const subtext of subtexts) {
		const commentsLink = [...subtext.querySelectorAll('a')].pop();

		const faveLink = document.createElement('a');
		const faveSeparator = document.createTextNode(' | ');
		faveLink.innerText = 'favorite';
		faveLink.classList.add('__rhn__fave-link');

		subtext.insertBefore(faveLink, commentsLink);
		subtext.insertBefore(faveSeparator, commentsLink);
	}

	let alreadyFaveStories = metadata.favorites;

	if (!alreadyFaveStories) {
		const page = await getPageDom('https://news.ycombinator.com/favorites?id=' + metadata.user);
		const stories = page.querySelectorAll('table.itemlist > tbody > tr.athing');
		alreadyFaveStories = [...stories].map(story => story.id);
	}

	for (const subtext of subtexts) {
		const faveLink = subtext.querySelector('.__rhn__fave-link');

		let hideLink;
		for (const link of subtext.querySelectorAll('a')) {
			if (link.innerText === 'hide') {
				hideLink = link.href.replace('?', '&');
			}
		}

		const auth = getUrlParams('auth', hideLink);
		const id = getUrlParams('id', hideLink);

		let unfave = false;

		if (alreadyFaveStories.includes(id)) {
			faveLink.href = `fave?id=${id}&auth=${auth}&un=t`;
			faveLink.innerHTML = 'un-favorite';
			unfave = true;
		} else {
			faveLink.href = `fave?id=${id}&auth=${auth}`;
		}

		let ongoingFavorite = false;

		faveLink.addEventListener('click', async event => {
			event.preventDefault();

			if (ongoingFavorite) {
				return;
			}

			ongoingFavorite = true;

			const loader = createSiblingLoader(faveLink, loaderCustomStyle);
			await fetch(faveLink.href).then(() => loader.remove());

			unfave = !unfave;
			faveLink.innerHTML = unfave ? 'un-favorite' : 'favorite';
			faveLink.href = `fave?id=${id}&auth=${auth}${unfave ? '&un=t' : ''}`;

			ongoingFavorite = false;
		});
	}
}

async function init(metadata) {
	const {path} = metadata;

	await defaultFavoriteLinks();

	if (paths.comments.includes(path)) {
		await commentsFavoriteLinks(metadata);
	} else if (paths.stories.includes(path)) {
		await storiesFavoriteLinks(metadata);
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
