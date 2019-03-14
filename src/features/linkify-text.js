import linkifyElement from 'linkifyjs/element';
import features from '../libs/features';

const init = () => {
	const path = window.location.pathname;
	let targetEl;
	let shouldLinkify = false;

	switch (path) {
		case '/user': {
			const infoTable = document.querySelector('table#hnmain').querySelectorAll('table')[1];
			for (const row of infoTable.querySelectorAll('tr')) {
				const headingsEl = row.querySelector('td');
				if (headingsEl.innerText === 'about:') {
					targetEl = headingsEl.nextElementSibling;
					shouldLinkify = true;
				}
			}

			break;
		}

		case '/item': {
			const topRows = document.querySelectorAll('table.fatitem > tbody > tr');
			if (topRows.length <= 4) {
				break;
			}

			targetEl = topRows[3].querySelectorAll('td')[1];
			shouldLinkify = true;
			break;
		}

		default: break;
	}

	if (shouldLinkify) {
		linkifyElement(targetEl, {
			attributes: {
				rel: 'noopener'
			}
		});
	}
};

features.add({
	id: 'linkify-text',
	pages: {
		include: [
			'/item',
			'/user'
		],
		exclude: []
	},
	loginRequired: false,
	init
});

export default init;
