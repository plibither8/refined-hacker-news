import {getOptions, isLoggedIn} from './utils';

const add = async featureDetails => {
	const details = {
		dependants: {
			before: [],
			after: []
		},
		...featureDetails
	};

	const {
		id,
		pages,
		dependants,
		loginRequired,
		init
	} = details;

	const path = window.location.pathname;
	const options = await getOptions;

	// Don't only on `exclude`d pages
	if (pages.exclude.includes(path)) {
		return;
	}

	// Allow only on `include`d pages
	if (!(pages.include.includes(path) || pages.include[0] === '*')) {
		return;
	}

	// Skip if feature has been marked as disabled
	if (options.disabledFeatures.includes(id)) {
		options.log('RHN:', '↩️️', 'Skipping', id);
		return;
	}

	// Once window has been loaded...
	window.addEventListener('load', () => {
		if (loginRequired && !isLoggedIn()) {
			return;
		}

		// Initialise dependant features that need to load before current feature
		dependants.before.map(feat => feat.init());

		// Initialise current feature
		if (!init()) {
			return;
		}

		options.log('RHN:', '️️️✓', id);

		// Initialise dependant features that need to load after current feature
		dependants.after.map(feat => feat.init());
	});
};

export default {
	add
};
