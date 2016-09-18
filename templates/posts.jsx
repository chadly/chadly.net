import React from "react";
import moment from "moment";

const Posts = ({ siteUrl, posts, enableDisqus }) => {
	const commentCount = post => {
		if (!enableDisqus) {
			return null;
		}

		const commentPath = siteUrl + post.path + "/#disqus_thread";
		return <a href={commentPath} className="post-comment-count" title="Comments" data-disqus-identifier={post.id}></a>;
	};

	return (
		<div>
			{posts.map(post => {
				const date = moment(post.created).utc();
				return (
					<article key={post.id} className="post-stub" itemProp="blogPost" itemScope itemType="http://schema.org/BlogPosting">
						<time dateTime={date.format("YYYY-MM-DD")} itemProp="datePublished">{date.format("DD MMM YYYY")}</time>
						<div className="post-title">
							<a href={post.path + "/"} itemProp="name headline url">{post.title}</a>
							{" "}
							{commentCount(post)}
						</div>
					</article>
				);
			})}
		</div>
	);
};

module.exports = Posts;