import React, { useMemo } from "react";
import { graphql } from "gatsby";

import { createUseStyles } from "react-jss";
import { rhythm, scale } from "../theme";

import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";

import AvatarRow from "../avatar-row";

import Layout from "../layout";
import Seo from "../seo";

import Author from "../author";
import PostStub from "../post/stub";

import { massageList } from "../post/data";

const HomePage = ({
	data: {
		authorFile: {
			childMdx: { author, pageDescription }
		},
		projectFiles: { projects },
		postFiles: { posts },
		externalPostFiles: { externalPosts }
	}
}) => {
	const classes = useStyles();

	const allPosts = useMemo(() => massageList({ posts, externalPosts }), [
		posts,
		externalPosts
	]);

	return (
		<Layout>
			<Seo
				title={`${author.name} | ${author.description}`}
				description={pageDescription}
				profile={author}
			/>

			<Author />

			<main role="main">
				<section className={classes.section}>
					<h2>Things I've Built</h2>

					{projects.map(
						({
							id,
							childMdx: {
								frontmatter: { headline, href, logo },
								description
							}
						}) => (
							<Project key={id} headline={headline} href={href} logo={logo}>
								{description}
							</Project>
						)
					)}

					<p className={classes.projectFooter}>
						See{" "}
						<a href={`https://github.com/${author.github}`}>more on GitHub</a>.
					</p>
				</section>

				<section className={`h-feed ${classes.section}`}>
					<h2>Things I've Written</h2>

					{allPosts.map(post => (
						<PostStub key={post.id} {...post} />
					))}
				</section>
			</main>
		</Layout>
	);
};

const useStyles = createUseStyles({
	section: {
		marginTop: rhythm(3),
		"& article": {
			marginBottom: rhythm(1.5)
		},
		"& article:last-child": {
			marginBottom: 0
		}
	},
	projectFooter: {
		...scale(-0.25),
		color: "var(--textMuted)",
		textAlign: "center",

		"& a": {
			color: "inherit",
			textDecoration: "underline"
		}
	}
});

const Project = ({ headline, href, logo, children }) => {
	const classes = useProjectStyles();

	return (
		<AvatarRow component="article" src={logo} className={classes.container}>
			<h4>
				<a href={href}>{headline}</a>
			</h4>
			<MDXRenderer>{children}</MDXRenderer>
		</AvatarRow>
	);
};

const useProjectStyles = createUseStyles({
	container: {
		margin: `${rhythm(2)} 0`,

		"& h4": {
			marginTop: 0
		}
	}
});

export default HomePage;

export const pageQuery = graphql`
	query HomeQuery {
		authorFile: file(
			sourceInstanceName: { eq: "author" }
			extension: { eq: "mdx" }
		) {
			childMdx {
				author: frontmatter {
					name
					description
					username: twitter
					gender
					github
				}
				pageDescription: excerpt(pruneLength: 500)
			}
		}
		projectFiles: allFile(
			filter: {
				sourceInstanceName: { eq: "projects" }
				extension: { eq: "mdx" }
			}
			sort: { fields: childMdx___frontmatter___sorting }
		) {
			projects: nodes {
				id
				childMdx {
					frontmatter {
						headline
						href
						logo {
							img: childImageSharp {
								fixed(width: 100) {
									...GatsbyImageSharpFixed
								}
							}
						}
					}
					description: body
				}
			}
		}
		postFiles: allFile(
			filter: { sourceInstanceName: { eq: "posts" }, extension: { eq: "mdx" } }
		) {
			posts: nodes {
				childMdx {
					frontmatter {
						id
						title
						description
						date
						dateFormatted: date(formatString: "MMMM Do, YYYY")
					}
					fields {
						slug
					}
					timeToRead
					excerpt
				}
			}
		}
		externalPostFiles: allPostsJson(sort: { fields: date, order: DESC }) {
			externalPosts: nodes {
				postId
				title
				description
				date
				dateFormatted: date(formatString: "MMMM Do, YYYY")
				url
				timeToRead
			}
		}
	}
`;
