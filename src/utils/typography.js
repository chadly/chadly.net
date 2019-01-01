import Typography from "typography";
import Github from "typography-theme-github";

const typography = new Typography(Github);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
	typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
