import {getPageDom} from '../libs/utils';
import {getAllComments} from '../libs/dom-utils';
import {paths} from '../libs/paths';

function init() {
	const comments = getAllComments();
	for (const comment of comments) {
		comment.dataset.rhnFormInjected = '0';

		const btns = [];
		['reply', 'edit', 'delete-confirm'].forEach(s => {
			const el = comment.querySelector(`a[href^="${s}"]`);
			if (el) {
				btns.push(el);
			}
		});

		const replyDiv = comment.querySelector('div.reply');

		for (const btn of btns) {
			btn.dataset.rhnBtnActive = '0';

			btn.addEventListener('click', async event => {
				event.preventDefault();
				if (comment.dataset.rhnFormInjected === '0') {
					const page = await getPageDom(btn.href);
					if (!page) {
						return false;
					}

					const replyForm = page.querySelector('form');
					replyForm.classList.add('__rhn__injected-form');

					comment.dataset.rhnFormInjected = '1';
					btn.innerText = 'hide ' + btn.innerText;
					btn.dataset.rhnBtnActive = '1';
					replyDiv.append(replyForm);

					const textarea = replyForm.querySelector('textarea');
					if (textarea) {
						textarea.focus();
					}
				} else if (btn.dataset.rhnBtnActive === '1') {
					comment.dataset.rhnFormInjected = '0';
					btn.dataset.rhnBtnActive = '0';
					btn.innerText = btn.innerText.split(' ')[1];
					replyDiv.removeChild(replyDiv.querySelector('form'));
				}
			});
		}
	}

	return true;
}

const details = {
	id: 'reply-without-leaving-page',
	pages: {
		include: paths.comments,
		exclude: []
	},
	loginRequired: true,
	init
};

export default details;
