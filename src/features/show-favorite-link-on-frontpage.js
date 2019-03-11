import features from "../libs/features";

const init = () => {
    const subtexts = document.querySelectorAll('td.subtext');
    for (const subtext of subtexts) {
        const commentsLink = subtext.lastElementChild;
        const storyTitle = subtext.parentElement.previousElementSibling.querySelector('a.storylink').innerText;

        let hideLink;
        for (const link of subtext.querySelectorAll('a')) {
            if (link.innerText === 'hide') {
                hideLink = link.href.replace('?', '&');
                break;
            }
        }
        const params = new URLSearchParams(hideLink);
        const auth = params.get('auth');
        const id = params.get('id');

        const faveLink = document.createElement('a');
        const faveSeparator = document.createTextNode(' | ');

        faveLink.href = `fave?id=${id}&auth=${auth}`;
        faveLink.innerHTML = 'favorite';

        subtext.insertBefore(faveLink, commentsLink);
        subtext.insertBefore(faveSeparator, commentsLink);
    }
}

features.add({
    id: 'show-favorite-link-on-frontpage',
    pages: [
        '/',
        '/news',
        '/show',
        '/shownew',
        '/ask',
        '/active'
    ],
    init: init
});

export default init;