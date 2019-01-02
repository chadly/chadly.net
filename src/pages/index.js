import React from "react";
import { graphql } from "gatsby";

import Layout from "../layout";
import SEO from "../components/seo";

import Author from "../author";
import PostStub from "../post/stub";

import { get } from "lodash";

const RootIndex = ({ data }) => {
	const posts = get(data, "allContentfulBlogPost.edges");
	const [author] = get(data, "allContentfulPerson.edges");

	return (
		<Layout>
			<SEO />
			<Author author={author.node} />
			{posts.map(({ node }) => (
				<PostStub key={node.slug} {...node} />
			))}
		</Layout>
	);
};

export default RootIndex;

export const pageQuery = graphql`
	query HomeQuery {
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
		allContentfulPerson {
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
