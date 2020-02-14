import React, {useState, useRef, useEffect, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';

const mappingKeys = {
	ArrowUp: 'top',
	ArrowRight: 'right',
	ArrowDown: 'bottom',
	ArrowLeft: 'left'
};

const App = () => {
	const [direction, setDirection] = useState(null);
	const [coords, setCoords] = useState({
		top: 100,
		left: 100
	});
	const inputRef = useRef(null);
	const imgRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const moveImg = progress => {
		console.log('start animate');
		const imgStyle = imgRef.current.style;

		switch (direction) {
			case 'left':
				imgStyle.left = `${coords.left - progress * 10}px`;
				setCoords({
					...coords,
					left: coords.left - 10
				});
				break;

			case 'top':
				imgStyle.top = `${coords.top - progress * 10}px`;
				setCoords({
					...coords,
					top: coords.top - 10
				});
				break;

			case 'right':
				imgStyle.left = `${coords.left + progress * 10}px`;
				setCoords({
					...coords,
					left: coords.left + 10
				});
				break;

			case 'bottom':
				imgStyle.top = `${coords.top + progress * 10}px`;
				setCoords({
					...coords,
					top: coords.top + 10
				});
				break;

			default:
				console.log('direction: ', direction);
		}

		if (progress === 1) {
			console.log('done');
		}
	};

	useEffect(() => {
		const isDirectionSet = Object.values(mappingKeys).includes(direction);

		if (isDirectionSet) {
			animate({
				duration: 1000,
				move: moveImg
			});
		}
	}, [direction]);

	const run = event => {
		setDirection(mappingKeys[event.key]);
	};

	const animate = ({duration, move}) => {
		let start = performance.now();

		requestAnimationFrame(function animate(time) {
			let timeFraction = (time - start) / duration;
			if (timeFraction > 1) timeFraction = 1;

			move(timeFraction);

			if (timeFraction < 1) {
				requestAnimationFrame(animate);
			}
		});
	};

	return (
		<div className="App">
			<input type="text" ref={inputRef} className="input" onKeyDown={run} />

			<img src={logo} className="img" alt="logo" ref={imgRef} />
		</div>
	);
};

export default App;
