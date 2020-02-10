import React, {useState, useRef, useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";

const styles = {
	ArrowUp: "top",
	ArrowRight: "right",
	ArrowDown: "bottom",
	ArrowLeft: "left"
};

const App = () => {
	const [direction, setDirection] = useState(null);
	const [coords, setCoords] = useState({
		top: 100,
		left: 100
		// right:
	});
	const inputRef = useRef(null);
	const imgRef = useRef(null);

	// console.log(imgRef.current.getBoundingClientRect());

	useEffect(() => {
		inputRef.current.focus();
		// need to write coords
		console.log(imgRef.current.getBoundingClientRect());
	}, []);

	const moveImg = progress => {
		// console.log(direction);

		const isPositiveDirection = direction === "left" || direction === "top";

		if (isPositiveDirection) {
			imgRef.current.style[direction] = `${coords[direction] -
				progress * 10}px`;
		} else if (direction === "bottom") {
			imgRef.current.style.top = `${coords.top + progress * 10}px`;
		} else if (direction === "right") {
			imgRef.current.style.left = `${coords.left + progress * 10}px`;
		}

		if (progress === 1) {
			// console.log("done");
			console.log(imgRef.current.getBoundingClientRect());
			setCoords({
				...coords,
				[direction]: isPositiveDirection
					? coords[direction] - 10
					: coords[direction] + 10
			});
		}
	};

	useEffect(() => {
		const isDirectionSet = Object.values(styles).includes(direction);

		if (isDirectionSet) {
			animate({
				duration: 1000,
				move: moveImg
			});
		}
	}, [direction]);

	const run = event => {
		setDirection(styles[event.key]);
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
			<input
				type="text"
				ref={inputRef}
				className="input"
				onKeyDown={run}
			/>

			<img src={logo} className="img" alt="logo" ref={imgRef} />
		</div>
	);
};

export default App;
