import features from "../libs/features";
import reinit from '../libs/reinit';

const init = () => {
    const moreButton = document.querySelector('a.morelink');
    let n = 1;
    
    const path = window.location.pathname === '/'
        ? '/news'
        : window.location.pathname;

    moreButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const nextPageText = await fetch(`https://news.ycombinator.com${path}?p=${++n}`).then(res => res.text());
        const tempEl = document.createElement('div');
        tempEl.innerHTML = nextPageText;

        const newStories = tempEl.querySelectorAll('table.itemlist tbody tr');
        const moreSpacer = document.querySelector('tr.morespace');
        const currTbody = document.querySelector('table.itemlist tbody');
        
        for (const story of newStories) {
            if (story.matches('.morespace')) {
                break;
            }
            currTbody.insertBefore(story, moreSpacer);
        }

        reinit();
    });
    
}

features.add({
    id: 'load-more-stories',
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