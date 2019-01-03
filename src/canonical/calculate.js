/* eslint-disable import/no-commonjs */

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

	return `${appendSlashTo(siteUrl)}${appendSlashTo(slug)}`;
};

function appendSlashTo(val) {
	if (val.endsWith("/")) return val;
	return `${val}/`;
}
