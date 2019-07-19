import React, { useEffect } from "react";
import "./fancy.css";

const Lightbox = ({ href, children }) => {
	useEffect(() => {
		if (global.window) {
			require("./fancy.js");
		}
	});

	return (
		<a href={href} rel="fancyvideo">
			{children}
		</a>
	);
};

export default Lightbox;
