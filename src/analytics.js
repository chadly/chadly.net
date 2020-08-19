const track = (...p) => {
	if (window.plausible) {
		window.plausible(...p);
	}
};

export default track;
