import React from "react";
import injectSheet from "react-jss";
import { rhythm, scale } from "../../theme/typography";

const TwitterIntents = ({ twitterId, classes }) => {
	if (!twitterId) return null;

	return (
		<ul className={classes.root}>
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
	);
};

const styles = {
	root: {
		textAlign: "right",
		"& li": {
			display: "inline-block",
			margin: `0 ${rhythm(0.2)}`,
			...scale(-0.2)
		}
	}
};

export default injectSheet(styles)(TwitterIntents);
