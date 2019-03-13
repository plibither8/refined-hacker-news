import features from '../libs/features'

const init = () => {
    const scoreSpans = document.querySelectorAll('span.score');
    for (const span of scoreSpans) {
        span.classList.add('__rhn__blur');
    }
};

features.add({
    id: 'blur-story-scores',
    pages: {
        include: [
            '/',
            '/news',
            '/show',
            '/shownew',
            '/ask',
            '/active'
        ],
        exclude: []
    },
    login_required: false,
    init: init
});

export default init;