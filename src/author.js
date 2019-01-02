import React from "react";
import Img from "gatsby-image";
import injectSheet from "react-jss";
import { rhythm, scale } from "./typography";

import { get } from "lodash";

const Author = ({ author, classes }) => {
	if (!author) return null;

	return (
		<div className={classes.container}>
			<Img
				alt={author.name}
				className={classes.profileImg}
				fixed={author.image.fixed}
			/>
			<div className={classes.meta}>
				<h3>{author.name}</h3>
				<div
					className={classes.bio}
					dangerouslySetInnerHTML={{
						__html: get(author, "shortBio.childMarkdownRemark.html")
					}}
				/>
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: "flex",
		marginBottom: rhythm(1.5),
		...scale(-0.25)
	},
	profileImg: {
		marginRight: rhythm(1),
		boxShadow: "0 0 0 6px hsla(0,0%,100%,.1)",
		background: "#e3e9ed",
		borderRadius: "100%",
		objectFit: "cover"
	},
	meta: {
		"& h3": {
			marginTop: rhythm(0.25),
			marginBottom: rhythm(0.25)
		}
	},
	bio: {
		"& p": {
			marginBottom: 0
		}
	}
};

export default injectSheet(styles)(Author);
