import React, { useRef, useState, useEffect } from "react";

import { createUseStyles } from "react-jss";
import { rhythm } from "../theme";

import lottie from "lottie-web";

import BurninateData from "./burninate";
import RestingData from "./resting";
import Yell from "./trogdor.mp3";

const Trogdor = () => {
	const classes = useStyles();

	const [isBurninating, setIsBurninating] = useState(false);
	const yell = useRef();

	useEffect(() => {
		if (isBurninating) {
			yell.current.play();
		}
	}, [isBurninating, yell]);

	return (
		<section>
			<audio preload="auto" src={Yell} ref={yell} />
			<Resting on={!isBurninating} />
			<Burninate
				on={isBurninating}
				onComplete={() => setIsBurninating(false)}
			/>
			<div className={classes.actions}>
				<button onClick={() => setIsBurninating(true)} disabled={isBurninating}>
					{!isBurninating ? <>🔥 Burninate 🔥</> : <>🔥🔥🔥🔥🔥🔥</>}
				</button>
			</div>
		</section>
	);
};

const useStyles = createUseStyles({
	actions: {
		margin: `${rhythm(2)} 0`,
		textAlign: "center",

		"& button": {
			boxShadow: "inset 0px 1px 0px 0px #f5978e",
			background: "linear-gradient(to bottom, #f24537 5%, #c62d1f 100%)",
			backgroundColor: "#f24537",
			borderRadius: 6,
			border: "1px solid #d02718",
			display: "inline-block",
			color: "#ffffff",
			fontSize: "2em",
			fontWeight: "bold",
			padding: `${rhythm(1)} ${rhythm(0.5)}`,
			textShadow: "0px 1px 0px #810e05"
		},
		"& button:hover": {
			background: "linear-gradient(to bottom, #c62d1f 5%, #f24537 100%)",
			backgroundColor: "#c62d1f"
		}
	}
});

const Burninate = ({ on, onComplete }) => (
	<Animation
		data={BurninateData}
		loop={false}
		play={on}
		onComplete={onComplete}
	/>
);

const Resting = ({ on }) => <Animation data={RestingData} loop play={on} />;

const Animation = ({ data, loop, play, onComplete }) => {
	const container = useRef();
	const anim = useRef();

	useEffect(() => {
		anim.current = lottie.loadAnimation({
			container: container.current,
			renderer: "svg",
			loop,
			autoplay: false,
			animationData: data
		});

		if (onComplete) {
			anim.current.addEventListener("complete", onComplete);
		}

		return () => {
			if (anim.current) {
				anim.current.destroy();
			}
		};
	}, [data, loop, onComplete]);

	useEffect(() => {
		if (anim.current) {
			if (play) {
				anim.current.play();
			} else {
				anim.current.stop();
			}
		}
	}, [play]);

	return (
		<div style={{ display: play ? "block" : "none" }} ref={container}></div>
	);
};

export default Trogdor;
