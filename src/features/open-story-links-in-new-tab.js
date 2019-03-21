import features from '../libs/features';

const init = () => {
	const storyLinks = document.querySelectorAll('a.storylink');
	for (const link of storyLinks) {
		link.target = '_blank';
		link.rel = 'noopener';
	}

	return true;
};

const details = {
	id: 'open-story-links-in-new-tab',
	pages: {
		include: ['*'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
