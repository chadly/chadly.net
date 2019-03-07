import React from "react";
import Comments from "./comments";
import Likes from "./likes";

const Feedback = ({ twitterId, likes, comments }) => (
	<>
		<TwitterIntents twitterId={twitterId} />
		<Likes likes={likes} />
		<Comments comments={comments} />
	</>
);

const TwitterIntents = ({ twitterId }) => {
	if (!twitterId) return null;

	return (
		<div>
			Respond via Twitter:
			<a href={`https://twitter.com/intent/tweet?in_reply_to=${twitterId}`}>
				Reply
			</a>
			<a href={`https://twitter.com/intent/retweet?tweet_id=${twitterId}`}>
				Repost
			</a>
			<a href={`https://twitter.com/intent/favorite?tweet_id=${twitterId}`}>
				Like
			</a>
		</div>
	);
};

export default Feedback;
