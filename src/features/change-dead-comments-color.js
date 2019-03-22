import features from '../libs/features';
import {getAllComments} from '../libs/dom-utils'

const init = () => {
	const comments = getAllComments()
	for (const comment of comments) {
		const commentHeadSpan = comment.querySelector('span.comhead');
		if (commentHeadSpan.innerText.includes('[dead]')) {
			comment.querySelector('div.comment span.commtext.cdd').classList.add('__rhn__dead-link-color');
		}
	}

	return true;
};

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
