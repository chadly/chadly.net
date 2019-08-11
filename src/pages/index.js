import React from "react";
import { graphql } from "gatsby";

import Layout from "../layout";
import Seo from "../seo";

import Author from "../author";
import PostStub from "../post/stub";
import CanonicalLink from "../canonical";

import { get } from "lodash";

const RootIndex = ({ data }) => {
	const posts = get(data, "allMdx.edges", []);
	const siteUrl = get(data, "site.siteMetadata.siteUrl");
	const disqusComments = get(data, "allDisqusThread.edges", []).map(
		e => e.node
	);
	const webmentions = get(data, "allWebMentionEntry.edges", []).map(
		e => e.node
	);

	return (
		<Layout width={24}>
			<Seo />
			<CanonicalLink siteUrl={siteUrl} />

			<main role="main" className={`h-feed`}>
				<Author />

				<h1>8==========D~~~~~</h1>
				{posts.map(({ node: { id, ...post } }) => {
					let cm = disqusComments.find(t => t.threadId == post.frontmatter.id);
					let wm = webmentions.filter(w => w.fields.slug == post.fields.slug);

					const commentCount =
						get(cm, "comments", []).length +
						wm.filter(w => w.wmProperty == "in-reply-to").length;

					const likeCount = wm.filter(w => w.wmProperty == "like-of").length;

					const repostCount = wm.filter(w => w.wmProperty == "repost-of")
						.length;

					return (
						<PostStub
							key={id}
							post={post}
							commentCount={commentCount}
							likeCount={likeCount}
							repostCount={repostCount}
						/>
					);
				})}
			</main>
		</Layout>
	);
};

export default RootIndex;

export const pageQuery = graphql`
	query HomeQuery {
		site {
			siteMetadata {
				siteUrl
			}
		}
		allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					id
					frontmatter {
						id
						title
						date
						dateFormatted: date(formatString: "DD MMM YYYY")
					}
					fields {
						slug
					}
					timeToRead
				}
			}
		}
		allDisqusThread {
			edges {
				node {
					threadId
					comments {
						id
					}
				}
			}
		}
		allWebMentionEntry {
			edges {
				node {
					fields {
						slug
					}
					wmProperty
				}
			}
		}
	}
`;
