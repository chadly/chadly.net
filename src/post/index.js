import React from "react";
import { graphql } from "gatsby";
import injectSheet from "react-jss";

import Assets from "./assets";
import Layout from "../layout";
import Seo from "../seo";
import Author from "../author";
import { rhythm, scale, border } from "../typography";

import CanonicalLink, {
	calculate as calculateCanonicalUrl
} from "../canonical";
import Comments from "./comments";

import { get } from "lodash";

const BlogPostTemplate = ({ data, classes }) => {
	const post = get(data, "contentfulBlogPost");
	const disqusShortName = get(data, "site.siteMetadata.disqus");
	const siteUrl = get(data, "site.siteMetadata.siteUrl");

	const readingTime = get(
		post,
		"body.childMarkdownRemark.fields.readingTime.text"
	);

	return (
		<Layout>
			<Seo
				title={post.title}
				author={post.author}
				description={post.body.childMarkdownRemark.excerpt}
			/>
			<Assets assets={post.assets} />
			<CanonicalLink siteUrl={siteUrl} slug={post.slug} />

			<header className={classes.postHeader}>
				<h1>{post.title}</h1>
				<div className={classes.meta}>
					<time dateTime={post.publishDate} itemProp="datePublished">
						{post.publishDateFormatted}
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
				</article>
			</main>

			<footer className={classes.postFooter}>
				<Author author={post.author} />

				<Comments
					shortName={disqusShortName}
					id={post.id}
					url={calculateCanonicalUrl({ siteUrl, slug: post.slug })}
					title={post.title}
				/>
			</footer>
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
	meta: {
		color: "var(--textMuted)"
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
	postFooter: {
		borderTop: border,
		paddingTop: rhythm(1),
		marginTop: rhythm(1)
	},
	readingTime: {
		float: "right",
		...scale(-0.4)
	}
};

export default injectSheet(styles)(BlogPostTemplate);

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				disqus
				siteUrl
			}
		}
		contentfulBlogPost(slug: { eq: $slug }) {
			id
			slug
			title
			publishDate
			publishDateFormatted: publishDate(formatString: "MMMM DD, YYYY")
			assets
			body {
				childMarkdownRemark {
					html
					excerpt
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
					file {
						url
					}
				}
			}
		}
	}
`;
