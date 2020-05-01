import React from "react";
import { createUseStyles } from "react-jss";
import { useStaticQuery, graphql } from "gatsby";
import { rhythm, scale, smallScreenMediaQuery } from "../theme";

import Img from "gatsby-image";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";

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

	return (
		<section
			className={`p-author h-card ${classes.container} ${className || ""}`}
		>
			<div className={classes.profileImgContainer}>
				<Img
					fixed={
						small ? author.avatar.imgSmall.fixed : author.avatar.imgLarge.fixed
					}
					alt={author.name}
					className={`u-photo ${classes.profileImg}`}
				/>
			</div>
			<div className={classes.meta}>
				<h3>
					{children}
					<a href={siteUrl} className="u-url p-name">
						{author.name}
					</a>
				</h3>
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
	profileImgContainer: {
		margin: `0 ${rhythm(1)} 0 0`,
		[smallScreenMediaQuery]: {
			display: "block",
			margin: `${rhythm(0.5)} auto`
		}
	},
	profileImg: {
		boxShadow: "0 0 0 6px var(--glow)",
		borderRadius: "100%",
		objectFit: "cover"
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
