# Refined Hacker News

> ✨ Hacker News, but refined.

## About

This is a small browser that tweaks a few stuff on Hacker News to make the experience better, while keeping the core design principles in place.

Inspired by [Sindre Sorhus](https://github.com/sindresorhus)'s extension [Refined GitHub](https://github.com/sindresorhus/refined-github).

## To-do

### Extension

- [x] Options

### Code

- [x] When features are "add"ed, the details object containing information about the feature should include a check whether to see if being logged in is required to access the feature. This will help in removing extra checks from all features. Something like: `login_required: true`

- [x] In the feaure details, make it something like:

```js
...
pages: {
    include: [...],
    exclude: [...]
}
...
```

### Features

#### Left

*Nothing :)*

#### Done

- [x] `auto-refresh`
- [x] `change-dead-comments-color`
- [x] `click-comment-indent-to-toggle`
- [x] `click-rank-to-vote-unvote`
- [x] `comments-ui-tweaks`
- [x] `hide-read-stories`
- [x] `input-field-ui-tweaks`
- [x] `key-bindings-on-input-fields`
- [x] `key-bindings-on-items`
- [x] `linkify-text`
- [x] `load-more-links-in-navbar`
- [x] `more-accessible-favorite`
- [x] `on-link-focus-comment`
- [x] `open-story-links-in-new-tab`
- [x] `past-choose-date`
- [x] `prefill-submit-title`
- [x] `profile-links-dropdown`
- [x] `reply-without-leaving-page`
- [x] `show-karma-left`
- [x] `show-top-leaders-karma`
- [x] `show-user-info-on-hover`
- [x] `sort-stories`
- [x] `toggle-all-comments`
- [x] `toggle-all-replies`

#### Abandoned

- `blur-story-scores`
- `load-more-stories`
- `hide-bad-words`
- `custom-font-face`
- `scale-font-size`