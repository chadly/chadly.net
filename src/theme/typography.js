import Typography from "typography";
import Github from "typography-theme-github";

import "./global.css";
import "./prism.css";

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
	h1: {
		borderBottomColor: "var(--hr)"
	},
	"h1, h2, h3, h4": {
		color: "var(--textTitle)"
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
export const rhythm = typography.rhythm;
export const scale = typography.scale;

export const smallScreenMediaQuery = "@media (max-width:700px)";
