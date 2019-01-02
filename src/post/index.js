import React from "react";
import { graphql } from "gatsby";
import injectSheet from "react-jss";
import moment from "moment";

import Assets from "./assets";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../typography";

import { get } from "lodash";

const BlogPostTemplate = ({ data, location, classes }) => {
	const post = get(data, "contentfulBlogPost");
	const siteTitle = get(data, "site.siteMetadata.title");

	const readingTime = get(
		post,
		"body.childMarkdownRemark.fields.readingTime.text"
	);
	const publishDate = moment(get(post, "publishDate"), "YYYY-MM-DD");

	return (
		<Layout location={location} title={siteTitle}>
			<SEO title={post.title} />
			<Assets assets={post.assets} />

			<header className={classes.postHeader}>
				<h1>{post.title}</h1>
				<div>
					<time
						dateTime={publishDate.format("YYYY-MM-DD")}
						itemProp="datePublished"
					>
						Published on {publishDate.format("MMMM DD, YYYY")}
					</time>

					<span className={classes.readingTime}>{readingTime}</span>
				</div>
			</header>

			<main role="main" className={classes.postBody}>
				<article itemScope itemType="http://schema.org/BlogPosting">
					<section
						itemProp="articleBody"
						dangerouslySetInnerHTML={{
							__html: post.body.childMarkdownRemark.html
						}}
					/>

					<footer>
						{/* <Bio /> */}
						bio
					</footer>
				</article>
			</main>
		</Layout>
	);
};

const styles = {
	postHeader: {
		marginBottom: rhythm(1),
		"& h1": {
			marginBottom: rhythm(-0.1)
		},
		"& time": {
			...scale(-0.4)
		}
	},
	postBody: {
		"& img": {
			display: "block",
			maxWidth: "100%",
			margin: "10px auto"
		},
		"& div.footnotes li p": {
			display: "inline"
		}
	},
	readingTime: {
		float: "right",
		...scale(-0.4)
	}
};

export default injectSheet(styles)(BlogPostTemplate);

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		contentfulBlogPost(slug: { eq: $slug }) {
			title
			publishDate(formatString: "YYYY-MM-DD")
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
		}
	}
`;
