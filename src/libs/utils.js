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

export const getLoggedInUser = () => {
    const me = document.querySelector('a#me');
    if (me) {
        return me.innerText;
    } else {
        return false;
    }
};