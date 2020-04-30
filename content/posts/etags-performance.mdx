---
id: 4a004ef5-b2da-54d7-8589-363ea3f4edf5
title: Why ETags Might Not Be Helping Your Site Performance
description: How I disabled ETags to get better caching with Ghost.
date: '2017-08-19'
twitterId: '898951056557834240'
---

I spent a lot of time trying to get the caching for this site right. I had [very specific goals in mind](/ghost-on-azure/#final-product) with the caching and I think I achieved them. But I had to disable [etags](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) to do it.

## What do ETags do anyway?

HTTP provides a number of different cache headers that servers can utilize to control how clients will cache their content including:

* [`cache-control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
* [`last-modified`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified)
* [`etag`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)

<Alert type="info" title="Aside">

I'm only really going to be talking about `cache-control: max-age` vs `etag`. ETags are basically a more precise version (depending on how the server implements it) of the `last-modified` header which only has precision to the nearest second.

</Alert>

What those headers basically boil down to is two different strategies for caching:

* Tell the client this content is good for an amount of time and it shouldn't worry about getting new content until that time has passed.
    * For cache hits, the client will avoid a network request completely.
    * If the content changes on the server before the cache expires, the client will be using stale data.
* Tell the client to keep a copy of the content but check with the server if the content is still fresh.
    * For cache hits, this requires a network request to contact the server, but avoids bandwidth costs of re-downloading.
    * Depending on the size of the content, the overhead of the request, and how the server calculates whether or not the content is stale, it might take the same amount of time & resources to do this as just redownloading the content in the first place.

<Alert type="info" title="Note">

_Client_ can refer to the user's browser and/or can also refer to any reverse proxies & caches that your content passes through along the way to the user.

</Alert>

Each caching strategy will provide different benefits to different parties. Is the goal to provide the most up-to-date data to the client, reduce the compute resources necessary on the server, or maybe reduce the network footprint for the client? Your answer may be different for different types of content.

## Saving Requests vs Saving Bytes

Reducing the amount of bytes the client has to download won't always offer the best performance if the client has to make a lot of small requests to figure out that its cached data is good. It really depends on the type of data you are serving.

If you are serving large static files (e.g. photography), the overhead of making a request will probably be very small compared to the cost of redownloading a high-res photo. Any modern server is also pretty optimized to calculate etags on static files. In this case, an etag might make sense to allow the client to use cached data most of the time but be able to refresh its data if you touch up or edit the photo.

On the other extreme, if you are serving lots of smaller files (e.g. images, HTML, javascript files - a typical website in other words), the overhead of making a request to check the status of an etag might not be any faster than not caching at all. This would only be true if the bottleneck is the requests and not the size of the content.

So, using etags _might_ provide the client with performance gains, but if not, it won't be any worse than not caching at all. Sounds like a good case to enable etags by default to provide the client cached, not stale data.

## Relieving Server Pressure

But all this talk of making the client's life easier is a moot point for me. For this particular site, I care not about the client and all of its wants & needs. I am less worried about serving stale data and more worried about my server being able to handle the traffic.

The traffic to this blog can best be described as a trickle of water with the occasional tsunami. Because of this fact, [I am very cheap](/ghost-on-azure/) when it comes to the hosting for this site because, most of the time, I don't need much to keep it up. But, at the same time, I want it to stay up if and when there is a large traffic spike.

### Ghost & ETags

This site is run on [Ghost](https://ghost.org/). Before I get into the changes I made to Ghost to support my caching strategy, one needs to understand how Ghost calculates an etag.

All of the Ghost frontend (the homepage & posts & such) is generated dynamically from a database. For all of this dynamic content, Ghost relies on [Express](https://expressjs.com/) to generate etags. Express calculates etags the only way it can. It only gets access to the content after the response body is completely written. So, in order for Express to calculate an etag, Ghost has to query the database, build a model, render a view, etc. It basically has to do all the work it would normally do and then pass it off to Express. Once Express gets the response body, and it sees that the client sent an [`if-none-match`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match) header with an etag, it may decide to just discard all that and tell the client `304 Not Modified`.

This may (or maybe not - see above) be good for the client to not have to download the data again. But it sucks for my server. From the server perspective, it is doing all the same work for both cache hits and misses. This approach will not scale with more traffic.

Now, that previous description isn't completely fair. I'm sure Ghost does some of its own in-memory caching of posts so that it doesn't have to do _all_ of that work every single time a post is requested (I actually haven't looked). But, that is not the point. Even if it was super efficient and, after the first request for a post, simply returned an in-memory string of the response body to Express to generate an etag, it would still cost more resources than it should (more than a static site which is what I am comparing). The request has to go through three processes & pipelines to get to that point: IIS, then [iisnode](https://github.com/tjanczuk/iisnode), and finally through the node app itself. That may not be that big of a deal most of the time, but at some point, it will become the bottleneck.

### Kill All the ETags

Long story short, I ended up removing all of the `etag` & `last-modified` headers that Ghost generates. I wanted the CDN reverse proxy in front of this site to be able to serve the site completely (as long as it is in cache) even if the underlying site is down.

This gives me a happy server at the expense of serving stale data sometimes. I have the cache `max-age` set to 20 hours, so it may be that long before a new post shows up on the homepage. I am happy with that trade-off. I wanted the benefits of a fast static site without the drawbacks of being a pain in the ass to modify. I accomplish that with a reverse proxy ([Azure CDN](https://azure.microsoft.com/en-us/services/cdn/)) with `max-age` cache headers, not etags.

It wasn't the most pleasant experience finding & disabling etags all throughout the Ghost codebase. I am going to open an issue / PR to see about making it a config option so that you, dear reader, who also may want to host a really fast Ghost site cheaply, don't have to suffer as I have.