var path = require("path");

module.exports = function(grunt) {
	grunt.initConfig({
		copy: {
			bootstrap: {
				files: [{
					expand: true,
					cwd: "bower_components/bootstrap/less/",
					src: ["**/*.less"],
					dest: "contents/vendor/bootstrap/less/"
				}, {
					expand: true,
					cwd: "bower_components/bootstrap/fonts/",
					src: ["*.*"],
					dest: "contents/vendor/bootstrap/fonts/"
				}]
			},
			bootswatch: {
				expand: true,
				cwd: "bower_components/bootswatch/lumen/",
				src: ["*.less"],
				dest: "contents/vendor/bootswatch/"
			}
		},
		metalsmith: {
			options: {
				metadata: {
					id: "541c5e94-6748-4c23-babe-3a1953e2e4da",
					url: "http://chadly.net/",
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
						"helpers": {
							"css": require("./helpers/css"),
							"date": require("./helpers/date"),
							"domain": require("./helpers/domain"),
							"log": require("./helpers/log"),
							"nav": require("./helpers/nav"),
							"projects": require("./helpers/projects"),
							"resume": require("./helpers/resume"),
							"slugify": require("./helpers/slugify"),
							"stylize": require("./helpers/stylize"),
							"unslash": require("./helpers/unslash")
						}
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

	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-metalsmith");
	grunt.loadNpmTasks("grunt-contrib-connect");

	grunt.registerTask("default", ["copy", "metalsmith"]);
	grunt.registerTask("preview", ["default", "connect"]);

	console.log(require("path").join(__dirname, "contents/css/"));
};
