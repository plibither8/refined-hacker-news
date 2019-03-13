import features from '../libs/features';

const init = () => {
	const textarea = document.querySelector('textarea');
	if (!textarea) {
		return;
	}

	textarea.addEventListener('keydown', e => {
		if (e.ctrlKey && e.keyCode === 73) {
			const {
				value,
				selectionEnd,
				selectionStart
			} = textarea;

			const selection = value.substring(selectionStart, selectionEnd);
			let before;
			let after;

			if (value.charAt(selectionStart - 1) === '*' && value.charAt(selectionEnd) === '*') {
				before = value.substring(0, selectionStart - 1);
				after = value.substring(selectionEnd + 1, value.length);
				textarea.value = `${before}${selection}${after}`;
				textarea.selectionStart = selectionStart - 1;
				textarea.selectionEnd = selectionEnd - 1;
			} else {
				before = value.substring(0, selectionStart);
				after = value.substring(selectionEnd, value.length);
				textarea.value = `${before}*${selection}*${after}`;
				textarea.selectionStart = selectionStart + 1;
				textarea.selectionEnd = selectionEnd + 1;
			}
		}
	});
};

features.add({
	id: 'italicise-shortcut-key',
	pages: {
		include: [
			'/item',
			'/reply'
		],
		exclude: []
	},
	loginRequired: false,
	init
});

export default init;
