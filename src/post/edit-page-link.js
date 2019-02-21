import React from "react";

const EditPageLink = ({ githubLink, fileAbsolutePath, className }) => {
	const idx = fileAbsolutePath.indexOf("src/pages");

	if (idx < 0) return null;

	const url = `${githubLink}/edit/master/${fileAbsolutePath.substring(idx)}`;

	return (
		<a
			aria-hidden="true"
			className={className}
			href={url}
			title="Suggest an edit on Github"
		>
			<i className="fas fa-pencil-alt" />
		</a>
	);
};

export default EditPageLink;
