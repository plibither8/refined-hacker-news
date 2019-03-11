import features from "../libs/features";
import {getTopLevelComments} from '../libs/utils';

const init = () => {
    const formElementParent = document.querySelector('table.fatitem form').parentNode;

    const toggleAllBtn = document.createElement('a');
    toggleAllBtn.classList.add('__rhn__toggle-btn');
    toggleAllBtn.innerHTML = 'toggle all comments';
    toggleAllBtn.href = 'javascript:void(0)';
    
    toggleAllBtn.addEventListener('click', () => {
        const topLevelComments = getTopLevelComments();
        for (const comment of topLevelComments) {
            comment.querySelector('a.togg').click();
        }
    });

    formElementParent.appendChild(toggleAllBtn);
}

features.add({
    id: 'toggle-all-comments',
    pages: ['/item'],
    init: init
});

export default init;