# Refined Hacker News

> ✨ Hacker News, but refined.

## About

This is a small browser that tweaks a few stuff on Hacker News to make the experience better, while keeping the core design principles in place.

Inspired by [Sindre Sorhus](https://github.com/sindresorhus)'s extension [Refined GitHub](https://github.com/sindresorhus/refined-github).

## Features

### [`auto-refresh`](src/features/auto-refresh)

Refresh the news feed periodically, after a set interval (in seconds), without refreshing the entire page.

<img src="assets/demo-gifs/auto-refresh.gif" title="auto-refresh" width=500>

### [`change-dead-comments-color`](src/features/change-dead-comments-color)

If "showdead" has been enabled in your profile settings, the color of dead comments will be light-red (`#d89899`) instead of the barely visible light grey.

### [`click-comment-indent-to-toggle`](src/features/click-comment-indent-to-toggle)

Click the indented area to the left of the comment to quickly toggle it.

<img src="assets/demo-gifs/click-comment-indent-to-toggle.gif" title="click-comment-indent-to-toggle" width=500>

### [`click-rank-to-vote-unvote`](src/features/click-rank-to-vote-unvote)

Increase the hit-area of the "upvote" button by clicking the rank to upvote/un-vote an item.

### [`comments-ui-tweaks`](src/features/comments-ui-tweaks)

### [`fetch-submission-title-from-url`](src/features/fetch-submission-title-from-url)

### [`hide-read-stories`](src/features/hide-read-stories)

### [`highlight-unread-comments`](src/features/highlight-unread-comments)

### [`input-field-tweaks`](src/features/input-field-tweaks)

### [`key-bindings-on-input-fields`](src/features/key-bindings-on-input-fields)

### [`key-bindings-on-items`](src/features/key-bindings-on-items)

### [`linkify-user-about`](src/features/linkify-user-about)

### [`list-hn-polls-separately`](src/features/list-hn-polls-separately)

### [`load-more-links-in-navbar`](src/features/load-more-links-in-navbar)

### [`more-accessible-favorite`](src/features/more-accessible-favorite)

### [`on-link-focus-comment`](src/features/on-link-focus-comment)

### [`open-story-links-in-new-tab`](src/features/open-story-links-in-new-tab)

### [`past-choose-date`](src/features/past-choose-date)

### [`prefill-submit-title`](src/features/prefill-submit-title)

### [`preview-and-set-top-bar-color`](src/features/preview-and-set-top-bar-color)

### [`profile-links-dropdown`](src/features/profile-links-dropdown)

### [`reply-without-leaving-page`](src/features/reply-without-leaving-page)

### [`show-item-info-on-hover`](src/features/show-item-info-on-hover)

### [`show-similar-submissions`](src/features/show-similar-submissions)

### [`show-top-leaders-karma`](src/features/show-top-leaders-karma)

### [`show-user-info-on-hover`](src/features/show-user-info-on-hover)

### [`sort-stories`](src/features/sort-stories)

### [`toggle-all-comments-and-replies`](src/features/toggle-all-comments-and-replies)

### Abandoned

- `blur-story-scores`
- `custom-font-face`
- `hide-bad-words`
- `load-more-stories`
- `scale-font-size`
- `show-karma-left`
