module.exports = function (url) {
	if (url.indexOf('http://') === 0) {
		return url.substring(7);
	}

	return url;
};