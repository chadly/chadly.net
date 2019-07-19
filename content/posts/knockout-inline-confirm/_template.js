import React, { Component } from "react";
import { graphql } from "gatsby";

import Post from "../../../src/post";

import ko from "knockout";
import "knockout-inline-confirm";

function ViewModel() {
	this.doit = function() {
		setTimeout(function() {
			alert("the thing is done!");
		}, 1000);
	};
}

class KnockoutInlineConfirmPost extends Component {
	componentDidMount() {
		ko.applyBindings(
			new ViewModel(),
			document.getElementById("knockout-confirm-demo")
		);
	}

	render() {
		return <Post {...this.props} />;
	}
}

export default KnockoutInlineConfirmPost;

export const pageQuery = graphql`
	query KnockoutPost($slug: String!, $threadId: String!) {
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
