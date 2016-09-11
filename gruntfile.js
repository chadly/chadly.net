var path = require("path");

module.exports = function(grunt) {
	grunt.initConfig({
		metalsmith: {
			options: {
				metadata: {
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
				},
				plugins: {
					"metalsmith-collections": {
						posts: {
							pattern: "posts/**/*.md",
							sortBy: "date",
							reverse: true
						}
					},
					"metalsmith-markdown": {
						"smartypants": true,
						"smartLists": true
					},
					"metalsmith-less": {
						pattern: [
							"css/main.less",
							"css/resume.less"
						],
						parse: {
							paths: ["contents/css/"]
						}
					},
					"metalsmith-permalinks": {
						pattern: ":date/:title",
						date: "YYYY/MM"
					},
					"metalsmith-templates": {
						engine: "handlebars",
						partials: {
							"header": "header",
							"footer": "footer"
						},
						helpers: require("./helpers")
					}
				}
			},
			build: {
				src: "contents",
				dest: "build"
			}
		},
		connect: {
			options: {
				port: 1337,
				base: "build"
			},
			persist: {
				options: {
					keepalive: true,
					open: "http://localhost:1337/"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-metalsmith");
	grunt.loadNpmTasks("grunt-contrib-connect");

	grunt.registerTask("default", ["metalsmith"]);
	grunt.registerTask("preview", ["default", "connect"]);
};
