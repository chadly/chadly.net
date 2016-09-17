import React from "react";
import moment from "moment";

import fs from "fs";
import path from "path";
import random from "random-js";

const covers = fs.readdirSync(path.join(__dirname, "../contents/covers/"));
const rando = random();

const Hero = ({
	cover,
	headerClass,
	title,
	description,
	date
}) => {
	const descEl = description ? <h2>{description}</h2> : null;
	const dateEl = date ? (
		<time dateTime={moment(date).utc().format("YYYY-MM-DD")} itemProp="datePublished">
			<i className="fa fa-calendar"></i>
			{" "}
			{moment(date).utc().format("MMMM DD, YYYY")}
		</time>
	) : null;

	if (!cover) {
		const index = rando.integer(1, covers.length) - 1; 
		cover = `/covers/${covers[index]}`;
	}

	const style = {
		"backgroundImage": `url(${cover})`
	};

	return (
		<header style={style} className={headerClass}>
			<div className="container">
				<section>
					<h1>{title}</h1>
					{descEl}
					{dateEl}
				</section>
			</div>
		</header>
	);
};

module.exports = Hero;