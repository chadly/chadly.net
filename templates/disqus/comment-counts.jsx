import React from "react";

const CommentCounts = ({
	shortName
}) => {
	const markup = `
		<script type="text/javascript">
			var disqus_shortname = "${shortName}";

			(function () {
				var s = document.createElement('script'); s.async = true;
				s.type = 'text/javascript';
				s.src = '//' + disqus_shortname + '.disqus.com/count.js';
				(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
			}());
		</script>`;

	return <div dangerouslySetInnerHTML={{ __html: markup }} />;
};

module.exports = CommentCounts;