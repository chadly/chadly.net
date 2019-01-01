/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */

const path = require("path");

exports.createPages = async ({ graphql, actions: { createPage } }) => {
	const blogPost = path.resolve("./src/templates/blog-post.js");
	const lightbox = path.resolve("./src/templates/light-box-youtube.js");

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
		createPage({
			path: `/${post.node.slug}/`,
			component:
				post.node.slug == "lightbox-for-youtube-videos" ? lightbox : blogPost,
			context: {
				slug: post.node.slug
			}
		});
	});
};
