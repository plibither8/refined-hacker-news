/**
 * ID: click-comment-indent-to-toggle
 * Purpose: On clicking the indentation of a comment or reply,
 *          it and its children (replies) will toggle/fold/wrap.
 *          This allows for a larger hitbox for toggling comments.
 */

import {getAllComments} from '../libs/dom-utils';

function init() {
	const comments = getAllComments();
	for (const comment of comments) {
		const indentCell = comment.querySelector('td.ind');
		const toggleBtn = comment.querySelector('a.togg');
		indentCell.addEventListener('click', () => {
			toggleBtn.click();
		});
	}

	return true;
}

const details = {
	id: 'click-comment-indent-to-toggle',
	pages: {
		include: ['/item'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
