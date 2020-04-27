import React from "react";
import { createUseStyles } from "react-jss";
import { useStaticQuery, graphql } from "gatsby";
import { rhythm, scale, smallScreenMediaQuery } from "../theme/typography";

import pic from "./me.jpg";
import Social from "./social";
import author from "./data";

const Author = ({ children }) => {
	const classes = useStyles();

	const {
		site: {
			siteMetadata: { siteUrl }
		}
	} = useStaticQuery(graphql`
		query AuthorQuery {
			site {
				siteMetadata {
					siteUrl
				}
			}
		}
	`);

	return (
		<div className={`p-author h-card ${classes.container}`}>
			<img
				src={pic}
				alt={author.name}
				className={`u-photo ${classes.profileImg}`}
			/>
			<div className={classes.meta}>
				<h3>
					{children}
					<a href={siteUrl} className="u-url p-name">
						{author.name}
					</a>
				</h3>
				<div className={`p-note ${classes.bio}`}>{author.description}</div>
				<Social {...author} className={classes.social} />
			</div>
		</div>
	);
};

const useStyles = createUseStyles({
	container: {
		display: "flex",
		marginBottom: rhythm(1),
		fontSize: scale(-0.25).fontSize,
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
			marginBottom: rhythm(0.25),

			"& a": {
				textDecoration: "none",
				color: "var(--textNormal)"
			}
		}
	},
	bio: {
		"& p": {
			marginBottom: 0
		}
	},
	social: {
		marginTop: rhythm(0.5)
	}
});

export default Author;
