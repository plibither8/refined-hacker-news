import {isLoggedIn} from './utils';

const add = featureDetails => {
	const {
		id, // eslint-disable-line no-unused-vars
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

		init();
	});
};

export default {
	add
};
