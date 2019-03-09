import React from "react";
import { graphql } from "gatsby";

import Layout from "../layout";
import Seo from "../seo";

import Author from "../author";
import PostStub from "../post/stub";
import CanonicalLink from "../canonical";

import { get } from "lodash";

const RootIndex = ({ data }) => {
	const posts = get(data, "allMarkdownRemark.edges");
	const siteUrl = get(data, "site.siteMetadata.siteUrl");

	return (
		<Layout width={24}>
			<Seo />
			<CanonicalLink siteUrl={siteUrl} />

			<main role="main" className={`h-feed`}>
				<Author />
				{posts.map(({ node: { id, ...post } }) => (
					<PostStub key={id} {...post} />
				))}
			</main>
		</Layout>
	);
};

export default RootIndex;

export const pageQuery = graphql`
	query HomeQuery {
		site {
			siteMetadata {
				siteUrl
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					id
					frontmatter {
						title
						date
						dateFormatted: date(formatString: "DD MMM YYYY")
					}
					fields {
						slug
						readingTime {
							text
						}
					}
				}
			}
		}
	}
`;
