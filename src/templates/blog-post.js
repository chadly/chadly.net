import React from "react";
import { graphql } from "gatsby";

// import Bio from '../components/Bio'
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";

import { get } from "lodash";

const BlogPostTemplate = ({ data, location }) => {
	const post = get(data, "contentfulBlogPost");
	const siteTitle = get(data, "site.siteMetadata.title");

	return (
		<Layout location={location} title={siteTitle}>
			<SEO title={`${post.title} | ${siteTitle}`} description={post.tagLine} />

			<h1>{post.title}</h1>
			<p
				style={{
					...scale(-1 / 5),
					display: `block`,
					marginBottom: rhythm(1),
					marginTop: rhythm(-1)
				}}
			>
				{post.publishDate}
			</p>
			<div
				dangerouslySetInnerHTML={{
					__html: post.body.childMarkdownRemark.html
				}}
			/>
			<hr
				style={{
					marginBottom: rhythm(1)
				}}
			/>
			{/* <Bio /> */}
		</Layout>
	);
};

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		contentfulBlogPost(slug: { eq: $slug }) {
			title
			publishDate(formatString: "MMMM Do, YYYY")
			body {
				childMarkdownRemark {
					html
				}
			}
		}
	}
`;
