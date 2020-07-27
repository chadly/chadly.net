import React from "react";

const EditPageLink = ({ githubLink, fileAbsolutePath, className }) => {
	const idx = fileAbsolutePath.indexOf("content/posts");

	if (idx < 0) return null;

	const url = `${githubLink}/edit/master/${fileAbsolutePath.substring(idx)}`;

	return (
		<a
			aria-hidden="true"
			className={className}
			href={url}
			title="Suggest an edit on Github"
		>
			✏️
		</a>
	);
};

export default EditPageLink;
