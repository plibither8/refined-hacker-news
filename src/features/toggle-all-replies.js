import {getAllComments} from '../libs/dom-utils';
import {paths} from '../libs/paths';

function init() {
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

	return true;
}

const details = {
	id: 'toggle-all-replies',
	pages: {
		include: paths.comments,
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
