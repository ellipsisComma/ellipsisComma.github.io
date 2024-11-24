// if someone's already visited the site, load in immediately; otherwise, store that they've visited the site
document.addEventListener(`DOMContentLoaded`, () => {
	if (localStorage.getItem(`visited`) && localStorage.getItem(`visited`) === `true`) {
		document.documentElement.style.setProperty(`--delay-factor`, `0`);
	} else localStorage.setItem(`visited`, `true`);
});
