import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import { get } from "lodash";

const Seo = ({ lang, title, description, author }) => (
	<StaticQuery
		query={detailsQuery}
		render={data => {
			const siteTitle = get(data, "site.siteMetadata.title");
			const siteDesc = get(data, "site.siteMetadata.description");

			if (!author) {
				[author] = get(data, "allContentfulPerson.edges");
				author = get(author, "node");
			}

			title = title || `${siteTitle} | ${siteDesc}`;

			const desc = description || siteDesc;

			return (
				<Helmet htmlAttributes={{ lang }}>
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
							content={get(author, "image.file.url")}
						/>
					) : null}
					<meta name="twitter:title" content={title} />
					<meta name="twitter:description" content={desc} />
				</Helmet>
			);
		}}
	/>
);

Seo.defaultProps = {
	lang: "en"
};

export default Seo;

const detailsQuery = graphql`
	query DefaultSEOQuery {
		site {
			siteMetadata {
				title
				description
			}
		}
		allContentfulPerson {
			edges {
				node {
					name
					twitter
					image {
						file {
							url
						}
					}
				}
			}
		}
	}
`;
