import React from "react";
import { createUseStyles } from "react-jss";
import { rhythm, scale } from "./theme";

import { ThemeToggler } from "gatsby-plugin-dark-mode";

const Layout = ({ children, width }) => {
	const classes = useStyles({ width });

	return (
		<div className={classes.root}>
			<ThemeToggler>
				{({ theme, toggleTheme }) => (
					<label className={classes.darkToggle}>
						<input
							type="checkbox"
							onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
							checked={theme === "dark"}
						/>{" "}
						{theme == "light" ? (
							<span title="Turn to the dark side">☀️</span>
						) : (
							<span title="Turn to the light">🌙</span>
						)}
					</label>
				)}
			</ThemeToggler>

			<div className={classes.container}>
				{children}

				<footer className={classes.footer}>
					All content (except code snippets) licensed{" "}
					<a
						rel="license"
						href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en_US"
					>
						CC BY-NC-SA 4.0
					</a>
					. All code snippets licensed under{" "}
					<a
						rel="license"
						href="https://github.com/chadly/chadly.net/blob/master/LICENSE"
					>
						MIT License
					</a>
					.
				</footer>
			</div>
		</div>
	);
};

const useStyles = createUseStyles({
	"@global": {
		body: {
			backgroundColor: "var(--bg)",
			"-webkit-font-smoothing": "antialiased",
			transition: "color 0.2s ease-out, background 0.2s ease-out"
		},
		"body.light": {
			"--bg": "#fff",
			"--header": "#333332",
			"--textNormal": "#333332",
			"--textMuted": "rgba(95, 95, 95, 0.8)",
			"--textTitle": "#333332",
			"--textLink": "#d40000",
			"--hr": "#cfcfcf",
			"--glow": "hsla(0, 100%, 0%, 0.2)"
		},
		"body.dark": {
			"--bg": "#282c35",
			"--header": "#ffffff",
			"--textNormal": "rgba(255, 255, 255, 0.88)",
			"--textMuted": "rgba(255, 255, 255, 0.60)",
			"--textTitle": "#ffffff",
			"--textLink": "#97ff10",
			"--hr": "hsla(0, 0%, 100%, 0.2)",
			"--glow": "hsla(0, 0%, 100%, 0.1)"
		}
	},
	darkToggle: {
		display: "block",
		float: "right",

		margin: 0,
		padding: `${rhythm(0.3)} ${rhythm(0.75)}`,

		"& input": {
			display: "none"
		},
		"& i": {
			cursor: "pointer"
		}
	},
	root: {
		color: "var(--textNormal)"
	},
	container: {
		marginLeft: `auto`,
		marginRight: `auto`,
		maxWidth: ({ width = 30 }) => rhythm(width),
		padding: `${rhythm(1.5)} ${rhythm(0.75)}`
	},
	footer: {
		textAlign: "center",
		marginTop: rhythm(1),
		...scale(-0.5)
	}
});

export default Layout;
