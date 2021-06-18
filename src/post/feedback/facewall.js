import React from "react";
import { createUseStyles } from "react-jss";

import { rhythm } from "../../theme";

const FaceWall = ({ faces }) => {
	const classes = useStyles();

	if (!faces || !faces.length) return null;

	return (
		<ul className={classes.root}>
			{faces.map(f => {
				return (
					<li key={f.url} className={classes.container} title={f.name}>
						<a href={f.url}>
							<img src={f.photo} alt={f.name} className={classes.avatar} />
						</a>
					</li>
				);
			})}
		</ul>
	);
};

const useStyles = createUseStyles({
	root: {
		margin: 0,

		"&:hover $container": {
			marginRight: rhythm(0.3)
		}
	},
	container: {
		display: "inline-block",
		marginRight: rhythm(-1),

		transitionProperty: "margin-right",
		transitionDuration: "0.5s"
	},
	avatar: {
		border: "solid 1px #000",
		borderRadius: "100%",
		objectFit: "cover",
		width: rhythm(2),
		height: rhythm(2)
	}
});

export default FaceWall;
