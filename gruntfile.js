var path = require("path");

module.exports = function (grunt) {
	grunt.initConfig({
		copy: {
			bootstrap: {
				files: [{
					expand: true,
					cwd: "bower_components/bootstrap/less/",
					src: ["*.less"],
					dest: "contents/vendor/bootstrap/less/"
				}, {
					expand: true,
					cwd: "bower_components/bootstrap/dist/fonts/",
					src: ["*.*"],
					dest: "contents/vendor/bootstrap/fonts/"
				}]
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("dev", ["copy"]);
	grunt.registerTask("default", ["dev"]);
};