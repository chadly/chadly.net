import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import Post from "../../../src/post";

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
	query LightboxYoutubePost($slug: String!, $threadId: String!) {
		site {
			siteMetadata {
				siteUrl
				githubLink
			}
		}
		mdx(fields: { slug: { eq: $slug } }) {
			frontmatter {
				id
				title
				date
				dateFormatted: date(formatString: "MMMM DD, YYYY")
			}
			fields {
				slug
			}
			body
			excerpt
			timeToRead
			fileAbsolutePath
		}
		disqusThread(threadId: { eq: $threadId }) {
			comments {
				id
				parentId
				author {
					name
					username
				}
				createdAt
				message
			}
		}
		allWebMentionEntry(filter: { fields: { slug: { eq: $slug } } }) {
			edges {
				node {
					id
					author {
						name
						photo
						url
					}
					url
					published
					wmTarget
					wmProperty
					content {
						text
					}
				}
			}
		}
	}
`;
