import blurStoryScores from '../features/blur-story-scores';
import changeDeadCommentsColor from '../features/change-dead-comments-color';
import clickCommentIndentToToggle from '../features/click-comment-indent-to-toggle';
import toggleAllComments from '../features/toggle-all-comments';
import toggleAllReplies from '../features/toggle-all-replies';
import openStoryLinksInNewTab from '../features/open-story-links-in-new-tab';
import loadMoreLinksInNavbar from '../features/load-more-links-in-navbar';
import highlightOpUsername from '../features/highlight-op-username';
import showSubmissionTitleRemainingCharacters from '../features/show-submission-title-remaining-characters';
import showKarmaLeft from '../features/show-karma-left';
import profileLinksDropdown from '../features/profile-links-dropdown';
import showFavoriteLinkOnFrontpage from '../features/show-favorite-link-on-frontpage';
import showUserInfoOnHover from '../features/show-user-info-on-hover';
import prefillSubmitTitle from '../features/prefill-submit-title';
import loadMoreStories from '../features/load-more-stories';

// import '../features/hide-read-stories'
// import '../features/past-date-picker';
// import '../features/sort-stories';

export default () => {
    blurStoryScores(),
    openStoryLinksInNewTab(),
    showFavoriteLinkOnFrontpage(),
    showUserInfoOnHover()
}