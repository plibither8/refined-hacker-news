import {getAuthString, getPageDom} from '../libs/utils';
import {getAllComments} from '../libs/dom-utils';
import {paths} from '../libs/paths';

async function init(metadata) {
	const {path, user, options} = metadata;

	if (paths.comments.includes(path)) {
		const alreadyFaveStories = [];
		const page = await getPageDom('https://news.ycombinator.com/favorites?comments=t&id=' + user.name);
		if (!page) {
			return false;
		}

		const stories = page.querySelectorAll('table.itemlist > tbody > tr.athing');
		for (const story of stories) {
			alreadyFaveStories.push(story.id);
		}

		const comments = getAllComments();
		for (const comment of comments) {
			const {id} = comment;

			const headSpan = comment.querySelector('span.comhead');
			let unfave = false;

			const faveLink = document.createElement('a');
			const faveSeparator = document.createTextNode('| ');

			faveLink.href = 'javascript:void(0)';
			faveLink.classList.add('__rhn__favelink');

			if (alreadyFaveStories.includes(id)) {
				faveLink.innerHTML = 'un-favorite';
				unfave = true;
			} else {
				faveLink.innerHTML = 'favorite';
			}

			const toggleBtn = comment.querySelector('a.togg');
			toggleBtn.style.marginLeft = '4px';
			headSpan.insertBefore(faveSeparator, toggleBtn);
			headSpan.insertBefore(faveLink, toggleBtn);

			faveLink.addEventListener('click', async () => {
				const auth = await getAuthString(id);
				const url = `https://news.ycombinator.com/fave?id=${id}&auth=${auth}${unfave ? '&un=t' : ''}`;
				browser.runtime.sendMessage({
					url,
					immediatelyCloseFavorite: options.immediatelyCloseFavorite
				});

				unfave = !unfave;
				faveLink.innerHTML = unfave ? 'un-favorite' : 'favorite';
			});
		}
	} else {
		const subtexts = document.querySelectorAll('td.subtext');
		const alreadyFaveStories = [];
		const page = await getPageDom('https://news.ycombinator.com/favorites?id=' + user);
		if (!page) {
			return false;
		}

		const stories = page.querySelectorAll('table.itemlist > tbody > tr.athing');
		for (const story of stories) {
			alreadyFaveStories.push(story.id);
		}

		for (const subtext of subtexts) {
			const commentsLink = [...subtext.querySelectorAll('a')].pop();
			let faveLinkExists = false;

			let hideLink;
			for (const link of subtext.querySelectorAll('a')) {
				if (link.innerText === 'hide') {
					hideLink = link.href.replace('?', '&');
				} else if (link.innerText === 'favorite') {
					faveLinkExists = true;
					break;
				}
			}

			if (faveLinkExists) {
				break;
			}

			const params = new URLSearchParams(hideLink);
			const auth = params.get('auth');
			const id = params.get('id');

			const faveLink = document.createElement('a');
			const faveSeparator = document.createTextNode(' | ');
			let unfave = false;

			if (alreadyFaveStories.includes(id)) {
				faveLink.href = `fave?id=${id}&auth=${auth}&un=t`;
				faveLink.innerHTML = 'un-favorite';
				unfave = true;
			} else {
				faveLink.href = `fave?id=${id}&auth=${auth}`;
				faveLink.innerHTML = 'favorite';
			}

			subtext.insertBefore(faveLink, commentsLink);
			subtext.insertBefore(faveSeparator, commentsLink);

			faveLink.addEventListener('click', event => {
				event.preventDefault();
				browser.runtime.sendMessage({
					url: faveLink.href,
					immediatelyCloseFavorite: options.immediatelyCloseFavorite
				});

				unfave = !unfave;
				faveLink.innerHTML = unfave ? 'un-favorite' : 'favorite';
				faveLink.href = `fave?id=${id}&auth=${auth}${unfave ? '&un=t' : ''}`;
			});
		}
	}

	return true;
}

const details = {
	id: 'more-accessible-favorite',
	pages: {
		include: [
			...paths.stories,
			...paths.comments
		],
		exclude: ['/jobs']
	},
	loginRequired: true,
	init
};

export default details;
