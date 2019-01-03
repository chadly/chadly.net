import React from "react";
import Disqus from "react-disqus-comments";

const Comments = ({ shortName, url, id, title }) => {
	if (!shortName) return null;

	return (
		<>
			<hr />
			<Disqus shortname={shortName} url={url} identifier={id} title={title} />
		</>
	);
};

export default Comments;
