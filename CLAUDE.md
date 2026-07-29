# Tiny Tyrant Blog

This is a blog website implemented with Next.js; posts are MDX files in `content/`.

Agent skills and dependencies are managed with [APM](https://github.com/microsoft/apm).

## Development Commands

- `npm install` - Install dependencies (the containers bind-mount the repo, so they use the host `node_modules`)
- `npm run dev` - Start web app (http://localhost:3000)
- `npm run lint` - Run ESLint. (Prefer to run with the `--fix` option to fix any code formatting issues: `npm run lint -- --fix`)
- `apm install` - Deploy `.apm/` content and APM dependencies (skills, agents, hooks, plugins, MCP servers from `apm.yml`) → `.claude/` and `.mcp.json` (both gitignored). Never edit `.claude/` or `.mcp.json` directly; edit `apm.yml` or the `.apm/` source and re-run `apm install`.

**Important**: Always run `npm run lint` after making significant code changes to ensure code quality and type safety.

## UI work

When building or modifying UI components or pages, ALWAYS use the `frontend-design` skills.

For clickable elements, ALWAYS make sure that the cursor is a pointer.

Prefer elements like links and buttons over making elements clickable via javascript `onclick`.

Test UI changes with Chrome integration.

## Development Notes

- Uses TypeScript with strict type checking enabled
- Don't use onClick handlers (or `router.push`) where a link would do. Plain navigation should be a `<Link>`. Reserve programmatic navigation for post-mutation redirects.
- Don't push to git. Let the user run `git push` themselves.
