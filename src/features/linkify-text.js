import linkifyElement from 'linkifyjs/element';
import features from '../libs/features';
import {isLoggedIn, getLoggedInUser} from '../libs/utils';

const init = () => {
	if (isLoggedIn() && getLoggedInUser() === document.querySelector('.hnuser').innerText) {
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
};

const details = {
	id: 'linkify-text',
	pages: {
		include: ['/user'],
		exclude: []
	},
	loginRequired: false,
	init
};

features.add(details);

export default details;
