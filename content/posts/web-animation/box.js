import React from "react";
import { createUseStyles } from "react-jss";
import { rhythm, smallScreenMediaQuery } from "../../../src/theme";

export const Box = ({ children }) => {
	const classes = useStyles();
	return <div className={classes.root}>{children}</div>;
};

export const BackgroundBox = ({ children }) => {
	const classes = useStyles();
	return <div className={classes.rootWithBg}>{children}</div>;
};

export const FlexBox = ({ children }) => {
	const classes = useStyles();
	return <div className={classes.flex}>{children}</div>;
};

const useStyles = createUseStyles({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",

		margin: `${rhythm(1)} 0`,

		"& .lottie": {
			width: "50%",

			[smallScreenMediaQuery]: {
				width: "100%"
			}
		}
	},
	rootWithBg: {
		composes: "$root",
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
			width: "50%"
		},

		[smallScreenMediaQuery]: {
			"& p": {
				width: "100%"
			}
		}
	}
});
