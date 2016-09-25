module.exports = function (url) {
	if (url && !url.endsWith('/')) {
		return url + "/";
	}

	return url;
};