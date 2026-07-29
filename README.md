# chadly.net

> Personal blog powered by [Next.js](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/) + TypeScript

## Running Locally

```
npm install
npm run dev
```

This starts the dev server at `localhost:8080`. A prestep generates `content/generated/` (the post/project import map) from the MDX files in `content/` — re-run `node scripts/generate-content-map.mjs` if you add or rename content while the server is running.

### Usage with Agents

For local development, install the agent configuration with [APM](https://microsoft.github.io/apm/):

```bash
apm install
```

## Content

- `content/posts/` — blog posts in MDX (single file or folder with `index.mdx` + colocated assets/components)
- `content/projects/` — "Things I've Built" entries
- `content/author/` — bio + avatar
- `content/external/posts.json` — posts published elsewhere, merged into the list + RSS
- `content/disqus.xml` — archived Disqus comments, rendered statically
- `content/webmentions.json` — archived [webmentions](https://indieweb.org/Webmention), rendered statically

Comments are a static archive (Disqus + webmentions); the site no longer accepts new ones. The webmention snapshot was taken from webmention.io with `node scripts/fetch-webmentions.mjs`.

## Deploying

Deployed on [Vercel](https://vercel.com/).
