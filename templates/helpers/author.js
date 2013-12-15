module.exports = function (contents, name, options) {
	var author = contents.authors[name + '.json'];

	if (author) {
		return options.fn(author.metadata);
	}
};