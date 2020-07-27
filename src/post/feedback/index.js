import React from "react";
import { createUseStyles } from "react-jss";

import TwitterIntents from "./twitter";
import Comments from "./comments";
import Likes from "./likes";
import Reposts from "./reposts";
import { rhythm, scale } from "../../theme";

const Feedback = ({ likes, comments, reposts, twitterId }) => {
	const classes = useStyles();

	const any = likes.length || comments.length || reposts.length;

	if (!any)
		return (
			<div className={classes.root}>
				<div className={classes.header}>
					<h3 className={classes.title}>Send me a Webmention</h3>
					<p className={classes.subtitle}>
						<a href="https://indieweb.org/Webmention">What is this?</a>
					</p>
				</div>
			</div>
		);

	return (
		<section className={classes.root}>
			<div className={classes.header}>
				<p className={classes.title}>Webmentions</p>
				<p className={classes.subtitle}>
					<a href="https://indieweb.org/Webmention">What is this?</a>
				</p>
			</div>

			<TwitterIntents twitterId={twitterId} />

			<Likes likes={likes} className={classes.section} />
			<Reposts reposts={reposts} className={classes.section} />
			<Comments comments={comments} className={classes.section} />
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
		margin: 0,
		...scale(0.5),
		fontWeight: "bold"
	},
	subtitle: {
		textAlign: "center",
		margin: 0,

		"& a": {
			color: "var(--textMuted)",
			textDecoration: "underline",
			...scale(-0.3)
		}
	},
	section: {
		marginTop: rhythm(1)
	}
});

export default Feedback;
