document.addEventListener('DOMContentLoaded', () => {
	const MatrixElement = document.querySelector('.matrix');
	const ReducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
	const Symbols = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:",.<>?/`~');

	if (!MatrixElement) {
		return;
	}

	const GetRandomValue = (MinValue, MaxValue) => Math.random() * (MaxValue - MinValue) + MinValue;
	const GetRandomSymbol = () => Symbols[Math.floor(Math.random() * Symbols.length)];

	const UpdateSymbol = (SymbolElement) => {
		SymbolElement.textContent = GetRandomSymbol();
		SymbolElement.style.left = `${GetRandomValue(1, 99).toFixed(2)}%`;
		SymbolElement.style.opacity = GetRandomValue(0.14, 0.48).toFixed(2);
	};

	const CreateSymbol = () => {
		const SymbolElement = document.createElement('span');

		UpdateSymbol(SymbolElement);
		SymbolElement.style.fontSize = `${GetRandomValue(0.72, 1.05).toFixed(2)}rem`;
		SymbolElement.style.animationDuration = `${GetRandomValue(7, 13).toFixed(2)}s`;
		SymbolElement.style.animationDelay = `${GetRandomValue(-13, 0).toFixed(2)}s`;
		SymbolElement.addEventListener('animationiteration', () => UpdateSymbol(SymbolElement));

		return SymbolElement;
	};

	const RenderMatrix = () => {
		MatrixElement.replaceChildren();

		if (ReducedMotionMedia.matches) {
			return;
		}

		const SymbolCount = Math.min(42, Math.max(20, Math.floor(window.innerWidth / 36)));
		const Fragment = document.createDocumentFragment();

		for (let Index = 0; Index < SymbolCount; Index += 1) {
			Fragment.appendChild(CreateSymbol());
		}

		MatrixElement.appendChild(Fragment);
	};

	const HandleVisibilityChange = () => {
		MatrixElement.classList.toggle('is-paused', document.hidden);
	};

	document.addEventListener('visibilitychange', HandleVisibilityChange);

	if (typeof ReducedMotionMedia.addEventListener === 'function') {
		ReducedMotionMedia.addEventListener('change', RenderMatrix);
	} else {
		ReducedMotionMedia.addListener(RenderMatrix);
	}

	RenderMatrix();
});
