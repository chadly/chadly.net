/* eslint-disable import/no-commonjs */
const uri = require("urijs");

module.exports = function calculateCanonicalUrl({ siteUrl, slug }) {
	if (!siteUrl && !slug) {
		return null;
	}

	if (!siteUrl && slug) {
		return appendSlashTo(slug);
	}

	if (siteUrl && !slug) {
		return appendSlashTo(siteUrl);
	}

	return uri(appendSlashTo(slug))
		.origin(siteUrl)
		.toString();
};

function appendSlashTo(val) {
	if (val.endsWith("/")) return val;
	return `${val}/`;
}
