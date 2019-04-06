import {paths} from './paths';

function add(featureDetails, metadata) {
	const details = {
		runOnJobItems: false,
		...featureDetails
	};

	// Deconstructing feature details
	const {
		id,
		pages,
		loginRequired,
		runOnJobItems,
		init
	} = details;

	// Deconstructing metadata object
	const {
		path,
		options,
		user,
		isJob,
		firstLoad
	} = metadata;

	// Don't allow on `exclude`d pages or action/info pages
	if ([...pages.exclude, ...paths.actions, ...paths.info].includes(path)) {
		return;
	}

	// Allow only on `include`d pages
	if (!(pages.include.includes(path) || pages.include[0] === '*')) {
		return;
	}

	// Skip if feature has been marked as disabled
	if (options.disabledFeatures.includes(id)) {
		if (firstLoad) {
			options.log('↩️️', 'Skipping', id);
		}

		return;
	}

	if (loginRequired && !user.loggedIn) {
		return;
	}

	// Don't run on job items when not allowed
	if (isJob && !runOnJobItems) {
		return;
	}

	// Initialise current feature
	if (!init(metadata)) {
		return;
	}

	if (firstLoad) {
		options.log('️️️✓', id);
	}
}

export default {add};
