---
id: 10939e77-9455-414f-8fa2-31a22f9c4395
title: Epson GT-S50 on Linux Mint
date: 2014-02-02
template: post.hbs
nav: blog
disqus: 
  identifier: /2014/02/epson-gt-s50-linux
---

[This thread](http://ubuntuforums.org/showthread.php?t=2105342) helped me out the most when I was trying to get this working. I've outlined the steps below.

Epson provides a linux driver for the scanner that you need to install. [Search GT-S50](http://download.ebz.epson.net/dsc/search/01/search/?OSC=LX) and download the "core package & data package" first. From there, accept the agreement and download and run the following in order:

* `iscan-data_1.26.0-1_all.deb`
* `iscan_2.29.3-1~usb0.1.ltdl7_amd64.deb`

The [FAQ](http://download.ebz.epson.net/faq/linux/faq_ls_00002.html) (link at bottom of that page) states you need to install the data package first and then the core package (libltdl7 for Ubuntu >= 8.10).

If you try to run _Image Scan!_ now, it will give you the error:

> Could not send command to scanner. Check scanner's status.

This was the part I missed on my first go around. Go back to the original search results page and download the "iscan plugin package." Accept the agreement and download and run the `esci-interpreter-gt-s80_0.2.1-1_amd64.deb` package.

After that, you should be able to use any scanner application with your scanner. If the scanner still doesn't show up, you may have to reboot.