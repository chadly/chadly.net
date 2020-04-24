import React from "react";
import { graphql } from "gatsby";
import { createUseStyles } from "react-jss";

import Layout from "../layout";
import Seo from "../seo";
import Author from "../author";
import { rhythm, scale } from "../theme/typography";

import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";

import CanonicalLink, { calculate as getPermalink } from "../canonical";
import massage from "./data";
import Feedback from "./feedback";
import EditPageLink from "./edit-page-link";

import Ad from "../ad";

const BlogPostTemplate = ({ data }) => {
	const classes = useStyles();

	const {
		post,
		siteUrl,
		githubLink,
		fileAbsolutePath,
		comments,
		likes,
		reposts
	} = massage(data);

	return (
		<Layout>
			<Seo title={post.title} description={post.excerpt} />
			<CanonicalLink siteUrl={siteUrl} slug={post.slug} />

			<article className="h-entry">
				<Ad hash={post.hash} className={classes.ad} />

				<header className={classes.postHeader}>
					<EditPageLink
						githubLink={githubLink}
						fileAbsolutePath={fileAbsolutePath}
						className={classes.editLink}
					/>
					<h1 className="p-name">{post.title}</h1>
					<div className={classes.meta}>
						<a
							href={getPermalink({ siteUrl, slug: post.slug })}
							className="u-url"
						>
							<time dateTime={post.date} className="dt-published">
								{post.dateFormatted}
							</time>
						</a>

						<span className={classes.readingTime}>{post.readingTime}</span>
					</div>
				</header>

				<main role="main" className={`e-content ${classes.postBody}`}>
					<MDXRenderer>{post.body}</MDXRenderer>
				</main>

				<footer className={classes.postFooter}>
					<Author />
					<Feedback
						twitterId={post.twitterId}
						likes={likes}
						comments={comments}
						reposts={reposts}
					/>
				</footer>
			</article>
		</Layout>
	);
};

const useStyles = createUseStyles({
	ad: {
		margin: `${rhythm(1)} auto`
	},
	postHeader: {
		marginBottom: rhythm(1),
		"& h1": {
			marginBottom: rhythm(-0.1)
		},
		"& time": {
			...scale(-0.4)
		},
		"&:hover $editLink": {
			visibility: "visible"
		}
	},
	editLink: {
		float: "left",
		boxShadow: "none",
		paddingRight: rhythm(0.4),
		marginLeft: rhythm(-1.3),
		marginRight: 0,
		...scale(0.6),
		visibility: "hidden"
	},
	meta: {
		color: "var(--textMuted)",
		"& a": {
			textDecoration: "none",
			color: "var(--textMuted)"
		}
	},
	postBody: {
		"& img": {
			display: "block",
			maxWidth: "100%",
			margin: "10px auto"
		},
		"& .twitter-tweet": {
			marginLeft: "auto",
			marginRight: "auto"
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
	},
	"@global": {
		".vscode-highlight .vscode-highlight-line-highlighted": {
			backgroundColor: "rgba(255, 255, 255, 0.2)",
			boxShadow: "inset 2px 0 0 0 rgba(255, 255, 255, 0.5)"
		},
		".grvsc-container": {
			tabSize: 4
		}
	}
});

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!, $threadId: String) {
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
				twitterId
			}
			fields {
				slug
			}
			body
			excerpt
			timeToRead
			fileAbsolutePath
			parent {
				... on File {
					size
				}
			}
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
