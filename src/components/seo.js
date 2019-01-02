import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

function SEO({ lang, meta, keywords, title }) {
	return (
		<StaticQuery
			query={detailsQuery}
			render={data => {
				return (
					<Helmet
						htmlAttributes={{
							lang
						}}
						title={
							title ||
							`${data.site.siteMetadata.title} | ${
								data.site.siteMetadata.description
							}`
						}
						meta={[
							{
								property: `og:title`,
								content: title
							},
							{
								property: `og:type`,
								content: `website`
							},
							{
								name: `twitter:card`,
								content: `summary`
							},
							{
								name: `twitter:creator`,
								content: data.site.siteMetadata.author.name
							},
							{
								name: `twitter:title`,
								content: title
							}
						]
							.concat(
								keywords.length > 0
									? { name: `keywords`, content: keywords.join(`, `) }
									: []
							)
							.concat(meta)}
					/>
				);
			}}
		/>
	);
}

SEO.defaultProps = {
	lang: `en`,
	meta: [],
	keywords: []
};

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.array,
	keywords: PropTypes.arrayOf(PropTypes.string),
	title: PropTypes.string
};

export default SEO;

const detailsQuery = graphql`
	query DefaultSEOQuery {
		site {
			siteMetadata {
				title
				description
				author {
					name
				}
			}
		}
	}
`;
