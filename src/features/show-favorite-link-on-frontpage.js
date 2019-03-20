import features from '../libs/features';
import {getLoggedInUser} from '../libs/utils';

const init = async () => {
	const subtexts = document.querySelectorAll('td.subtext');
	const alreadyFaveStories = [];
	const user = getLoggedInUser();
	const rawFaveHtml = await fetch('https://news.ycombinator.com/favorites?id=' + user).then(res => res.text());
	const tempEl = document.createElement('div');
	tempEl.innerHTML = rawFaveHtml;
	const stories = tempEl.querySelectorAll('table.itemlist > tbody > tr.athing');
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

		if (alreadyFaveStories.includes(id)) {
			faveLink.href = `fave?id=${id}&auth=${auth}&un=t`;
			faveLink.innerHTML = 'un-favorite';
		} else {
			faveLink.href = `fave?id=${id}&auth=${auth}`;
			faveLink.innerHTML = 'favorite';
		}

		subtext.insertBefore(faveLink, commentsLink);
		subtext.insertBefore(faveSeparator, commentsLink);
	}

	return true;
};

const details = {
	id: 'show-favorite-link-on-frontpage',
	pages: {
		include: [
			'/',
			'/news',
			'/show',
			'/shownew',
			'/ask',
			'/active'
		],
		exclude: []
	},
	loginRequired: true,
	init
};

features.add(details);

export default details;
