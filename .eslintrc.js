module.exports = {
	extends: ["@growflow"],
	parserOptions: {
		project: "tsconfig.json", // if using typescript
	},
	ignorePatterns: [
		"public",
		"static",
		"content/posts/lightbox-for-youtube-videos",
	],
};
