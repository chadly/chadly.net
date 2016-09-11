var Metalsmith = require("metalsmith");
var collections = require("metalsmith-collections");
var markdown = require("metalsmith-markdown");
var less = require("metalsmith-less");
var permalinks = require("metalsmith-permalinks");
var templates = require("metalsmith-templates");

var templateHelpers = require("./helpers");

Metalsmith(__dirname)
	.source("contents")
	.destination("build")
	.metadata({
		id: "541c5e94-6748-4c23-babe-3a1953e2e4da",
		url: "http://chadly.net/",
		name: "chadly.net",
		author: {
			name: "Chad Lee",
			tagline: "Software Developer. Sometimes I write stuff.",
			link: "https://plus.google.com/+ChadLee?rel=author"
		},
		//disqus: "chadlynet",
		//analytics: {
		//	"id": "UA-636144-7",
		//	"domain": "chadly.net"
		//}
	})
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
	.use(templates({
		engine: "handlebars",
		partials: {
			"header": "header",
			"footer": "footer"
		},
		helpers: templateHelpers
	}))
	.build(function(err) {
		if (err) throw err;
	});