var path = require("path");

module.exports = function (item) {
	if (item.filepath && item.filepath.full) {
		//get the part of the directory name that corresponds with the slug of the post
		var parts = path.dirname(item.filepath.full).split(path.sep);
		return parts[parts.length - 1];
	}
};