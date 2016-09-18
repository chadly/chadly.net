import React from "react";

const Comments = ({
	shortName,
	id,
	title
}) => {
	const disqusMarkup = `
		<script type="text/javascript">
			var disqus_shortname = "${shortName}";
			var disqus_title = "${title}";
			var disqus_identifier = "${id}";

			(function() {
				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			})();
		</script>
	`;

	return (
		<div>
			<div id="disqus_thread" className="post-comments"></div>

			<div dangerouslySetInnerHTML={{ __html: disqusMarkup }} />

			<noscript>
				Please enable JavaScript to view the
				<a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a>
			</noscript>

			<a href="http://disqus.com" className="dsq-brlink">
				comments powered by
				<span className="logo-disqus">Disqus</span>
			</a>
		</div>
	);
};

module.exports = Comments;