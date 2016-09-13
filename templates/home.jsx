import React from "react";
import Hero from "./hero";
import Navigation from "./nav";
import Posts from "./posts";

const Home = ({
	metadata: {
		author,
		name,
		disqus
	},
	contents: intro,
	posts
}) => {
	return (
		<div>
			<Navigation siteName={name} />
			<Hero title={author.name} description={author.tagline} />

			<main class="site" role="main">
				<section class="intro">
					{intro}
				</section>

				<section class="post-list" itemscope itemtype="http://schema.org/Blog">
					<h4>Read Stuff</h4>
					<Posts posts={posts} />
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