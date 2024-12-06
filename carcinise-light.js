// lightweight version of the full carcinise bookmarklet: https://github.com/ellipsisComma/carcinise
// this version only targets text (and not attributes e.g. input placeholders), and specifically targets <main> initially

// button
const carciniseButton = document.getElementById(`carcinise`);

// when tab or window is fully hidden reveal button
window.addEventListener(`visibilitychange`, () => {
	if (document.hidden) carciniseButton.hidden = false;
}, {"once": true});

// carcinise an element (recursively carcinise its node children)
function carcinise() {
	const crab = `🦀`;
	const check = () => Math.random() < 0.25;

	function carciniseStr(string) {
		return string.replaceAll(/\d+|\p{Emoji}|(?!<[\p{L}])([\p{L}]+?)(?![\p{L}])/gmu, match => check() ? crab : match);
	}

	function carciniseElement(element) {
		[...element.childNodes].forEach(node => {
			if (typeof node === `undefined`) return;
			switch (node.nodeType) {
			case 3:
				node.textContent = carciniseStr(node.textContent);
				break;
			case 1:
			case 9:
			case 11:
				if (node.hasChildNodes()) carciniseElement(node);
				break;
			}
		});
	}

	carciniseElement(document.querySelector(`main`));

	carciniseButton.inert = true;
	carciniseButton.style.animationName = `scuttle-outer`;
	carciniseButton.firstElementChild.style.animationName = `scuttle-inner`;
}

// carcinise <main> on clicking button
carciniseButton.addEventListener(`click`, carcinise);

// when button finishes scuttling out, reset it
carciniseButton.addEventListener(`animationend`, resetCarciniseButton);

// reset button to interactive, static, hidden state
function resetCarciniseButton() {
	/*
	carciniseButton.hidden = true;
	carciniseButton.inert = false;
	carciniseButton.style.animationName = ``;
	carciniseButton.firstElementChild.style.animationName = ``;
	*/
}

// reset button on pageload/refresh
window.addEventListener(`onload`, () => {
	resetCarciniseButton();
});