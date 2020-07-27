import React from "react";
import { createUseStyles } from "react-jss";
import { rhythm, scale } from "../../theme";

const TwitterIntents = ({ twitterId }) => {
	const classes = useStyles();

	if (!twitterId) return null;

	return (
		<div className={classes.root}>
			<ul className={classes.list}>
				<li>
					<a
						href={`https://twitter.com/intent/tweet?in_reply_to=${twitterId}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<i className="fas fa-reply" /> Reply
					</a>
				</li>
				<li>
					<a
						href={`https://twitter.com/intent/retweet?tweet_id=${twitterId}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<i className="fas fa-retweet" /> Repost
					</a>
				</li>
				<li>
					<a
						href={`https://twitter.com/intent/favorite?tweet_id=${twitterId}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<i className="fas fa-heart" /> Like
					</a>
				</li>
			</ul>

			<span className={classes.desc}>on Twitter</span>
		</div>
	);
};

const useStyles = createUseStyles({
	root: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "baseline"
	},
	list: {
		"& li": {
			display: "inline-block",
			margin: `0 ${rhythm(0.2)}`,
			...scale(-0.2)
		}
	},
	desc: {
		color: "var(--textMuted)",
		fontSize: "0.75rem"
	}
});

export default TwitterIntents;
