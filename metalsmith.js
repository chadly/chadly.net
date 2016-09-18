import Metalsmith from "metalsmith";
import collections from "metalsmith-collections";
import markdown from "./markdown";
import less from "metalsmith-less";
import permalinks from "metalsmith-permalinks";
import reactTemplates from "metalsmith-react-templates";
import templates from "metalsmith-templates";

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
			sortBy: "created",
			reverse: true
		}
	}))
	.use(markdown)
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
		pattern: ":created/:title",
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
	.build(err => {
		if (err) throw err;
	});