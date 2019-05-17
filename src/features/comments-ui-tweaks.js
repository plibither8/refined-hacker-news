import {getAllComments} from '../libs/dom-utils';
import {getItemInfo} from '../libs/api';
import {paths} from '../libs/paths';

async function init(metadata) {
	const {item} = metadata;
	const customWidth = metadata.options.commentsIndentWidth;

	const me = metadata.user;
	const op = item.id ? (await getItemInfo(item.id)).by : undefined;

	const comments = getAllComments();

	for (const comment of comments) {
		// Indent-border
		comment.querySelector('td.ind').classList.add('__rhn__comment-indent');

		// Custom indent width
		comment.querySelector('td.ind img').width *= customWidth / 40;

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
