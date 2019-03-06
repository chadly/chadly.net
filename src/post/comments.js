import React from "react";
import injectSheet from "react-jss";

import { rhythm, scale } from "../theme/typography";

const Comments = ({ comments }) => {
	if (!comments || !comments.length) return null;

	console.log(comments);

	return (
		<ol>
			{comments.map(c => (
				<li key={c.id}>
					<img
						src={`https://disqus.com/api/users/avatars/${
							c.author.username
						}.jpg`}
						alt={c.author.name}
					/>
					<h4>{c.author.name}</h4>
					<time dateTime={c.createdAt}>{c.createdAt}</time>
					<div
						dangerouslySetInnerHTML={{
							__html: c.message
						}}
					/>

					<Comments comments={c.comments} />
				</li>
			))}
		</ol>
	);
};

const styles = {};

export default injectSheet(styles)(Comments);
