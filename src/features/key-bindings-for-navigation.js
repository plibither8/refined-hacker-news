import {elementInScrollView} from '../libs/dom-utils';

function init() {
	const path = window.location.pathname;
	const focusClass = '__rhn__focussed-item';
	let items;
	let index = 0;
	let activeItem;

	window.addEventListener('keydown', event => {
		if (['TEXTAREA', 'INPUT'].includes(document.activeElement.tagName)) {
			return;
		}

		items = path === '/item' ?
			document.querySelectorAll('table.comment-tree tr.comtr:not(.noshow) td.default') :
			document.querySelectorAll('table.itemlist tr.athing');

		switch (event.keyCode) {
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
			switch (event.keyCode) {
				// R: Reply
				case 82: {
					const replyBtn = activeItem.querySelector('a[href^="reply"]');
					if (replyBtn) {
						replyBtn.click();
					}

					break;
				}

				// F: favorite comment/reply
				case 70: {
					const fave = activeItem.querySelector('.__rhn__favelink');
					if (fave) {
						fave.click();
					}

					break;
				}

				// U: upvote comment/reply
				case 85: {
					const upvote = activeItem.previousSibling.querySelector('div.votearrow');
					if (upvote) {
						upvote.click();
					}

					break;
				}

				// Enter: Toggle
				case 13: {
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

			switch (event.keyCode) {
				// Enter: open story link
				case 13: {
					if (story) {
						if (event.ctrlKey) {
							browser.runtime.sendMessage({url: story.href});
						} else {
							story.click();
						}
					}

					break;
				}

				// U: upvote story
				case 85: {
					if (upvote) {
						upvote.click();
					}

					break;
				}

				// H: hide story
				case 72: {
					if (hide) {
						hide.click();
						items = document.querySelectorAll('table.itemlist tr.athing');
						activeItem = items[index--];
					}

					break;
				}

				// F: favorite story
				case 70: {
					if (fave) {
						fave.click();
					}

					break;
				}

				// C: open story comments
				case 67: {
					if (comment) {
						if (event.ctrlKey) {
							browser.runtime.sendMessage({url: comment.href});
						} else {
							comment.click();
						}
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

	return true;
}

const details = {
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
};

export default details;
