import { get, sortBy } from "lodash";

export default function massage({
	markdownRemark: {
		frontmatter: { id, title, date, dateFormatted, twitterId },
		fields: { slug },
		html,
		excerpt,
		fields: {
			readingTime: { text: readingTime }
		},
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
		.filter(
			w => w.node.wmProperty == "like-of" || w.node.wmProperty == "bookmark-of"
		)
		.map(w => w.node.author);

	return {
		post: {
			id,
			title,
			date,
			dateFormatted,
			twitterId,
			slug,
			html,
			excerpt,
			readingTime
		},
		siteUrl,
		githubLink,
		fileAbsolutePath,
		comments,
		likes
	};
}

function nestComments(comments) {
	const newCommentList = [];

	comments.forEach(c => {
		if (c.parentId) {
			const parent = comments.find(pc => pc.id == c.parentId);
			parent.comments = parent.comments || [];
			parent.comments.push(c);
		} else {
			newCommentList.push(c);
		}
	});

	return newCommentList;
}
