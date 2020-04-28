import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { createUseStyles } from "react-jss";
import { rhythm, scale } from "./theme";

import { ThemeToggler } from "gatsby-plugin-dark-mode";

const Layout = ({ children, width }) => {
	const classes = useStyles({ width });

	const {
		site: {
			siteMetadata: { title, description }
		}
	} = useStaticQuery(graphql`
		query LayoutQuery {
			site {
				siteMetadata {
					title
					description
				}
			}
		}
	`);

	return (
		<div className={classes.root}>
			<h1 className={classes.siteTitle} title={description}>
				<Link to="/">{title}</Link>
			</h1>

			<ThemeToggler>
				{({ theme, toggleTheme }) => (
					<label className={classes.darkToggle}>
						<input
							type="checkbox"
							onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
							checked={theme === "dark"}
						/>{" "}
						{theme == "light" ? (
							<i className="fas fa-moon" title="Turn to the dark side" />
						) : (
							<i className="fas fa-sun" title="Turn to the light" />
						)}
					</label>
				)}
			</ThemeToggler>

			<div className={classes.container}>
				<Helmet>
					<link
						rel="stylesheet"
						href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
						integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
						crossOrigin="anonymous"
					/>
				</Helmet>

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

const useStyles = createUseStyles(() => {
	const topSpacing = {
		margin: 0,
		padding: `${rhythm(0.3)} ${rhythm(0.75)}`
	};

	return {
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
			...topSpacing,
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
		siteTitle: {
			float: "left",
			border: "none",
			...topSpacing,
			...scale(0.2),

			"& a": {
				boxShadow: `none`,
				textDecoration: `none`,
				color: `inherit`
			}
		},
		footer: {
			borderTop: "1px solid var(--hr)",
			marginTop: rhythm(1),
			...scale(-0.5)
		}
	};
});

export default Layout;
