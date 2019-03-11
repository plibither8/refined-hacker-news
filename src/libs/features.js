const add = featureDetails => {
    const {
        id,
        pages,
        init
    } = featureDetails;

    if (pages.includes(window.location.pathname) || pages[0] === '*') {
        window.addEventListener('load', () => {
            init();
        });
    }
};

export default {
    add
};