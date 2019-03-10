/* eslint-disable import/no-commonjs */
require("dotenv").config();

const { NODE_ENV, CONTEXT: NETLIFY_ENV = NODE_ENV } = process.env;

const siteMetadata = {
	title: "chadly.net",
	description: "Personal blog by Chad Lee",
	siteUrl: "https://www.chadly.net",
	webMentionIoUsername: "www.chadly.net",
	githubLink: "https://github.com/chadly/chadly.net",
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
				"@weknow/gatsby-remark-twitter",
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
	"gatsby-redirect-from",
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
	{
		resolve: "gatsby-source-disqus-xml",
		options: {
			filePath: `${__dirname}/src/disqus.xml`
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
