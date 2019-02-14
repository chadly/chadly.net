import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import { get } from "lodash";

const Seo = ({ title, description }) => (
	<StaticQuery
		query={detailsQuery}
		render={data => {
			const siteTitle = get(data, "site.siteMetadata.title");
			const siteDesc = get(data, "site.siteMetadata.description");
			const author = get(data, "site.siteMetadata.author");

			title = title || `${siteTitle} | ${siteDesc}`;

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
					{get(author, "image.file.url") ? (
						<meta
							name="twitter:image"
							content={conformMetaUrl(get(author, "image.file.url"))}
						/>
					) : null}
					<meta name="twitter:title" content={title} />
					<meta name="twitter:description" content={desc} />
				</Helmet>
			);
		}}
	/>
);

function conformMetaUrl(url) {
	if (url.startsWith("https:")) return url;
	if (url.startsWith("http:")) return url;
	return `https:${url}`;
}

export default Seo;

const detailsQuery = graphql`
	query DefaultSEOQuery {
		site {
			siteMetadata {
				title
				description
				author {
					name
					twitter
				}
			}
		}
	}
`;
