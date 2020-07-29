import React from "react";
import { createUseStyles } from "react-jss";
import { rhythm, smallScreenMediaQuery } from "./theme";

import Img from "gatsby-image";

const Avatar = ({ small, src, className, alt, imgClassName }) => {
	const classes = useStyles({ small });

	if (!src) return null;

	return (
		<div className={`${className || ""} ${classes.container}`}>
			<Img
				fixed={src.img.fixed}
				alt={alt}
				className={`${imgClassName || ""} ${classes.image}`}
			/>
		</div>
	);
};

const useStyles = createUseStyles({
	container: {
		margin: `0 ${rhythm(1)} 0 0`,
		[smallScreenMediaQuery]: {
			display: "block",
			margin: `${rhythm(0.5)} auto`
		}
	},
	image: {
		boxShadow: "0 0 0 6px var(--glow)",
		borderRadius: "100%",
		objectFit: "cover"
	}
});

export default Avatar;
