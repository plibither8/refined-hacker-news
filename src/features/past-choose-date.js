function init() {
	const navigator = document.querySelectorAll('table.itemlist > tbody > tr')[3].querySelectorAll('td')[1];

	const yearInput = document.createElement('select');
	const monthInput = document.createElement('select');
	const dayInput = document.createElement('select');

	// Year Input
	for (let y = new Date().getFullYear(); y >= 2007; y--) {
		yearInput.innerHTML += `<option value=${y}>${y}</option>`;
	}

	// Month Input
	for (let m = 1; m <= 12; m++) {
		m = String(m).padStart(2, '0');
		monthInput.innerHTML += `<option value=${m}>${m}</option>`;
	}

	// Day Input
	for (let d = 1; d <= 31; d++) {
		d = String(d).padStart(2, '0');
		dayInput.innerHTML += `<option value=${d}>${d}</option>`;
	}

	const goSpan = document.createElement('span');
	goSpan.classList.add('hnmore');

	const goBtn = document.createElement('a');
	goBtn.href = 'javascript:void(0)';
	goBtn.innerHTML = 'Go';
	goBtn.addEventListener('click', () => {
		window.location.href = `front?day=${yearInput.value}-${monthInput.value}-${dayInput.value}`;
	});

	goSpan.append(goBtn);

	navigator.append(' Choose a date: ', yearInput, '-', monthInput, '-', dayInput, ' ', goSpan, '.');

	return true;
}

const details = {
	id: 'past-choose-date',
	pages: {
		include: ['/front'],
		exclude: []
	},
	loginRequired: false,
	init
};

export default details;
