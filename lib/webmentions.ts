import data from "@/content/webmentions.json";

export interface WebmentionAuthor {
	name: string;
	photo: string | null;
	url: string | null;
}

export interface Webmention {
	id: string;
	property: "in-reply-to" | "like-of" | "repost-of" | string;
	author: WebmentionAuthor;
	url: string;
	published: string | null;
	text: string | null;
}

// Static snapshot of the old webmention.io data — see scripts/fetch-webmentions.mjs.
const mentions = data as Record<string, Webmention[]>;

export const getWebmentions = (slug: string): Webmention[] =>
	mentions[slug] ?? [];
