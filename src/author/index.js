import React from "react";
import { createUseStyles } from "react-jss";
import { useStaticQuery, graphql } from "gatsby";
import { rhythm, scale, smallScreenMediaQuery } from "../theme/typography";

import pic from "./me.jpg";
import Social from "./social";
import author from "./data";

const Author = ({ small, children }) => {
	const classes = useStyles({ small });

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
		<section className={`p-author h-card ${classes.container}`}>
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
		</section>
	);
};

const useStyles = createUseStyles({
	container: {
		display: "flex",
		alignItems: "center",
		marginBottom: rhythm(1),
		fontSize: ({ small }) => (small ? scale(-0.25).fontSize : undefined),
		[smallScreenMediaQuery]: {
			display: "block",
			textAlign: "center"
		}
	},
	profileImg: {
		margin: `0 ${rhythm(1)} 0 0`,
		boxShadow: "0 0 0 6px var(--glow)",
		background: "#e3e9ed",
		borderRadius: "100%",
		objectFit: "cover",
		width: ({ small }) => rhythm(small ? 4.5 : 6),
		height: ({ small }) => rhythm(small ? 4.5 : 6),
		[smallScreenMediaQuery]: {
			display: "block",
			margin: `${rhythm(0.5)} auto`
		}
	},
	meta: {
		"& h3": {
			marginTop: rhythm(0.25),
			marginBottom: rhythm(0.25),

			fontSize: ({ small }) => (small ? scale(0.1).fontSize : undefined),

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
