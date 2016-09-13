import React from "react";
import moment from "moment";

const Posts = ({ siteUrl, posts, disqusIdentifier }) => {
	const commentCount = post => {
		if (!enableDisqus) {
			return null;
		}

		const commentPath = siteUrl + post.path + "/#disqus_thread";
		const identifier = post.disqus && post.disqus.identifier ? post.disqus.identifier : post.id;
		return <a href={commentPath} class="post-comment-count" title="Comments" data-disqus-identifier={identifier}></a>
	};

	return (
		<div>
			{posts.map(post => {
				const date = moment(post.date);
				return (
					<article class="post-stub" itemprop="blogPost" itemscope itemtype="http://schema.org/BlogPosting">
						<time datetime={date.format("YYYY-MM-DD")} itemprop="datePublished">{date.format("DD MMM YYYY")}</time>
						<div class="post-title">
							<a href={post.path + "/"} itemprop="name headline url">{{title}}</a>
							{commentCount(post)}
						</div>
					</article>
				);
			})}
		</div>
	);
};

module.exports = Posts;