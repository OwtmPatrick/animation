import React, {useState, useRef, useEffect} from 'react';
import logo from './logo.svg';
import reduxLogo from './redux-logo.png';
import './App.css';

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

const imgSizes = {
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

	function move() {
		const imgStyle = imgRef.current.style;

		const {x, y} = imgRef.current.getBoundingClientRect();

		const reduxLogoSizes = reduxLogoRef.current.getBoundingClientRect();

		const xCondition =
			x + imgSizes.width > reduxLogoSizes.x && x < reduxLogoSizes.x + reduxLogoSizes.width;

		const yCondition =
			y + imgSizes.height > reduxLogoSizes.y && y < reduxLogoSizes.y + reduxLogoSizes.height;

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
				if (coords.left + imgSizes.width < viewportWidth) {
					coords = {
						...coords,
						left: coords.left + 1
					};

					imgStyle.left = coords.left + 'px';
				}

				break;

			case 'bottom':
				if (coords.top + imgSizes.height < viewportHeight) {
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
	}

	return (
		<div className="App">
			<input type="text" ref={inputRef} className="input" onKeyDown={onKeyDown} />

			<img src={logo} className="img" alt="logo" ref={imgRef} />

			<img src={reduxLogo} className="redux-logo" alt="redux-logo" ref={reduxLogoRef} />

			<div
				style={{
					opacity: isShowResult ? 1 : 0,
					fontSize: 'xxx-large'
				}}
			>
				Nice job, comrade!
			</div>
		</div>
	);
};

export default App;
