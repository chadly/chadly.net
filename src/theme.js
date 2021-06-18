import Typography from "typography";
import Github from "typography-theme-github";

Github.baseFontSize = "18px";

Github.overrideThemeStyles = () => ({
	a: {
		color: "var(--textLink)"
	},
	hr: {
		background: "var(--hr)"
	},
	"a.gatsby-resp-image-link": {
		boxShadow: "none"
	},
	// These two are for gatsby-remark-autolink-headers:
	"a.anchor": {
		boxShadow: "none"
	},
	'a.anchor svg[aria-hidden="true"]': {
		stroke: "var(--textLink)"
	},
	"p code": {
		fontSize: "1rem"
	},
	"h1, h2, h3, h4": {
		color: "var(--textTitle)",
		borderBottomColor: "var(--hr)"
	},
	// TODO: why tho
	"h1 code, h2 code, h3 code, h4 code, h5 code, h6 code": {
		fontSize: "inherit"
	},
	"li code": {
		fontSize: "1rem"
	},
	blockquote: {
		color: "inherit",
		borderLeftColor: "inherit",
		marginTop: typography.rhythm(1),
		marginRight: typography.rhythm(1),
		marginBottom: typography.rhythm(1),
		marginLeft: typography.rhythm(-0.75),
		paddingLeft: typography.rhythm(0.65),
		...typography.scale(0.3),
		fontStyle: "italic",
		opacity: "0.8"
	}
});

const typography = new Typography(Github);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
	typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;

export const smallScreenMediaQuery = "@media (max-width:700px)";
export const bigScreenMediaQuery = "@media (min-width:701px)";

export const cssVars = {
	body: {
		backgroundColor: "var(--bg)",
		"-webkit-font-smoothing": "antialiased",
		transition: "color 0.2s ease-out, background 0.2s ease-out"
	},
	"body.light": {
		"--bg": "#f5fffa",
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
};
