import OptionsSync from 'webext-options-sync';

export const isLoggedIn = () => Boolean(document.querySelector('a#me'));

export const getLoggedInUser = () => document.querySelector('a#me').innerText.split(' ')[0];

// Rule assumes we don't want to leave it pending:
// eslint-disable-next-line no-async-promise-executor
export const getOptions = new Promise(async resolve => {
    // Options defaults
    const options = {
        disabledFeatures: '',
        customCSS: '',
        logging: true,
        ...await new OptionsSync().getAll()
    };

    if (options.customCSS.trim().length > 0) {
        const style = document.createElement('style');
        style.innerHTML = options.customCSS;
        document.head.append(style);
    }

    // Create logging function
    options.log = options.logging ? console.log : () => {};

    resolve(options);
});