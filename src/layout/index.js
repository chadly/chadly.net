import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import injectSheet from "react-jss";

import moment from "moment";

import { rhythm, scale, border } from "../typography";

import "./prism.css";
import "./bs-alerts.css";

const Layout = ({ children, classes }) => (
	<StaticQuery
		query={layoutQuery}
		render={({
			site: {
				siteMetadata: { title, description }
			}
		}) => (
			<>
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
						{title} © {moment().format("YYYY")}. Built with{" "}
						<a href="https://www.gatsbyjs.org">Gatsby</a> &amp;{" "}
						<a href="https://www.contentful.com/">Contentful</a>.
					</footer>
				</div>
			</>
		)}
	/>
);

const styles = {
	container: {
		marginLeft: `auto`,
		marginRight: `auto`,
		maxWidth: rhythm(24),
		padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
	},
	siteTitle: {
		float: "left",
		border: "none",
		margin: rhythm(0.3),
		...scale(0.2),

		"& a": {
			boxShadow: `none`,
			textDecoration: `none`,
			color: `inherit`
		}
	},
	footer: {
		borderTop: border,
		marginTop: rhythm(1),
		...scale(-0.5)
	}
};

export default injectSheet(styles)(Layout);

const layoutQuery = graphql`
	query LayoutQuery {
		site {
			siteMetadata {
				title
				description
			}
		}
	}
`;
