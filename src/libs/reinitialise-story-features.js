/* eslint-ignore no-unused-expressions */

import blurStoryScores from '../features/blur-story-scores';
import openStoryLinksInNewTab from '../features/open-story-links-in-new-tab';
import showFavoriteLinkOnFrontpage from '../features/show-favorite-link-on-frontpage';
import showUserInfoOnHover from '../features/show-user-info-on-hover';

export default () => {
	blurStoryScores();
	openStoryLinksInNewTab();
	showFavoriteLinkOnFrontpage();
	showUserInfoOnHover();
};
