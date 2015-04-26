module.exports = function () {
	if (this.page.metadata.title == this.author.name) {
		return this.page.metadata.title;
	}

	return this.page.metadata.title + " - "	+ this.author.name;
};
