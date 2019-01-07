/* eslint-disable import/no-commonjs */
require("dotenv").config();
const calculateCanonicalUrl = require("./src/canonical/calculate");

const contentfulConfig = {
	spaceId: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN
};

if (!contentfulConfig.spaceId || !contentfulConfig.accessToken) {
	throw new Error(
		"Contentful spaceId and the delivery token need to be provided."
	);
}

const siteMetadata = {
	title: "chadly.net",
	description: "Personal blog by Chad Lee",
	siteUrl: "https://www.chadly.net",
	disqus: process.env.DISQUS_SHORTNAME || ""
};

const plugins = [
	"gatsby-plugin-favicon",
	{
		resolve: "gatsby-transformer-remark",
		options: {
			plugins: [
				"gatsby-remark-autolink-headers",
				"gatsby-remark-prismjs",
				"gatsby-remark-reading-time",
				"gatsby-remark-smartypants"
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
							const url = calculateCanonicalUrl({
								siteUrl: site.siteMetadata.siteUrl,
								slug: edge.node.slug
							});

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
					title: siteMetadata.title
				}
			]
		}
	}
];

if (process.env.GOOGLE_ANALYTICS_TRACKING_ID) {
	plugins.push({
		resolve: "gatsby-plugin-google-analytics",
		options: {
			trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID
		}
	});
}

plugins.push("gatsby-plugin-netlify"); // needs to be last

module.exports = { siteMetadata, plugins };
