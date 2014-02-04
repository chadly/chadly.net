---
id: 5a50c63f-f3ee-4a42-a34d-54d71baca567
title: Geocoding.net v3 Released
author: chad
date: 2013-12-27
template: post.hbs
nav: blog
disqus: 
  identifier: /2013/12/geocoding-v3
---

I decided to give my oft-neglected little project, [Geocoding.net](https://github.com/chadly/geocoding.net), some love the past couple of days since I have some time off from work.

If you are not familiar with it, it is a thin wrapper around three popular geocoding APIs. From the readme:

> The API returns latitude/longitude coordinates and normalized address information. This can be used to perform address validation, real time mapping of user-entered addresses, distance calculations, and much more.

The result is some long overdue fixes and some new features -- the most exciting of which is support for `async` tasks thanks to [Manuel Guilbault](https://github.com/manuel-guilbault). See the [full changelog](https://github.com/chadly/Geocoding.net/releases/tag/v3.0.0).

Get it from [nuget](https://www.nuget.org/packages/Geocoding.net/):

```
Install-Package Geocoding.net
```
