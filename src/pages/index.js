import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Author from "../author";
import PostStub from "../post/stub";

import { get } from "lodash";

const RootIndex = ({ data, location }) => {
	const siteTitle = get(data, "site.siteMetadata.title");
	const posts = get(data, "allContentfulBlogPost.edges");
	const [author] = get(data, "allContentfulPerson.edges");

	return (
		<Layout location={location} title={siteTitle}>
			<SEO />
			<Author data={author.node} />
			{posts.map(({ node }) => (
				<PostStub key={node.slug} {...node} />
			))}
		</Layout>
	);
};

export default RootIndex;

export const pageQuery = graphql`
	query HomeQuery {
		site {
			siteMetadata {
				title
			}
		}
		allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
			edges {
				node {
					title
					slug
					publishDate(formatString: "YYYY-MM-DD")
					body {
						childMarkdownRemark {
							fields {
								readingTime {
									text
								}
							}
						}
					}
				}
			}
		}
		allContentfulPerson(
			filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
		) {
			edges {
				node {
					name
					shortBio {
						childMarkdownRemark {
							html
						}
					}
					github
					twitter
					keybase
					image {
						fixed(width: 100) {
							width
							height
							src
							srcSet
						}
					}
				}
			}
		}
	}
`;
