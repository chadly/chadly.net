import React from "react";
import { Link } from "gatsby";

import { createUseStyles } from "react-jss";
import { rhythm, scale } from "../theme/typography";

import { calculate as calculateCanonicalUrl } from "../canonical";

const PostStub = ({
	post: {
		frontmatter: { title, description, date, dateFormatted },
		fields: { slug },
		timeToRead
	}
}) => {
	const classes = useStyles();

	return (
		<article className={`h-entry ${classes.post}`}>
			<h4 className={classes.headline}>
				<Link to={calculateCanonicalUrl({ slug })} className="u-url p-name">
					{title}
				</Link>
			</h4>
			<div className={classes.meta}>
				<time dateTime={date} className="dt-published">
					{dateFormatted}
				</time>
				<span>{`${timeToRead} min read`}</span>
			</div>

			{description ? (
				<p className={classes.description}>{description}</p>
			) : null}
		</article>
	);
};

const useStyles = createUseStyles({
	post: {},
	headline: {
		marginBottom: 0
	},

	meta: {
		color: "var(--textMuted)",
		...scale(-0.25),
		"& time": {
			display: "inline-block",
			marginRight: rhythm(0.5)
		}
	},

	description: {}
});

export default PostStub;
