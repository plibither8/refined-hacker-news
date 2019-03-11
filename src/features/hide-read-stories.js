import features from '../libs/features'

const getVisitedStories = () => {
    const stories = document.querySelectorAll('tr.athing');
    const visited = [];
    for (const story of stories) {
        const title = story.querySelector('td.title');
        console.log(getComputedStyle(title).color)
        if (window.getComputedStyle(title).color === 'rgb(130, 130, 130)') {
            visited.push(
                story,
                story.nextElementSibling,
                story.nextElementSibling.nextElementSibling
            );
        }
    }
    console.log(visited);
    return visited;
};

const init = () => {
    const mainTbody = document.querySelector('table#hnmain tbody');
    const hideStoryContainer = document.createElement('div');
    const hideStoryLabel = document.createElement('label');
    const hideStoryInput = document.createElement('input');

    hideStoryContainer.classList.add('__rhn__hide-story-container');
    hideStoryLabel.innerText = 'hide read stories';
    hideStoryLabel.setAttribute('for', 'hide-story-input');
    hideStoryInput.type = 'checkbox';
    hideStoryInput.id = 'hide-story-input';

    hideStoryContainer.appendChild(hideStoryInput);
    hideStoryContainer.appendChild(hideStoryLabel);

    const insertBeforeTr = mainTbody.querySelectorAll('tr')[3];
    mainTbody.insertBefore(hideStoryContainer, insertBeforeTr);

    hideStoryInput.addEventListener('input', () => {
        const visitedStories = getVisitedStories();
        for (const story of visitedStories) {
            // story.classList.toggle('__rhn__no-display');
        }
    });
};

features.add({
    id: 'hide-read-stories',
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