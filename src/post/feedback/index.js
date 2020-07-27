import React from "react";
import { createUseStyles } from "react-jss";

import TwitterIntents from "./twitter";
import Comments from "./comments";
import Likes from "./likes";
import Reposts from "./reposts";
import { rhythm } from "../../theme";

const Feedback = ({ likes, comments, reposts, twitterId }) => {
	const classes = useStyles();

	const any = likes.length || comments.length || reposts.length;
	if (!any) return null;

	return (
		<section className={classes.root}>
			<div className={classes.header}>
				<h3 className={classes.title}>Webmentions</h3>
				<p className={classes.subtitle}>
					<a href="https://indieweb.org/Webmention">What is this?</a>
				</p>
			</div>

			<TwitterIntents twitterId={twitterId} />
			<Likes likes={likes} />
			<Reposts reposts={reposts} />
			<Comments comments={comments} />
		</section>
	);
};

const useStyles = createUseStyles({
	root: {
		borderBottom: "1px solid var(--hr)"
	},
	header: {
		marginBottom: rhythm(1)
	},
	title: {
		textAlign: "center",
		margin: 0
	},
	subtitle: {
		textAlign: "center",
		margin: 0,

		"& a": {
			color: "var(--textMuted)",
			textDecoration: "underline",
			fontSize: "0.75rem"
		}
	}
});

export default Feedback;
