import {getUrlParams} from '../libs/utils';

function init() {
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
			event.preventDefault();

			if (ongoingFavorite) {
				return;
			}

			ongoingFavorite = true;

			const loader = document.createElement('img');
			loader.src = browser.extension.getURL('loader.gif');
			loader.style = 'height: 9px;margin-left: 5px;';
			faveLink.parentElement.insertBefore(loader, faveLink.nextSibling);

			await fetch(faveLink.href);
			loader.remove();

			unfave = !unfave;
			faveLink.innerHTML = unfave ? 'un-favorite' : 'favorite';
			faveLink.href = `fave?id=${id}&auth=${auth}${unfave ? '&un=t' : ''}`;

			ongoingFavorite = false;
		});
	}

	return true;
}

const details = {
	id: 'favorite-without-leaving-page',
	pages: {
		include: [
			'/item',
			'/favorites'
		],
		exclude: []
	},
	loginRequired: true,
	init
};

export default details;
