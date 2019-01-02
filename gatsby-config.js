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
		siteUrl: "https://www.chadly.net"
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
		"gatsby-plugin-robots-txt"
	]
};
