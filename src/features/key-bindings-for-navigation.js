import features from '../libs/features';
import {elementInScrollView} from '../libs/utils';

const init = () => {
	const path = window.location.pathname;
	let items = path === '/item' ?
		document.querySelectorAll('table.comment-tree tr.comtr:not(.noshow) td.default') :
		document.querySelectorAll('table.itemlist tr.athing');
	const focusClass = '__rhn__focussed-item';
	let index = 0;
	let activeItem;

	window.addEventListener('keydown', e => {
		if (document.activeElement.matches('textarea')) {
			return;
		}

		switch (e.keyCode) {
			// Down-arrow
			case 74: {
				if (index === items.length - 1) {
					return;
				}

				if (index !== -1) {
					items[index].classList.remove(focusClass);
				}

				if (activeItem) {
					index++;
				}

				activeItem = items[index];
				activeItem.classList.add(focusClass);
				if (!elementInScrollView(activeItem)) {
					activeItem.scrollIntoView(true);
				}

				return;
			}

			// Up-arrow
			case 75: {
				if (index === 0) {
					return;
				}

				items[index].classList.remove(focusClass);

				if (activeItem) {
					index--;
				}

				activeItem = items[index];
				activeItem.classList.add(focusClass);
				if (!elementInScrollView(activeItem)) {
					activeItem.scrollIntoView(true);
				}

				return;
			}

			// Escape
			case 27: {
				if (activeItem) {
					activeItem.classList.remove(focusClass);
					activeItem = undefined;
				}

				break;
			}

			default: break;
		}

		if (!activeItem) {
			return;
		}

		if (path === '/item') {
			switch (e.keyCode) {
				// R: Reply
				case 82: {
					const replyBtn = activeItem.querySelector('a[href^="reply"]');
					if (replyBtn) {
						replyBtn.click();
					}

					break;
				}

				// T: Toggle
				case 84: {
					activeItem.querySelector('a.togg').click();
					items = document.querySelectorAll('table.comment-tree tr.comtr:not(.noshow) td.default');
					break;
				}

				default: break;
			}
		} else {
			const next = items[index].nextElementSibling;
			const story = activeItem.querySelector('a.storylink');
			const upvote = activeItem.querySelector('div.votearrow');
			const hide = next.querySelector('a[href^="hide"]');
			const fave = next.querySelector('a[href^="fave"]');
			const comment = next.querySelector('a[href^="item"]');

			switch (e.keyCode) {
				// Enter
				case 13: {
					story.click();
					break;
				}

				// U
				case 85: {
					if (upvote) {
						upvote.click();
					}

					break;
				}

				// H
				case 72: {
					if (hide) {
						hide.click();
						items = document.querySelectorAll('table.itemlist tr.athing');
						activeItem = items[index--];
					}

					break;
				}

				// F
				case 70: {
					if (fave) {
						fave.click();
					}

					break;
				}

				// C
				case 67: {
					if (comment) {
						comment.click();
					}

					break;
				}

				default: break;
			}
		}
	});

	window.addEventListener('click', () => {
		if (activeItem) {
			activeItem.classList.remove(focusClass);
			activeItem = undefined;
		}
	});
};

features.add({
	id: 'key-bindings-for-navigation',
	pages: {
		include: [
			'/',
			'/new',
			'/news',
			'/show',
			'/shownew',
			'/ask',
			'/active',
			'/item'
		],
		exclude: []
	},
	loginRequired: false,
	init
});

export default init;
