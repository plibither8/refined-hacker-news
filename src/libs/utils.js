export const getTopLevelComments = () => {
    const allComments = document.querySelectorAll('tr.comtr');
    const topLevelComments = [];

    for (const comment of allComments) {
        const indentCell = comment.querySelector('td.ind img');
        if (indentCell.width === 0) {
            topLevelComments.push(comment);
        }
    }

    return topLevelComments;
};

export const isLoggedIn = () => Boolean(document.querySelector('a#me'));

export const getLoggedInUser = () => document.querySelector('a#me').innerText.split(' ')[0];