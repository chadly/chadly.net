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
		wintersmith: {
			build: {
				options: {
					action: "build",
					config: "prod.json"
				}
			},
			preview: {
				options: {
					action: "preview",
					config: "dev.json"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-wintersmith");

	grunt.registerTask("dev", ["copy", "wintersmith:preview"]);
	grunt.registerTask("dist", ["copy", "wintersmith:build"]);
	grunt.registerTask("default", ["dev"]);
};
