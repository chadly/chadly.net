import React from "react";
import Hero from "./hero";

const Entry = ({
	metadata: {
		author
	}
}) => {
	return (
		<Hero title={author.name} description={author.tagline} />
	);
};

module.exports = Entry;