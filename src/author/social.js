import React from "react";
import { createUseStyles } from "react-jss";
import { rhythm } from "../theme/typography";

const AuthorSocial = ({ github, twitter, keybase, className }) => {
	const classes = useStyles();

	if (!github && !twitter && !keybase) {
		return null;
	}

	return (
		<ul className={`${classes.container} ${className || ""}`}>
			<SocialIcon
				id="fab fa-github"
				name="Github"
				href={`https://github.com/${github}`}
				show={!!github}
				rel="me"
			/>
			<SocialIcon
				id="fab fa-twitter"
				name="Twitter"
				href={`https://twitter.com/${twitter}`}
				show={!!twitter}
				rel="me"
			/>
			<SocialIcon
				id="fab fa-keybase"
				name="Keybase"
				href={`https://keybase.io/${keybase}`}
				show={!!keybase}
				rel="me"
			/>
			<SocialIcon
				id="fas fa-rss"
				name="RSS"
				href={`/rss.xml`}
				show
				className={classes.rss}
			/>
		</ul>
	);
};

const SocialIcon = ({ id, name, show, ...props }) => {
	if (!show) return null;

	return (
		<li>
			<a title={name} {...props}>
				<i className={id} />
			</a>
		</li>
	);
};

const useStyles = createUseStyles({
	container: {
		listStyle: "none",
		margin: 0,
		padding: 0,
		"& li": {
			display: "inline",
			margin: {
				top: 0,
				bottom: 0,
				left: 0,
				right: rhythm(0.5)
			},
			"& a": {
				textDecoration: "none"
			}
		},
		"& li:last-child": {
			marginRight: 0
		}
	},
	rss: {
		color: "rgb(247, 131, 34)"
	}
});

export default AuthorSocial;
