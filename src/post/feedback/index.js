import React from "react";
import { createUseStyles } from "react-jss";

import TwitterIntents from "./twitter";
import Comments from "./comments";
import Likes from "./likes";
import Reposts from "./reposts";

import { rhythm } from "../../theme/typography";

const Feedback = ({ twitterId, likes, comments, reposts }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<TwitterIntents twitterId={twitterId} />
			<Likes likes={likes} />
			<Reposts reposts={reposts} />
			<Comments comments={comments} />
		</div>
	);
};

const useStyles = createUseStyles({
	root: {
		borderTop: "1px solid var(--hr)",
		paddingTop: rhythm(0.5),
		marginTop: rhythm(1)
	}
});

export default Feedback;
