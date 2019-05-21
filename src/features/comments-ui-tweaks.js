import {getAllComments} from '../libs/dom-utils';
import {getItemInfo} from '../libs/api';
import {paths} from '../libs/paths';

async function init(metadata) {
	const {item} = metadata;
	const customWidth = metadata.options.commentsIndentWidth;

	const currentUser = metadata.user;
	const itemAuthor = item.id ? (await getItemInfo(item.id)).by : undefined;

	const comments = getAllComments();

	for (const comment of comments) {
		// Indent-border
		comment.querySelector('td.ind').classList.add('__rhn__comment-indent');

		// Custom indent width
		const indentImage = comment.querySelector('td.ind img');
		const indentLevel = indentImage.width / 40;
		indentImage.width = indentLevel * customWidth;
		indentImage.dataset.indentLevel = indentLevel;

		const commentAuthor = comment.querySelector('a.hnuser');
		if (!commentAuthor) {
			continue;
		}

		// Highlight-my-username
		if (currentUser && currentUser === commentAuthor.innerText) {
			commentAuthor.classList.add('__rhn__highlight-me');
		}

		// Highlight-op-username
		if (itemAuthor && itemAuthor === commentAuthor.innerText) {
			commentAuthor.innerText += ' [op]';
			commentAuthor.classList.add('__rhn__highlight-op');
		}
	}

	browser.runtime.onMessage.addListener(request => {
		if (request.indentWidth) {
			for (const comment of comments) {
				const indentImage = comment.querySelector('td.ind img');
				indentImage.width = request.indentWidth * indentImage.dataset.indentLevel;
			}
		}
	});

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
