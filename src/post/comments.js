import React from "react";

const Comments = ({ shortName, url, id, title }) => {
	if (!shortName) return null;

	return (
		<>
			<hr />
			<span>oh hi, here are some comments</span>
			{/* <Disqus shortname={shortName} url={url} identifier={id} title={title} /> */}
		</>
	);
};

export default Comments;
