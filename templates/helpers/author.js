module.exports = function (contents, name, options) {
	var author = contents.authors[name + '.md'];

	if (author) {
		return options.fn(author);
	}
};