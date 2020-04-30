import React from "react";
import { createUseStyles } from "react-jss";

const Alert = ({ type = "info", title, children, className, ...props }) => {
	const classes = useStyles();

	return (
		<div
			className={`${classes[`alert-${type}`]} ${className || ""}`}
			{...props}
		>
			<Icon type={type} />
			<div className={classes.content}>
				{title ? <h4>{title}</h4> : null}
				{children}
			</div>
		</div>
	);
};

const Icon = ({ type, title }) => {
	if (type == "info") {
		return <i title={title} className="fas fa-info-circle" />;
	}

	if (type == "warning") {
		return <i title={title} className="fas fa-exclamation-circle" />;
	}

	return null;
};

const useStyles = createUseStyles({
	alert: {
		padding: "15px",
		marginBottom: "20px",
		border: "1px solid transparent",
		borderRadius: "4px",
		display: "flex",
		alignItems: "flex-start",

		"& .fas": {
			padding: "0 0.5em 0 0.2em",
			opacity: 0.2,
			fontSize: "1.5em"
		}
	},

	content: {
		"& h4": {
			marginTop: "0.25em",
			color: "inherit"
		},

		"& a": {
			fontWeight: "bold"
		},

		"& > p, & > ul": {
			marginBottom: 0
		},

		"> p + p": {
			marginTop: "5px"
		}
	},

	"alert-success": {
		composes: "$alert",
		color: "#3c763d",
		backgroundColor: "#dff0d8",
		borderColor: "#d6e9c6",

		"& hr": {
			borderTopColor: "#c9e2b3"
		},

		"& a": {
			color: "#2b542c"
		}
	},

	"alert-info": {
		composes: "$alert",
		color: "#31708f",
		backgroundColor: "#d9edf7",
		borderColor: "#bce8f1",

		"& hr": {
			borderTopColor: "#a6e1ec"
		},

		"& a": {
			color: "#245269"
		}
	},

	"alert-warning": {
		composes: "$alert",
		color: "#8a6d3b",
		backgroundColor: "#fcf8e3",
		borderColor: "#faebcc",

		"& hr": {
			borderTopColor: "#f7e1b5"
		},

		"& a": {
			color: "#66512c"
		}
	},

	"alert-danger": {
		composes: "$alert",
		color: "#a94442",
		backgroundColor: "#f2dede",
		borderColor: "#ebccd1",

		"& hr": {
			borderTopColor: "#e4b9c0"
		},

		"& a": {
			color: "#843534"
		}
	}
});

export default Alert;
