function init(metadata) {
	if (metadata.path === '/item' && metadata.item.type === 'story') {
		const storyLink = document.querySelector('a.storylink').href;

		const separatorPipe = document.createTextNode(' | ');
		const archiveButton = document.createElement('a');

		archiveButton.innerText = 'archive';
		archiveButton.href = 'https://wayback.now.sh/' + encodeURIComponent(storyLink);
		archiveButton.target = '_blank';
		archiveButton.classList.add('__rhn__archive-button');

		const targetParent =
			document.querySelector('table.fatitem td.subtext') ||
			document.querySelector('table.fatitem span.comhead');
		const targetSibling = targetParent.querySelector('a[href^="https://www.google.com"]').nextSibling;

		targetParent.insertBefore(separatorPipe, targetSibling);
		targetParent.insertBefore(archiveButton, targetSibling);

		return true;
	}

	return false;
}

const details = {
	id: 'archive-submission',
	pages: {
		include: [
			'/item'
		],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
