import React from "react";
import injectSheet from "react-jss";
import FaceWall from "./facewall";
import { rhythm } from "../../theme/typography";

const Likes = ({ likes, classes }) => {
	if (!likes || !likes.length) return null;

	return (
		<div className={classes.likeSection}>
			<h3>
				{likes.length} Like{likes.length != 1 ? "s" : ""}
			</h3>
			<FaceWall faces={likes} />
		</div>
	);
};

const styles = {
	likeSection: {
		borderTop: "1px solid var(--hr)",
		marginTop: rhythm(1)
	}
};

export default injectSheet(styles)(Likes);
