module.exports = function () {
	if (this.nav === "resume") {
		return 'resume.css';
	}

	return "main.css";
};