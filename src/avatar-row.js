import React from "react";
import { createUseStyles } from "react-jss";
import { rhythm, smallScreenMediaQuery } from "./theme";

import Avatar from "./avatar";

const AvatarRow = ({ component = "div", children, className, ...avatar }) => {
	const classes = useStyles();

	return (
		<component className={`${classes.container} ${className || ""}`}>
			<Avatar className={classes.avatar} {...avatar} />
			<div>{children}</div>
		</component>
	);
};

const useStyles = createUseStyles({
	container: {
		display: "flex",
		alignItems: "flex-start",
		[smallScreenMediaQuery]: {
			display: "block",
			textAlign: "center"
		}
	},
	avatar: {
		[smallScreenMediaQuery]: {
			display: "block",
			margin: `${rhythm(0.5)} auto`
		}
	}
});

export default AvatarRow;
