import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { createUseStyles } from "react-jss";

import { scale } from "./theme";

const SiteHeader = () => {
	const classes = useStyles();

	const {
		authorFile: {
			childMdx: {
				author: { name, description }
			}
		}
	} = useStaticQuery(graphql`
		query SiteHeaderQuery {
			authorFile: file(
				sourceInstanceName: { eq: "author" }
				extension: { eq: "mdx" }
			) {
				childMdx {
					author: frontmatter {
						name
						description
					}
				}
			}
		}
	`);

	return (
		<header className={classes.header}>
			<p className="c-title p-title">
				<Link to="/">{name}</Link>
			</p>
			<p className="p-subtitle">{description}</p>
		</header>
	);
};

const useStyles = createUseStyles({
	header: {
		textAlign: "center",

		"& .p-title": {
			...scale(1.2),
			marginBottom: 0,

			"& a": {
				boxShadow: `none`,
				textDecoration: `none`,
				color: `inherit`
			}
		},

		"& .p-subtitle": {
			margin: 0,
			...scale(-0.2),
			color: "var(--textMuted)"
		}
	}
});

export default SiteHeader;
