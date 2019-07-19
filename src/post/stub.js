import React from "react";
import { Link } from "gatsby";

import injectSheet from "react-jss";
import { rhythm, scale, smallScreenMediaQuery } from "../theme/typography";

import { calculate as calculateCanonicalUrl } from "../canonical";

const PostStub = ({
	post: {
		frontmatter: { title, date, dateFormatted },
		fields: { slug },
		timeToRead
	},
	commentCount,
	likeCount,
	repostCount,
	classes
}) => (
	<article className={`h-entry ${classes.post}`}>
		<time dateTime={date} className="dt-published">
			{dateFormatted}
		</time>
		<header>
			<Link to={calculateCanonicalUrl({ slug })} className="u-url p-name">
				{title}
			</Link>
		</header>

		<footer>
			<span>{`${timeToRead} min read`}</span>
			<FeedbackBadge
				count={commentCount}
				label="Comment"
				icon="fas fa-comments"
			/>
			<FeedbackBadge count={likeCount} label="Like" icon="fas fa-heart" />
			<FeedbackBadge count={repostCount} label="Repost" icon="fas fa-retweet" />
		</footer>
	</article>
);

const FeedbackBadge = ({ count, label, icon }) => {
	if (!count) return null;

	return (
		<span title={`${count} ${label}${count > 1 ? "s" : ""}`}>
			<i className={icon} /> {count}
		</span>
	);
};

const styles = {
	post: {
		marginTop: {
			top: rhythm(0.5),
			right: 0,
			bottom: 0,
			left: 0
		},
		[smallScreenMediaQuery]: {
			borderBottom: "1px solid var(--hr)",
			padding: {
				top: rhythm(0.25),
				bottom: rhythm(0.25),
				left: 0,
				right: 0
			}
		},
		"& time": {
			float: "left",
			color: "var(--textMuted)",
			[smallScreenMediaQuery]: {
				float: "none",
				display: "block"
			}
		},
		"& header": {
			marginLeft: rhythm(5),
			[smallScreenMediaQuery]: {
				marginLeft: 0
			}
		},
		"& footer": {
			color: "var(--textMuted)",
			margin: {
				left: rhythm(5),
				top: rhythm(-0.25)
			},
			...scale(-0.4),
			[smallScreenMediaQuery]: {
				marginLeft: 0
			},

			"& span": {
				display: "inline-block",
				marginRight: rhythm(0.5)
			}
		}
	}
};

export default injectSheet(styles)(PostStub);
