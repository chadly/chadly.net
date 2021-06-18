import { graphql, useStaticQuery } from "gatsby";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import React from "react";
import { createUseStyles } from "react-jss";

import AvatarRow from "../avatar-row";
import { rhythm, scale } from "../theme";
import Social from "./social";

const Author = ({ small, children, className }) => {
	const classes = useStyles({ small });

	const {
		site: {
			siteMetadata: { siteUrl }
		},
		file: {
			childMdx: { author, bio }
		}
	} = useStaticQuery(graphql`
		query AuthorQuery {
			site {
				siteMetadata {
					siteUrl
				}
			}
			file(sourceInstanceName: { eq: "author" }, extension: { eq: "mdx" }) {
				childMdx {
					author: frontmatter {
						name
						gender
						github
						twitter
						stackOverflow
						keybase
						linkedin
						avatar {
							imgLarge: childImageSharp {
								gatsbyImageData(layout: FIXED, width: 175)
							}
							imgSmall: childImageSharp {
								gatsbyImageData(layout: FIXED, width: 130)
							}
						}
					}
					bio: body
				}
			}
		}
	`);

	const H = small ? "p" : "h1";

	const avatarImage = small
		? { img: author.avatar.imgSmall }
		: { img: author.avatar.imgLarge };

	return (
		<AvatarRow
			component="section"
			className={`p-author h-card ${classes.container} ${className || ""}`}
			image={avatarImage}
			imgClassName="u-photo"
			alt={author.name}
		>
			<H className={classes.byline}>
				{children}
				<a href={siteUrl} className="u-url p-name">
					{author.name}
				</a>
			</H>
			<div className={`p-note ${classes.bio}`}>
				<MDXRenderer>{bio}</MDXRenderer>
			</div>
			<Social {...author} className={classes.social} />
		</AvatarRow>
	);
};

const useStyles = createUseStyles({
	container: {
		fontSize: ({ small }) => (small ? scale(-0.25).fontSize : undefined)
	},
	byline: {
		marginTop: rhythm(0.25),
		marginBottom: rhythm(0.25),
		border: "none",

		fontSize: ({ small }) => (small ? scale(0.1).fontSize : undefined),

		"& a": {
			textDecoration: "none",
			color: "var(--textNormal)"
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
