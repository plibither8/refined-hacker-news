import OptionsSync from 'webext-options-sync';
import {isLoggedIn} from './utils';

// Rule assumes we don't want to leave it pending:
// eslint-disable-next-line no-async-promise-executor
const getOptions = new Promise(async resolve => {
	// Options defaults
	const options = {
		disabledFeatures: '',
		customCSS: '',
		logging: true,
		...await new OptionsSync().getAll()
	};

	if (options.customCSS.trim().length > 0) {
		const style = document.createElement('style');
		style.innerHTML = options.customCSS;
		document.head.append(style);
	}

	// Create logging function
	options.log = options.logging ? console.log : () => {};

	resolve(options);
});

const add = async featureDetails => {
	const {
		id,
		pages,
		loginRequired,
		init
	} = featureDetails;

	const path = window.location.pathname;
	const options = await getOptions;

	if (pages.exclude.includes(path)) {
		return;
	}

	if (!(pages.include.includes(path) || pages.include[0] === '*')) {
		return;
	}

	if (options.disabledFeatures.includes(id)) {
		options.log('RHN:', '↩️️', 'Skipping', id);
		return;
	}

	window.addEventListener('load', () => {
		if (loginRequired && !isLoggedIn()) {
			return;
		}

		options.log('RHN:', '️️️✓', 'Loaded', id);
		init();
	});
};

export default {
	add
};
