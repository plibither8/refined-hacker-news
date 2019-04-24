import {getPageDom} from '../libs/utils';

async function init(metadata) {
	const topbar = document.querySelector('table#hnmain > tbody > tr > td');

	const userPage = await getPageDom(`https://news.ycombinator.com/user?id=${metadata.user}`);
	const form = userPage.querySelector('form.profileform');
	form.classList.add('__rhn__no-display');
	form.target = '_blank';
	document.body.append(form);

	const topColorInput = form.querySelector('input[name="topc"]');
	if (!topColorInput) {
		return false;
	}

	const colorRowTable = document.querySelectorAll('table#hnmain > tbody > tr')[2].querySelector('table');
	const colorRows = colorRowTable.querySelectorAll('tbody > tr');
	colorRowTable.classList.add('__rhn__top-colors');

	for (const row of colorRows) {
		const color = row.innerText.trim();
		row.addEventListener('click', () => {
			topColorInput.value = color;
			topbar.bgColor = color;
			form.submit();
		});
	}

	return true;
}

const details = {
	id: 'quickly-set-top-bar-color',
	pages: {
		include: ['/topcolors'],
		exclude: []
	},
	loginRequired: true,
	init
};

export default details;
