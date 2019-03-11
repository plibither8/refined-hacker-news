import features from "../libs/features";
import {getLoggedInUser} from '../libs/utils';

const init = () => {
    const user = getLoggedInUser();
    if (!user) {
        return;
    }

    const links = [
        {
            title: 'profile',
            path: `user?id=${user}`
        },
        {
            title: 'submissions',
            path: `submitted?id=${user}`
        },
        {
            title: 'comments',
            path: `threads?id=${user}`
        },
        {
            title: 'hidden',
            path: `hidden`
        },
        {
            title: 'upvoted submissions',
            path: `upvoted?id=${user}`
        },
        {
            title: 'upvoted comments',
            path: `upvoted?id=${user}&comments=t`
        },
        {
            title: 'favorite submissions',
            path: `favorites?id=${user}`
        },
        {
            title: 'favorite comments',
            path: `favorites?id=${user}&comments=t`
        }
    ];

    const dropdownEl = document.createElement('div');
    const targetCell = document.querySelectorAll('span.pagetop')[1];
    const userLink = document.querySelector('a#me');
    userLink.innerHTML += ' ▾';

    dropdownEl.classList.add('__rhn__no-display', '__rhn__profile-dropdown');
    const userLinkRect = userLink.getBoundingClientRect();
    const dropdownRect = dropdownEl.getBoundingClientRect();
    dropdownEl.style.left = (2*userLinkRect.left + userLinkRect.width - dropdownRect.width)/2 + 'px';
    let state = 0;

    for (const link of links) {
        const anchorEl = document.createElement('a');
        anchorEl.href = link.path;
        anchorEl.innerHTML = link.title;
        dropdownEl.appendChild(anchorEl);
    }

    targetCell.appendChild(dropdownEl);

    userLink.addEventListener('click', e => {
        e.preventDefault();
        console.log('checl')
        dropdownEl.classList.toggle('__rhn__no-display');
        userLink.innerHTML = `${user} ${state ? '▾' : '▴'}`;
        state = 1 - state;
    });
}

features.add({
    id: 'profile-link-dropdown',
    pages: ['*'],
    init: init
});

export default init;