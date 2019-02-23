import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import injectSheet from "react-jss";

import moment from "moment";

import { rhythm, scale } from "./theme/typography";

const Layout = ({ children, classes }) => {
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
					{title} © {moment().format("YYYY")}
				</footer>
			</div>
		</div>
	);
};

const styles = {
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
	}
};

export default injectSheet(styles)(Layout);
