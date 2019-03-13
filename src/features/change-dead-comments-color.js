import features from '../libs/features';

const init = () => {
    const comments = document.querySelectorAll('tr.comtr');
    for (const comment of comments) {
        const commentHeadSpan = comment.querySelector('span.comhead');
        if (commentHeadSpan.innerText.includes('[dead]')) {
            comment.querySelector('div.comment span.commtext.cdd').classList.add('__rhn__dead-link-color');
        }
    }
}

features.add({
    id: 'change-dead-comments-color',
    pages: {
        include: ['/item'],
        exclude: []
    },
    login_required: false,
    init: init
});

export default init;