---
id: be3e9ed2-e3ce-56ce-92ff-dc214ff0215f
title: Lightbox for YouTube Videos
date: '2009-01-29'
redirect_from:
  - /post/2009/01/29/Lightbox-for-YouTube-Videos.aspx
  - /2009/01/lightbox-for-youtube-videos
  - /demos/video-lightbox.html
---

On one of my recent projects, I needed to embed YouTube videos on a page using a lightbox-type plugin.  Naturally, the first thing I do when confronted with something like this is to hit up Google.  I ended up finding a few different solutions.

First off was [Videobox](http://videobox-lb.sourceforge.net/) - this is exactly what I wanted -- but ehh, it uses mootools.  Nothing against mootools, its a great little framework - but the whole site where this is going is already using jQuery.

Next I found [CeeBox](http://catcubed.com/2008/12/23/ceebox-a-thickboxvideobox-mashup/) - ahh - exactly what I want.  This guy took Videobox and ported all the best parts over to jQuery.  But, oh wait, it uses the [Thickbox](http://jquery.com/demo/thickbox/) plugin.  I forgot to mention that the site is already using the [FancyBox](http://fancyapps.com/fancybox/) plugin for images in other places and I'd like to keep the interface consistent.

Ok, so what I ended up doing was doing the same thing Ceebox did except with Fancybox.  I only added support for YouTube because that is all I needed at the moment ([YAGNI](http://en.wikipedia.org/wiki/You_Ain%27t_Gonna_Need_It), right?).

I think the end result turned out really nice.  All you need to do is include a link to the original YouTube video like so:

```html
<a rel="fancyvideo" href="http://www.youtube.com/watch?v=rP-2ksWFk4o">Pop me up</a>
```

Then just wire up the script to all links with `rel="fancyvideo"`:

```javascript
$(document).ready(function() {
    $("a[@rel*=fancyvideo]").fancybox({
        overlayShow: true,
        frameWidth:640,
        frameHeight:360
    });
});
```

This has the great advantage of gracefully scaling down for browsers with javascript disabled and just providing a link to the video.  For those with javascript enabled, the script automatically detects the link to YouTube (via regex) and handles embedding the video into a nice little popup window.

You can see a <a href="https://www.youtube.com/watch?v=rP-2ksWFk4o" rel="fancyvideo">demo of it here</a> and ~~get the files here~~.

<div class="alert alert-warning">
<i class="fa fa-exclamation-circle" title="Update"></i>

[Fancybox](http://fancyapps.com/fancybox/) now supports Youtube videos natively negating the need for the modified fancybox files here.

</div>