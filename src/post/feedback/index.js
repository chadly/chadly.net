import React from "react";
import { createUseStyles } from "react-jss";

import Comments from "./comments";
import Likes from "./likes";
import Reposts from "./reposts";

const Feedback = ({ likes, comments, reposts }) => {
	const classes = useStyles();

	const any = likes.length || comments.length || reposts.length;
	if (!any) return null;

	return (
		<div className={classes.root}>
			<Likes likes={likes} />
			<Reposts reposts={reposts} />
			<Comments comments={comments} />
		</div>
	);
};

const useStyles = createUseStyles({
	root: {
		borderBottom: "1px solid var(--hr)"
	}
});

export default Feedback;
