var path = require("path");

module.exports = function (grunt) {
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
					url: "http://chadly.net",
					author: {
						name: "Chad Lee",
						tagline: "Software Developer. Sometimes I write stuff.",
						link: "https://plus.google.com/+ChadLee?rel=author"
					},
					disqus: "chadlynet",
					analytics: {
						"id": "UA-636144-7",
						"domain": "chadly.net"
					}
				},
				plugins: {
					"metalsmith-markdown": {
						"smartypants": true,
						"smartLists": true
					},
					"metalsmith-templates": {
						engine: "handlebars"
					}
				}
			},
			build: {
				src: "contents",
				dest: "build"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-metalsmith");

	grunt.registerTask("dev", ["copy", "wintersmith:preview"]);
	grunt.registerTask("dist", ["copy", "wintersmith:build"]);
	grunt.registerTask("default", ["dev"]);
};
