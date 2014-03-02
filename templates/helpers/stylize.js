module.exports = function (thing) {
	var parts = thing.split(' ');
	if (parts.length !== 2) {
		return thing;
	}

	return parts[0] + "<strong>" + parts[1] + "</strong>";
};