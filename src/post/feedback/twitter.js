import React from "react";
import { createUseStyles } from "react-jss";
import { rhythm, scale } from "../../theme";

import SvgIcon from "../../icon";
import ReplyIcon from "./reply.svg";
import RetweetIcon from "./retweet.svg";
import HeartIcon from "./heart.svg";
import TwitterIcon from "../../author/twitter.svg";

const TwitterIntents = ({ twitterId }) => {
	const classes = useStyles();

	if (!twitterId) return null;

	return (
		<ul className={classes.list}>
			<li className={classes.twitter} title="Twitter">
				<SvgIcon>
					<TwitterIcon />
				</SvgIcon>
			</li>
			<li>
				<a
					href={`https://twitter.com/intent/tweet?in_reply_to=${twitterId}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<SvgIcon>
						<ReplyIcon />
					</SvgIcon>{" "}
					Reply
				</a>
			</li>
			<li>
				<a
					href={`https://twitter.com/intent/retweet?tweet_id=${twitterId}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<SvgIcon>
						<RetweetIcon />
					</SvgIcon>{" "}
					Repost
				</a>
			</li>
			<li>
				<a
					href={`https://twitter.com/intent/favorite?tweet_id=${twitterId}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<SvgIcon>
						<HeartIcon />
					</SvgIcon>{" "}
					Like
				</a>
			</li>
		</ul>
	);
};

const useStyles = createUseStyles({
	list: {
		textAlign: "right",

		"& li": {
			display: "inline-block",
			margin: `0 ${rhythm(0.2)}`,
			...scale(-0.3)
		}
	},
	twitter: {
		color: "#1c9ceb"
	},
	desc: {
		color: "var(--textMuted)",
		...scale(-0.3)
	}
});

export default TwitterIntents;
