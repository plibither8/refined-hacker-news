import features from '../libs/features';
import {isLoggedIn, getLoggedInUser} from '../libs/utils';
import {getItemInfo} from '../libs/api';

const init = async () => {
	const me = isLoggedIn() ? getLoggedInUser() : null;
	const itemId = new URLSearchParams(window.location.search.replace('?', '&')).get('id');
	const op = (await getItemInfo(itemId)).by;
	const comments = document.querySelectorAll('tr.comtr');

	for (const comment of comments) {
		const commentAuthor = comment.querySelector('a.hnuser');
		// Highlight-my-username
		if (me && me === commentAuthor.innerText) {
			commentAuthor.classList.add('__rhn__highlight-me');
		}

		// Highlight-op-username
		if (op === commentAuthor.innerText) {
			commentAuthor.innerText += ' [op]';
			commentAuthor.classList.add('__rhn__highlight-op');
		}

		// Indent-border
		comment.querySelector('td.ind').classList.add('__rhn__comment-indent');
	}

	return true;
};

const details = {
	id: 'comments-ui-tweaks',
	pages: {
		include: ['/item'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
