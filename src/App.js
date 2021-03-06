import React, {useState, useRef, useEffect} from 'react';
import './App.css';

import imagesUrls from './images-urls';

const mappingKeys = {
	ArrowUp: 'top',
	ArrowRight: 'right',
	ArrowDown: 'bottom',
	ArrowLeft: 'left'
};

let coords = {
	top: 0,
	left: 0
};

const carSize = {
	width: 100,
	height: 100
};

const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;

const App = () => {
	const [direction, setDirection] = useState(null);
	const [isShowResult, setShowResult] = useState(false);

	const inputRef = useRef(null);
	const imgRef = useRef(null);
	const reduxLogoRef = useRef(null);
	const animationRef = useRef(null);

	useEffect(() => {
		document.addEventListener('click', () => inputRef.current.focus());

		inputRef.current.focus();
	}, []);

	useEffect(() => {
		const isDirectionSet = Object.values(mappingKeys).includes(direction);

		if (isDirectionSet) {
			cancelAnimationFrame(animationRef.current);
			move();
		}
	}, [direction]);

	const onKeyDown = event => {
		if (direction === mappingKeys[event.key]) {
			return;
		}
		setDirection(mappingKeys[event.key]);
	};

	const move = () => {
		const imgStyle = imgRef.current.style;

		const {x, y} = imgRef.current.getBoundingClientRect();

		const reduxLogoSizes = reduxLogoRef.current.getBoundingClientRect();

		const xCondition =
			x + carSize.width > reduxLogoSizes.x && x < reduxLogoSizes.x + reduxLogoSizes.width;

		const yCondition =
			y + carSize.height > reduxLogoSizes.y && y < reduxLogoSizes.y + reduxLogoSizes.height;

		if (xCondition && yCondition) {
			setShowResult(true);
			return;
		}

		switch (direction) {
			case 'left':
				if (coords.left > 0) {
					coords = {
						...coords,
						left: coords.left - 1
					};

					imgStyle.left = coords.left + 'px';
				}

				break;

			case 'top':
				if (coords.top > 0) {
					coords = {
						...coords,
						top: coords.top - 1
					};

					imgStyle.top = coords.top + 'px';
				}

				break;

			case 'right':
				if (coords.left + carSize.width < viewportWidth) {
					coords = {
						...coords,
						left: coords.left + 1
					};

					imgStyle.left = coords.left + 'px';
				}

				break;

			case 'bottom':
				if (coords.top + carSize.height < viewportHeight) {
					coords = {
						...coords,
						top: coords.top + 1
					};

					imgStyle.top = coords.top + 'px';
				}

				break;

			default:
				break;
		}

		animationRef.current = requestAnimationFrame(move);
	};

	return (
		<div className="App">
			<input type="text" ref={inputRef} className="input" onKeyDown={onKeyDown} />

			<img
				src={imagesUrls.CAR_URL}
				className={direction === 'left' ? 'car car__left' : 'car'}
				alt="car"
				ref={imgRef}
			/>

			<img src={imagesUrls.HOUSE_URL} className="house" alt="house" ref={reduxLogoRef} />

			<img
				src={imagesUrls.FIREWORKS_URL}
				className={isShowResult ? 'result' : 'result__hidden'}
				alt="fireworks"
			/>
		</div>
	);
};

export default App;
