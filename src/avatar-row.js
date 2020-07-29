import React from "react";
import { createUseStyles } from "react-jss";
import { rhythm, smallScreenMediaQuery } from "./theme";

import Avatar from "./avatar";

const AvatarRow = ({
	component: Component = "div",
	children,
	className,
	align = "center",
	...avatar
}) => {
	const classes = useStyles({ align });

	return (
		<Component className={`${classes.container} ${className || ""}`}>
			<Avatar className={classes.avatar} {...avatar} />
			<div>{children}</div>
		</Component>
	);
};

const useStyles = createUseStyles({
	container: {
		display: "flex",
		alignItems: ({ align }) => align,
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
