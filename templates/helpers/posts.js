module.exports = function (contents, options) {
	var posts = [];

	for (var year in contents) {
		if (isInt(year)) {
			for (var month in contents[year]) {
				if (isInt(month)) {
					for (var name in contents[year][month]) {
						posts.push(contents[year][month][name].index);
					}
				}
			}
		}
	}

	posts.sort(function (a, b) {
		return b.date - a.date;
	});

	var out = "";
	posts.forEach(function (post) {
		out += options.fn(post);
	});

	return out;
};

function isInt(n) {
	return n % 1 == 0;
}