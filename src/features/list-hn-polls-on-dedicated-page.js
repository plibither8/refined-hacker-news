import {getPageDom} from '../libs/utils';

async function init() {
	const homepage = await getPageDom('https://news.ycombinator.com');
	document.body.innerHTML = homepage.innerHTML;

	return true;
}

const details = {
	id: 'list-hn-polls-on-dedicated-page',
	pages: {
		include: ['/polls'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
