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

export const elementInScrollView = el => {
	const rect = el.getBoundingClientRect();
	const elemTop = rect.top;
	const elemBottom = rect.bottom;

	const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
	return isVisible;
};

export const createOptionsBar = () => {
	let optionsBar = document.querySelector('.__rhn__options-bar');
	if (optionsBar) {
		return optionsBar;
	}

	const mainTbody = document.querySelector('table#hnmain > tbody');
	optionsBar = document.createElement('div');
	optionsBar.classList.add('__rhn__options-bar');

	const insertBeforeTr = mainTbody.querySelectorAll('tr')[3];
	mainTbody.insertBefore(optionsBar, insertBeforeTr);

	return optionsBar;
};
