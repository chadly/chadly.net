import React, { useMemo } from "react";
import { graphql, Link } from "gatsby";

import { createUseStyles } from "react-jss";
import { rhythm } from "../theme";

import Layout from "../layout";
import Seo from "../seo";

import Author from "../author";
import PostStub from "../post/stub";

import { union, sortBy, reverse } from "lodash";

const HomePage = ({
	data: {
		allMdx: { posts },
		allPostsJson: { externalPosts }
	}
}) => {
	const classes = useStyles();

	const allPosts = useMemo(
		() =>
			reverse(
				sortBy(
					union(
						posts.map(
							({
								id,
								frontmatter: { title, description, date, dateFormatted },
								fields: { slug },
								timeToRead
							}) => ({
								id,
								title,
								description,
								date,
								dateFormatted,
								url: slug,
								timeToRead
							})
						),
						externalPosts.map(post => ({ ...post, isExternal: true }))
					),
					"date"
				)
			),
		[posts, externalPosts]
	);

	return (
		<Layout>
			<Seo type="website" />

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

					{allPosts.map(post => (
						<PostStub key={post.id} {...post} />
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

export default HomePage;

export const pageQuery = graphql`
	query BlogQuery {
		allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
			posts: nodes {
				id
				frontmatter {
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
		allPostsJson(sort: { fields: date, order: DESC }) {
			externalPosts: nodes {
				id
				title
				description
				date
				dateFormatted: date(formatString: "MMMM Do, YYYY")
				url
				timeToRead
			}
		}
	}
`;
