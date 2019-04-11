import {elementInScrollView} from './dom-utils';

const focusClass = '__rhn__focussed-item';

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

function parseReferenceLinks(activeItem) {
	// The array that will collect all reference links found
	// in the form of an object, containing the link's URL and
	// the index number.
	const links = [];

	const commentSpan = activeItem.querySelector('span.commtext');
	const children = [...commentSpan.children];

	// This means that there are no children in the <span> element
	// and hence it is useless to check any further for reference links
	// assuming that all reference links are mentioned in a separate
	// paragraph of their own, hence creating <p> children.
	if (children.length === 0) {
		return links;
	}

	// This expression had been made by observing the general
	// pattern and syntax of numbered reference links seen on HN.
	// If this can be refined further, it would be great :)
	const indexMarkerRegex = /^\[?(?<index>\d)[\]:.]?[:.]?$/;

	for (const child of children) {
		// Here we are making sure that the child contains an anchor element to
		// detect whether there is in fact a link or not.
		const link = child.querySelector('a');
		if (!link) {
			continue;
		}

		// The first text node of the <p> tag.
		const textFirstWord = child.childNodes[0].textContent.trim();
		const matches = textFirstWord.match(indexMarkerRegex);

		if (!matches) {
			continue;
		}

		const index = Number(matches.groups.index);

		links.push({
			index,
			href: link.href
		});
	}

	return links;
}

const universal = {
	// Move down
	down(itemData, event) {
		if (itemData.index === itemData.items.length - 1) {
			itemData.activeItem = itemData.items[itemData.index];
			itemData.activeItem.classList.add(focusClass);
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

		itemData.activeItem = itemData.items[itemData.index];
		itemData.activeItem.classList.add(focusClass);

		if (!elementInScrollView(itemData.activeItem)) {
			itemData.activeItem.scrollIntoView(true);
		}
	},

	// Move up
	up(itemData) {
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

		itemData.activeItem = itemData.items[itemData.index];
		itemData.activeItem.classList.add(focusClass);

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
		const fave = activeItem.querySelector('.__rhn__favelink');

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
		const vote = activeItem.querySelector('div.votearrow');
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
