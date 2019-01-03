import React from "react";
import Disqus from "disqus-react";

const Comments = ({ shortName, url, id, title }) => {
	if (!shortName) return null;

	return (
		<>
			<hr />
			<Disqus.DiscussionEmbed
				shortname={shortName}
				config={{
					url,
					identifier: id,
					title
				}}
			/>
		</>
	);
};

export default Comments;
