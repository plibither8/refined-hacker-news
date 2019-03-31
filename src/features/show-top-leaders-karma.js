import {getUserInfo} from '../libs/api';

async function init() {
	const rowContainer = document.querySelectorAll('table#hnmain > tbody > tr')[2];
	const rows = [...rowContainer.querySelectorAll('table > tbody > tr')].slice(2, 12);

	const promises = [];

	for (const row of rows) {
		const cells = row.children;
		const user = cells[1].innerText;
		cells[2].innerHTML = `<img src=${browser.extension.getURL('loader.gif')}>`;
		promises.push(getUserInfo(user));
	}

	const responses = await Promise.all(promises);

	rows.map((row, i) => {
		row.children[2].innerText = responses[i].karma;
	})

	return true;
}

const details = {
	id: 'show-top-leaders-karma',
	pages: {
		include: ['/leaders'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
