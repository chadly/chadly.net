module.exports = function () {
	if (this.page.metadata.nav === "resume") {
		return 'resume.css';
	}

	return "main.css";
};