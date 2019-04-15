import {getAllComments} from '../libs/dom-utils';
import {getUrlParams} from '../libs/utils';
import {getItemInfo} from '../libs/api';
import {paths} from '../libs/paths';

async function init(metadata) {
	const me = metadata.user.name; // username of the user logged in
	let op; // username of OP (on '/item' paths only)

	if (metadata.path === '/item') {
		const itemId = getUrlParams('id');
		// use the HN API to get OP username
		op = itemId ? (await getItemInfo(itemId)).by : undefined;
	}

	const comments = getAllComments();

	for (const comment of comments) {
		const commentAuthor = comment.querySelector('a.hnuser');
		// Highlight-my-username:
		// if logged in username matches username of commenter
		if (me && me === commentAuthor.innerText) {
			commentAuthor.classList.add('__rhn__highlight-me');
		}

		// Highlight-op-username
		// if OP's username matches username of commenter
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
		include: paths.comments,
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
