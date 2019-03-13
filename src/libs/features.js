import {isLoggedIn} from './utils'

const add = featureDetails => {
    const {
        id,
        pages,
        login_required,
        init
    } = featureDetails;

    const path = window.location.pathname;

    
    if (pages.exclude.includes(path)) {
        return;
    }

    if (!(pages.include.includes(path) || pages.include[0] === '*')) {
        return;
    }

    window.addEventListener('load', () => {
        if (login_required && !isLoggedIn()) {
            return;
        }
        init();
    });
};

export default {
    add
};