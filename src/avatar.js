import { GatsbyImage as Img, getImage } from "gatsby-plugin-image";
import React from "react";
import { createUseStyles } from "react-jss";

import { rhythm } from "./theme";

const Avatar = ({ className, image, alt, imgClassName }) => {
	const classes = useStyles();

	if (!image) return null;

	return (
		<div className={`${className || ""} ${classes.container}`}>
			<Img
				image={getImage(image.img)}
				alt={alt}
				className={`${imgClassName || ""} ${classes.image}`}
			/>
		</div>
	);
};

const useStyles = createUseStyles({
	container: {
		margin: `0 ${rhythm(1)} 0 0`
	},
	image: {
		boxShadow: "0 0 0 6px var(--glow)",
		borderRadius: "100%",
		objectFit: "cover"
	}
});

export default Avatar;
