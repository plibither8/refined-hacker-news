import {elementInScrollView} from './dom-utils';

const focusClass = '__rhn__focussed-item';

function parseReferenceLinks(activeItem) {
	/**
	 * The array that will collect all reference links found
	 * in the form of an object, containing the link's URL and
	 * the index number.
	 */
	const links = [];

	const commentSpan = activeItem.querySelector('span.commtext');
	const children = [...commentSpan.childNodes];

	/**
	 * There are two type of `commentSpan`s:
	 *   1. The ones that have only one child, which are text nodes.
	 *      These ones have the reply div outside the span.
	 *   2. The ones that have multiple children (comments with >1 paras).
	 *      These ones have the reply div inside the span.
	 * The favourable ones for us are those which have multiple paragraphs,
	 * since reference links are most commonly written on a separate line.
	 *
	 * So what we are basically doing here is:
	 *   - Pop the last node out of the array of direct children of `commentSpan`.
	 *   - If the last node is the reply div, it means this comment has multiple
	 *     paragraphs, and so it is favourable.
	 *     Extra checK: If the last node is text node, we won't consider it either.
	 *   - Once we have ascertained that this is a favourable comment for reference
	 *     links, we remove the first node out of the array since it is a text node
	 *     and hence useless.
	 */
	const lastItem = children.pop();
	if (!lastItem.matches('div.reply') || lastItem.nodeType !== Node.ELEMENT_NODE) {
		return links;
	}

	children.shift();

	/**
	 * This expression had been made by observing the general
	 * pattern and syntax of numbered reference links seen on HN.
	 * If this can be refined further, it would be great :)
	 *
	 * Explanation:
	 * - (Optional) Starts with an opening square bracker "["
	 * - The next (or first, depends) character should be a digit from 0 to 9
	 * - (Optional) End with a closing square bracket, colon or period
	 */
	const indexMarkerRegex = /^\[?(?<index>\d)[\]:.]?:?$/;

	for (const child of children) {
		/**
		 * Here we are making sure that the child contains an anchor element to
		 * detect whether there is in fact a link or not.
		 */
		const link = child.querySelector('a');
		if (!link) {
			continue;
		}

		/**
		 * I am making a (safe) assumption here that reference links have a space between
		 * where their marker ends, and where the link starts. So:
		 * "[1] https://mihir.ch" will be detected
		 * "[1]https://mihir.ch" will *not* be detected
		 */
		const textFirstWord = child.innerText.split(' ')[0];
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
	// Move up
	down(itemData) {
		if (itemData.index === itemData.items.length - 1) {
			itemData.activeItem = itemData.items[itemData.index];
			itemData.activeItem.classList.add(focusClass);

			return itemData;
		}

		if (itemData.index !== -1) {
			itemData.items[itemData.index].classList.remove(focusClass);
		}

		if (itemData.activeItem) {
			itemData.index++;
		}

		itemData.activeItem = itemData.items[itemData.index];
		itemData.activeItem.classList.add(focusClass);
		if (!elementInScrollView(itemData.activeItem)) {
			itemData.activeItem.scrollIntoView(true);
		}

		return itemData;
	},

	// Move down
	up(itemData) {
		if (itemData.index === 0) {
			itemData.activeItem = itemData.items[itemData.index];
			itemData.activeItem.classList.add(focusClass);

			return itemData;
		}

		itemData.items[itemData.index].classList.remove(focusClass);

		if (itemData.activeItem) {
			itemData.index--;
		}

		itemData.activeItem = itemData.items[itemData.index];
		itemData.activeItem.classList.add(focusClass);
		if (!elementInScrollView(itemData.activeItem)) {
			itemData.activeItem.scrollIntoView(true);
		}

		return itemData;
	},

	// De-activate item
	escape(activeItem) {
		if (activeItem) {
			activeItem.classList.remove(focusClass);
			return true;
		}

		return false;
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
