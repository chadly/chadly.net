import React from "react";
import Hero from "./hero";
import Navigation from "./nav";
import Posts from "./posts";
import DisqusCommentCounts from "./disqus/comment-counts";

const Home = ({
	metadata: {
		author,
		name,
		url,
		disqus,
		posts
	},
	contents: intro,
	cover
}) => {
	const disqusMarkup = disqus ? <DisqusCommentCounts shortName={disqus} /> : null;

	return (
		<div>
			<Navigation siteName={name} />
			<Hero title={author.name} description={author.tagline} cover={cover} />

			<main className="site" role="main">
				<section className="intro" dangerouslySetInnerHTML={{ __html: intro }} />

				<section className="post-list" itemScope={true} itemType="http://schema.org/Blog">
					<h4>Read Stuff</h4>
					<Posts posts={posts} siteUrl={url} enableDisqus={!!disqus} />
				</section>

				{disqusMarkup}
			</main>
		</div>
	);
};

module.exports = Home;