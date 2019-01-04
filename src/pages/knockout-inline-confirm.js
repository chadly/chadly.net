import React, { Component } from "react";
import { graphql } from "gatsby";

import Post from "../post";

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
	query KnockoutPost {
		site {
			siteMetadata {
				disqus
				siteUrl
			}
		}
		contentfulBlogPost(slug: { eq: "knockout-inline-confirm" }) {
			title
			publishDate
			assets
			body {
				childMarkdownRemark {
					html
					fields {
						readingTime {
							text
						}
					}
				}
			}
			author {
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
`;
