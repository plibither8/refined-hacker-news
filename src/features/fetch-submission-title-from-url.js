/**
 * Fetches the title of the URL after doing some checks
 * and writes it to the title input
 */
async function fetchTitle() {
	// Found this RESTful API while googling how to get the title
	// of an external URL. StackOverflow helped (shocker!)
	const apiUrl = 'https://textance.herokuapp.com/title/';

	const titleInput = document.querySelector('input[name="title"]');
	const urlInput = document.querySelector('input[name="url"]');
	const loader = document.querySelector('img.__rhn__loader');

	// URL input should not be empty
	const {value} = urlInput;
	if (value.length === 0) {
		return;
	}

	// display loader while fetching happens
	loader.classList.remove('__rhn__no-display');

	const endpoint = encodeURI(value); // make the string URL-safe

	const title = await fetch(apiUrl + endpoint).then(res => res.text());
	if (!title.startsWith('org.takes.HttpException:') && // page not found
		!title.startsWith('Empty label is not a legal name')) { // some other error that just happened
		titleInput.value = title;
	}

	// hide loader gif
	loader.classList.add('__rhn__no-display');
}

function init() {
	const urlInput = document.querySelector('input[name="url"]');
	const urlInputParent = urlInput.parentElement;

	// the fetcher
	const fetchTitleBtn = document.createElement('span');
	fetchTitleBtn.classList.add('__rhn__fetch-title');
	fetchTitleBtn.innerHTML = '<a href="javascript:void(0)">fetch title</a>';
	fetchTitleBtn.addEventListener('click', fetchTitle);

	// create loader gif element and hide it
	const loader = document.createElement('img');
	loader.src = browser.extension.getURL('loader.gif');
	loader.classList.add('__rhn__no-display', '__rhn__loader');

	urlInputParent.append(fetchTitleBtn, loader);

	return true;
}

const details = {
	id: 'fetch-submission-title-from-url',
	pages: {
		include: ['/submit'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
