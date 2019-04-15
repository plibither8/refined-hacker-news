// META Question: Should this incorporated with `comments-ui-tweaks` feature?
// GitHub issue #18

import {getAllComments} from '../libs/dom-utils';
import {paths} from '../libs/paths';

function init() {
	const comments = getAllComments();
	for (const comment of comments) {
		// if the 'comment head span' has the string "[dead]",
		// then query the comment text and add styling to it
		const commentHeadSpan = comment.querySelector('span.comhead');
		if (commentHeadSpan.innerText.includes('[dead]')) {
			comment.querySelector('div.comment span.commtext.cdd').classList.add('__rhn__dead-comment');
		}
	}

	return true;
}

const details = {
	id: 'change-dead-comments-color',
	pages: {
		include: paths.comments,
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
