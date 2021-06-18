import React, { FC } from "react";
import "./fancy.css";
import useScript from "../../../src/script";

const Lightbox: FC<{ href: string }> = ({ href, children }) => {
	useScript("./fancy.js");

	return (
		<a href={href} rel="fancyvideo">
			{children}
		</a>
	);
};

export default Lightbox;
