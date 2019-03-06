---
id: f579f8dc-9c6b-44a3-a4e9-78e00b626693
title: 'Making CivicSource.com: The Great Gatsby Edition'
date: '2019-03-06'
---

We recently made a big overhaul on [CivicSource.com](https://www.civicsource.com) that is largely under the covers. We converted (most of it) to a static site. That's right. Static HTML pages for what most would assume is a highly dynamic web application. It took a lot of persuasion to make this happen but the benefits clearly outweigh the cons...at least in our situation.

## Y Tho?

We had a lot of technical debt going into this project. It's not anybody's fault. It's just what happens when you have a lot of people working on the same codebase trying to meet deadlines and provide value to the business over 10 years.

Anyway, the homepage had a TTFB of around 2 seconds with usable times much higher than that. Even when the page did become usable, stuff was popping in below the fold after the fact for much longer. This was mostly due to the tech debt of aggregating data from multiple databases and multiple services and trying to display it all in a nice summary on the homepage. This is because of the tech debt and  due to the sprawling nature of all the things we do at civicsource. No tlc for civicsource.com. recent structural changes have allowed a small group of us to focus exclusively on civicsource.xom and Mae it better. Our first project was converting the site to Gatsby.

All those databases, slow queries, and multiple services calls could stay as slow as they wanted. With very little effort (relatively), we brought the homepage down from TTFB of 2 seconds to sub 100 Ms for a fully loaded usable page.

Serve from cdn with reverse proxy for legacy pages and API calls.