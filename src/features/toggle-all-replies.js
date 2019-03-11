import features from "../libs/features";

const init = () => {
    const allComments = [...document.querySelectorAll('tr.comtr')];

    allComments.map((comment, id) => {
        const currentIndent = comment.querySelector('td.ind img').width / 40;
        const nextIndent = id + 1 !== allComments.length
            ? allComments[id+1].querySelector('td.ind img').width / 40
            : null;

        if (nextIndent && nextIndent > currentIndent) {
            const fontTag = document.createElement('font');
            fontTag.setAttribute('size', 1);
    
            const toggleAllBtn = document.createElement('a');
            toggleAllBtn.classList.add('__rhn__toggle-btn');
            toggleAllBtn.innerHTML = 'toggle all replies';
            toggleAllBtn.href = 'javascript:void(0)';
    
            toggleAllBtn.addEventListener('click', () => {
                const n = comment.querySelector('a.togg').getAttribute('n') - 1;
                for (let i = id + 1; i <= id + n; i++) {
                    allComments[i].querySelector('a.togg').click();
                }
            });
    
            fontTag.appendChild(toggleAllBtn);
            comment.querySelector('div.reply p').appendChild(fontTag);
        }
    });
}

features.add({
    id: 'toggle-all-replies',
    pages: ['/item'],
    init: init
});

export default init;