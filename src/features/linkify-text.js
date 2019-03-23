import linkifyElement from 'linkifyjs/element';
import {isLoggedIn, getLoggedInUser} from '../libs/utils';

function init() {
	const currentUser = document.querySelector('.hnuser').innerText;
	if (isLoggedIn() && currentUser === getLoggedInUser()) {
		return;
	}

	const infoTable = document.querySelector('table#hnmain').querySelectorAll('table')[1];
	for (const row of infoTable.querySelectorAll('tr')) {
		const headingsEl = row.querySelector('td');
		if (headingsEl.innerText === 'about:') {
			linkifyElement(headingsEl.nextElementSibling, {
				attributes: {
					rel: 'noopener'
				}
			});
		}
	}

	return true;
}

const details = {
	id: 'linkify-text',
	pages: {
		include: ['/user'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
