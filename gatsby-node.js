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

exports.createPages = async ({
	graphql,
	actions: { createPage, createRedirect }
}) => {
	const post = path.resolve("./src/post/index.js");

	const result = await graphql(
		`
			{
				postFiles: allFile(
					filter: {
						sourceInstanceName: { eq: "posts" }
						extension: { eq: "mdx" }
					}
				) {
					posts: nodes {
						childMdx {
							frontmatter {
								id
								redirect_from
							}
							fields {
								slug
							}
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

	result.data.postFiles.posts.forEach(
		({
			childMdx: {
				frontmatter: { id: threadId, redirect_from: redirectFrom },
				fields: { slug }
			}
		}) => {
			const slugs = [slug, ...(redirectFrom || [])];

			createPage({
				path: slug,
				component: post,
				context: { slug, threadId, slugs }
			});

			if (redirectFrom && redirectFrom.length) {
				redirectFrom.forEach(from => {
					createRedirect({
						fromPath: from,
						toPath: slug,
						isPermanent: true,
						redirectInBrowser: true
					});
				});
			}
		}
	);
};
