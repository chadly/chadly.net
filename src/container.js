import React from "react";

import { createUseStyles } from "react-jss";
import { rhythm } from "./theme";

const Layout = ({ component, children, width }) => {
	const classes = useStyles({ width });

	const Component = component || "div";
	return <Component className={classes.container}>{children}</Component>;
};

const useStyles = createUseStyles({
	container: {
		marginLeft: `auto`,
		marginRight: `auto`,
		maxWidth: ({ width = 30 }) => rhythm(width),
		padding: `${rhythm(1.5)} ${rhythm(0.75)}`
	}
});

export default Layout;
