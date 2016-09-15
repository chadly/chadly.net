import React from "react";
import moment from "moment";

import fs from "fs";
import path from "path";
import random from "random-js";

const covers = fs.readdirSync(path.join(__dirname, "../contents/covers/"));
const rando = random();

const Hero = ({
	cover,
	title,
	description,
	created,
	updated
}) => {
	const descEl = description ? <h2>{description}</h2> : null;

	const updatedEl = updated ? (
		<time dateTime={moment(updated).utc().format("YYYY-MM-DD")} itemProp="dateModified">
			Updated on
			{" "}
			{moment(updated).utc().format("MMMM DD, YYYY")}
		</time>
	) : null;

	const createdEl = created ? (
		<div>
			<time dateTime={moment(created).utc().format("YYYY-MM-DD")} itemProp="datePublished">
				Published on
				{" "}
				{moment(created).utc().format("MMMM DD, YYYY")}
			</time>
			{updatedEl}
		</div>
	) : null;

	if (!cover) {
		const index = rando.integer(1, covers.length) - 1; 
		cover = `/covers/${covers[index]}`;
	}

	const style = {
		"backgroundImage": `url(${cover})`
	};

	return (
		<header style={style} className="site">
			<div className="container">
				<section>
					<h1>{title}</h1>
					{descEl}
					{createdEl}
				</section>
			</div>
		</header>
	);
};

module.exports = Hero;