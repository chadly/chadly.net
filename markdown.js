// https://glen.codes/using-prism-with-metalsmith-and-markdown/

import markdown from "metalsmith-markdown";
import prism from "prismjs";
import { Renderer } from "marked";

const renderer = new Renderer();

// Change the code method to output the same as Prism.js would.
renderer.code = function(code, lang, escaped) {
	code = this.options.highlight(code, lang);

	if (!lang) {
		return `<pre><code>${code}</code></pre>`;
	}

	// e.g. "language-js"
	const langClass = this.options.langPrefix + lang;
	return `<pre class="${langClass}"><code class="${langClass}">${code}</code></pre>`;
};

// Translate marked languages to prism.
const extensions = {
	js: "javascript",
	scss: "css",
	sass: "css",
	html: "markup",
	svg: "markup",
	xml: "markup",
	py: "python",
	rb: "ruby",
	ps1: "powershell",
	psm1: "powershell",
	cs: "clike"
};

export default markdown({
	smartypants: true,
	smartLists: true,
	renderer: renderer,
	langPrefix: "language-",
	highlight: (code, lang) => {
		if (!prism.languages.hasOwnProperty(lang)) {
			// Default to markup.
			lang = extensions[lang] || 'markup';
		}

		return prism.highlight(code, prism.languages[lang]);
	}
});