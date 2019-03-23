
import autoRefresh from '../features/auto-refresh';
import changeDeadCommentsColor from '../features/change-dead-comments-color';
import clickCommentIndentToToggle from '../features/click-comment-indent-to-toggle';
import clickRankToVoteUnvote from '../features/click-rank-to-vote-unvote';
import commentsUiTweaks from '../features/comments-ui-tweaks';
import immediatelyReturnAfterFavorite from '../features/immediately-return-after-favorite';
import italiciseShortcutKey from '../features/italicise-shortcut-key';
import keyBindingsForNavigation from '../features/key-bindings-for-navigation';
import linkifyText from '../features/linkify-text';
import loadMoreLinksInNavbar from '../features/load-more-links-in-navbar';
import moreAccessibleFavorite from '../features/more-accessible-favorite';
import openStoryLinksInNewTab from '../features/open-story-links-in-new-tab';
import pastChooseDate from '../features/past-choose-date';
import prefillSubmitTitle from '../features/prefill-submit-title';
import profileLinksDropdown from '../features/profile-links-dropdown';
import replyWithoutLeavingPage from '../features/reply-without-leaving-page';
import showKarmaLeft from '../features/show-karma-left';
import showUserInfoOnHover from '../features/show-user-info-on-hover';
import sortStories from '../features/sort-stories';
import submissionTitleRemainingCharacters from '../features/submission-title-remaining-characters';
import toggleAllComments from '../features/toggle-all-comments';
import toggleAllReplies from '../features/toggle-all-replies';
import features from './features';

const featureList = [
	autoRefresh,
	changeDeadCommentsColor,
	clickCommentIndentToToggle,
	clickRankToVoteUnvote,
	commentsUiTweaks,
	immediatelyReturnAfterFavorite,
	italiciseShortcutKey,
	keyBindingsForNavigation,
	linkifyText,
	loadMoreLinksInNavbar,
	moreAccessibleFavorite,
	openStoryLinksInNewTab,
	pastChooseDate,
	prefillSubmitTitle,
	profileLinksDropdown,
	replyWithoutLeavingPage,
	showKarmaLeft,
	showUserInfoOnHover,
	sortStories,
	submissionTitleRemainingCharacters,
	toggleAllComments,
	toggleAllReplies
];

export default function (...args) {
	if (args.length === 0) {
		for (const feat of featureList) {
			features.add(feat, true);
		}

		return;
	}

	for (const id of args) {
		const feat = featureList.find(f => f.id === id);
		features.add(feat);
	}
}
