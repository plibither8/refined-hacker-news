import {getAllComments} from '../libs/dom-utils';
import {getItemId} from '../libs/utils';
import {getItemInfo} from '../libs/api';
import {paths} from '../libs/paths';

async function init(metadata) {
	const me = metadata.user.name;

	const itemId = getItemId();
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
		include: paths.comments,
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
