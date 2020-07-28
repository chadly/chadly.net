import React, { useMemo } from "react";
import { graphql } from "gatsby";

import { createUseStyles } from "react-jss";
import { rhythm } from "../theme";

import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";

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
								frontmatter: { headline, href },
								description
							}
						}) => (
							<Project key={id} headline={headline} href={href}>
								{description}
							</Project>
						)
					)}
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
	}
});

const Project = ({ headline, href, children }) => (
	<article>
		<h4>
			<a href={href}>{headline}</a>
		</h4>
		<MDXRenderer>{children}</MDXRenderer>
	</article>
);

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
