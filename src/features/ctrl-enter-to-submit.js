function handleKeydown(event) {
	if (event.ctrlKey && event.keyCode === 13) {
		const {target} = event;
		const form = target.parentElement;
		form.submit();
	}
}

function init() {
	const fields = document.querySelectorAll('textarea');

	for (const field of fields) {
		field.addEventListener('keydown', handleKeydown);
	}

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
