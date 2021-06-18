import { Link } from "gatsby";
import React from "react";
import { createUseStyles } from "react-jss";

import { rhythm, scale } from "../theme";

const PostStub = ({
	title,
	description,
	date,
	dateFormatted,
	url,
	timeToRead,
	isExternal
}) => {
	const classes = useStyles();

	return (
		<article className={`h-entry ${classes.post}`}>
			<h4 className={classes.headline}>
				<PostLink url={url} isExternal={isExternal} className="u-url p-name">
					{title}
				</PostLink>
			</h4>
			<div className={classes.meta}>
				<time dateTime={date} className="dt-published">
					{dateFormatted}
				</time>
				{timeToRead ? <span>{`${timeToRead} min read`}</span> : null}
			</div>

			{description ? (
				<p className={classes.description}>{description}</p>
			) : null}
		</article>
	);
};

const PostLink = ({ url, isExternal, ...props }) => {
	if (isExternal) {
		return <a href={url} {...props} />;
	}

	return <Link to={url} {...props} />;
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
