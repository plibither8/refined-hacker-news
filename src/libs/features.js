import {getOptions, isLoggedIn} from './utils';

async function add(featureDetails, itemIsJob, firstLoad = false) {
	const details = {
		runOnJobItems: false,
		...featureDetails
	};

	const {
		id,
		pages,
		dependants,
		loginRequired,
		runOnJobItems,
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
		if (firstLoad) {
			options.log('RHN:', '↩️️', 'Skipping', id);
		}

		return;
	}

	if (loginRequired && !isLoggedIn()) {
		return;
	}

	// Don't run on job items when not allowed
	if (itemIsJob && !runOnJobItems) {
		return;
	}

	// Initialise current feature
	if (!init()) {
		return;
	}

	if (firstLoad) {
		options.log('RHN:', '️️️✓', id);
	}
}

export default {add};
