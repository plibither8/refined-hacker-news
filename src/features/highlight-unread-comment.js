import {getAllComments} from '../libs/dom-utils';

async function init(metadata) {
	const readCommentsList = (await browser.storage.local.get()).readComments || {};

	const currentMilliseconds = new Date().getTime();
	for (const [id, itemObj] of Object.entries(readCommentsList)) {
		if (itemObj.expiry < currentMilliseconds) {
			delete readCommentsList[id];
		}
	}

	// If the item is so old that one cannot reply anymore
	// there is no point in storing comments
	const replyForm = document.querySelector('table.fatitem form');
	if (!replyForm) {
		return false;
	}

	const itemId = metadata.item.id.toString();
	if (!itemId) {
		return false;
	}

	const currentComments = [];
	[...getAllComments()].map(comment => currentComments.push(comment.id));

	const itemData = readCommentsList[itemId] || {};
	const readComments = itemData.comments || [];

	if (readComments.length > 0) {
		const newComments = currentComments.filter(id => !readComments.includes(id));

		for (const comment of newComments) {
			// eslint-disable-next-line unicorn/prefer-query-selector
			const commentElement = document.getElementById(comment);
			commentElement.querySelector('td.ind').classList.add('__rhn__new-comment-indent');
		}
	}

	readCommentsList[itemId] = {
		expiry: itemData.expiry || (new Date()).getTime() + 259200000, // 3 days: 3*24*60*60*1000,
		comments: [...new Set([...currentComments, ...readComments])] // Remove duplication
	};

	browser.storage.local.set({readComments: readCommentsList});

	return true;
}

const details = {
	id: 'highlight-unread-comments',
	pages: {
		include: ['/item'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
