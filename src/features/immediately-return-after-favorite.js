import features from '../libs/features';

const init = () => {
	switch (window.location.pathname) {
		case '/favorites': {
			const referrer = new URL(document.referrer).origin;
			const params = new URLSearchParams(window.location.href.replace('?', '&'));

			if (params.has('n')) {
				return;
			}

			if (referrer !== 'https://news.ycombinator.com') {
				return;
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

		default: break;
	}
};

features.add({
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
});

export default init;
