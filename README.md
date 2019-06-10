# Refined Hacker News

> ✨ Hacker News, but refined.

## About

This is a small browser that tweaks a few stuff on Hacker News to make the experience better, while keeping the core design principles in place.

Inspired by [Sindre Sorhus](https://github.com/sindresorhus)'s extension [Refined GitHub](https://github.com/sindresorhus/refined-github).

## Features

<details>

<summary>
	<strong><code>auto-refresh</code></strong>
</summary>

[**Open file**](src/features/auto-refresh.js)

Refresh the news feed periodically, after a set interval (in seconds), without refreshing the entire page.

<img src="assets/demo-gifs/auto-refresh.gif" title="auto-refresh" width=500>

</details>

<details>

<summary>
	<strong><code>change-dead-comments-color</code></strong>
</summary>

[**Open file**](src/features/change-dead-comments-color.js)

If "showdead" has been enabled in your profile settings, the color of dead comments will be light-red (`#d89899`) instead of the barely visible light grey.

</details>

<details>

<summary>
	<strong><code>click-comment-indent-to-toggle</code></strong>
</summary>

[**Open file**](src/features/click-comment-indent-to-toggle.js)

Click the indented area to the left of the comment to quickly toggle it.

<img src="assets/demo-gifs/click-comment-indent-to-toggle.gif" title="click-comment-indent-to-toggle" width=500>

</details>

<details>

<summary>
	<strong><code>click-rank-to-vote-unvote</code></strong>
</summary>

[**Open file**](src/features/click-rank-to-vote-unvote.js)

Increase the hit-area of the "upvote" button by clicking the rank to upvote/un-vote an item.

</details>

<details>

<summary>
	<strong><code>comments-ui-tweaks</code></strong>
</summary>

[**Open file**](src/features/comments-ui-tweaks.js)

</details>

<details>

<summary>
	<strong><code>fetch-submission-title-from-url</code></strong>
</summary>

[**Open file**](src/features/fetch-submission-title-from-url.js)

</details>

<details>

<summary>
	<strong><code>hide-read-stories</code></strong>
</summary>

[**Open file**](src/features/hide-read-stories.js)

</details>

<details>

<summary>
	<strong><code>highlight-unread-comments</code></strong>
</summary>

[**Open file**](src/features/highlight-unread-comments.js)

</details>

<details>

<summary>
	<strong><code>input-field-tweaks</code></strong>
</summary>

[**Open file**](src/features/input-field-tweaks.js)

</details>

<details>

<summary>
	<strong><code>key-bindings-on-input-fields</code></strong>
</summary>

[**Open file**](src/features/key-bindings-on-input-fields.js)

</details>

<details>

<summary>
	<strong><code>key-bindings-on-items</code></strong>
</summary>

[**Open file**](src/features/key-bindings-on-items.js)

</details>

<details>

<summary>
	<strong><code>linkify-user-about</code></strong>
</summary>

[**Open file**](src/features/linkify-user-about.js)

</details>

<details>

<summary>
	<strong><code>list-hn-polls-separately</code></strong>
</summary>

[**Open file**](src/features/list-hn-polls-separately.js)

</details>

<details>

<summary>
	<strong><code>load-more-links-in-navbar</code></strong>
</summary>

[**Open file**](src/features/load-more-links-in-navbar.js)

</details>

<details>

<summary>
	<strong><code>more-accessible-favorite</code></strong>
</summary>

[**Open file**](src/features/more-accessible-favorite.js)

</details>

<details>

<summary>
	<strong><code>on-link-focus-comment</code></strong>
</summary>

[**Open file**](src/features/on-link-focus-comment.js)

</details>

<details>

<summary>
	<strong><code>open-story-links-in-new-tab</code></strong>
</summary>

[**Open file**](src/features/open-story-links-in-new-tab.js)

</details>

<details>

<summary>
	<strong><code>past-choose-date</code></strong>
</summary>

[**Open file**](src/features/past-choose-date.js)

</details>

<details>

<summary>
	<strong><code>prefill-submit-title</code></strong>
</summary>

[**Open file**](src/features/prefill-submit-title.js)

</details>

<details>

<summary>
	<strong><code>preview-and-set-top-bar-color</code></strong>
</summary>

[**Open file**](src/features/preview-and-set-top-bar-color.js)

</details>

<details>

<summary>
	<strong><code>profile-links-dropdown</code></strong>
</summary>

[**Open file**](src/features/profile-links-dropdown.js)

</details>

<details>

<summary>
	<strong><code>reply-without-leaving-page</code></strong>
</summary>

[**Open file**](src/features/reply-without-leaving-page.js)

</details>

<details>

<summary>
	<strong><code>show-item-info-on-hover</code></strong>
</summary>

[**Open file**](src/features/show-item-info-on-hover.js)

</details>

<details>

<summary>
	<strong><code>show-similar-submissions</code></strong>
</summary>

[**Open file**](src/features/show-similar-submissions.js)

</details>

<details>

<summary>
	<strong><code>show-top-leaders-karma</code></strong>
</summary>

[**Open file**](src/features/show-top-leaders-karma.js)

</details>

<details>

<summary>
	<strong><code>show-user-info-on-hover</code></strong>
</summary>

[**Open file**](src/features/show-user-info-on-hover.js)

</details>

<details>

<summary>
	<strong><code>sort-stories</code></strong>
</summary>

[**Open file**](src/features/sort-stories.js)

</details>

<details>

<summary>
	<strong><code>toggle-all-comments-and-replies</code></strong>
</summary>

[src/features/]strong>
</s()

()</details>

### Abandoned

- `blur-story-scores`
- `custom-font-face`
- `hide-bad-words`
- `load-more-stories`
- `scale-font-size`
- `show-karma-left`
