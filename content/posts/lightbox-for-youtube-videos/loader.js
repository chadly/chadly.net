import { useEffect } from "react";
import "./fancy.css";

const LegacyJsLoader = () => {
	useEffect(() => {
		if (global.window) {
			require("./fancy.js");
		}
	});

	return null;
};

export default LegacyJsLoader;
