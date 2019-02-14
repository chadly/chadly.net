/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */

const path = require("path");
const fs = require("fs");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;
	if (node.internal.type === "MarkdownRemark") {
		const slug = createFilePath({ node, getNode, basePath: "pages" });
		createNodeField({ node, name: "slug", value: slug });
	}
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
	const docPage = path.resolve("./src/post/index.js");

	const result = await graphql(
		`
			{
				allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
					edges {
						node {
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

	const posts = result.data.allMarkdownRemark.edges;
	posts.forEach(({ node: { fields: { slug }, fileAbsolutePath } }) => {
		let templatePath = path.join(
			path.dirname(fileAbsolutePath),
			"_template.js"
		);

		if (!fs.existsSync(templatePath)) {
			templatePath = docPage;
		}

		createPage({
			path: slug,
			component: templatePath,
			context: { slug }
		});
	});
};
