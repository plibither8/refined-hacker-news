import {paths} from '../libs/paths';

function init(metadata) {
	const navbar = document.querySelector('span.pagetop');

	if (!navbar) {
		return false;
	}

	const linkDetails = [
		{
			title: 'leaders',
			description: 'Users with most karma'
		},
		{
			title: 'best',
			description: 'Highest-voted recent links'
		},
		{
			title: 'active',
			description: 'Most active current discussions'
		},
		{
			title: 'newpoll',
			description: 'Create a new poll'
		},
		{
			title: 'bestcomments',
			description: 'Highest-voted recent comments'
		},
		{
			title: 'noobstories',
			description: 'Submissions from new accounts'
		},
		{
			title: 'noobcomments',
			description: 'Comments from new accounts'
		}
	];

	const moreLinkSepartor = document.createElement('span');
	moreLinkSepartor.innerHTML = ' | ';

	const moreLinksBtn = document.createElement('a');
	moreLinksBtn.href = 'javascript:void(0)';
	moreLinksBtn.innerHTML = 'more links >';
	moreLinksBtn.addEventListener('click', () => {
		moreLinksBtn.classList.add('__rhn__no-display');
		moreLinkSepartor.classList.add('__rhn__no-display');
		const newLinks = document.querySelectorAll('.__rhn__navbar-new-links');
		for (const link of newLinks) {
			link.classList.remove('__rhn__no-display');
		}
	});

	for (const link of linkDetails) {
		if ('/' + link.title === metadata.path) {
			continue;
		}

		const separatorText = document.createElement('span');
		separatorText.innerHTML = ' | ';
		separatorText.classList.add('__rhn__no-display', '__rhn__navbar-new-links');

		const linkEl = document.createElement('a');
		linkEl.href = link.title;
		linkEl.innerHTML = link.title;
		linkEl.title = link.description;
		linkEl.classList.add('__rhn__no-display', '__rhn__navbar-new-links');

		navbar.append(separatorText, linkEl);
	}

	navbar.append(moreLinkSepartor, moreLinksBtn);

	return true;
}

const details = {
	id: 'load-more-links-in-navbar',
	pages: {
		include: ['*'],
		exclude: [
			...paths.forms,
			...paths.info
		]
	},
	loginRequired: false,
	runOnJobItems: true,
	init
};

export default details;
