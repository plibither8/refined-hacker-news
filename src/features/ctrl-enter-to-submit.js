function handleKeydown(event) {
	if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
		event.target.form.submit();
	}
}

function init() {
	const textareas = document.querySelectorAll('textarea');
	const inputs = document.querySelectorAll('input');
	const fields = [...textareas, ...inputs];

	for (const field of fields) {
		field.addEventListener('keydown', handleKeydown);
	}

	if (window.location.pathname === '/item') {
		const observer = new MutationObserver(mutationsList => {
			for (const mutation of mutationsList) {
				const {addedNodes} = mutation;
				for (const node of addedNodes) {
					if (node.nodeType !== Node.ELEMENT_NODE) {
						continue;
					}

					const textarea = node.querySelector('textarea');
					if (textarea) {
						textarea.addEventListener('keydown', handleKeydown);
					}
				}
			}
		});

		const commentTree = document.querySelector('table.comment-tree');
		const observerConfig = {
			attributes: false,
			childList: true,
			subtree: true
		};

		window.addEventListener('load', observer.observe(commentTree, observerConfig));
	}

	return true;
}

const details = {
	id: 'ctrl-enter-to-submit',
	pages: {
		include: [
			'/item',
			'/submit',
			'/reply'
		],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
