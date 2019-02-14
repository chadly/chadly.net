import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import Post from "../../post";

const LightboxYoutubePost = props => (
	<>
		<Helmet>
			<link rel="stylesheet" type="text/css" href="fancy.css" />
			<script type="text/javascript" src="main.js" />
		</Helmet>
		<Post {...props} />;
	</>
);

export default LightboxYoutubePost;

export const pageQuery = graphql`
	query LightboxYoutubePost($slug: String!) {
		site {
			siteMetadata {
				disqus
				siteUrl
				githubLink
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				id
				title
				date
				dateFormatted: date(formatString: "MMMM DD, YYYY")
			}
			fields {
				slug
			}
			html
			excerpt
			fields {
				readingTime {
					text
				}
			}
			fileAbsolutePath
		}
	}
`;
