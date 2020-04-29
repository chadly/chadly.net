import { get, sortBy, union, reverse } from "lodash";

export const massageList = ({ posts, externalPosts }) =>
	reverse(
		sortBy(
			union(
				posts.map(
					({
						childMdx: {
							frontmatter: { id, title, description, date, dateFormatted },
							fields: { slug },
							excerpt,
							timeToRead
						}
					}) => ({
						id,
						title,
						description: description || excerpt,
						date,
						dateFormatted,
						url: slug,
						timeToRead
					})
				),
				externalPosts.map(({ postId, ...post }) => ({
					id: postId,
					...post,
					isExternal: true
				}))
			),
			"date"
		)
	);

export function massage({
	mdx: {
		frontmatter: {
			id,
			title,
			date,
			description,
			dateFormatted,
			twitterId,
			cover
		},
		fields: { slug },
		body,
		excerpt,
		timeToRead,
		fileAbsolutePath
	},
	site: {
		siteMetadata: { siteUrl, githubLink }
	},
	disqusThread,
	allWebMentionEntry
}) {
	const allComments = get(disqusThread, "comments", []).map(c => ({
		id: c.id,
		parentId: c.parentId,
		author: {
			name: get(c, "author.name"),
			photo: `https://disqus.com/api/users/avatars/${get(
				c,
				"author.username"
			)}.jpg`
		},
		date: c.createdAt,
		message: c.message
	}));
	let comments = nestComments(allComments);

	const webMentionComments = get(allWebMentionEntry, "edges", [])
		.filter(w => w.node.wmProperty == "in-reply-to")
		.map(w => ({
			id: w.node.id,
			author: w.node.author,
			url: w.node.url,
			date: w.node.published,
			message: get(w.node, "content.text")
		}));

	comments = sortBy([...comments, ...webMentionComments], "date");
	comments.totalCount = allComments.length + webMentionComments.length;

	const likes = get(allWebMentionEntry, "edges", [])
		.filter(w => w.node.wmProperty == "like-of")
		.map(w => w.node.author);

	const reposts = get(allWebMentionEntry, "edges", [])
		.filter(w => w.node.wmProperty == "repost-of")
		.map(w => w.node.author);

	return {
		post: {
			id,
			title,
			description: description || excerpt,
			date,
			dateFormatted,
			twitterId,
			slug,
			body,
			readingTime: `${timeToRead} min read`,
			cover: get(cover, "img.fixed.src")
		},
		siteUrl,
		githubLink,
		fileAbsolutePath,
		comments,
		likes,
		reposts
	};
}

function nestComments(comments) {
	const newCommentList = [];

	comments.forEach(c => {
		if (c.parentId) {
			let parent = comments.find(pc => pc.id == c.parentId);

			while (parent.parentId) {
				// only nest one level deep
				parent = comments.find(pc => pc.id == parent.parentId);
			}

			parent.comments = parent.comments || [];
			parent.comments.push(c);
			parent.comments = sortBy(parent.comments, "date");
		} else {
			newCommentList.push(c);
		}
	});

	return newCommentList;
}
