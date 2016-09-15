module.exports = function (url) {
	if (url.indexOf('http://') === 0) {
		url = url.substring(7);
	}

	if (url.indexOf('/') === (url.length - 1)) {
		url = url.substring(0, url.length - 1);
	}

	return url;
};