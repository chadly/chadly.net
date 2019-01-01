/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */

const path = require("path");

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	return new Promise((resolve, reject) => {
		const blogPost = path.resolve("./src/templates/blog-post.js");
		const lightbox = path.resolve("./src/templates/light-box-youtube.js");

		resolve(
			graphql(
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
			).then(result => {
				if (result.errors) {
					console.log(result.errors);
					reject(result.errors);
				}

				const posts = result.data.allContentfulBlogPost.edges;
				posts.forEach(post => {
					createPage({
						path: `/${post.node.slug}/`,
						component:
							post.node.slug == "lightbox-for-youtube-videos"
								? lightbox
								: blogPost,
						context: {
							slug: post.node.slug
						}
					});
				});
			})
		);
	});
};
