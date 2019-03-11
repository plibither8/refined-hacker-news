import features from "../libs/features";

const init = () => {
    const op = document.querySelector('td.subtext a.hnuser').innerText;
    const comments = document.querySelectorAll('tr.comtr');
    for (const comment of comments) {
        const commentAuthor = comment.querySelector('a.hnuser');
        if (op === commentAuthor.innerText) {
            commentAuthor.innerText += ' [op]'
            commentAuthor.classList.add('__rhn__highlight-op');
        }
    }
}

features.add({
    id: 'highlight-op-username',
    pages: ['/item'],
    init: init
});

export default init;