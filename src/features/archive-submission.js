import {paths} from '../libs/paths';

function init(metadata) {

	return true;
}

const details = {
	id: 'archive-submission',
	pages: {
		include: [
			'/item',
			...paths.stories,
		],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
