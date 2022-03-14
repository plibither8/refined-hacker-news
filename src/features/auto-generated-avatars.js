import {getAllComments} from '../libs/dom-utils';
import {paths} from '../libs/paths';

function generateAvatarFromUsername(author) {
	// Code courtesy of HN user 'tomxor',
	// see https://news.ycombinator.com/item?id=30668137
	const p = 2;
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = p * 7;
	canvas.height = p * 7;
	canvas.classList += '__rhn__avatar';

	for (let s = author.innerText, r = 1, i = 28 + s.length; i--;) {
		// Xorshift32
		r ^= r << 13;
		r ^= r >>> 17;
		r ^= r << 5;
		const X = i & 3;
		const Y = i >> 2;
		if (i >= 28) {
			// Seed state
			r += s.charCodeAt(i - 28);
			ctx.fillStyle = '#' + (r >> 8 & 0xFFFFFF)
				.toString(16).padStart(6, '0');
		} else if (r >>> 29 > X * X / 3 + Y / 2) {
			// Draw pixel
			ctx.fillRect(p * 3 + p * X, p * Y, p, p);
			ctx.fillRect(p * 3 - p * X, p * Y, p, p);
		}
	}

	return canvas;
}

async function init() {
	const op = document.body.querySelector('a.hnuser');
	if (op) {
		op.parentNode.insertBefore(generateAvatarFromUsername(op), op);
	}

	const comments = getAllComments();

	for (const comment of comments) {
		const commentAuthor = comment.querySelector('a.hnuser');
		commentAuthor.parentElement.prepend(generateAvatarFromUsername(commentAuthor));
	}

	return true;
}

const details = {
	id: 'auto-generated-avatars',
	pages: {
		include: paths.comments,
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
