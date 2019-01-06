import React from "react";
import injectSheet from "react-jss";
import { rhythm, scale, smallScreenMediaQuery } from "../typography";

import Social from "./social";

import { get } from "lodash";

const Author = ({ author, classes }) => {
	if (!author) return null;

	return (
		<div className={classes.container}>
			<img
				src={get(author, "image.file.url")}
				alt={author.name}
				className={classes.profileImg}
			/>
			<div className={classes.meta}>
				<h3>{author.name}</h3>
				<div
					className={classes.bio}
					dangerouslySetInnerHTML={{
						__html: get(author, "shortBio.childMarkdownRemark.html")
					}}
				/>
				<Social author={author} />
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: "flex",
		marginBottom: rhythm(1.5),
		...scale(-0.25),
		[smallScreenMediaQuery]: {
			display: "block",
			textAlign: "center"
		}
	},
	profileImg: {
		marginRight: rhythm(1),
		boxShadow: "0 0 0 6px hsla(0,0%,100%,.1)",
		background: "#e3e9ed",
		borderRadius: "100%",
		objectFit: "cover",
		width: rhythm(4.5),
		height: rhythm(4.5),
		[smallScreenMediaQuery]: {
			display: "block",
			margin: `${rhythm(0.5)} auto`
		}
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
