import {getTopLevelComments, getAllComments} from '../libs/dom-utils';
import {paths} from '../libs/paths';

function toggleAllReplies() {
	const allComments = [...getAllComments()];

	allComments.forEach((comment, id) => {
		const currentIndent = comment.querySelector('td.ind img').width / 40;
		const nextIndent = id + 1 === allComments.length ?
			null :
			allComments[id + 1].querySelector('td.ind img').width / 40;

		if (nextIndent && nextIndent > currentIndent) {
			const fontTag = document.createElement('font');
			fontTag.setAttribute('size', 1);

			const toggleAllBtn = document.createElement('a');
			toggleAllBtn.classList.add('__rhn__toggle-btn');
			toggleAllBtn.innerHTML = 'toggle all replies';
			toggleAllBtn.href = 'javascript:void(0)';

			toggleAllBtn.addEventListener('click', () => {
				const n = comment.querySelector('a.togg').getAttribute('n') - 1;
				for (let i = id + 1; i <= id + n; i++) {
					allComments[i].querySelector('a.togg').click();
				}
			});

			fontTag.append(toggleAllBtn);

			const fontTagParent = comment.querySelector('div.reply p');
			if (fontTagParent.innerText.includes('reply')) {
				fontTagParent.append(' | ');
			}

			fontTagParent.append(fontTag);
		}
	});
}

function toggleAllComments() {
	const topLevelComments = getTopLevelComments();
	if (topLevelComments.length === 0) {
		return false;
	}

	const target = document.querySelector('table.fatitem > tbody');

	const row = document.createElement('tr');
	const leftCell = document.createElement('td');
	const rightCell = document.createElement('td');
	leftCell.setAttribute('colspan', '2');

	const toggleAllBtn = document.createElement('a');
	toggleAllBtn.classList.add('__rhn__toggle-btn');
	toggleAllBtn.innerHTML = 'toggle all comments';
	toggleAllBtn.href = 'javascript:void(0)';

	toggleAllBtn.addEventListener('click', () => {
		for (const comment of topLevelComments) {
			comment.querySelector('a.togg').click();
		}
	});

	rightCell.append(toggleAllBtn);
	row.append(leftCell, rightCell);
	target.append(row);
}

function init(metadata) {
	toggleAllReplies();

	if (metadata.path === '/item') {
		toggleAllComments();
	}

	return true;
}

const details = {
	id: 'toggle-all-comments-and-replies',
	pages: {
		include: paths.comments,
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
