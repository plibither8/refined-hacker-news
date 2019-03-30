import {isLoggedIn, getLoggedInUser} from '../libs/utils';
import {getAllComments} from '../libs/dom-utils';
import {getItemInfo} from '../libs/api';

async function init() {
	const me = isLoggedIn() ? getLoggedInUser() : null;

	const {location} = window;
	const itemId = location.pathname === '/item' ?
		new URLSearchParams(location.search.replace('?', '&')).get('id') :
		null;
	const op = itemId ? (await getItemInfo(itemId)).by : null;

	const comments = getAllComments();

	for (const comment of comments) {
		const commentAuthor = comment.querySelector('a.hnuser');
		// Highlight-my-username
		if (me && me === commentAuthor.innerText) {
			commentAuthor.classList.add('__rhn__highlight-me');
		}

		// Highlight-op-username
		if (op && op === commentAuthor.innerText) {
			commentAuthor.innerText += ' [op]';
			commentAuthor.classList.add('__rhn__highlight-op');
		}

		// Indent-border
		comment.querySelector('td.ind').classList.add('__rhn__comment-indent');
	}

	return true;
}

const details = {
	id: 'comments-ui-tweaks',
	pages: {
		include: [
			'/item',
			'/threads'
		],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
