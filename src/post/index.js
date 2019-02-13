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

const BlogPostTemplate = ({ data, classes }) => {
	const { post, disqusShortName, siteUrl } = massage(data);

	return (
		<Layout>
			<Seo title={post.title} description={post.excerpt} />
			<CanonicalLink siteUrl={siteUrl} slug={post.slug} />

			<header className={classes.postHeader}>
				<h1>{post.title}</h1>
				<div className={classes.meta}>
					<time dateTime={post.date} itemProp="datePublished">
						{post.dateFormatted}
					</time>

					<span className={classes.readingTime}>{post.readingTime}</span>
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

function massage({
	markdownRemark: {
		frontmatter: { id, title, date, dateFormatted },
		fields: { slug },
		html,
		excerpt,
		fields: {
			readingTime: { text: readingTime }
		}
	},
	site: {
		siteMetadata: { disqus: disqusShortName, siteUrl }
	}
}) {
	return {
		post: {
			id,
			title,
			date,
			dateFormatted,
			slug,
			html,
			excerpt,
			readingTime
		},
		disqusShortName,
		siteUrl
	};
}

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
		}
	}
`;
