# To-Do

## Code

* When features are "add"ed, the details object containing information about the feature should include a check whether to see if being logged in is required to access the feature. This will help in removing extra checks from all features. Something like: `login_required: true`;

* In the feaure details, make it something like:

```js
...
pages: {
    include: [...],
    exclude: [...]
}
...
```

## Features

### Done

- [x] `blur-story-scores`
- [x] `change-dead-comments-color`
- [x] `click-comment-indent-to-toggle`
- [x] `highlight-op-username`
- [x] `load-more-links-in-navbar`
- [x] `open-story-links-in-new-tab`
- [x] `prefill-submit-title`
- [x] `profile-links-dropdown`
- [x] `show-favorite-link-on-frontpage`
- [x] `show-karma-left`
- [x] `show-submission-title-remaining-characters`
- [x] `show-user-info-on-hover`
- [x] `toggle-all-comments`
- [x] `toggle-all-replies`

### Left

- [ ] `reply-without-leaving-page`
- [ ] `load-more-dates`
- [ ] `past-date-picker`
- [ ] `sort-stories`
- [ ] `hide-read-stories` *use Chrome's History API to get this shit working*