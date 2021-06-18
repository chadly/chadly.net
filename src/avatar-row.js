import React from "react";
import { createUseStyles } from "react-jss";

import Avatar from "./avatar";
import { rhythm, smallScreenMediaQuery } from "./theme";

const AvatarRow = ({
	component: Component = "div",
	children,
	className,
	align = "center",
	image
}) => {
	const classes = useStyles({ align });

	return (
		<Component className={`${classes.container} ${className || ""}`}>
			<Avatar className={classes.avatar} image={image} />
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
