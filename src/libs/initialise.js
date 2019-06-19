/* eslint-disable camelcase */

// All features, imported in alphabetical order
import auto_refresh from '../features/auto-refresh';
import change_dead_comments_color from '../features/change-dead-comments-color';
import click_comment_indent_to_toggle from '../features/click-comment-indent-to-toggle';
import click_rank_to_vote_unvote from '../features/click-rank-to-vote-unvote';
import comments_ui_tweaks from '../features/comments-ui-tweaks';
import fetch_submission_title_from_url from '../features/fetch-submission-title-from-url';
import hide_read_stories from '../features/hide-read-stories';
import highlight_unread_comments from '../features/highlight-unread-comment';
import input_field_tweaks from '../features/input-field-tweaks';
import key_bindings_on_input_fields from '../features/key-bindings-on-input-fields';
import key_bindings_on_items from '../features/key-bindings-on-items';
import linkify_user_about from '../features/linkify-user-about';
import list_hn_polls_separately from '../features/list-hn-polls-separately';
import load_more_links_in_navbar from '../features/load-more-links-in-navbar';
import more_accessible_favorite from '../features/more-accessible-favorite';
import on_link_focus_comment from '../features/on-link-focus-comment';
import open_story_links_in_new_tab from '../features/open-story-links-in-new-tab';
import past_choose_date from '../features/past-choose-date';
import prefill_submit_title from '../features/prefill-submit-title';
import preview_and_set_top_bar_color from '../features/preview-and-set-top-bar-color';
import profile_links_dropdown from '../features/profile-links-dropdown';
import reply_without_leaving_page from '../features/reply-without-leaving-page';
import show_item_info_on_hover from '../features/show-item-info-on-hover';
import show_similar_submissions from '../features/show-similar-submissions';
import show_top_leaders_karma from '../features/show-top-leaders-karma';
import show_user_info_on_hover from '../features/show-user-info-on-hover';
import sort_stories from '../features/sort-stories';
import toggle_all_comments_and_replies from '../features/toggle-all-comments-and-replies';

import features from './features';
import {getUrlParams, getOptions, getUserData} from './utils';
import {getItemInfo} from './api';

const featureList = [
	list_hn_polls_separately,
	key_bindings_on_items,
	comments_ui_tweaks,
	highlight_unread_comments,
	more_accessible_favorite,
	load_more_links_in_navbar,
	click_comment_indent_to_toggle,
	toggle_all_comments_and_replies,
	change_dead_comments_color,
	click_rank_to_vote_unvote,
	fetch_submission_title_from_url,
	key_bindings_on_input_fields,
	input_field_tweaks,
	linkify_user_about,
	on_link_focus_comment,
	open_story_links_in_new_tab,
	past_choose_date,
	prefill_submit_title,
	profile_links_dropdown,
	show_item_info_on_hover,
	show_top_leaders_karma,
	show_user_info_on_hover,
	reply_without_leaving_page,
	preview_and_set_top_bar_color,
	show_similar_submissions,

	// Options bar (order matters)
	sort_stories,
	hide_read_stories,
	auto_refresh
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

	const userData = await getUserData(metadata.path);
	metadata.user = userData.username;
	metadata.topcolor = userData.topcolor;
	metadata.favorites = userData.favorites;

	metadata.options = await getOptions;

	await browser.storage.sync.set({topcolor: metadata.topcolor});

	metadata.item.isItem = metadata.path === '/item';
	if (metadata.item.isItem) {
		metadata.item.id = getUrlParams('id');
		if (metadata.item.id) {
			const itemData = await getItemInfo(metadata.item.id);
			metadata.item = {
				...metadata.item,
				...itemData
			};
		}
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
