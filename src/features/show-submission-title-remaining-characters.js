import features from "../libs/features";

const init = () => {
    const titleField = document.querySelector('input[name="title"]');
    titleField.nextElementSibling.classList.add('__rhn__characters-over');
    const span = document.createElement('span');
    span.classList.add('__rhn__characters-under');
    titleField.parentElement.appendChild(span);
    titleField.addEventListener('input', () => {
        const limit = 80;
        const length = titleField.value.length;
        span.innerHTML = length <= limit
            ? `${limit - length} remaining`
            : '';
    });
};

features.add({
    id: 'show-submission-title-remaining-characters',
    pages: ['/submit'],
    init: init
});

export default init;