module.exports = function (url) {
	if (url.indexOf('/') === 0) {
		return url.substring(1);
	}

	return url;
};