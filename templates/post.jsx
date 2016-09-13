import React from "react";
import Hero from "./hero";
import Navigation from "./nav";
import Comments from "./disqus/comments";
import { get } from "lodash";

const Post = ({
	metadata: {
		author,
		name,
		disqus: disqusShortName,
		url
	},
	id,
	title,
	tagline,
	date,
	contents,
	path,
	cover,
	disqus
}) => {
	const fullUrl = `${url}${path}/`;

	const twitterLink = `http://twitter.com/share?text=${title}&url=${fullUrl}`;
	const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`;
	const gplusLink = `https://plus.google.com/share?url=${fullUrl}`;
	const hnLink = `http://news.ycombinator.com/submitlink?u=${fullUrl}&t=${title}`;

	const comments = disqusShortName ? <Comments shortName={disqusShortName} id={id} title={title} url={get(disqus, "url")} identifier={get(disqus, "identifier")} /> : null;

	return (
		<div>
			<Navigation siteName={name} />
			<Hero title={title} description={tagline} date={date} cover={cover} />

			<main className="site" role="main">
				<article className="post" itemScope itemType="http://schema.org/BlogPosting">
					<section className="post-content" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: contents }} />

					<footer>
						<section className="share">
							<h4>Share this post</h4>
							<a className="icon fa fa-twitter" href={twitterLink} title="Twitter" onclick="window.open(this.href, 'twitter-share', 'width=550,height=235');return false;"></a>
							<a className="icon fa fa-facebook" href={fbLink} title="Facebook" onclick="window.open(this.href, 'facebook-share','width=580,height=296');return false;"></a>
							<a className="icon fa fa-google-plus" href={gplusLink} title="Google+" onclick="window.open(this.href, 'google-plus-share', 'width=490,height=530');return false;"></a>
							<a className="icon" href={hnLink} title="Hacker News" onclick="window.open(this.href, 'hn-share', 'width=580,height=530');return false;">Y</a>
						</section>
					</footer>

					{comments}
				</article>
			</main>
		</div>
	);
};

module.exports = Post;