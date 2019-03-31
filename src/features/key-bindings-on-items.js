import {keydown} from '../libs/handle-item-keydowns';
import {getOptions} from '../libs/utils';
import {paths} from '../libs/paths';

async function init() {
	const path = window.location.pathname;
	const focusClass = '__rhn__focussed-item';
	const isCommentList = ['/item', '/threads'].includes(path);

	const {openReferenceLinksInNewTab} = await getOptions;

	function getItemList() {
		return isCommentList ?
			document.querySelectorAll('tr.comtr:not(.noshow) td.default') :
			document.querySelectorAll('table.itemlist tr.athing');
	}

	function comboKeyCheck(event) {
		return event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
	}

	let itemData = {
		items: [],
		index: 0,
		activeItem: undefined
	};

	window.addEventListener('keydown', event => {
		if (document.activeElement.tagName !== 'BODY') {
			return;
		}

		itemData.items = getItemList();
		const combo = comboKeyCheck(event);

		// Universal
		switch (event.keyCode) {
			// Down-arrow
			case 74:
				if (combo) {
					return;
				}

				itemData = keydown.universal.down(itemData);
				return;

			// Up-arrow
			case 75:
				if (combo) {
					return;
				}

				itemData = keydown.universal.up(itemData);
				return;

			// Escape
			case 27:
				if (combo) {
					return;
				}

				if (keydown.universal.escape(itemData.activeItem)) {
					itemData.activeItem = undefined;
				}

				return;

			default: break;
		}

		if (!itemData.activeItem) {
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

					keydown.item.reply(itemData.activeItem);
					return;

				// F: favorite comment/reply
				case 70:
					if (combo) {
						return;
					}

					keydown.item.favorite(itemData.activeItem);
					return;

				// U: upvote comment/reply
				case 85:
					if (combo) {
						return;
					}

					keydown.item.vote(itemData.activeItem);
					return;

				// Enter: Toggle
				case 13:
					if (combo) {
						return;
					}

					keydown.item.toggle(itemData.activeItem);
					itemData.items = getItemList();
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
					keydown.item.openReferenceLink(event, itemData.activeItem, openReferenceLinksInNewTab);
					break;

				default: break;
			}
		/* eslint-disable-next-line brace-style */
		}

		// For all other pages where this feature is active
		// Basically story lists
		else {
			const next = itemData.items[itemData.index].nextElementSibling;

			switch (event.keyCode) {
				// Enter: open story link
				case 13:
					keydown.story.open(itemData.activeItem, event);
					return;

				// U: upvote story
				case 85:
					if (combo) {
						return;
					}

					keydown.story.vote(itemData.activeItem, next);
					return;

				// H: hide story
				case 72:
					if (combo) {
						return;
					}

					if (keydown.story.hide(next)) {
						itemData.items = getItemList();
						itemData.activeItem = itemData.items[itemData.index--];
					}

					return;

				// F: favorite story
				case 70:
					if (combo) {
						return;
					}

					keydown.story.favorite(next);
					return;

				// X: flag/unflag story
				case 88:
					if (combo) {
						return;
					}

					keydown.story.flag(next);
					return;

				// C: open story comments
				case 67:
					keydown.story.comment(next, event);

					break;

				default: break;
			}
		}
	});

	// If there has been a click, de-activate the active item
	window.addEventListener('click', () => {
		if (itemData.activeItem) {
			itemData.activeItem.classList.remove(focusClass);
			itemData.activeItem = undefined;
		}
	});

	return true;
}

const details = {
	id: 'key-bindings-for-navigation',
	pages: {
		include: [
			...paths.stories,
			...paths.comments,
			...paths.userSpecific
		],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
