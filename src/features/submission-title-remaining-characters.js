function init() {
	const titleField = document.querySelector('input[name="title"]');

	const span = document.createElement('span');
	span.classList.add('__rhn__characters-under');

	titleField.nextElementSibling.classList.add('__rhn__characters-over');
	titleField.parentElement.append(span);
	titleField.addEventListener('input', () => {
		const limit = 80;
		const {length} = titleField.value;
		span.innerHTML = length <= limit ?
			`${limit - length} remaining` :
			'';
	});

	return true;
}

const details = {
	id: 'submission-title-remaining-characters',
	pages: {
		include: [
			'/submit',
			'/submitlink'
		],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
