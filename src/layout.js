import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import { createUseStyles } from "react-jss";

import { rhythm, scale } from "./theme/typography";

const Layout = ({ children, ...props }) => {
	const classes = useStyles(props);

	const {
		site: {
			siteMetadata: { title, description }
		}
	} = useStaticQuery(graphql`
		query LayoutQuery {
			site {
				siteMetadata {
					title
					description
				}
			}
		}
	`);

	return (
		<div className={classes.root}>
			<h1 className={classes.siteTitle} title={description}>
				<Link to="/">{title}</Link>
			</h1>

			<div className={classes.container}>
				<Helmet>
					<link
						rel="stylesheet"
						href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
						integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
						crossOrigin="anonymous"
					/>
				</Helmet>

				{children}

				<footer className={classes.footer}>
					All content (except code snippets) licensed{" "}
					<a
						rel="license"
						href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en_US"
					>
						CC BY-NC-SA 4.0
					</a>
					. All code snippets licensed under{" "}
					<a
						rel="license"
						href="https://github.com/chadly/chadly.net/blob/master/LICENSE"
					>
						MIT License
					</a>
					.
					<br />
					<div className={classes.webring} title="Webrings are cool again">
						<a href="https://xn--sr8hvo.ws/%F0%9F%93%97%F0%9F%93%AD%F0%9F%90%AF/previous">
							←
						</a>
						🕸💍
						<a href="https://xn--sr8hvo.ws/%F0%9F%93%97%F0%9F%93%AD%F0%9F%90%AF/next">
							→
						</a>
					</div>
				</footer>
			</div>
		</div>
	);
};

const useStyles = createUseStyles({
	root: {
		color: "var(--textNormal)"
	},
	container: {
		marginLeft: `auto`,
		marginRight: `auto`,
		maxWidth: ({ width = 30 }) => rhythm(width),
		padding: `${rhythm(1.5)} ${rhythm(0.75)}`
	},
	siteTitle: {
		float: "left",
		border: "none",
		margin: 0,
		padding: `${rhythm(0.3)} ${rhythm(0.75)}`,
		...scale(0.2),

		"& a": {
			boxShadow: `none`,
			textDecoration: `none`,
			color: `inherit`
		}
	},
	footer: {
		borderTop: "1px solid var(--hr)",
		marginTop: rhythm(1),
		...scale(-0.5)
	},
	webring: {
		textAlign: "center"
	}
});

export default Layout;
