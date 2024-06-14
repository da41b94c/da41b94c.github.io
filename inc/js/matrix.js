document.addEventListener('DOMContentLoaded', () => {
	const matrix = document.querySelector('.matrix');
	const symbols = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:",.<>?/`~');
	const maxSymbols = 100;
	const createRain = () => {
		if (matrix.childElementCount < maxSymbols) {
			const span = document.createElement('span');
			span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
			span.style.left = `${Math.random() * 100}vw`;
			span.style.animationDuration = `${Math.random() * 2 + 3}s`;
			matrix.appendChild(span);

			const changeSymbol = () => {
				span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
			};

			const interval = setInterval(changeSymbol, 100);
			span.addEventListener('animationend', () => {
				clearInterval(interval);
				span.remove();
			});
		}
	};
	setInterval(createRain, 100);
});	