import React from "react";
import injectSheet from "react-jss";

import TwitterIntents from "./twitter";
import Comments from "./comments";
import Likes from "./likes";

import { rhythm } from "../../theme/typography";

const Feedback = ({ twitterId, likes, comments, classes }) => (
	<div className={classes.root}>
		<TwitterIntents twitterId={twitterId} />
		<Likes likes={likes} />
		<Comments comments={comments} />
	</div>
);

const styles = {
	root: {
		borderTop: "1px solid var(--hr)",
		paddingTop: rhythm(0.5),
		marginTop: rhythm(1)
	}
};

export default injectSheet(styles)(Feedback);
