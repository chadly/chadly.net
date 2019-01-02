import React from "react";
import injectSheet from "react-jss";
import { rhythm } from "../typography";

const AuthorSocial = ({ author: { github, twitter, keybase }, classes }) => {
	if (!github && !twitter && !keybase) {
		return null;
	}

	return (
		<ul className={classes.container}>
			<SocialIcon
				id="github"
				name="Github"
				href={`https://github.com/${github}`}
				show={!!github}
			/>
			<SocialIcon
				id="twitter"
				name="Twitter"
				href={`https://twitter.com/${twitter}`}
				show={!!twitter}
			/>
			<SocialIcon
				id="keybase"
				name="Keybase"
				href={`https://keybase.io/${keybase}`}
				show={!!keybase}
			/>
		</ul>
	);
};

const SocialIcon = ({ id, name, href, show }) => {
	if (!show) return null;

	return (
		<li>
			<a href={href} title={name}>
				<i className={`fab fa-${id}`} />{" "}
			</a>
		</li>
	);
};

const styles = {
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
		}
	}
};

export default injectSheet(styles)(AuthorSocial);
