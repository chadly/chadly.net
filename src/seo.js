import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";

import { useStaticQuery, graphql } from "gatsby";

import AuthorPhoto from "./author/me.jpg";
import author from "./author/data";

import { get } from "lodash";

const Seo = ({ title, description, image, type }) => {
	const { pathname } = useLocation();

	const {
		site: {
			siteMetadata: { siteUrl, title: siteTitle, description: siteDesc }
		}
	} = useStaticQuery(graphql`
		query SeoQuery {
			site {
				siteMetadata {
					siteUrl
					title
					description
				}
			}
		}
	`);

	const authorName = get(author, "name");
	const twitter = get(author, "twitter");

	title = title
		? `${title}${authorName ? ` | ${authorName}` : ""}`
		: `${siteTitle} | ${siteDesc}`;

	const desc = description || siteDesc;

	const url = `${siteUrl}${pathname || "/"}`;
	const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}${AuthorPhoto}`;

	return (
		<Helmet htmlAttributes={{ lang: "en" }}>
			<link rel="canonical" href={url} />

			{title ? <title>{title}</title> : null}
			{description ? <meta name="description" content={desc} /> : null}
			{imageUrl ? <meta name="image" content={imageUrl} /> : null}

			{url ? <meta property="og:url" content={url} /> : null}
			{type ? <meta property="og:type" content={type} /> : null}
			{imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
			{title ? <meta property="og:title" content={title} /> : null}
			{description ? (
				<meta property="og:description" content={description} />
			) : null}

			<meta name="twitter:card" content="summary_large_image" />
			{twitter ? <meta name="twitter:creator" content={`@${twitter}`} /> : null}
			{title ? <meta name="twitter:title" content={title} /> : null}
			{description ? (
				<meta name="twitter:description" content={description} />
			) : null}
			{imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}
		</Helmet>
	);
};

export default Seo;
