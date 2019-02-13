/* eslint-disable import/no-commonjs */
const calculateCanonicalUrl = require("./src/canonical/calculate");

const {
	NODE_ENV,
	URL: NETLIFY_SITE_URL = "https://www.chadly.net",
	DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
	CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;

const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

const siteMetadata = {
	title: "chadly.net",
	description: "Personal blog by Chad Lee",
	siteUrl,
	disqus: process.env.DISQUS_SHORTNAME || "",
	author: {
		name: "Chad Lee",
		description: "Writer of code. Doer of things. Maker of stuff.",
		github: "chadly",
		twitter: "wchadly",
		keybase: "chadly"
	}
};

const plugins = [
	"gatsby-plugin-sharp",
	"gatsby-plugin-favicon",
	{
		resolve: "gatsby-transformer-remark",
		options: {
			plugins: [
				"gatsby-remark-copy-linked-files",
				"gatsby-remark-autolink-headers",
				"gatsby-remark-prismjs",
				"gatsby-remark-reading-time",
				"gatsby-remark-smartypants",
				{
					resolve: "gatsby-remark-images",
					options: {
						maxWidth: 833, // max width of content container in px
						linkImagesToOriginal: false
					}
				}
			]
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
			name: "pages",
			path: `${__dirname}/src/pages`
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
					serialize: ({ query: { site, allMarkdownRemark } }) => {
						return allMarkdownRemark.edges.map(
							({
								node: {
									frontmatter: { id, title, date },
									fields: { slug },
									excerpt,
									html
								}
							}) => {
								const url = calculateCanonicalUrl({
									siteUrl: site.siteMetadata.siteUrl,
									slug: slug
								});

								return {
									title,
									description: excerpt,
									date: date,
									url,
									guid: id,
									custom_elements: [
										{
											"content:encoded": html
										}
									]
								};
							}
						);
					},
					query: `
					{
						allMarkdownRemark(limit: 1000, sort: { fields: [frontmatter___date], order: DESC }) {
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
									html
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
