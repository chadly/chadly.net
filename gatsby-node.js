/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */

const path = require("path");

exports.createPages = async ({ graphql, actions: { createPage } }) => {
	const blogPost = path.resolve("./src/post/index.js");

	const result = await graphql(
		`
			{
				allContentfulBlogPost {
					edges {
						node {
							title
							slug
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

	const posts = result.data.allContentfulBlogPost.edges;
	posts.forEach(post => {
		if (post.slug != "knockout-inline-confirm") {
			createPage({
				path: `/${post.node.slug}/`,
				component: blogPost,
				context: {
					slug: post.node.slug
				}
			});
		}
	});
};
