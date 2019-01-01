import React from "react";
import { graphql } from "gatsby";

// import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";

import PostStub from "../post/stub";

import { get } from "lodash";

const RootIndex = ({ data, location }) => {
	const siteTitle = get(data, "site.siteMetadata.title");
	const posts = get(data, "allContentfulBlogPost.edges");
	// const [author] = get(data, "allContentfulPerson.edges");

	return (
		<Layout location={location} title={siteTitle}>
			<SEO
				title="All posts"
				keywords={[`blog`, `gatsby`, `javascript`, `react`]}
			/>
			{/* <Bio /> */}
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
	}
`;
