import {format} from 'timeago.js';

import {getPageDom, getUrlParams} from '../libs/utils';

function navbarLink(colorItWhite = false) {
	const navbar = document.querySelector('span.pagetop');
	if (!navbar) {
		return false;
	}

	const submitLink = navbar.querySelector('a[href="submit"]');
	if (!submitLink) {
		return false;
	}

	const pollsLink = document.createElement('a');
	const separator = document.createTextNode(' | ');

	pollsLink.innerText = 'polls';
	pollsLink.href = '/polls';

	navbar.insertBefore(pollsLink, submitLink);
	navbar.insertBefore(separator, submitLink);

	if (colorItWhite) {
		pollsLink.style.color = '#fff';
	}

	return true;
}

async function getPollItems(page) {
	const rawResults = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=poll&page=${page}&hitsPerPage=30`)
							.then(res => res.json())
							.then(obj => obj.hits);

	let results = [];
	for (const result of rawResults) {
		results.push({
			id: result.objectID,
			author: result.author,
			comments: result.num_comments + ' comment' + (result.num_comments === 1 ? '' : 's'),
			points: result.points + ' point' + (result.points === 1 ? '' : 's'),
			link: `https://news.ycombinator.com/item?id=${result.objectID}`,
			title: result.title,
			date: format(result.created_at)
		});
	}

	return results;
}

async function init(metadata) {
	let pollsLink = false;

	if (metadata.path === '/polls') {
		const homepage = await getPageDom('https://news.ycombinator.com');
		const itemlistTable = homepage.querySelector('table.itemlist > tbody');
		const stories = itemlistTable.querySelectorAll(':scope > tr');
		const [moreSpace, moreButton] = [...stories].slice(-2);

		for (const row of stories) {
			row.remove();
		}

		const pageNumber = Number(getUrlParams('p'));
		let realPageNumber = pageNumber;
		if (pageNumber === 0) {
			realPageNumber = 1;
		}

		moreButton.querySelector('a').href = `/polls?p=${realPageNumber + 1}`;
		const items = await getPollItems(realPageNumber - 1);

		items.forEach((item, index) => {
			itemlistTable.innerHTML += `
				<tr class='athing' id='${item.id}'>
					<td align="right" valign="top" class="title">
						<span class="rank">${(realPageNumber - 1)*30 + index + 1}.</span>
					</td>
					<td valign="top" class="votelinks">
						<center>
							<a href='javascript:void(0)'>
								<div class="votearrow" title="upvote"></div>
							</a>
						</center>
					</td>
					<td class="title">
						<a href="item?id=${item.id}" class="storylink">${item.title}</a>
					</td>
				</tr>
				<tr>
					<td colspan="2"></td>
					<td class="subtext">
						<span class="score" id="score_${item.id}">${item.points}</span>
						by
						<a href="user?id=${item.author}" class="hnuser">${item.author}</a>
						<span class="age"><a href="item?id=${item.id}">${item.date}</a></span>
						<span id="unv_${item.id}"></span>
						|
						<a href="https://hn.algolia.com/?query=${encodeURI(item.title)}&sort=byDate&dateRange=all&type=story&storyText=false&prefix&page=0" class="hnpast">past</a>
						|
						<a href="https://www.google.com/search?q=${encodeURI(item.title)}">web</a>
						|
						<a href="item?id=${item.id}">${item.comments}</a>
					</td>
				</tr>
				<tr class="spacer" style="height:5px"></tr>
			`;
		});

		itemlistTable.append(moreSpace, moreButton);

		const docHead = [...homepage.children].slice(0, 6);
		const docBody = [...homepage.children].slice(6);

		document.head.append(...docHead);
		document.body.append(...docBody);
		document.body.firstChild.remove();

		document.title = 'Polls | Hacker News';
		pollsLink = navbarLink(true);

		getPollItems(0);
	}

	else {
		pollsLink = navbarLink();
	}

	return Boolean(pollsLink);
}

const details = {
	id: 'list-hn-polls-on-dedicated-page',
	pages: {
		include: ['*'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
