import React from "react";
import Hero from "./hero";
import Navigation from "./nav";
import Posts from "./posts";

const Home = ({
	metadata: {
		author,
		name,
		url,
		disqus,
		posts
	},
	contents: intro
}) => {
	return (
		<div>
			<Navigation siteName={name} />
			<Hero title={author.name} description={author.tagline} />

			<main className="site" role="main">
				<section className="intro" dangerouslySetInnerHTML={{ __html: intro }} />

				<section className="post-list" itemscope itemtype="http://schema.org/Blog">
					<h4>Read Stuff</h4>
					<Posts posts={posts} siteUrl={url} enableDisqus={!!disqus} />
				</section>

				{/*
				{{#if disqus}}
				<script type="text/javascript">
					var disqus_shortname = '{{disqus}}';

					(function () {
						var s = document.createElement('script'); s.async = true;
						s.type = 'text/javascript';
						s.src = '//' + disqus_shortname + '.disqus.com/count.js';
						(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
					}());
				</script>
				{{/if}}
				*/}
			</main>
		</div>
	);
};

module.exports = Home;