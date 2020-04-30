---
id: 94965cd6-1e43-5c45-bb19-6274e1271a30
title: Purpose-Built Software
description: How I built my first site with Gatsby.
date: '2019-01-03'
twitterId: '1081285258207735808'
---

It's been [a little over a year](/ghost-on-azure/), so it's about that time where I switch the technology this site runs on. This time I went with the "modern stack" of [Gatsby](https://www.gatsbyjs.org/) & [Contentful](https://www.contentful.com/) to build the site and manage the content respectively.

### Y Tho?

I find it easier to rebuild this site and learn new technoligies rather than think of something to write about 😒.

https://twitter.com/vvoyer/status/1087705536714412032

Also, despite all the [cool new stuff in Ghost v2.0](https://blog.ghost.org/2-0/), I found the editor experience to be...less good -- not the goodest anymore. Maybe I just have stockholm syndrome, but I prefer plain old markdown to any kind of other editor. Ghost still _supports_ that, it's just not the core experience anymore.

--------------

I'm not going to go into how I built this site like I usually do as the [Gatsby documentation](https://www.gatsbyjs.org/docs/) is way better than anything I'm going to write. [Take a look at the repo](https://github.com/chadly/chadly.net) if you are interested and read up on the [gatsby blog starter](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/) and/or the [contentful starter](https://www.gatsbyjs.org/starters/contentful-userland/gatsby-contentful-starter/).

Instead, I'm going to talk about how I decided to setup the deployment/hosting for the site. I originally setup the site on Azure App Services as I'm already very familiar with it. I set it up pretty quickly with a CDN. It was no big deal but only because I had [already done it before](/ghost-on-azure/).

For continuous deployment of the site, I chose to look into the new [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) offering. I spent a good amount of time trying to figure out how to build my static site using Pipelines. I first had to decipher the difference between Pipelines vs Releases vs one of the six other tabs that pop up after you create a project. After wading through a lot of documentation, I did eventually figure it out and get it working. My little experiment broke down, however, when I was trying to get Contentful to trigger a build with a webhook. It seemed that scenario wasn't supported (or at least I couldn't figure it out before I got frustrated).

### Netlify: A Love Letter

That's when I discoverd [Netlify](https://www.netlify.com/). I've seen it before but never really looked deeper. I saw that Contentful supported triggering builds on Netlify and decided to read the little spiel on their website.

> Deploy your site in seconds

"Hmm, that sounds like a load of 💩. Let's try it." I thought.

I created my free account (from my Github account) and pointed it at my repository. It immediately figured out that I have a gatsby site and offered me a prepopulated build command. I pressed _Next_ and was taken to a build log where a minute later, my site was deployed to a netfliy subdomain.

Color me impressed.

I then started [reading up on their documentation](https://www.netlify.com/docs/) to make sure they support all the scenarios I care about: [HSTS](https://www.netlify.com/docs/ssl/), [CDN caching](https://www.netlify.com/blog/2017/02/23/better-living-through-caching/), and [`301` redirects](https://www.netlify.com/docs/redirects/). Not only do they support those scenarios, they are all already enabled and working with sane defaults right out of the box without me having to do anything.

I think I found my new favorite hosting service.

### Do One Thing

Netlify is purposely built exactly for my scenario. Azure Pipelines _supports_ my scenario...along with a whole lot of other scenarios that I have no interest in. Rather than make me think the software was powerful; my first impression was just "this is hard to use."

As a developer myself, I can appreciate how hard it is to build software like Netlify -- software that "just works," free from bloat and focused on solving a specific problem; software that focuses on the user experience over ticking boxes on how many features it supports. Don't get me wrong. Netlify still supports a lot of scenarios, but the user experience is focused and the breadth of features unfolds after the core goal of deploying a site is met.

> A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away. -- Antoine de Saint-Exupery

Quit adding features to your software. Don't try to be everything to everyone. Focus on your core user experience instead. [It matters more than you may think](/user-experience-matters-more-than-you-think/).

<Alert type="info" title="Aside">

I hate to pick on Azure Pipelines here. It is definitely not the first example I would pick when thinking of bloated software. I still may end up using it in the future when I need to build a "real app." It just made a good foil in this particular scenario.

</Alert>