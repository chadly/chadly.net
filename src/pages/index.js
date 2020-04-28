import React from "react";
import { graphql, Link } from "gatsby";

import { createUseStyles } from "react-jss";
import { rhythm } from "../theme/typography";

import Layout from "../layout";
import Seo from "../seo";

import Author from "../author";
import PostStub from "../post/stub";
import CanonicalLink from "../canonical";

import { get } from "lodash";

const RootIndex = ({ data }) => {
	const posts = get(data, "allMdx.edges", []);
	const siteUrl = get(data, "site.siteMetadata.siteUrl");

	const classes = useStyles();

	return (
		<Layout>
			<Seo />
			<CanonicalLink siteUrl={siteUrl} />

			<main role="main">
				<Author />

				<section className={classes.section}>
					<h2>Things I've Built</h2>

					<Item headline="Runly" href="https://www.runly.io/">
						The easiest way to deploy and scale your background jobs for .NET
						Core. Offload work from the web to create a snappy UX and a fault
						tolerant application.
					</Item>

					<Item
						headline="Geocoding.net"
						href="https://github.com/chadly/Geocoding.net"
					>
						C# GeoCoding / Address Validation API that integrates with five
						popular Geocoding providers. Perform address validation, real time
						mapping of user-entered addresses, distance calculations, and more.
					</Item>

					<Item
						headline="React Bootstrap Notifier"
						href="https://github.com/chadly/react-bs-notifier"
					>
						A react component to show growl-like notifications using bootstrap
						alerts. See a{" "}
						<a href="https://chadly.github.io/react-bs-notifier/">live demo</a>.
					</Item>
				</section>

				<section className={`h-feed ${classes.section}`}>
					<h2>Things I've Written</h2>

					{posts.map(({ node: { id, ...post } }) => (
						<PostStub key={id} post={post} />
					))}
				</section>
			</main>
		</Layout>
	);
};

const useStyles = createUseStyles({
	section: {
		marginTop: rhythm(3),
		"& article": {
			marginBottom: rhythm(1.5)
		},
		"& article:last-child": {
			marginBottom: 0
		}
	}
});

const Item = ({ headline, href, to, children }) => {
	const headlineText = to ? (
		<Link to={to}>{headline}</Link>
	) : href ? (
		<a href={href}>{headline}</a>
	) : (
		<>{headline}</>
	);

	return (
		<article>
			<h4>{headlineText}</h4>
			<p>{children}</p>
		</article>
	);
};

export default RootIndex;

export const pageQuery = graphql`
	query BlogQuery {
		site {
			siteMetadata {
				siteUrl
			}
		}
		allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					id
					frontmatter {
						id
						title
						description
						date
						dateFormatted: date(formatString: "MMMM Do, YYYY")
					}
					fields {
						slug
					}
					timeToRead
				}
			}
		}
	}
`;
