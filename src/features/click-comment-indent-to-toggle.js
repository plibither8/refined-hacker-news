import features from "../libs/features";

const init = () => {
    const comments = document.querySelectorAll('tr.comtr');
    for (const comment of comments) {
        const indentCell = comment.querySelector('td.ind');
        const toggleBtn = comment.querySelector('a.togg');
        indentCell.classList.add('__rhn__comment-indent');
        indentCell.setAttribute('onclick', toggleBtn.getAttribute('onclick'));
    }
}

features.add({
    id: 'click-comment-indent-to-toggle',
    pages: ['/item'],
    init: init
});

export default init;