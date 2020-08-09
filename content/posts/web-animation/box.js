import React from "react";
import { createUseStyles } from "react-jss";
import { rhythm } from "../../../src/theme";

export const Box = ({ children }) => {
	const classes = useStyles();
	return <div className={classes.root}>{children}</div>;
};

export const BackgroundBox = ({ children }) => {
	const classes = useStyles();
	return <div className={classes.rootWithBg}>{children}</div>;
};

const useStyles = createUseStyles({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",

		margin: `${rhythm(2)} 0`,

		"& .lottie": {
			width: "50%"
		}
	},
	rootWithBg: {
		composes: "$root",
		"& .lottie svg": {
			backgroundColor: "#000"
		}
	}
});
