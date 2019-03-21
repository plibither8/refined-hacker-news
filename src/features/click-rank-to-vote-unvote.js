import features from '../libs/features';

const init = () => {
	const rows = document.querySelectorAll('table.itemlist > tbody > tr.athing');
	for (const row of rows) {
		const rank = row.querySelector('span.rank');
		rank.classList.add('__rhn__rank');
		rank.addEventListener('click', () => {
			const vote = row.querySelector('div.votearrow');
			const unvote = row.nextElementSibling.querySelector('a[href^="vote"]');
			if (vote && !vote.parentElement.classList.contains('nosee')) {
				vote.click();
			} else if (unvote) {
				unvote.click();
			}
		});
	}

	return true;
};

const details = {
	id: 'click-rank-to-vote-unvote',
	pages: {
		include: ['*'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
