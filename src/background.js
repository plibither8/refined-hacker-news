import OptionsSync from 'webext-options-sync';

new OptionsSync().define({
	defaults: {
		disabledFeatures: '',
		customCSS: '',
		logging: true
	}
});
