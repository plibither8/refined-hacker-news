import {getAllComments} from '../libs/dom-utils';
import {paths} from '../libs/paths';

async function init(metadata) {
	// browser.storage.local.clear();
	const readCommentsList = (await browser.storage.local.get('readComments')).readComments || {};

	console.log(readCommentsList)

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

	switch (metadata.path) {
		case '/item': {
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
				console.log(newComments)
				for (const comment of newComments) {
					const commentElement = document.getElementById(comment);
					commentElement.querySelector('td.ind').classList.add('__rhn__new-comment-indent');
				}
			}

			readCommentsList[itemId] = {
				expiry: itemData.expiry || (new Date()).getTime() + 259200000, // 3 days: 3*24*60*60*1000,
				comments: [...new Set([...currentComments, ...readComments])] // remove duplication
			}
			browser.storage.local.set({readComments: readCommentsList});

			break;
		}

		case '/threads': {
			break;
		}

		default: break;
	}

	return true;
}

const details = {
	id: 'highlight-unread-comments',
	pages: {
		include: paths.comments,
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
