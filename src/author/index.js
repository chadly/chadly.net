import React from "react";
import { createUseStyles } from "react-jss";
import { useStaticQuery, graphql } from "gatsby";
import { rhythm, scale, smallScreenMediaQuery } from "../theme";

import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";

import Avatar from "../avatar";
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
						avatar {
							imgLarge: childImageSharp {
								fixed(width: 175) {
									...GatsbyImageSharpFixed
								}
							}
							imgSmall: childImageSharp {
								fixed(width: 130) {
									...GatsbyImageSharpFixed
								}
							}
						}
					}
					bio: body
				}
			}
		}
	`);

	const H = small ? "p" : "h1";

	const avatarSrc = small
		? { img: author.avatar.imgSmall }
		: { img: author.avatar.imgLarge };

	return (
		<section
			className={`p-author h-card ${classes.container} ${className || ""}`}
		>
			<Avatar src={avatarSrc} imgClassName="u-photo" alt={author.name} />
			<div>
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
