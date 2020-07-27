import { Children, cloneElement } from "react";
import { createUseStyles } from "react-jss";

const SvgIcon = ({ children }) => {
	const classes = useStyles();
	return cloneElement(Children.only(children), {
		className: classes.icon
	});
};

const useStyles = createUseStyles({
	icon: {
		display: "inline-block",
		fill: "currentColor",
		height: "1em",
		width: "1em"
	}
});

export default SvgIcon;
