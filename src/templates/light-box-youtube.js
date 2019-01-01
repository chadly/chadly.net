import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import BlogPost from "./blog-post";

const LightBoxYoutubeBlogPost = props => (
	<>
		<BlogPost {...props} />
		<Helmet>
			<link rel="stylesheet" type="text/css" href="fancy.css" />
			<script type="text/javascript" src="main.js" />
		</Helmet>
	</>
);

export default LightBoxYoutubeBlogPost;

export const pageQuery = graphql`
	query LightBoxBlogPostBySlug($slug: String!) {
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
