import {elementInScrollView} from './dom-utils';

const focusClass = '__rhn__focussed-item';

function parseReferenceLinks(activeItem) {
	const links = [];

	const commentSpan = activeItem.querySelector('span.commtext');
	const children = [...commentSpan.childNodes];
	const lastItem = children.pop();
	if (lastItem.nodeType !== Node.ELEMENT_NODE || !lastItem.matches('div.reply')) {
		return links;
	}

	children.shift();

	const regex = /^\[?(?<index>\d)\]?:?$/;

	for (const child of children) {
		const link = child.querySelector('a');
		if (!link) {
			continue;
		}

		const textFirstWord = child.innerText.split(' ')[0];
		const matches = textFirstWord.match(regex);

		if (!matches) {
			continue;
		}

		const index = Number(matches.groups.index);

		links.push({
			index,
			element: link,
			href: link.href
		});
	}

	return links;
}

const universal = {
	// Move up
	down(items, index, activeItem) {
		if (index === items.length - 1) {
			activeItem = items[index];
			activeItem.classList.add(focusClass);

			return {
				activeItem,
				items,
				index
			};
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

		return {
			activeItem,
			items,
			index
		};
	},

	// Move down
	up(items, index, activeItem) {
		if (index === 0) {
			activeItem = items[index];
			activeItem.classList.add(focusClass);

			return {
				activeItem,
				items,
				index
			};
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

		return {
			activeItem,
			items,
			index
		};
	},

	// De-activate item
	escape(activeItem) {
		if (activeItem) {
			activeItem.classList.remove(focusClass);
			return true;
		}

		return false;
	}
};

const item = {
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
	},

	// Open reference links
	openLink(event, activeItem) {
		const targetIndex = event.keyCode - 48;
		const links = parseReferenceLinks(activeItem);

		const link = links.find(obj => obj.index === targetIndex);
		if (!link) {
			return;
		}

		browser.runtime.sendMessage({
			url: link.href,
			active: !event.shiftKey
		});
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
		const unvote = next.querySelector('a[id^="un_"]');

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
	comment(next, event) {
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
	}
};

const keydown = {
	universal,
	item,
	story
};

export {keydown};
