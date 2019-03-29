import {keydown} from '../libs/handle-keydowns';

function init() {
	const path = window.location.pathname;
	const focusClass = '__rhn__focussed-item';
	let items;
	let index = 0;
	let activeItem;

	const isCommentList = ['/item', '/threads'].includes(path);

	function getItemList() {
		return isCommentList ?
			document.querySelectorAll('tr.comtr:not(.noshow) td.default') :
			document.querySelectorAll('table.itemlist tr.athing');
	}

	function comboKeyCheck(event) {
		return event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
	}

	window.addEventListener('keydown', event => {
		if (document.activeElement.tagName !== 'BODY') {
			return;
		}

		items = getItemList();
		const combo = comboKeyCheck(event);

		// Universal
		switch (event.keyCode) {
			// Down-arrow
			case 74:
				if (combo) {
					return;
				}

				({
					items,
					index,
					activeItem
				} = keydown.universal.down(items, index, activeItem));
				return;

			// Up-arrow
			case 75:
				if (combo) {
					return;
				}

				({
					items,
					index,
					activeItem
				} = keydown.universal.up(items, index, activeItem));
				return;

			// Escape
			case 27:
				if (combo) {
					return;
				}

				if (keydown.universal.escape(activeItem)) {
					activeItem = undefined;
				}

				return;

			default: break;
		}

		if (!activeItem) {
			return;
		}

		// If URL pathname is of the form: ".../[item|threads]?id=..."
		// Basically, if it is a story item
		if (isCommentList) {
			switch (event.keyCode) {
				// R: Reply
				case 82:
					if (combo) {
						return;
					}

					keydown.item.reply(activeItem);
					return;

				// F: favorite comment/reply
				case 70:
					if (combo) {
						return;
					}

					keydown.item.favorite(activeItem);
					return;

				// U: upvote comment/reply
				case 85:
					if (combo) {
						return;
					}

					keydown.item.vote(activeItem);
					return;

				// Enter: Toggle
				case 13:
					if (combo) {
						return;
					}

					keydown.item.toggle(activeItem);
					items = getItemList();
					return;

				// 0 - 9: Open Refence Links
				case 48:
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57:
					keydown.item.openLink(event, activeItem);
					break;

				default: break;
			}
		/* eslint-disable-next-line brace-style */
		}

		// For all other pages where this feature is active
		// Basically story lists
		else {
			const next = items[index].nextElementSibling;

			switch (event.keyCode) {
				// Enter: open story link
				case 13:
					keydown.story.open(activeItem, event);
					return;

				// U: upvote story
				case 85:
					if (combo) {
						return;
					}

					keydown.story.vote(activeItem, next);
					return;

				// H: hide story
				case 72:
					if (combo) {
						return;
					}

					if (keydown.story.hide(next)) {
						items = getItemList();
						activeItem = items[index--];
					}

					return;

				// F: favorite story
				case 70:
					if (combo) {
						return;
					}

					keydown.story.favorite(next);
					return;

				// C: open story comments
				case 67:
					keydown.story.comment(next, event);

					break;

				default: break;
			}
		}
	});

	// If there has been a click, de-activate the activeItem
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
			'/newest',
			'/news',
			'/show',
			'/shownew',
			'/ask',
			'/active',
			'/submitted',
			'/hidden',
			'/upvoted',
			'/favorites',
			'/item',
			'/threads'
		],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
