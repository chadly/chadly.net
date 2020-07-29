import React, { useMemo } from "react";
import { graphql } from "gatsby";

import { createUseStyles } from "react-jss";
import { rhythm } from "../theme";

import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";

import Avatar from "../avatar";

import Layout from "../layout";
import Seo from "../seo";

import Author from "../author";
import PostStub from "../post/stub";

import { massageList } from "../post/data";

const HomePage = ({
	data: {
		authorFile: {
			childMdx: { author }
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
				description={author.description}
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
						See my GitHub profile for even{" "}
						<a href={`https://github.com/${author.github}`}>
							MOAR OSS PROJECTS
						</a>
						.
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
		margin: `${rhythm(3)} 0`
	}
});

const Project = ({ headline, href, logo, children }) => {
	const classes = useProjectStyles();

	return (
		<article className={classes.container}>
			{logo ? <Avatar src={logo} /> : null}
			<div>
				<h4>
					<a href={href}>{headline}</a>
				</h4>
				<MDXRenderer>{children}</MDXRenderer>
			</div>
		</article>
	);
};

const useProjectStyles = createUseStyles({
	container: {
		display: "flex",
		alignItems: "flex-start",
		margin: `${rhythm(1)} 0`,

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
