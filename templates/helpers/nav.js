module.exports = function (name) {
	if (this.page.metadata.nav === name) {
		return 'class="active"';
	}
};