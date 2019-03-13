import features from '../libs/features';
import {getLoggedInUser} from '../libs/utils';

const init = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('id')) {
        if (getLoggedInUser() !== params.get('id')) {
            return;
        }

        const karmaRow = document.querySelectorAll('form.profileform table tr')[2];
        const karma = +(karmaRow.querySelectorAll('td')[1].innerText);

        const downvoteThreshold = 500;
        const pollThreshold = 200;

        if (karma < downvoteThreshold) {
            const indent = document.createElement('td');
            const downvoteRow = document.createElement('tr');
            const downvoteKarmaLeft = document.createElement('td');
            downvoteKarmaLeft.innerHTML = `${downvoteThreshold - karma} karma points left to downvote comments`;
            downvoteRow.appendChild(indent);
            downvoteRow.appendChild(downvoteKarmaLeft);
            karmaRow.parentNode.insertBefore(downvoteRow, karmaRow.nextSibling);
        }
        if (karma < pollThreshold) {
            const indent = document.createElement('td');
            const pollRow = document.createElement('tr');
            const pollKarmaLeft = document.createElement('td');
            pollKarmaLeft.innerHTML = `${pollThreshold - karma} karma points left to create polls`;
            pollRow.appendChild(indent);
            pollRow.appendChild(pollKarmaLeft);
            karmaRow.parentNode.insertBefore(pollRow, karmaRow.nextSibling);
        }
    }
}

features.add({
    id: 'show-karma-left',
    pages: {
        include: ['/user'],
        exclude: []
    },
    login_required: true,
    init: init
});

export default init;