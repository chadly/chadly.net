import React from "react";
import { Link } from "gatsby";

import injectSheet from "react-jss";
import { rhythm, scale, smallScreenMediaQuery } from "../theme/typography";

import { calculate as calculateCanonicalUrl } from "../canonical";

const PostStub = ({
	frontmatter: { title, date, dateFormatted },
	fields: {
		slug,
		readingTime: { text: readingTime }
	},
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
			<span>{readingTime}</span>
		</footer>
	</article>
);

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
			}
		}
	}
};

export default injectSheet(styles)(PostStub);
