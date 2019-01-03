/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */

let contentfulConfig;

try {
	// Load the Contentful config from the .contentful.json
	contentfulConfig = require("./.contentful");
} catch (_) {
	console.log("using contentful config from environment variables");
}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
	spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
	accessToken:
		process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
	throw new Error(
		"Contentful spaceId and the delivery token need to be provided."
	);
}

module.exports = {
	siteMetadata: {
		title: "chadly.net",
		description: "Personal blog by Chad Lee",
		author: {
			name: "Chad Lee",
			blurb:
				"Technical Lead at CivicSource.com, OSS developer, beginner dad, novice human.",
			social: {
				github: "chadly",
				twitter: "wchadly",
				keybase: "chadly"
			}
		},
		siteUrl: "https://www.chadly.net",
		disqus: process.env.DISQUS_SHORTNAME || ""
	},
	plugins: [
		"gatsby-plugin-sharp",
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					"gatsby-remark-autolink-headers",
					"gatsby-remark-prismjs",
					"gatsby-remark-reading-time"
				]
			}
		},
		"gatsby-plugin-catch-links",
		"gatsby-plugin-react-helmet",
		{
			resolve: "gatsby-plugin-typography",
			options: {
				pathToConfigModule: "src/typography"
			}
		},
		{
			resolve: "gatsby-source-contentful",
			options: contentfulConfig
		},
		"gatsby-plugin-jss",
		"gatsby-plugin-sitemap",
		"gatsby-plugin-robots-txt",
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
				{
					site {
						siteMetadata {
							title
							description
							siteUrl
							site_url: siteUrl
						}
					}
				}`,
				feeds: [
					{
						serialize: ({ query: { site, allContentfulBlogPost } }) => {
							return allContentfulBlogPost.edges.map(edge => {
								const url = `${site.siteMetadata.siteUrl}/${edge.node.slug}/`;

								return Object.assign({}, edge.node, {
									description: edge.node.body.childMarkdownRemark.excerpt,
									date: edge.node.publishDate,
									url,
									guid: url,
									custom_elements: [
										{
											"content:encoded": edge.node.body.childMarkdownRemark.html
										}
									]
								});
							});
						},
						query: `
						{
							allContentfulBlogPost(limit: 1000, sort: { fields: [publishDate], order: DESC }) {
								edges {
									node {
										title
										slug
										publishDate(formatString: "YYYY-MM-DD")
										body {
											childMarkdownRemark {
												excerpt
												html
											}
										}
									}
								}
							}
						}`,
						output: "/rss.xml",
						title: "Gatsby RSS Feed"
					}
				]
			}
		}
	]
};
