/* eslint-disable import/no-commonjs */
require("dotenv").config();

require("@babel/register")({
	presets: [
		[
			"@babel/env",
			{
				targets: {
					node: "current"
				}
			}
		]
	]
});

const { massageList } = require("./src/post/data");

const { NODE_ENV, CONTEXT: NETLIFY_ENV = NODE_ENV } = process.env;

const siteMetadata = {
	siteUrl: "https://www.chadly.net",
	webMentionIoUsername: "www.chadly.net",
	domain: "chadly.net"
};

const gatsbyRemarkPlugins = [
	"gatsby-remark-copy-linked-files",
	"gatsby-remark-autolink-headers",
	"gatsby-remark-smartypants",
	"@weknow/gatsby-remark-twitter",
	"gatsby-remark-lottie",
	{
		resolve: "gatsby-remark-vscode",
		options: {
			injectStyles: false
		}
	},
	{
		resolve: "gatsby-remark-images",
		options: {
			maxWidth: 833, // max width of content container in px
			linkImagesToOriginal: false,
			showCaptions: true
		}
	}
];

const plugins = [
	"gatsby-plugin-sharp",
	{
		resolve: "gatsby-plugin-favicon",
		options: {
			logo: "./content/favicon.png"
		}
	},
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
	"gatsby-transformer-json",
	"gatsby-transformer-sharp",
	"gatsby-plugin-catch-links",
	"gatsby-plugin-react-helmet",
	{
		resolve: "gatsby-plugin-typography",
		options: {
			pathToConfigModule: "src/theme"
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
		resolve: "gatsby-source-filesystem",
		options: {
			name: "external",
			path: `${__dirname}/content/external`
		}
	},
	{
		resolve: "gatsby-source-filesystem",
		options: {
			name: "author",
			path: `${__dirname}/content/author`
		}
	},
	{
		resolve: "gatsby-source-filesystem",
		options: {
			name: "projects",
			path: `${__dirname}/content/projects`
		}
	},
	{
		resolve: "gatsby-source-disqus-xml",
		options: {
			filePath: `${__dirname}/content/disqus.xml`
		}
	},
	"gatsby-plugin-jss",
	"gatsby-plugin-dark-mode",
	"gatsby-plugin-sitemap",
	"gatsby-plugin-react-svg",
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
						siteUrl
						site_url: siteUrl
					}
				}
				file(sourceInstanceName: { eq: "author" }, extension: { eq: "mdx" }) {
					childMdx {
						author: frontmatter {
							name
							description
						}
					}
				}
			}`,
			feeds: [
				{
					serialize: ({
						query: {
							site,
							postFiles: { posts },
							externalPostFiles: { externalPosts }
						}
					}) =>
						massageList({ posts, externalPosts }).map(post => ({
							guid: post.id,
							title: post.title,
							description: post.description,
							date: post.date,
							url: post.url.startsWith("http")
								? post.url
								: `${site.siteMetadata.siteUrl}${post.url}`
						})),
					query: `
					{
						postFiles: allFile(
							filter: { sourceInstanceName: { eq: "posts" }, extension: { eq: "mdx" } }
						) {
							posts: nodes {
								childMdx {
									frontmatter {
										id
										title
										description
										date
									}
									fields {
										slug
									}
									excerpt
								}
							}
						}
						externalPostFiles: allPostsJson(sort: { fields: date, order: DESC }) {
							externalPosts: nodes {
								postId
								title
								description
								date
								url
							}
						}
					}`,
					output: "/rss.xml",
					title: "Chad Lee"
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

if (NETLIFY_ENV === "production") {
	plugins.push({
		resolve: "gatsby-plugin-plausible",
		options: {
			trackingId: siteMetadata.domain
		}
	});
}

plugins.push("gatsby-plugin-netlify"); // needs to be last

module.exports = { siteMetadata, plugins };
