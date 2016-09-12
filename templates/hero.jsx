import React from "react";
import moment from "moment";

const Hero = ({
	cover,
	headerClass,
	title,
	description,
	date
}) => {
	const descEl = description ? <h2>{description}</h2> : null;
	const dateEl = date ? (
		<time datetime={moment(date).format("YYYY-MM-DD")} itemprop="datePublished">
			<i class="fa fa-calendar"></i>
			{moment(date).format("YYYY-MM-DD")}
		</time>
	) : null;

	const style = {
		"backgroundImage": "url(lodyas.png)"
	};

	return (
		<header style={style} class={headerClass}>
			<div class="container">
				<div class="row">
					<div class="col-md-8 col-md-offset-2">
						<section>
							<h1>{title}</h1>
							{descEl}
							{dateEl}
						</section>
					</div>
				</div>
			</div>
		</header>
	);
};

module.exports = Hero;