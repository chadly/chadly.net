import React from "react";
import Hero from "./hero";
import Navigation from "./nav";
import Posts from "./posts";

const Post = ({
	metadata: {
		author,
		name,
		disqus,
		url
	},
	title,
	tagline,
	contents,
	path,
	cover,
	created,
	updated
}) => {
	const fullUrl = `${url}${path}/`;

	const twitterLink = `http://twitter.com/share?text=${title}&url=${fullUrl}`;
	const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`;
	const gplusLink = `https://plus.google.com/share?url=${fullUrl}`;
	const hnLink = `http://news.ycombinator.com/submitlink?u=${fullUrl}&t=${title}`;

	return (
		<div>
			<Navigation siteName={name} />
			<Hero title={title} description={tagline} cover={cover} created={created} updated={updated} />

			<main className="site" role="main">
				<article className="page">
					<section className="page-content" dangerouslySetInnerHTML={{ __html: contents }} />
				</article>
			</main>
		</div>
	);
};

module.exports = Post;