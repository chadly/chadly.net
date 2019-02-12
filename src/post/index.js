import React from "react";
import { graphql } from "gatsby";
import injectSheet from "react-jss";

import Layout from "../layout";
import Seo from "../seo";
import Author from "../author";
import { rhythm, scale } from "../theme/typography";

import CanonicalLink, {
	calculate as calculateCanonicalUrl
} from "../canonical";
import Comments from "./comments";

import { get } from "lodash";

const BlogPostTemplate = ({ data, classes }) => {
	const post = get(data, "markdownRemark");
	const disqusShortName = get(data, "site.siteMetadata.disqus");
	const siteUrl = get(data, "site.siteMetadata.siteUrl");

	const readingTime = get(post, "fields.readingTime.text");

	return (
		<Layout>
			<Seo title={post.frontmatter.title} description={post.excerpt} />
			<CanonicalLink siteUrl={siteUrl} slug={post.fields.slug} />

			<header className={classes.postHeader}>
				<h1>{post.frontmatter.title}</h1>
				<div className={classes.meta}>
					<time dateTime={post.frontmatter.date} itemProp="datePublished">
						{post.frontmatter.dateFormatted}
					</time>

					<span className={classes.readingTime}>{readingTime}</span>
				</div>
			</header>

			<main role="main" className={classes.postBody}>
				<article itemScope itemType="http://schema.org/BlogPosting">
					<section
						itemProp="articleBody"
						dangerouslySetInnerHTML={{
							__html: post.html
						}}
					/>
				</article>
			</main>

			<footer className={classes.postFooter}>
				<Author />

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
		borderTop: "1px solid var(--hr)",
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
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			frontmatter {
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
		}
	}
`;
