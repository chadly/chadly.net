import React, { Component } from "react";
import { graphql } from "gatsby";

import Post from "../../post";

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
	query KnockoutPost($slug: String!) {
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
