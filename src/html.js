import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const Html = ({ htmlAttributes, ...props }) => {
	const renderedChildren = renderToStaticMarkup(<Root {...props} />);

	return (
		<html
			{...htmlAttributes}
			dangerouslySetInnerHTML={{
				__html: `
<!-----------------------------------------------------------------------
					Oh, well hello, fellow developer

You have found the super secret source code to this site. Venture deeper
if you dare. Beware the 🐉 though. He lives deep within the nested divs.

Honestly, if you really want to see the source for this site, check it out
on GitHub: https://github.com/chadly/chadly.net. It's OSS and all this HTML/JS
is optimized and not that readable.

Want to know how to add a message like this to your Gatsby site? Checkout
https://www.chadly.net/gastby-html-comment/
------------------------------------------------------------------------>
				${renderedChildren}
			`
			}}
		/>
	);
};

const Root = ({
	headComponents,
	bodyAttributes,
	preBodyComponents,
	body,
	postBodyComponents
}) => (
	<>
		<head>
			<meta charSet="utf-8" />
			<meta httpEquiv="x-ua-compatible" content="ie=edge" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no"
			/>
			{headComponents}
		</head>
		<body {...bodyAttributes}>
			{preBodyComponents}
			<div
				key={`body`}
				id="___gatsby"
				dangerouslySetInnerHTML={{ __html: body }}
			/>
			{postBodyComponents}
		</body>
	</>
);

export default Html;
