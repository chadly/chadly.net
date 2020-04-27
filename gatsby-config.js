/* eslint-disable import/no-commonjs */
require("dotenv").config();

const calculateCanonicalUrl = require("./src/canonical/calculate");

const { NODE_ENV, CONTEXT: NETLIFY_ENV = NODE_ENV } = process.env;

const siteMetadata = {
	title: "chadly.net",
	description: "Personal blog by Chad Lee",
	siteUrl: "https://www.chadly.net",
	webMentionIoUsername: "www.chadly.net",
	githubLink: "https://github.com/chadly/chadly.net"
};

const gatsbyRemarkPlugins = [
	"gatsby-remark-copy-linked-files",
	"gatsby-remark-autolink-headers",
	"gatsby-remark-smartypants",
	"@weknow/gatsby-remark-twitter",
	"gatsby-remark-vscode",
	{
		resolve: "gatsby-remark-images",
		options: {
			maxWidth: 833, // max width of content container in px
			linkImagesToOriginal: false
		}
	}
];

const plugins = [
	"gatsby-plugin-sharp",
	"gatsby-plugin-favicon",
	{
		resolve: "gatsby-plugin-mdx",
		options: {
			gatsbyRemarkPlugins
		}
	},
	{
		resolve: "gatsby-transformer-remark",
		options: {
			plugins: gatsbyRemarkPlugins
		}
	},
	"gatsby-plugin-catch-links",
	"gatsby-plugin-react-helmet",
	{
		resolve: "gatsby-plugin-typography",
		options: {
			pathToConfigModule: "src/theme/typography"
		}
	},
	{
		resolve: "gatsby-source-filesystem",
		options: {
			name: "posts",
			path: `${__dirname}/content/posts`
		}
	},
	{
		resolve: "gatsby-source-disqus-xml",
		options: {
			filePath: `${__dirname}/content/disqus.xml`
		}
	},
	"gatsby-plugin-jss",
	"gatsby-plugin-sitemap",
	{
		resolve: "gatsby-plugin-robots-txt",
		options: {
			resolveEnv: () => NETLIFY_ENV,
			env: {
				production: {
					policy: [{ userAgent: "*" }]
				},
				"branch-deploy": {
					policy: [{ userAgent: "*", disallow: ["/"] }],
					sitemap: null,
					host: null
				},
				"deploy-preview": {
					policy: [{ userAgent: "*", disallow: ["/"] }],
					sitemap: null,
					host: null
				}
			}
		}
	},
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
					serialize: ({ query: { site, allMdx } }) => {
						return allMdx.edges.map(
							({
								node: {
									frontmatter: { id, title, date },
									fields: { slug },
									excerpt
								}
							}) => {
								const url = calculateCanonicalUrl({
									siteUrl: site.siteMetadata.siteUrl,
									slug: slug
								});

								return {
									title,
									description: excerpt,
									date,
									url,
									guid: id
								};
							}
						);
					},
					query: `
					{
						allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
							edges {
								node {
									frontmatter {
										id
										title
										date(formatString: "YYYY-MM-DD")
									}
									fields {
										slug
									}
									excerpt
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

if (process.env.WEBMENTIONS_TOKEN) {
	plugins.push({
		resolve: "gatsby-plugin-webmention",
		options: {
			username: siteMetadata.webMentionIoUsername,
			mentions: true,
			pingbacks: true,
			identity: {},
			domain: siteMetadata.webMentionIoUsername,
			token: process.env.WEBMENTIONS_TOKEN
		}
	});
}

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
