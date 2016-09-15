import React from "react";

const Navigation = ({ siteName }) => {
	return (
		<nav className="site navbar navbar-default navbar-fixed-top">
			<section>
				<div className="navbar-header">
					<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>

					<a href="/" className="navbar-brand">{siteName}</a>
				</div>

				<div className="collapse navbar-collapse">
					<ul className="nav navbar-nav navbar-right">
						<li><a href="/"><i className="fa fa-book"></i> Words</a></li>
						<li><a href="/about/"><i className="fa fa-user"></i> About</a></li>
						<li><a href="https://github.com/chadly"><i className="fa fa-github"></i> Github</a></li>
						<li><a href="https://twitter.com/wchadly"><i className="fa fa-twitter"></i> Twitter</a></li>
						<li><a href="https://keybase.io/chadly"><i className="fa fa-key"></i> Keybase</a></li>
						<li><a href="/feed.xml"><i className="fa fa-rss"></i> Subscribe</a></li>
					</ul>
				</div>
			</section>
		</nav>
	);
};

module.exports = Navigation;