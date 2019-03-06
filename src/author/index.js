import React from "react";
import injectSheet from "react-jss";
import { useStaticQuery, graphql } from "gatsby";
import { rhythm, scale, smallScreenMediaQuery } from "../theme/typography";

import pic from "./me.jpg";
import Social from "./social";

const Author = ({ classes }) => {
	const {
		site: {
			siteMetadata: { author }
		}
	} = useStaticQuery(graphql`
		query AuthorQuery {
			site {
				siteMetadata {
					author {
						name
						description
						twitter
						github
						keybase
					}
				}
			}
		}
	`);

	return (
		<div className={classes.container}>
			<img src={pic} alt={author.name} className={classes.profileImg} />
			<div className={classes.meta}>
				<h3>{author.name}</h3>
				<div className={classes.bio}>{author.description}</div>
				<Social author={author} />
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: "flex",
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
