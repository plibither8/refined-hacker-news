import features from "../libs/features";

const init = () => {
    const page = window.location.pathname;
    switch (page) {
        case '/show':
        case '/shownew': {
            console.log('hello')
            const pagetop = document.querySelector('span.pagetop');
            for (const link of pagetop.querySelectorAll('a')) {
                if (link.innerText === 'submit') {
                    link.href += '?title=Show HN:';
                    break;
                }
            }
            break;
        }
        case '/ask': {
            const pagetop = document.querySelector('span.pagetop');
            for (const link of pagetop.querySelectorAll('a')) {
                if (link.innerText === 'submit') {
                    link.href += '?title=Ask HN:';
                    break;
                }
            }
            break;
        }
        case '/submit': {
            const searchStr = window.location.search;
            if (searchStr.length > 0) {
                const title = new URLSearchParams(searchStr.replace('?', '&')).get('title');
                document.querySelector('input[name="title"]').value = title;
            }
            break;
        }
    }
}

features.add({
    id: 'prefill-submit-title',
    pages: [
        '/show',
        '/shownew',
        '/ask',
        '/submit'
    ],
    init: init
});

export default init;