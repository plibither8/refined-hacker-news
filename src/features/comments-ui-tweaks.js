import {getAllComments} from '../libs/dom-utils';
import {paths} from '../libs/paths';

async function init(metadata) {
	if (!metadata.item.isItem) {
		return false;
	}

	const customWidth = metadata.options.commentsIndentWidth;
	const itemAuthor = metadata.item.by;

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
