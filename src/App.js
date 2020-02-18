import React, {useState, useRef, useEffect} from 'react';
import './App.css';

const CAR_URL = 'https://clipartart.com/images/car-clipart-gif-1.gif';
const HOUSE_URL =
	'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT1-eVOj1Dn5pRt0TIszJDesn-Ijevbm_Cku1w4tZkvpln5ROD7';
const FIREWORKS_URL = 'https://acegif.com/wp-content/uploads/firework-1.gif';

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
				src={CAR_URL}
				className={direction === 'left' ? 'car car__left' : 'car'}
				alt="car"
				ref={imgRef}
			/>

			<img src={HOUSE_URL} className="house" alt="house" ref={reduxLogoRef} />

			<img
				src={FIREWORKS_URL}
				style={{
					opacity: isShowResult ? 1 : 0
				}}
				alt="fireworks"
			/>
		</div>
	);
};

export default App;
