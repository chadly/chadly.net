import { graphql, useStaticQuery } from "gatsby";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
import React from "react";
import { createUseStyles } from "react-jss";

import { cssVars, rhythm, scale } from "./theme";

const Layout = ({ children, license }) => {
	const classes = useStyles();

	const {
		authorFile: {
			childMdx: {
				author: { name }
			}
		}
	} = useStaticQuery(graphql`
		query LayoutQuery {
			authorFile: file(
				sourceInstanceName: { eq: "author" }
				extension: { eq: "mdx" }
			) {
				childMdx {
					author: frontmatter {
						name
					}
				}
			}
		}
	`);

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

			{children}

			<footer className={classes.footer} title="Copyright">
				<License name={name} license={license} />
			</footer>
		</div>
	);
};

const License = ({ name, license }) => {
	switch (license) {
		case "CC BY-NC-SA 4.0":
			return (
				<>
					Licensed as{" "}
					<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
						Attribution-NonCommercial-ShareAlike 4.0 International
					</a>
				</>
			);

		default:
			return (
				<>
					© {name} {new Date().getFullYear()}. All rights reserved.
				</>
			);
	}
};

const useStyles = createUseStyles({
	"@global": cssVars,
	root: {
		color: "var(--textNormal)"
	},
	darkToggle: {
		display: "block",
		float: "right",
		cursor: "pointer",

		margin: 0,
		padding: `${rhythm(0.3)} ${rhythm(0.75)}`,

		"& input": {
			display: "none"
		},
		"& i": {
			cursor: "pointer"
		}
	},
	footer: {
		textAlign: "center",
		marginTop: rhythm(1),
		...scale(-0.5)
	}
});

export default Layout;
