module.exports = function (contents, options) {
	var projects = [];

	for (var project in contents.projects) {
		if (project.indexOf(".md") > 0 && project !== "index.md") {
			projects.push(contents.projects[project]);
		}
	}

	projects.sort(function (a, b) {
		return a.metadata.sort - b.metadata.sort;
	});

	var out = "";
	projects.forEach(function (post) {
		out += options.fn(post);
	});

	return out;
};