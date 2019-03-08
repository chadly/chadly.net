---
id: ff3cc1e9-d1f2-41ed-b4c7-4ff1c0fa986b
title: Embracing the IndieWeb
date: '2019-03-07'
twitterId: '1103803489212354560'
---

I've used Disqus comments on this site for a long time. At the time I set it up, it was ubiquitous, easy to set up, and a no-brainer. However, after [converting my site to Gatsby](/purpose-built-software/) and getting the site to load _Blazing Fast™_, the Disqus embed code was the slowest thing on my site. It's gotten fat over the years and like a bad husband, I'm finally dumping it.

I don't remember how I stumbled upon it, but the inspiration for this change came from the [IndieWeb](https://indieweb.org/), a group of hipsters with websites trying to take down THE MAN (aka the "corporate web"). I read through a bunch of their stuff and got really into it.

Anyway, long story short, I decided to go with the distributed & standards-based [WebMentions](https://indieweb.org/Webmention):

https://twitter.com/nhoizey/status/1017828818441134087

This gives me control over my content again, doesn't subject my visitors to a bunch of ad-tracking nonsense, and allows me to remove bloat which was slowing my pages down.

## Migrating Existing Comments

I have a fair amount of comments from Disqus that I don't want to lose. I thought about a bunch of different ways to pull over that comment data. I eventually settled on this workflow:

* [Export comment data from Disqus](https://help.disqus.com/developer/comments-export)
* Save the exported XML (ugh) to source control
* Use a [gatsby-source plugin](https://github.com/chadly/gatsby-source-disqus-xml) to convert the XML to GraphQL so that it can be easily used throughout the site

That last step was the hardest one as a plugin didn't exist to do what I wanted. I ended up writing it myself and am now [sharing it with you](https://github.com/chadly/gatsby-source-disqus-xml), dear reader. I did throw it together very quickly and it works very well for my use-case but if you have improvements, don't hesitate to [open a PR](https://github.com/chadly/gatsby-source-disqus-xml/compare?expand=1).

## The New Hotness

In order to get WebMentions working, I made use of [Chris Biscardi's plugin](https://www.christopherbiscardi.com/post/building-gatsby-plugin-webmentions) along with [webmention.io](https://webmention.io/) and [brid.gy](https://brid.gy/). The former takes care of the nitty gritty of accepting webmentions while the latter converts "normal social media activity" into webmentions. They are both OSS IndieWeb projects which means I don't have to worry about them messing with my data or all-of-a-sudden barfing ads all over me and my visitors.

The workflow goes something like this:

* I write a pretty cool post
* I post a link to the post on Twitter (or [_POSSE_](https://indieweb.org/POSSE) if you are into weird acronyms)
* Maybe a few people read it, maybe someone likes or replies to my tweet
* Bridgy looks at the post linked in my tweet, loads the `link` tag pointing it to webmention.io, and sends a WebMention
* My site rebuilds nightly pulling data from webmention.io, mixing it with my "legacy" Disqus comment data and rendering it all via normal React components which I control
* Or also, maybe someone sends over an actual WebMention not from one of those evil social media sites. That would work, too, I guess.

I'm pretty happy with the way it all turned out even though, effectively, until WebMentions proper becomes more ubiquitous, I'm effectively just outsourcing my comments to Twitter now.

...

<small>Fuck the man.</small>
