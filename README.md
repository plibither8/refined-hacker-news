# <img src="src/icon.png" width="45" align="left"> Refined Hacker News

[link-cws]: https://chrome.google.com/webstore/detail/ "Version published on Chrome Web Store"
[link-amo]: https://addons.mozilla.org/en-US/firefox/addon/ "Version published on Mozilla Add-ons"

> ✨ Browser extension that adds useful features and tweaks a few stuff on [Hacker News](https://news.ycombinator.com) to make the experience better... without changing the look and feel.

The minimalist design of Hacker News is best at offering news the way we like it. Yet there are a few small interface tweaks and additional features that can drastically improve our experience while browsing through items and comments which this extension implements.

Hopefully, in due course, a few of these tweaks can be implemented by Hacker News themselves. You can help too by emailing [hn@ycombinator.com](mailto:hn@ycombinator.com)!

*Inspired by [Sindre Sorhus](https://github.com/sindresorhus)'s extension [Refined GitHub](https://github.com/sindresorhus/refined-github).*

## Install

- [**Chrome** extension][link-cws] [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/.svg?label=%20">][link-cws]
- [**Firefox** add-on][link-amo] [<img valign="middle" src="https://img.shields.io/amo/v/.svg?label=%20">][link-amo]
- **Opera** extension: Use [this Opera extension](https://addons.opera.com/en/extensions/details/download-chrome-extension-9/) to install the Chrome version.

## Highlights

<table>
	<tr>
		<th width="50%">
			Reply to comments without leaving page
		</th>
		<th width="50%">
			Navigate through items and comments using your keyboard
		</th>
	</tr>
	<tr><!-- Prevent zebra stripes --></tr>
	<tr>
		<td>
			<center><img src="assets/demos/reply-same-page.gif"></center>
		</td>
		<td>
			<center><img src="assets/demos/keyboard-nav.gif"></center>
		</td>
	</tr>
</table>

<table>
	<tr>
		<th width="50%">
			Easily <i>favorite</i> items and comments
		</th>
		<th width="50%">
			Hide and sort stories, and auto-refresh the page from the options bar
		</th>
	</tr>
	<tr><!-- Prevent zebra stripes --></tr>
	<tr>
		<td>
			<center><img src="assets/demos/favorite.gif"></center>
		</td>
		<td>
			<center><img src="assets/demos/options-bar.gif"></center>
		</td>
	</tr>
</table>

<table>
	<tr>
		<th width="50%">
			Show user or item information when hovering over the links
		</th>
		<th width="50%">
			Highlight new, unread comments on subsequent visits
		</th>
	</tr>
	<tr><!-- Prevent zebra stripes --></tr>
	<tr>
		<td>
			<center><img src="assets/demos/user-item-hover.gif"></center>
		</td>
		<td>
			<center><img src="assets/demos/highlight-unread-comments.png"></center>
		</td>
	</tr>
</table>

### Added features

* [**`reply-without-leaving-page`**](src/features/reply-without-leaving-page.js)
* [**`auto-refresh`**](src/features/auto-refresh.js) Auto-refresh stories on the page periodically, after a fixed interval, without reloading the page.
* [**`hide-read-stories`**](src/features/hide-read-stories.js)
* [**`sort-stories`**](src/features/sort-stories.js)
* [**`fetch-submission-title-from-url`**](src/features/fetch-submission-title-from-url.js)
* [**`list-hn-polls-separately`**](src/features/list-hn-polls-separately.js)
* [**`prefill-submit-title`**](src/features/prefill-submit-title.js)
* [**`past-choose-date`**](src/features/past-choose-date.js)

### UI tweaks

* [**`change-dead-comments-color`**](src/features/change-dead-comments-color.js)
* [**`comments-ui-tweaks`**](src/features/comments-ui-tweaks.js)
* [**`highlight-unread-comments`**](src/features/highlight-unread-comments.js)
* [**`linkify-user-about`**](src/features/linkify-user-about.js)

### More actions

* [**`key-bindings-on-items`**](src/features/key-bindings-on-items.js)
* [**`key-bindings-on-input-fields`**](src/features/key-bindings-on-input-fields.js)
* [**`click-comment-indent-to-toggle`**](src/features/click-comment-indent-to-toggle.js)
* [**`click-rank-to-vote-unvote`**](src/features/click-rank-to-vote-unvote.js)
* [**`more-accessible-favorite`**](src/features/more-accessible-favorite.js)
* [**`open-story-links-in-new-tab`**](src/features/open-story-links-in-new-tab.js)
* [**`preview-and-set-top-bar-color`**](src/features/preview-and-set-top-bar-color.js)
* [**`toggle-all-comments-and-replies`**](src/features/toggle-all-comments-and-replies.js)

### More info at a glance

* [**`load-more-links-in-navbar`**](src/features/load-more-links-in-navbar.js)
* [**`profile-links-dropdown`**](src/features/profile-links-dropdown.js)
* [**`show-item-info-on-hover`**](src/features/show-item-info-on-hover.js)
* [**`show-similar-submissions`**](src/features/show-similar-submissions.js)
* [**`show-top-leaders-karma`**](src/features/show-top-leaders-karma.js)
* [**`show-user-info-on-hover`**](src/features/show-user-info-on-hover.js)

### Miscellaneous

* [**`input-field-tweaks`**](src/features/input-field-tweaks.js)
* [**`on-link-focus-comment`**](src/features/on-link-focus-comment.js)

---

### Abandoned

* `blur-story-scores`
* `custom-font-face`
* `hide-bad-words`
* `load-more-stories`
* `scale-font-size`
* `show-karma-left`

---