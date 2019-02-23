---
id: a73860b0-92cf-514f-81a2-a469e1c64a0c
title: User experience matters more than you think
date: '2013-10-18'
redirect_from:
  - /2013/10/user-experience-matters-more-than-you-think
---

So there is this [new blog engine](http://ghost.org/) in town that [maybe you have heard of](http://www.kickstarter.com/projects/johnonolan/ghost-just-a-blogging-platform)? If not, don't fret, I only heard about it when they made their [public release](http://blog.ghost.org/public-launch/) just a few days ago.

Well, apparently, when the internet heard about this idea for a new blogging engine, it went insane. John O'Nolan convinced over 5000 people to give him over $300,000 with just a couple of pretty screenshots.

I joke, yet I'm astounded how much money this little open-source-project-that-could has made. I think what has gotten a lot of people excited is the focus on the user experience. If you have tried to setup a Wordpress blog recently, it can be quite daunting to someone who "just wants to blog." The promise Ghost makes with its pretty screenshots is an experience that doesn't suck. And apparently, we deal with [so much shitty software](/2009/07/we-make-shitty-software-and-so-do-you/) everyday, that this resonated with a lot of people.

I have traditionally been a "backend guy" (if that is a thing) focusing on things like <abbr title="Domain Driven Design">DDD</abbr>, <abbr title="Behavior Driven Development">BDD</abbr>, messaging with distributed systems, etc. - you know, "backend" stuff. I always thought these things were more important than things like the user interface. I'm slowly coming to realize just how wrong that idea is.

I've been a proponent lately of designing systems/applications from the top down. In the past, I would take the opposite approach - get the backend up and running and worry about the UI later. However, when designing for the user experience first - coming up with the frontend before the backend - I've found it leads to much better software and a much different backend than you might have originally designed.

Take ghost for example, they spent a lot of time on their post editor and it shows. It _really is_ the "best writing experience on the web." As of right now, there is not much to ghost _besides_ the post editor. Once you get it running though, you can see that a lot of thought went into how users use software like this and they implemented something really nice. It is so good, that people all over the internet paid money for it on just a screenshot.

As you may or may not have realized, I, too, have drunk the koolaid and am running ghost on this site via Azure websites with [help from Jeremiah Billmann](http://www.jbillmann.com/installing-ghost-on-azure-web-sites/). It is very clean and elegant. Hype validated.

It is written in nodeJS which I have been spending more and more time with lately. Now I can get some hipster cred when someone asks me "Cool blog, is this Wordpress or something?" I can respond "Nah dude, this is in node," while skateboarding off into the sunset, doing mad flips and stuff.

![skateboarding off into the sunset with node](./skateboard.jpg)

Just imagine Jesse Pinkman saying it…