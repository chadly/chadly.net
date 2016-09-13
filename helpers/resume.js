module.exports = function (contents, options) {
	var experience = [];

	for (var exp in contents.resume.experience) {
		experience.push(contents.resume.experience[exp]);
	}

	experience.sort(function (a, b) {
		return a.metadata.sort - b.metadata.sort;
	});
	
	var out = "";
	experience.forEach(function (exp) {
		out += options.fn(exp);
	});

	return out;
};