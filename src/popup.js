import fitTextarea from 'fit-textarea';
import OptionsSync from 'webext-options-sync';
import indentTextarea from 'indent-textarea';

fitTextarea.watch('textarea');
indentTextarea.watch('textarea');

(async () => {
	const options = await new OptionsSync().getAll();
	document.body.style.borderColor = options.topcolor || '#ff6000';
})();

new OptionsSync({logging: false}).syncForm('#options-form');
