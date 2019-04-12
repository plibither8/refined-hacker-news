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

	return new Promise(resolve => {
		// Don't allow on `exclude`d pages or action/info pages
		if ([...pages.exclude, ...paths.actions, ...paths.info].includes(path)) {
			return resolve();
		}

		// Allow only on `include`d pages
		if (!(pages.include.includes(path) || pages.include[0] === '*')) {
			return resolve();
		}

		// Skip if feature has been marked as disabled
		if (options.disabledFeatures.includes(id)) {
			if (firstLoad) {
				options.log('↩️️', 'Skipping', id);
			}

			return resolve();
		}

		if (loginRequired && !user.loggedIn) {
			return resolve();
		}

		// Don't run on job items when not allowed
		if (isJob && !runOnJobItems) {
			return resolve();
		}

		const successfulInitialisation = init(metadata);

		if (firstLoad && successfulInitialisation) {
			options.log('️️️✓', id);
		}

		resolve(successfulInitialisation);
	});
}

export default {add};
