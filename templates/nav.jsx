import React from "react";

const Navigation = ({ siteName }) => {
	return (
		<nav class="site navbar navbar-default navbar-fixed-top">
			<section>
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>

					<a href="/" class="navbar-brand">{siteName}</a>
				</div>

				<div class="collapse navbar-collapse">
					<ul class="nav navbar-nav navbar-right">
						<li><a href="/"><i class="fa fa-book"></i> Words</a></li>
						<li><a href="/about/"><i class="fa fa-user"></i> About</a></li>
						<li><a href="https://github.com/chadly"><i class="fa fa-github"></i> Github</a></li>
						<li><a href="https://twitter.com/wchadly"><i class="fa fa-twitter"></i> Twitter</a></li>
						<li><a href="https://keybase.io/chadly"><i class="fa fa-key"></i> Keybase</a></li>
						<li><a href="/feed.xml"><i class="fa fa-rss"></i> Subscribe</a></li>
					</ul>
				</div>
			</section>
		</nav>
	);
};

module.exports = Navigation;