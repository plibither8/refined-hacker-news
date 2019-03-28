import {getUserInfo} from '../libs/api';

function init() {
	const allUsers = document.querySelectorAll('a.hnuser');
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	for (const user of allUsers) {
		const userDiv = document.createElement('div');
		const loader = document.createElement('img');

		userDiv.classList.add('__rhn__hover-user-info', '__rhn__no-display');
		userDiv.style.left = user.getBoundingClientRect().left + 'px';
		loader.src = browser.extension.getURL('loader.gif');

		userDiv.append(loader);
		user.parentElement.append(userDiv);

		user.dataset.rhnInfoLoaded = '0';

		user.addEventListener('mouseover', async () => {
			userDiv.classList.remove('__rhn__no-display');
			userDiv.style.left = user.getBoundingClientRect().left + 'px';

			if (user.dataset.rhnInfoLoaded === '0') {
				user.dataset.rhnInfoLoaded = '1';
				const userInfo = await getUserInfo(user.innerText.split(' ')[0]);
				const userDate = new Date(userInfo.created * 1000);
				const renderedDate = `${monthNames[userDate.getMonth()]} ${userDate.getDate()}, ${userDate.getFullYear()}`;

				const table = `
					<table>
						<tbody>
							<tr>
								<td>user:</td>
								<td>${userInfo.id}</td>
							</tr>
							<tr>
								<td>created:</td>
								<td>${renderedDate}</td>
							</tr>
							<tr>
								<td>karma:</td>
								<td>${userInfo.karma}</td>
							</tr>
							${userInfo.about ? '<tr><td>about:</td><td>' + userInfo.about + '</td></tr>' : ''}
						</tbody>
					</table>
				`;
				userDiv.innerHTML = table;
			}
		});

		user.addEventListener('mouseout', () => {
			userDiv.classList.add('__rhn__no-display');
		});
	}

	return true;
}

const details = {
	id: 'show-user-info-on-hover',
	pages: {
		include: ['*'],
		exclude: ['/user']
	},
	loginRequired: false,
	init
};

export default details;
