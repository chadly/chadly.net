import React from "react";

const EditPageLink = ({ githubLink, fileAbsolutePath, className }) => {
	const idx = fileAbsolutePath.indexOf("src/pages");

	if (idx < 0) return null;

	const url = `${githubLink}/edit/master/${fileAbsolutePath.substring(idx)}`;

	return (
		<a className={className} href={url} title="Suggest an edit on Github">
			Suggest Edit
		</a>
	);
};

export default EditPageLink;
