
const init = () => {
	const titleField = document.querySelector('input[name="title"]');
	titleField.nextElementSibling.classList.add('__rhn__characters-over');
	const span = document.createElement('span');
	span.classList.add('__rhn__characters-under');
	titleField.parentElement.append(span);
	titleField.addEventListener('input', () => {
		const limit = 80;
		const {length} = titleField.value;
		span.innerHTML = length <= limit ?
			`${limit - length} remaining` :
			'';
	});

	return true;
};

const details = {
	id: 'submission-title-remaining-characters',
	pages: {
		include: ['/submit'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
