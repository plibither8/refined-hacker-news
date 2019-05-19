import OptionsSync from 'webext-options-sync';

// All features, imported in alphabetical order
import autoRefresh from '../features/auto-refresh';
import changeDeadCommentsColor from '../features/change-dead-comments-color';
import clickCommentIndentToToggle from '../features/click-comment-indent-to-toggle';
import clickRankToVoteUnvote from '../features/click-rank-to-vote-unvote';
import commentsUiTweaks from '../features/comments-ui-tweaks';
import fetchSubmissionTitleFromUrl from '../features/fetch-submission-title-from-url';
import hideReadStories from '../features/hide-read-stories';
import inputFieldTweaks from '../features/input-field-tweaks';
import keyBindingsOnInputFields from '../features/key-bindings-on-input-fields';
import keyBindingsOnItems from '../features/key-bindings-on-items';
import linkifyUserAbout from '../features/linkify-user-about';
import listHnPollsSeparately from '../features/list-hn-polls-separately';
import loadMoreLinksInNavbar from '../features/load-more-links-in-navbar';
import moreAccessibleFavorite from '../features/more-accessible-favorite';
import onLinkFocusComment from '../features/on-link-focus-comment';
import openStoryLinksInNewTab from '../features/open-story-links-in-new-tab';
import pastChooseDate from '../features/past-choose-date';
import prefillSubmitTitle from '../features/prefill-submit-title';
import previewAndSetTopBarColor from '../features/preview-and-set-top-bar-color';
import profileLinksDropdown from '../features/profile-links-dropdown';
import replyWithoutLeavingPage from '../features/reply-without-leaving-page';
import showItemInfoOnHover from '../features/show-item-info-on-hover';
import showSimilarSubmissions from '../features/show-similar-submissions';
import showTopLeadersKarma from '../features/show-top-leaders-karma';
import showUserInfoOnHover from '../features/show-user-info-on-hover';
import sortStories from '../features/sort-stories';
import toggleAllCommentsAndReplies from '../features/toggle-all-comments-and-replies';

import features from './features';
import {
	getUrlParams,
	getOptions,
	getUserAndColor,
	getItemType
} from './utils';

const featureList = [
	listHnPollsSeparately,
	keyBindingsOnItems,
	commentsUiTweaks,
	moreAccessibleFavorite,
	loadMoreLinksInNavbar,
	clickCommentIndentToToggle,
	toggleAllCommentsAndReplies,
	changeDeadCommentsColor,
	clickRankToVoteUnvote,
	fetchSubmissionTitleFromUrl,
	keyBindingsOnInputFields,
	inputFieldTweaks,
	linkifyUserAbout,
	onLinkFocusComment,
	openStoryLinksInNewTab,
	pastChooseDate,
	prefillSubmitTitle,
	profileLinksDropdown,
	showItemInfoOnHover,
	showTopLeadersKarma,
	showUserInfoOnHover,
	replyWithoutLeavingPage,
	previewAndSetTopBarColor,
	showSimilarSubmissions,

	// Options bar (order matters)
	sortStories,
	hideReadStories,
	autoRefresh
];

// eslint-disable-next-line no-async-promise-executor
const getMetadata = new Promise(async resolve => {
	const metadata = {
		path: window.location.pathname,
		user: undefined,
		item: {
			isItem: false,
			id: undefined,
			type: undefined
		},
		options: undefined,
		firstLoad: false
	};

	const {username, topcolor} = await getUserAndColor;

	metadata.user = username;
	metadata.options = {
		...await getOptions,
		topcolor
	};

	new OptionsSync({logging: false}).setAll(metadata.options);

	metadata.item.isItem = metadata.path === '/item';
	if (metadata.item.isItem) {
		metadata.item.id = getUrlParams('id');
		metadata.item.type = await getItemType(metadata.item.id);
	}

	resolve(metadata);
});

async function createLoader() {
	const featureCount = featureList.length;

	const loader = document.createElement('div');
	loader.innerHTML = `<img src='${browser.extension.getURL('loader.gif')}'><span>0/${featureCount}</span>`;
	loader.classList.add('__rhn__extension-loader');
	const counter = loader.querySelector('span');

	const options = await getOptions;
	if (options.featureLoader) {
		document.body.append(loader);
	}

	return {loader, counter};
}

export async function initialiseAll() {
	const {loader, counter} = await createLoader();
	const featureCount = featureList.length;
	let loadCount = 0;

	const metadata = await getMetadata;
	metadata.firstLoad = true;

	if (metadata.options.logging) {
		console.group('Refined Hacker News');
	}

	for (const feat of featureList) {
		counter.innerText = `${++loadCount}/${featureCount}`;
		await features.add(feat, metadata); // eslint-disable-line no-await-in-loop
	}

	if (metadata.options.logging) {
		console.groupEnd();
	}

	loader.classList.add('__rhn__no-display');
}

export async function initialiseSome(...args) {
	const metadata = await getMetadata;
	metadata.firstLoad = false;

	for (const id of args) {
		const featureDetails = featureList.find(feat => feat.id === id);
		await features.add(featureDetails, metadata); // eslint-disable-line no-await-in-loop
	}
}
