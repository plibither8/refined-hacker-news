import features from '../libs/features';

const init = () => {
	const comments = document.querySelectorAll('tr.comtr');
	for (const comment of comments) {
		const indentCell = comment.querySelector('td.ind');
		const toggleBtn = comment.querySelector('a.togg');
		indentCell.addEventListener('click', () => {
			toggleBtn.click();
		});
	}
};

features.add({
	id: 'click-comment-indent-to-toggle',
	pages: {
		include: ['/item'],
		exclude: []
	},
	loginRequired: false,
	init
});

export default init;
