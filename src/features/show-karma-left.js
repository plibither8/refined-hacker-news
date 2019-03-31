function init(metadata) {
	const params = new URLSearchParams(window.location.search);
	if (params.has('id')) {
		if (metadata.user.name !== params.get('id')) {
			return false;
		}

		const karmaRow = document.querySelectorAll('form.profileform table tr')[2];
		const karma = Number(karmaRow.querySelectorAll('td')[1].innerText);

		const downvoteThreshold = 501;
		const pollThreshold = 201;

		if (karma < downvoteThreshold) {
			const indent = document.createElement('td');
			const downvoteRow = document.createElement('tr');
			const downvoteKarmaLeft = document.createElement('td');
			downvoteKarmaLeft.innerHTML = `${downvoteThreshold - karma} karma points left to downvote comments`;
			downvoteRow.append(indent, downvoteKarmaLeft);
			karmaRow.parentNode.insertBefore(downvoteRow, karmaRow.nextSibling);
		}

		if (karma < pollThreshold) {
			const indent = document.createElement('td');
			const pollRow = document.createElement('tr');
			const pollKarmaLeft = document.createElement('td');
			pollKarmaLeft.innerHTML = `${pollThreshold - karma} karma points left to create polls`;
			pollRow.append(indent, pollKarmaLeft);
			karmaRow.parentNode.insertBefore(pollRow, karmaRow.nextSibling);
		}
	}

	return true;
}

const details = {
	id: 'show-karma-left',
	pages: {
		include: ['/user'],
		exclude: []
	},
	loginRequired: true,
	init
};

export default details;
