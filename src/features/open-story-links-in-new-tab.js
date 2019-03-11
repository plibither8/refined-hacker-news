import features from "../libs/features";

const init = () => {
    const storyLinks = document.querySelectorAll('a.storylink');
    for (const link of storyLinks) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    }
}

features.add({
    id: 'open-story-links-in-new-tab',
    pages: ['*'],
    init: init
});

export default init;