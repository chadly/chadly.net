var Metalsmith = require("metalsmith");
var collections = require("metalsmith-collections");
var markdown = require("metalsmith-markdown");
var less = require("metalsmith-less");
var permalinks = require("metalsmith-permalinks");
var reactTemplates = require("metalsmith-react-templates");
var templates = require("metalsmith-templates");

const isProd = process.argv.length >= 3 && process.argv[2] === "dist";

let metadata = require("./site.dev.json");
metadata = isProd ? Object.assign({}, metadata, require("./site.prod.json")) : metadata;

Metalsmith(__dirname)
	.source("contents")
	.destination("build")
	.metadata(metadata)
	.use(collections({
		posts: {
			pattern: "posts/**/*.md",
			sortBy: "date",
			reverse: true
		}
	}))
	.use(markdown({
		smartypants: true,
		smartLists: true
	}))
	.use(less({
		pattern: [
			"css/main.less",
			"css/resume.less"
		],
		render: {
			paths: [
				"contents/css/",
				"node_modules"
			]
		}
	}))
	.use(permalinks({
		pattern: ":date/:title",
		date: "YYYY/MM"
	}))
	.use(reactTemplates({
		directory: "templates",
		defaultTemplate: null
	}))
	.use(templates({
		engine: "handlebars",
		helpers: require("./helpers")
	}))
	.build(function(err) {
		if (err) throw err;
	});