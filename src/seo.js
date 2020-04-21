import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import AuthorPhoto from "./author/me.jpg";

import Uri from "urijs";
import { get } from "lodash";

const Seo = ({ title, description }) => {
	const data = useStaticQuery(graphql`
		query DefaultSEOQuery {
			site {
				siteMetadata {
					siteUrl
					title
					description
					author {
						name
						twitter
					}
				}
			}
		}
	`);

	const siteUrl = get(data, "site.siteMetadata.siteUrl");
	const siteTitle = get(data, "site.siteMetadata.title");
	const siteDesc = get(data, "site.siteMetadata.description");
	const author = get(data, "site.siteMetadata.author");
	const authorName = get(author, "name");

	title = title
		? `${title}${authorName ? ` | ${authorName}` : ""}`
		: `${siteTitle} | ${siteDesc}`;

	const desc = description || siteDesc;

	return (
		<Helmet htmlAttributes={{ lang: "en" }}>
			<title>{title}</title>

			<meta name="description" content={desc} />

			<meta property="og:title" content={title} />
			<meta property="og:type" content="website" />
			<meta property="og:description" content={desc} />

			<meta name="twitter:card" content="summary" />
			{get(author, "twitter") ? (
				<meta name="twitter:creator" content={`@${author.twitter}`} />
			) : null}
			<meta
				name="twitter:image"
				content={Uri(AuthorPhoto).origin(siteUrl).toString()}
			/>
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={desc} />
		</Helmet>
	);
};

export default Seo;
