/* eslint-disable import/no-commonjs */
module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	globals: {
		location: "off"
	},
	extends: ["@runly"],
	rules: {
		"react/jsx-no-bind": "off"
	}
};
