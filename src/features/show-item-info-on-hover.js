import linkifyElement from 'linkifyjs/element';

import {getItemInfo} from '../libs/api';
import {paths} from '../libs/paths';
import {getUrlParams} from '../libs/utils';

function init() {
	const links = document.querySelectorAll('span.commtext a[href*="news.ycombinator.com/item?id="]');
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

	const linkifyOptions = {
		attributes: {
			rel: 'noopener'
		}
	};

	for (const link of links) {
		const itemDiv = document.createElement('div');

		itemDiv.classList.add('__rhn__hover-info', '__rhn__no-display');
		itemDiv.style.left = link.getBoundingClientRect().left + 'px';
		itemDiv.innerHTML = `<img src=${browser.extension.getURL('loader.gif')}>`;

		link.parentElement.insertBefore(itemDiv, link.nextSibling);

		link.dataset.rhnInfoLoaded = '0';

		link.addEventListener('mouseover', async () => {
			itemDiv.classList.remove('__rhn__no-display');
			itemDiv.style.left = link.getBoundingClientRect().left + 'px';

			if (link.dataset.rhnInfoLoaded === '0') {
				link.dataset.rhnInfoLoaded = '1';
				const id = getUrlParams('id', link.href);

				const itemInfo = await getItemInfo(id);
				const itemDate = new Date(itemInfo.time * 1000);
				const renderedDate = `${monthNames[itemDate.getMonth()]} ${itemDate.getDate()}, ${itemDate.getFullYear()}`;

				let table = '';

				switch (itemInfo.type) {
					case 'comment': {
						table = `
							<table>
								<tbody>
									<tr>
										<td>by:</td>
										<td>${itemInfo.by}</td>
									</tr>
									<tr>
										<td>date:</td>
										<td>${renderedDate}</td>
									</tr>
									<tr>
										<td>text:</td>
										<td>${itemInfo.text}</td>
									</tr>
								</tbody>
							</table>
						`;

						break;
					}

					case 'story': {
						const text = itemInfo.text ?
							`<tr>
								<td>text:</td>
								<td>${itemInfo.text}</td>
							</tr>` : '';

						const url = itemInfo.url ?
							`<tr>
								<td>url:</td>
								<td>${itemInfo.url}</td>
							</tr>` : '';

						table = `
							<table>
								<tbody>
									<tr>
										<td>title:</td>
										<td>${itemInfo.title}</td>
									</tr>
									${url}
									<tr>
										<td>by:</td>
										<td>${itemInfo.by}</td>
									</tr>
									<tr>
										<td>date:</td>
										<td>${renderedDate}</td>
									</tr>
									<tr>
										<td>score:</td>
										<td>${itemInfo.score}</td>
									</tr>
									${text}
								</tbody>
							</table>
						`;

						break;
					}

					default:
						break;
				}

				itemDiv.innerHTML = table;
				linkifyElement(itemDiv, linkifyOptions);
			}
		});

		link.addEventListener('mouseout', () => {
			itemDiv.classList.add('__rhn__no-display');
		});
	}

	return true;
}

const details = {
	id: 'show-item-info-on-hover',
	pages: {
		include: paths.comments,
		exclude: ['']
	},
	loginRequired: false,
	init
};

export default details;
