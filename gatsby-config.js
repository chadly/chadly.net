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
		title: "Chad Lee",
		description: "hello",
		author: "Chad",
		siteUrl: "https://www.chadly.net"
	},
	plugins: [
		"gatsby-plugin-sharp",
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: ["gatsby-remark-prismjs", "gatsby-remark-reading-time"]
			}
		},
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
