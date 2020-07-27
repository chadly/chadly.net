import React from "react";
import { createUseStyles } from "react-jss";
import { rhythm } from "../theme";

import SvgIcon from "../icon";
import TwitterIcon from "./twitter.svg";
import GitHubIcon from "./github.svg";
import StackOverflowIcon from "./stack-overflow.svg";
import KeybaseIcon from "./keybase.svg";
import RssIcon from "./rss.svg";

const AuthorSocial = ({
	github,
	twitter,
	stackOverflow,
	keybase,
	className
}) => {
	const classes = useStyles();

	if (!github && !twitter && !stackOverflow && !keybase) {
		return null;
	}

	return (
		<ul className={`${classes.container} ${className || ""}`}>
			<SocialIcon
				id="twitter"
				name="Twitter"
				href={`https://twitter.com/${twitter}`}
				show={!!twitter}
				rel="me"
			/>
			<SocialIcon
				id="github"
				name="GitHub"
				href={`https://github.com/${github}`}
				show={!!github}
				rel="me"
			/>
			<SocialIcon
				id="stack-overflow"
				name="Stack Overflow"
				href={`https://stackoverflow.com/users/${stackOverflow}`}
				show={!!stackOverflow}
				rel="me"
			/>
			<SocialIcon
				id="keybase"
				name="Keybase"
				href={`https://keybase.io/${keybase}`}
				show={!!keybase}
				rel="me"
			/>
			<SocialIcon
				id="rss"
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
				<SvgIcon>
					<WhichIcon id={id} />
				</SvgIcon>
			</a>
		</li>
	);
};

const WhichIcon = ({ id, ...props }) => {
	switch (id) {
		case "twitter":
			return <TwitterIcon {...props} />;
		case "github":
			return <GitHubIcon {...props} />;
		case "stack-overflow":
			return <StackOverflowIcon {...props} />;
		case "keybase":
			return <KeybaseIcon {...props} />;
		case "rss":
			return <RssIcon {...props} />;
		default:
			return null;
	}
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
