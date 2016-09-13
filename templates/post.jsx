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
	date,
	contents,
	path
}) => {
	const fullUrl = `${url}${path}/`;

	const twitterLink = `http://twitter.com/share?text=${title}&url=${fullUrl}`;
	const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`;
	const gplusLink = `https://plus.google.com/share?url=${fullUrl}`;
	const hnLink = `http://news.ycombinator.com/submitlink?u=${fullUrl}&t=${title}`;

	return (
		<div>
			<Navigation siteName={name} />
			<Hero title={title} description={date} />

			<main class="site" role="main">
				<article class="post" itemscope itemtype="http://schema.org/BlogPosting">
					<section class="post-content" itemprop="articleBody">
						{contents}
					</section>

					<footer>
						<section class="share">
							<h4>Share this post</h4>
							<a class="icon fa fa-twitter" href={twitterLink} title="Twitter" onclick="window.open(this.href, 'twitter-share', 'width=550,height=235');return false;"></a>
							<a class="icon fa fa-facebook" href={fbLink} title="Facebook" onclick="window.open(this.href, 'facebook-share','width=580,height=296');return false;"></a>
							<a class="icon fa fa-google-plus" href={gplusLink} title="Google+" onclick="window.open(this.href, 'google-plus-share', 'width=490,height=530');return false;"></a>
							<a class="icon" href={hnLink} title="Hacker News" onclick="window.open(this.href, 'hn-share', 'width=580,height=530');return false;">Y</a>
						</section>
					</footer>

					{/*{{#if disqus}}
					<div id="disqus_thread" class="post-comments"></div>
					<script type="text/javascript">
						var disqus_shortname = '{{disqus}}';
							var disqus_title = '{{title}}';

							{{#if disqus.identifier}}
							var disqus_identifier = '{{disqus.identifier}}';
								{{else}}
								{{#if disqus.url}}
								var disqus_url = '{{disqus.url}}';
									{{else}}
								var disqus_identifier = '{{id}}';
									{{/if}}
								{{/if}}

								(function() {
									var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
									dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
									(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
								})();
					</script>
					<noscript>Please enable JavaScript to view the
						<a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a>
					</noscript>
					<a href="http://disqus.com" class="dsq-brlink">comments powered by
						<span class="logo-disqus">Disqus</span>
					</a>
					{{/if}}*/}
				</article>
			</main>
		</div>
	);
};

module.exports = Post;