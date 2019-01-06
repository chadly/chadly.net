import React from "react";
import injectSheet from "react-jss";
import { Link, graphql } from "gatsby";

import { scale } from "../../typography";

import img404 from "./oatmeal-tumbeast-404.png";

const NotFoundPage = ({
	data: {
		site: {
			siteMetadata: { title, description }
		}
	},
	classes
}) => (
	<div className={classes.container}>
		<h1 className={classes.siteTitle} title={description}>
			<Link to="/">{title}</Link>
		</h1>

		<Link to="/">
			<img
				src={img404}
				alt="404 Page Not Found"
				title="Go to the front page →"
				className={classes.image}
			/>
		</Link>
	</div>
);

const styles = {
	container: {
		textAlign: "center"
	},
	siteTitle: {
		border: "none",
		...scale(0.2),
		marginLeft: 60, // because of the img drop shadow, this doesn't look centered otherwise
		"@media (max-width:500px)": {
			// at smaller viewports, it doesn't look right
			marginLeft: 40
		},

		"& a": {
			boxShadow: `none`,
			textDecoration: `none`,
			color: `inherit`
		}
	}
};

export default injectSheet(styles)(NotFoundPage);

export const pageQuery = graphql`
	query NotFoundQuery {
		site {
			siteMetadata {
				title
				description
			}
		}
	}
`;
