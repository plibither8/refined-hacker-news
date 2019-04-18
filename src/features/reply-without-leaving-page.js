import {getPageDom} from '../libs/utils';
import {getAllComments} from '../libs/dom-utils';
import {paths} from '../libs/paths';

function init() {
	const comments = getAllComments();
	for (const comment of comments) {
		comment.dataset.rhnFormInjected = '0';

		const btns = [];
		['reply', 'edit', 'delete-confirm'].forEach(action => {
			const link = comment.querySelector(`a[href^="${action}"]`);
			if (link) {
				btns.push(link);
			}
		});

		const replyDiv = comment.querySelector('div.reply');
		const ACTIVE_DATA = {
			form: undefined,
			button: undefined
		};

		for (const btn of btns) {
			btn.dataset.rhnActionName = btn.innerText;

			btn.addEventListener('click', async event => {
				event.preventDefault();

				const selection = window.getSelection().toString().trim();

				if (ACTIVE_DATA.form) {
					// Removing currently present form
					ACTIVE_DATA.form = undefined;
					replyDiv.querySelector('form').remove();

					if (ACTIVE_DATA.button) {
						ACTIVE_DATA.button.innerText = ACTIVE_DATA.button.dataset.rhnActionName;
					}

					// Adding newly clicked form
					// eslint-disable-next-line no-negated-condition
					if (ACTIVE_DATA.button !== btn) {
						btn.click();
					} else {
						ACTIVE_DATA.button = undefined;
					}
				} else {
					const page = await getPageDom(btn.href);
					if (!page) {
						return false;
					}

					const form = page.querySelector('form');
					form.classList.add('__rhn__injected-form');

					ACTIVE_DATA.form = form;
					ACTIVE_DATA.button = btn;

					btn.innerText = 'hide ' + btn.dataset.rhnActionName;
					replyDiv.append(form);

					const textarea = form.querySelector('textarea');
					if (textarea) {
						if (selection.length > 0) {
							textarea.value += `${textarea.value.length > 0 ? '\n\n' : ''}> *${selection}*\n\n`;
						}

						textarea.focus();
					}
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
