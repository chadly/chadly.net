/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */

const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = async ({ node, getNode, actions, getNodes }) => {
	const { createNodeField } = actions;
	if (node.internal.type === "Mdx") {
		const slug = createFilePath({ node, getNode, basePath: "pages" });
		createNodeField({ node, name: "slug", value: slug });
	}

	if (node.internal.type === "WebMentionEntry") {
		const {
			siteMetadata: { siteUrl }
		} = getNodes().find(n => n.internal.type === "Site");

		const slug = node.wmTarget.replace(siteUrl, "");
		createNodeField({ node, name: "slug", value: slug });
	}
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
	const post = path.resolve("./src/post/index.js");

	const result = await graphql(
		`
			{
				allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
					edges {
						node {
							frontmatter {
								id
							}
							fields {
								slug
							}
							fileAbsolutePath
						}
					}
				}
			}
		`
	);

	if (result.errors) {
		console.log(result.errors);
		throw result.errors;
	}

	const posts = result.data.allMdx.edges;
	posts.forEach(
		({
			node: {
				frontmatter: { id: threadId },
				fields: { slug }
			}
		}) => {
			createPage({
				path: slug,
				component: post,
				context: { slug, threadId }
			});
		}
	);
};
