import blurStoryScores from '../features/blur-story-scores';
import changeDeadCommentsColor from '../features/change-dead-comments-color';
import clickCommentIndentToToggle from '../features/click-comment-indent-to-toggle';
import highlightOpUsername from '../features/highlight-op-username';
import italiciseShortcutKey from '../features/italicise-shortcut-key';
import linkifyText from '../features/linkify-text';
import loadMoreLinksInNavbar from '../features/load-more-links-in-navbar';
import openStoryLinksInNewTab from '../features/open-story-links-in-new-tab';
import pastChooseDate from '../features/past-choose-date';
import prefillSubmitTitle from '../features/prefill-submit-title';
import profileLinksDropdown from '../features/profile-links-dropdown';
import replyWithoutLeavingPage from '../features/reply-without-leaving-page';
import showFavoriteLinkOnFrontpage from '../features/show-favorite-link-on-frontpage';
import showKarmaLeft from '../features/show-karma-left';
import showSubmissionTitleRemainingCharacters from '../features/show-submission-title-remaining-characters';
import showUserInfoOnHover from '../features/show-user-info-on-hover';
import toggleAllComments from '../features/toggle-all-comments';
import toggleAllReplies from '../features/toggle-all-replies';
import sortStories from '../features/sort-stories';

export default () => {
    blurStoryScores(),
    openStoryLinksInNewTab(),
    showFavoriteLinkOnFrontpage(),
    showUserInfoOnHover()
}