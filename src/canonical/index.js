import React from "react";
import { Helmet } from "react-helmet";
import calculate from "./calculate";

const CanonicalLink = ({ siteUrl, slug }) => {
	if (!siteUrl) {
		return null;
	}

	return (
		<Helmet>
			<link rel="canonical" href={calculate({ siteUrl, slug })} />
		</Helmet>
	);
};

export default CanonicalLink;

export { calculate };
