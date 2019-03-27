/**
 * ID: change-dead-comments-color
 * Purpose: If user has enabled viewing of dead comments/replies,
 *          change the color of the comment's text to a reddish color
 *          of some higher contrast to make it more readable. 
 */

import {getAllComments} from '../libs/dom-utils';

function init() {
	const comments = getAllComments();
	for (const comment of comments) {
		const commentHeadSpan = comment.querySelector('span.comhead');
		if (commentHeadSpan.innerText.includes('[dead]')) {
			comment.querySelector('div.comment span.commtext.cdd').classList.add('__rhn__dead-link-color');
		}
	}

	return true;
}

const details = {
	id: 'change-dead-comments-color',
	pages: {
		include: ['/item'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
