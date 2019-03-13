import features from '../libs/features'
import reinit from '../libs/reinit';

const sort = (method, stories) => {
    const itemlistTable = document.querySelector('table.itemlist > tbody');
    switch (method) {
        case 'default': {
            stories.sort((a, b) => a.defaultRank > b.defaultRank ? 1 : -1);
            break;
        }
        case 'time': {
            stories.sort((a, b) => a.id < b.id ? 1 : -1);
            break;
        }
        case 'score': {
            stories.sort((a, b) => a.score < b.score ? 1 : -1);
            break;
        }
    }

    const moreRow = itemlistTable.lastChild;
    const morespaceRow = moreRow.previousSibling;

    itemlistTable.innerHTML = '';

    stories.map(story => {
        story.elements.map(el => {
            itemlistTable.appendChild(el)
        })
    });

    itemlistTable.appendChild(morespaceRow);
    itemlistTable.appendChild(moreRow);
};

const init = async () => {
    const mainTbody = document.querySelector('table#hnmain > tbody');
    const sortContainer = document.createElement('div');
    const sortLabel = document.createElement('label');
    const sortSelect = document.createElement('select');

    sortContainer.classList.add('__rhn__hide-story-container');
    
    sortLabel.innerHTML = 'sort stories:&nbsp;';
    sortLabel.setAttribute('for', 'sort-stories-input');

    sortSelect.id = 'sort-stories-input';
    sortSelect.innerHTML = '';
    ['default', 'time', 'score'].map(o => {
        sortSelect.innerHTML += `<option value=${o}>${o}</option>`;
    });
    
    sortContainer.appendChild(sortLabel);
    sortContainer.appendChild(sortSelect);
    
    const insertBeforeTr = mainTbody.querySelectorAll('tr')[3];
    mainTbody.insertBefore(sortContainer, insertBeforeTr);

    const rawPageHtml = await fetch(window.location.href).then(res => res.text());
    const tempEl = document.createElement('div');
    tempEl.innerHTML = rawPageHtml;
    const rows = [...tempEl.querySelectorAll('table.itemlist > tbody > tr')];
    while (!rows[0].matches('.athing')) {
        rows.shift();
    }

    const stories = [];
    
    for (let i = 0; i < rows.length - 2; i += 3) {
        const id = parseInt(rows[i].id);
        const scoreSpan = rows[i+1].querySelector('span.score');
        const score = scoreSpan ? parseInt(scoreSpan.innerText) : null;
        const defaultRank = parseInt(rows[i].querySelector('span.rank').innerText);
        const elements = [
            rows[i],
            rows[i+1],
            rows[i+2]
        ];
        stories.push({
            id: id,
            score: score,
            elements: elements,
            defaultRank: defaultRank
        });
    }

    sort('default', stories);
    reinit();

    sortSelect.addEventListener('change', () => {
        sort(sortSelect.value, stories);
    });
};

features.add({
    id: 'sort-stories',
    pages: {
        include: [
            '/',
            '/news',
            '/show',
            '/shownew',
            '/ask',
            '/active'
        ],
        exclude: []
    },
    login_required: false,
    init: init
});

export default init;