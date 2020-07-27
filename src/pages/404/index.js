import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

import Layout from "../../layout";
import SiteHeader from "../../site-header";
import { rhythm } from "../../theme";

import img404 from "./oatmeal-tumbeast-404.png";

const NotFoundPage = () => {
	const classes = useStyles();

	return (
		<Layout>
			<Helmet>
				<title>Page Not Found</title>
			</Helmet>

			<SiteHeader />

			<main role="main">
				<Link to="/">
					<img
						src={img404}
						alt="404 Page Not Found"
						title="Go to the front page →"
						className={classes.image}
					/>
				</Link>
			</main>
		</Layout>
	);
};

const useStyles = createUseStyles({
	image: {
		display: "block",
		margin: `${rhythm(2)} auto`
	}
});

export default NotFoundPage;
