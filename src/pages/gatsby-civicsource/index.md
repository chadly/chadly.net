---
id: f579f8dc-9c6b-44a3-a4e9-78e00b626693
title: 'Making CivicSource.com: The Great Gatsby Edition'
date: '2019-03-06'
---

We recently made a big overhaul on [CivicSource.com](https://www.civicsource.com) that is largely under the covers. We converted (most of it) to a static site. That's right. Static HTML pages for what most would assume is a highly dynamic web application. It took a lot of persuasion to make this happen but the benefits clearly outweigh the cons...at least in our situation.

## Y Tho?

We had a lot of technical debt going into this project. It's not anybody's fault. It's just what happens when you have a lot of people working on the same codebase trying to meet deadlines and provide value to the business over 10 years.

Anyway, the homepage had a TTFB of around 2 seconds with usable times much higher than that. Even when the page did become usable, stuff was popping in below the fold after the fact for much longer. This was mostly due to the tech debt of aggregating data from multiple databases and multiple services and trying to display it all in a nice summary on the homepage. This is because of the tech debt and  due to the sprawling nature of all the things we do at civicsource. No tlc for civicsource.com. recent structural changes have allowed a small group of us to focus exclusively on civicsource.xom and Mae it better. Our first project was converting the site to Gatsby.

All those databases, slow queries, and multiple services calls could stay as slow as they wanted. With very little effort (relatively), we brought the homepage down from TTFB of 2 seconds to sub 100ms for a fully loaded usable page.

Serve from cdn with reverse proxy for legacy pages and API calls.

## What About the Dynamic Stuff?

There is still a lot on the site that is dynamic. For example:

* An entire section of the site (the _My Account_ pages) only shows up if you are logged in.
* We only show bid information and winning/losing statuses for an auction to the user who placed a bid.
* Statically serving the [search page](https://www.civicsource.com/auctions/), as much as we would love to prerender every permutation of search filters and queries, is not possible.

For all of this, Gatsby truly shines as we can still render all of that the way we were before. Basically, Gatsby prerenders the shell of the page (the stuff that is not dynamic) while the parts that are dynamic are rendered client-side. This can easily be done by making use of `componentDidMount` in class components (we haven't made the jump to hooks yet). `componentDidMount` is only called when the component actually mounts, so it won't be called while Gatsby is server-side-rendering. We make use of this by running `fetch`es in this function for our dynamic data.