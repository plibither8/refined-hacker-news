import {isClickModified} from '../libs/utils';
import {paths} from '../libs/paths';

async function init(metadata) {
	const {user} = metadata;

	const links = [
		{
			title: 'profile',
			path: `user?id=${user}`
		},
		{
			title: 'submissions',
			path: `submitted?id=${user}`
		},
		{
			title: 'comments',
			path: `threads?id=${user}`
		},
		{
			title: 'hidden',
			path: 'hidden'
		},
		{
			title: 'upvoted submissions',
			path: `upvoted?id=${user}`
		},
		{
			title: 'upvoted comments',
			path: `upvoted?id=${user}&comments=t`
		},
		{
			title: 'favorite submissions',
			path: `favorites?id=${user}`
		},
		{
			title: 'favorite comments',
			path: `favorites?id=${user}&comments=t`
		}
	];

	const dropdownEl = document.createElement('div');
	const targetCell = document.querySelectorAll('span.pagetop')[1];
	const userLink = document.querySelector('a#me');

	if (!userLink) {
		return false;
	}

	userLink.innerHTML += ' ▾';

	dropdownEl.classList.add('__rhn__no-display', '__rhn__profile-dropdown');
	dropdownEl.style.background = metadata.topcolor;
	let state = 0;

	for (const link of links) {
		const anchorEl = document.createElement('a');
		anchorEl.href = link.path;
		anchorEl.innerHTML = link.title;
		dropdownEl.append(anchorEl);
	}

	targetCell.append(dropdownEl);

	userLink.addEventListener('click', event => {
		if (isClickModified(event)) {
			return;
		}

		event.preventDefault();

		dropdownEl.style.left = userLink.getBoundingClientRect().left + 'px';
		dropdownEl.classList.toggle('__rhn__no-display');
		userLink.innerHTML = `${user} ${state ? '▾' : '▴'}`;
		state = 1 - state;
	});

	return true;
}

const details = {
	id: 'profile-link-dropdown',
	pages: {
		include: ['*'],
		exclude: paths.info
	},
	loginRequired: true,
	runOnJobItems: true,
	init
};

export default details;
