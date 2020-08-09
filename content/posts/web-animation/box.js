import React from "react";
import { createUseStyles } from "react-jss";
import { rhythm, smallScreenMediaQuery } from "../../../src/theme";

export const Box = ({ children, bg }) => {
	const classes = useStyles();
	return (
		<div className={`${classes.root} ${bg ? classes.bg : ""}`}>{children}</div>
	);
};

export const FlexBox = ({ children, bg }) => {
	const classes = useStyles();
	return (
		<div className={`${classes.flex} ${bg ? classes.bg : ""}`}>{children}</div>
	);
};

const useStyles = createUseStyles({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",

		margin: `${rhythm(1)} 0`,

		"& .lottie": {
			width: "45%",

			[smallScreenMediaQuery]: {
				width: "100%"
			}
		}
	},
	bg: {
		"& .lottie svg": {
			backgroundColor: "#000"
		}
	},
	flex: {
		composes: "$root",
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "space-between",

		"& p": {
			width: "45%"
		},

		[smallScreenMediaQuery]: {
			"& p": {
				width: "100%"
			}
		}
	}
});
