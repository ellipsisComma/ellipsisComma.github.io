// lightweight version of the full carcinise bookmarklet: https://github.com/ellipsisComma/carcinise
// this version only targets text (and not attributes e.g. input placeholders), and specifically targets <main> initially

// styles
document.head.appendChild(document.createElement(`style`)).textContent = `
#carcinise[hidden] {
	display: none;
}
#carcinise {
	aspect-ratio: 1;
	position: fixed;
	inset-block-end: 0.6rem;
	inset-inline-start: 50%;
	z-index: 2;
	display: flex;
	align-items: center;
	padding: 0.5rem;
	text-align: center;
	font-size: 2rem;
	font-family: unset;
	background-color: unset;
	border-width: var(--line-width);
	border-style: solid;
	border-color: coral;
	border-radius: 0.3em;
	outline-width: var(--line-width);
	outline-style: solid;
	outline-color: var(--back-colour);
	backdrop-filter: blur(6px);
	-webkit-backdrop-filter: blur(6px);
	transform: translateX(-50%);
	-webkit-user-select: none;
	cursor: pointer;
}
#carcinise:is(:active, :focus-visible) {
	background-color: color(from var(--accent-colour) srgb r g b / 0.15);
}
#carcinise:hover > span {
	transform: scale(1.2);
}
#carcinise, #carcinise > span {
	transform-origin: center;
	animation-duration: 5s;
	animation-timing-function: step-end;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
}
@keyframes scuttle-outer {
	20% {
		inset-inline-start: 40%;
	}
	40% {
		inset-inline-start: 30%;
	}
	60% {
		inset-inline-start: 20%;
	}
	80% {
		inset-inline-start: 10%;
	}
	100% {
		inset-inline-start: 0;
		opacity: 0;
	}
}
@keyframes scuttle-inner {
	20% {
		transform: rotate(18deg);
	}
	40% {
		transform: rotate(-18deg);
	}
	60% {
		transform: rotate(18deg);
	}
	80% {
		transform: rotate(-18deg);
	}
	100% {
		transform: rotate(18deg);
	}
}
@media (forced-colors: active) {
	#carcinise {
		background: var(--back-colour);
		backdrop-filter: unset;
	}
}
`;

// button
const carciniseButton = document.createElement(`button`);
carciniseButton.id = `carcinise`;
carciniseButton.ariaLabel = `Carcinise`;
carciniseButton.type = `button`;
carciniseButton.hidden = true;
carciniseButton.appendChild(document.createElement(`span`)).textContent = `🦀`;
document.body.appendChild(carciniseButton);

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
carciniseButton.addEventListener(`animationend`, () => carciniseButton.remove());
