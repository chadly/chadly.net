import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import injectSheet from "react-jss";

import { rhythm } from "../typography";

import "./prism.css";
import "./bs-alerts.css";

const Layout = ({ children, classes }) => {
	return (
		<StaticQuery
			query={layoutQuery}
			render={({
				site: {
					siteMetadata: { title }
				}
			}) => (
				<div className={classes.container}>
					<Helmet>
						<link
							rel="stylesheet"
							href="https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css"
						/>
					</Helmet>

					<h1 className={classes.siteTitle}>
						<Link to={`/`}>{title}</Link>
					</h1>

					{children}

					<footer>
						© 2018, Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
					</footer>
				</div>
			)}
		/>
	);
};

const styles = {
	container: {
		marginLeft: `auto`,
		marginRight: `auto`,
		maxWidth: rhythm(24),
		padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
	},
	siteTitle: {
		"& a": {
			boxShadow: `none`,
			textDecoration: `none`,
			color: `inherit`
		}
	}
};

export default injectSheet(styles)(Layout);

const layoutQuery = graphql`
	query LayoutQuery {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
