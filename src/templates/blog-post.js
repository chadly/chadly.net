import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

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

			{post.assets ? (
				<Helmet>
					{post.assets.map(ass => {
						if (ass.endsWith(".css")) {
							return (
								<link key={ass} rel="stylesheet" type="text/css" href={ass} />
							);
						}

						if (ass.endsWith(".js")) {
							return <script key={ass} type="text/javascript" src={ass} />;
						}
					})}
				</Helmet>
			) : null}

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
			assets
			body {
				childMarkdownRemark {
					html
				}
			}
		}
	}
`;
