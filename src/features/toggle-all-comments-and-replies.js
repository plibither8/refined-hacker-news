import {getTopLevelComments, getAllComments} from '../libs/dom-utils';
import {paths} from '../libs/paths';

function toggleAllReplies() {
	const allComments = [...getAllComments()];

	allComments.forEach((comment, id) => {
		const currentIndent = comment.querySelector('td.ind img').width / 40;
		const nextIndent = id + 1 === allComments.length ?
			undefined :
			allComments[id + 1].querySelector('td.ind img').width / 40;

		if (nextIndent && nextIndent > currentIndent) {
			const fontTag = document.createElement('font');
			fontTag.setAttribute('size', 1);

			const toggleAllBtn = document.createElement('a');
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
				fontTagParent.style.fontSize = '10px';
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

	const target = document.querySelector('table.fatitem td.subtext') ||
		document.querySelector('table.fatitem span.comhead');

	const toggleAllBtn = document.createElement('a');
	toggleAllBtn.innerHTML = 'toggle all comments';
	toggleAllBtn.href = 'javascript:void(0)';

	toggleAllBtn.addEventListener('click', () => {
		for (const comment of topLevelComments) {
			comment.querySelector('a.togg').click();
		}
	});

	target.append(' | ', toggleAllBtn);
}

function init(metadata) {
	if (metadata.options.toggleAllReplies) {
		toggleAllReplies();
	}

	if (metadata.item.isItem) {
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
