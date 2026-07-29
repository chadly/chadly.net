// One-off snapshot of webmention.io data into content/webmentions.json.
// The site renders from that file; this only needs re-running if the
// webmention.io archive somehow changes.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SITE = "https://www.chadly.net";
const postsDir = path.join(process.cwd(), "content", "posts");

const slugs = [];
for (const entry of fs.readdirSync(postsDir, { withFileTypes: true })) {
	const isDir = entry.isDirectory();
	const file = isDir
		? path.join(postsDir, entry.name, "index.mdx")
		: path.join(postsDir, entry.name);
	if (!file.endsWith(".mdx") || !fs.existsSync(file)) continue;

	const slug = isDir ? entry.name : entry.name.replace(/\.mdx$/, "");
	const { data } = matter(fs.readFileSync(file, "utf8"));
	slugs.push({ slug, redirectFrom: data.redirectFrom ?? [] });
}

// Mentions may target the old root URLs or the /blog-prefixed ones, with or
// without trailing slashes — fetch every variant and dedupe by wm-id.
async function fetchMentions(slug) {
	const targets = new Set();
	const p = `/${slug.replace(/^\/|\/$/g, "")}/`;
	for (const prefix of ["", "/blog"]) {
		targets.add(`${SITE}${prefix}${p}`);
		targets.add(`${SITE}${prefix}${p.replace(/\/$/, "")}`);
	}

	const results = await Promise.all(
		[...targets].map(async target => {
			const res = await fetch(
				`https://webmention.io/api/mentions.jf2?per-page=1000&target=${encodeURIComponent(target)}`
			);
			if (!res.ok) throw new Error(`${res.status} for ${target}`);
			return (await res.json()).children ?? [];
		})
	);

	const seen = new Set();
	const mentions = [];
	for (const entry of results.flat()) {
		if (seen.has(entry["wm-id"])) continue;
		seen.add(entry["wm-id"]);
		mentions.push({
			id: String(entry["wm-id"]),
			property: entry["wm-property"],
			author: {
				name: entry.author?.name || "Anonymous",
				photo: entry.author?.photo || null,
				url: entry.author?.url || null
			},
			url: entry.url ?? "",
			published: entry.published ?? entry["wm-received"] ?? null,
			text: entry.content?.text ?? null
		});
	}
	return mentions;
}

const out = {};
for (const { slug, redirectFrom } of slugs) {
	const seen = new Set();
	const mentions = [];
	for (const s of [slug, ...redirectFrom]) {
		for (const m of await fetchMentions(s)) {
			if (seen.has(m.id)) continue;
			seen.add(m.id);
			mentions.push(m);
		}
	}
	if (mentions.length) {
		out[slug] = mentions;
		console.log(`${slug}: ${mentions.length}`);
	}
}

fs.writeFileSync(
	path.join(process.cwd(), "content", "webmentions.json"),
	JSON.stringify(out, null, "\t") + "\n"
);
console.log(`wrote content/webmentions.json (${Object.keys(out).length} posts)`);
