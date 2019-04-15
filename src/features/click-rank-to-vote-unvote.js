import {paths} from '../libs/paths';

function init() {
	// all story heading elements
	const rows = document.querySelectorAll('table.itemlist > tbody > tr.athing');

	for (const row of rows) {
		const rank = row.querySelector('span.rank');
		rank.classList.add('__rhn__rank');

		rank.addEventListener('click', () => {
			// only visible if story has not been upvoted
			const vote = row.querySelector('div.votearrow');
			// only visible if story had been upvoted
			const unvote = row.nextElementSibling.querySelector('a[id^="un_"]');

			// element exists but is invisible due to `nosee` class
			if (vote && !vote.parentElement.classList.contains('nosee')) {
				vote.click();
			} else if (unvote) {
				unvote.click();
			}
		});
	}

	return true;
}

const details = {
	id: 'click-rank-to-vote-unvote',
	pages: {
		include: paths.stories,
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
