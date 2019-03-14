import {isLoggedIn} from './utils';

const add = featureDetails => {
	const {
		id,
		pages,
		loginRequired,
		init
	} = featureDetails;

	const path = window.location.pathname;

	if (pages.exclude.includes(path)) {
		return;
	}

	if (!(pages.include.includes(path) || pages.include[0] === '*')) {
		return;
	}

	window.addEventListener('load', () => {
		if (loginRequired && !isLoggedIn()) {
			return;
		}

		console.info('Refined Hacker News:', '️️️✓', id);
		init();
	});
};

export default {
	add
};
