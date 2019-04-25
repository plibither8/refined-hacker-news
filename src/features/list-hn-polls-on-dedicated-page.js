import {getPageDom} from '../libs/utils';

function navbarLink(colorItWhite = false) {
	const navbar = document.querySelector('span.pagetop');
	if (!navbar) {
		return false;
	}

	const submitLink = navbar.querySelector('a[href="submit"]');
	if (!submitLink) {
		return false;
	}

	const pollsLink = document.createElement('a');
	const separator = document.createTextNode(' | ');

	pollsLink.innerText = 'polls';
	pollsLink.href = '/polls';

	navbar.insertBefore(pollsLink, submitLink);
	navbar.insertBefore(separator, submitLink);

	if (colorItWhite) {
		pollsLink.style.color = '#fff';
	}

	return true;
}

async function init(metadata) {
	let pollsLink = false;

	if (metadata.path === '/polls') {
		const homepage = await getPageDom('https://news.ycombinator.com');
		const docHead = [...homepage.children].slice(0, 6);
		const docBody = [...homepage.children].slice(6);
	
		document.head.append(...docHead);
		document.body.removeChild(document.body.firstChild);
		document.body.append(...docBody);

		document.title = 'Polls | Hacker News';

		pollsLink = navbarLink(true);
	} else {
		pollsLink = navbarLink();
	}

	return Boolean(pollsLink);
}

const details = {
	id: 'list-hn-polls-on-dedicated-page',
	pages: {
		include: ['*'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
