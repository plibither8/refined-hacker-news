const shortcuts = {
    italicise: function(event) {
        const {target} = event;
		const {
			value,
			selectionEnd,
			selectionStart
		} = target;

		const selection = value.substring(selectionStart, selectionEnd);
		let before;
		let after;

		if (value.charAt(selectionStart - 1) === '*' && value.charAt(selectionEnd) === '*') {
			before = value.substring(0, selectionStart - 1);
			after = value.substring(selectionEnd + 1, value.length);
			target.value = `${before}${selection}${after}`;
			target.selectionStart = selectionStart - 1;
			target.selectionEnd = selectionEnd - 1;
		} else {
			before = value.substring(0, selectionStart);
			after = value.substring(selectionEnd, value.length);
			target.value = `${before}*${selection}*${after}`;
			target.selectionStart = selectionStart + 1;
			target.selectionEnd = selectionEnd + 1;
		}
    },

    quickSubmit: function(event) {
		event.target.form.submit();
    }
}

function handleKeydown(event) {
	if (event.ctrlKey || event.metaKey) {
        switch(event.keyCode) {
            case 73:
                shortcuts.italicise(event);
                break;

            case 13:
                shortcuts.quickSubmit(event);
                break;

            default: break;
        }
	}
}

function init() {
	const textareas = document.querySelectorAll('textarea');
	const inputs = document.querySelectorAll('input');
	const fields = [...textareas, ...inputs];

	for (const field of fields) {
		field.addEventListener('keydown', handleKeydown);
    }

	const commentTree = document.querySelector('table.comment-tree');
	if (window.location.pathname === '/item' && commentTree) {
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
	id: 'key-bindings-on-input-fields',
	pages: {
		include: [
			'/item',
			'/reply',
			'/submit'
		],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
