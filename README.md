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

- [x] `change-dead-comments-color`
- [x] `click-comment-indent-to-toggle`
- [x] `highlight-op-username`
- [x] `italicise-shortcut-key`
- [x] `key-bindings-for-navigation`
- [x] `linkify-text`
- [x] `load-more-links-in-navbar`
- [x] `open-story-links-in-new-tab`
- [x] `past-date-picker`
- [x] `prefill-submit-title`
- [x] `profile-links-dropdown`
- [x] `reply-without-leaving-page`
- [x] `show-favorite-link-on-frontpage`
- [x] `show-karma-left`
- [x] `show-user-info-on-hover`
- [x] `sort-stories`
- [x] `submission-title-remaining-characters`
- [x] `toggle-all-comments`
- [x] `toggle-all-replies`

#### Abandoned

- `blur-story-scores`
- `hide-read-stories`
- `load-more-stories`