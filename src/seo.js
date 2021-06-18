import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

const Seo = ({ title, description, image, article, profile }) => {
	const { pathname } = useLocation();

	const {
		site: {
			siteMetadata: { siteUrl }
		},
		file: {
			childMdx: {
				author: { twitter, avatar }
			}
		}
	} = useStaticQuery(graphql`
		query SeoQuery {
			site {
				siteMetadata {
					siteUrl
				}
			}
			file(sourceInstanceName: { eq: "author" }, extension: { eq: "mdx" }) {
				childMdx {
					author: frontmatter {
						twitter
						avatar {
							img: childImageSharp {
								fixed(width: 300) {
									src
								}
							}
						}
					}
				}
			}
		}
	`);

	const url = `${siteUrl}${pathname || "/"}`;
	const imageUrl = image
		? `${siteUrl}${image}`
		: `${siteUrl}${avatar.img.fixed.src}`;
	const isLargeImage = !!image;

	return (
		<Helmet htmlAttributes={{ lang: "en" }}>
			<link rel="canonical" href={url} />

			{title ? <title>{title}</title> : null}
			{description ? <meta name="description" content={description} /> : null}
			{imageUrl ? <meta name="image" content={imageUrl} /> : null}

			{url ? <meta property="og:url" content={url} /> : null}

			<meta
				property="og:type"
				content={article ? "article" : profile ? "profile" : "website"}
			/>

			{article && article.published ? (
				<meta property="article:published_time" content={article.published} />
			) : null}
			{article && article.modified ? (
				<meta property="article:modified_time" content={article.modified} />
			) : null}
			{article ? (
				<meta property="article:section" content="Software Development" />
			) : null}
			{article ? (
				<meta property="article:author" content={`${siteUrl}/`} />
			) : null}

			{profile && profile.name ? (
				<meta
					property="profile:first_name"
					content={profile.name.split(" ")[0]}
				/>
			) : null}
			{profile && profile.name ? (
				<meta
					property="profile:last_name"
					content={profile.name.split(" ")[1]}
				/>
			) : null}
			{profile && profile.username ? (
				<meta property="profile:username" content={profile.username} />
			) : null}
			{profile && profile.gender ? (
				<meta property="profile:gender" content={profile.gender} />
			) : null}

			{imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
			{title ? <meta property="og:title" content={title} /> : null}
			{description ? (
				<meta property="og:description" content={description} />
			) : null}

			<meta
				name="twitter:card"
				content={isLargeImage ? "summary_large_image" : "summary"}
			/>
			{twitter ? <meta name="twitter:creator" content={`@${twitter}`} /> : null}
			{title ? <meta name="twitter:title" content={title} /> : null}
			{description ? (
				<meta name="twitter:description" content={description} />
			) : null}
			{imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}
		</Helmet>
	);
};

export default Seo;
