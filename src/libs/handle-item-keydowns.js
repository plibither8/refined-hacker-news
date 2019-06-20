import {elementInScrollView} from './dom-utils';
import parseReferenceLinks from './parse-reference-links';

const focusClass = '__rhn__focussed-item';

function activateItem(itemData) {
	itemData.activeItem = itemData.items[itemData.index];
	itemData.activeItem.classList.add(focusClass);
}

function getCommentIndentation(element) {
	const parent = element.parentElement;
	const indentation = parent.querySelector('.ind img').width / 40;
	return indentation;
}

function getNextCommentWithSameIndent(itemData, direction) {
	let {
		items,
		index,
		activeItem
	} = itemData;

	if (activeItem.matches('a.morelink')) {
		return index;
	}

	const activeItemIndentation = getCommentIndentation(activeItem);

	let nextItemIndent;
	do {
		if (index === (direction === 1 ? items.length - 1 : 0)) {
			return index;
		}

		index += direction;

		// If index is of 'More' link, then make it undefined
		nextItemIndent = index === items.length - 1 ? undefined : getCommentIndentation(items[index]);
	} while (nextItemIndent && nextItemIndent > activeItemIndentation);

	return index;
}

const universal = {
	// Move down
	down(itemData, event) {
		if (itemData.index === itemData.items.length - 1) {
			activateItem(itemData);
			return;
		}

		itemData.items[itemData.index].classList.remove(focusClass);

		if (itemData.activeItem) {
			if (itemData.commentList && event.shiftKey) {
				itemData.index = getNextCommentWithSameIndent(itemData, 1);
			} else {
				itemData.index++;
			}
		}

		activateItem(itemData);

		if (!elementInScrollView(itemData.activeItem)) {
			itemData.activeItem.scrollIntoView(true);
		}
	},

	// Move up
	up(itemData, event) {
		if (itemData.index === 0) {
			document.body.scrollTop = 0;
			return;
		}

		itemData.items[itemData.index].classList.remove(focusClass);

		if (itemData.activeItem) {
			if (itemData.commentList && event.shiftKey) {
				itemData.index = getNextCommentWithSameIndent(itemData, -1);
			} else {
				itemData.index--;
			}
		}

		activateItem(itemData);

		if (!elementInScrollView(itemData.activeItem)) {
			itemData.activeItem.scrollIntoView(true);
		}
	},

	// De-activate item
	escape(itemData) {
		if (itemData.activeItem) {
			itemData.activeItem.classList.remove(focusClass);
			itemData.activeItem = undefined;
		}
	},

	// Open reference links
	openReferenceLink(event, activeItem, openReferenceLinksInNewTab) {
		const targetIndex = event.keyCode - 48;
		const links = parseReferenceLinks(activeItem);

		const link = links.find(obj => obj.index === targetIndex);
		if (!link) {
			return;
		}

		if (openReferenceLinksInNewTab || event.shiftKey) {
			browser.runtime.sendMessage({
				url: link.href,
				active: !event.shiftKey
			});
		} else {
			window.open(link.href, '_self');
		}
	}
};

const comment = {
	// Reply to comment
	reply(activeItem) {
		const replyBtn = activeItem.querySelector('a[href^="reply"]');

		if (replyBtn) {
			replyBtn.click();
		}
	},

	// Favorite comment
	favorite(activeItem) {
		const fave = activeItem.querySelector('.__rhn__fave-button');

		if (fave) {
			fave.click();
		}
	},

	// Vote/unvote comment
	vote(activeItem) {
		const vote = activeItem.previousSibling.querySelector('div.votearrow');
		const unvote = activeItem.querySelector('a[id^="un_"]');

		if (unvote) {
			unvote.click();
		} else if (vote) {
			vote.click();
		}
	},

	// Toggle comment
	toggle(activeItem) {
		activeItem.querySelector('a.togg').click();
	}
};

const story = {
	// Open story link
	open(activeItem, event) {
		const story = activeItem.querySelector('a.storylink');
		if (story) {
			if (event.ctrlKey || event.metaKey) {
				browser.runtime.sendMessage({
					url: story.href
				});
			} else {
				story.click();
			}
		}
	},

	// Vote story
	vote(activeItem, next) {
		const vote = activeItem.querySelector('td.votelinks:not(.nosee) div.votearrow');
		const unvote = next.querySelector('a[id^="un_"]') || activeItem.querySelector('a[id^="un_"]');

		if (unvote) {
			unvote.click();
		} else if (vote) {
			vote.click();
		}
	},

	// Hide story
	hide(next) {
		const hide = next.querySelector('a[href^="hide"]');

		if (hide) {
			hide.click();
			return true;
		}

		return false;
	},

	// Favorite story
	favorite(next) {
		const fave = next.querySelector('a[href^="fave"]');
		if (fave) {
			fave.click();
		}
	},

	// Open comments
	comments(next, event) {
		const comment = next.querySelector('a[href^="item"]');

		if (comment) {
			if (event.ctrlKey || event.metaKey) {
				browser.runtime.sendMessage({
					url: comment.href
				});
			} else {
				comment.click();
			}
		}
	},

	// Flag/Unflag story
	flag(next) {
		const flagBtn = next.querySelector('a[href^="flag"]');
		if (flagBtn) {
			flagBtn.click();
		}
	}
};

const keydown = {
	universal,
	comment,
	story
};

export {keydown};
