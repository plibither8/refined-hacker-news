import features from '../libs/features';

const init = () => {
	switch (window.location.pathname) {
		case '/favorites': {
			const referrer = new URL(document.referrer).origin;
			const params = new URLSearchParams(window.location.href.replace('?', '&'));

			if (params.has('n')) {
				return false;
			}

			if (referrer !== 'https://news.ycombinator.com') {
				return false;
			}

			history.back();

			break;
		}

		case '/user': {
			const faveLinks = document.querySelectorAll('a[href^="favorites"]');
			for (const link of faveLinks) {
				link.href = link.href.replace('?', '?n&');
			}

			break;
		}

		default: return false;
	}

	return true;
};

const details = {
	id: 'immediately-return-after-favorite',
	pages: {
		include: [
			'/favorites',
			'/user'
		],
		exclude: []
	},
	loginRequired: true,
	init
};

features.add(details);

export default details;
