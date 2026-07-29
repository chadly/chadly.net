import "server-only";
import { getDisqusComments, type DisqusComment } from "./disqus";
import { getWebmentions, type WebmentionAuthor } from "./webmentions";
import type { Post } from "./posts";

export interface Comment {
	id: string;
	author: { name: string; photo: string | null; url?: string | null };
	url?: string | null;
	date: string;
	message: string;
	comments?: Comment[];
}

export interface Feedback {
	comments: Comment[];
	totalCount: number;
	likes: WebmentionAuthor[];
	reposts: WebmentionAuthor[];
}

const byDate = (a: { date: string }, b: { date: string }) =>
	a.date < b.date ? -1 : 1;

// nest replies one level deep under their root comment (port of nestComments)
function nest(comments: DisqusComment[]): Comment[] {
	const roots: Comment[] = [];
	for (const c of comments) {
		if (c.parentId) {
			let parent = comments.find(pc => pc.id === c.parentId);
			while (parent?.parentId) {
				parent = comments.find(pc => pc.id === parent!.parentId);
			}
			if (!parent) continue;
			parent.comments = [...(parent.comments ?? []), c].sort(byDate);
		} else {
			roots.push(c);
		}
	}
	return roots;
}

export function getFeedback(post: Post): Feedback {
	const disqus = getDisqusComments(post.id);
	const mentions = getWebmentions(post.slug);

	const wmComments: Comment[] = mentions
		.filter(m => m.property === "in-reply-to")
		.map(m => ({
			id: m.id,
			author: m.author,
			url: m.url,
			date: m.published ?? "",
			message: m.text ?? ""
		}));

	return {
		comments: [...nest(disqus), ...wmComments].sort(byDate),
		totalCount: disqus.length + wmComments.length,
		likes: mentions.filter(m => m.property === "like-of").map(m => m.author),
		reposts: mentions
			.filter(m => m.property === "repost-of")
			.map(m => m.author)
	};
}
