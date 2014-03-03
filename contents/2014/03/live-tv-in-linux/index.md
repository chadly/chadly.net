---
id: 09bd061f-6a09-44a4-92e0-a5371eae8e2d
title: Hauppauge WinTV-HVR2250 in Elementary OS
date: 2014-03-02
template: post.hbs
nav: blog
---

I've been using [elementary OS Luna](http://elementaryos.org/) lately, an Ubuntu derivative, and I really like it so far. It is very smooth and lightweight. Anyway, since I had to reinstall my OS, I've needed to setup all of my hardware again. Here is how I got my [WinTV-HVR2250](http://hauppauge.com/site/products/data_hvr2250.html) working.

I followed the [guide on linuxtv.org](http://www.linuxtv.org/wiki/index.php/Hauppauge_WinTV-HVR-2200). Here are the steps that I ran to get my setup working.

###Download the firmware

```bash
wget http://www.steventoth.net/linux/hvr22xx/22xxdrv_27086.zip
wget http://www.steventoth.net/linux/hvr22xx/HVR-12x0-14x0-17x0_1_25_25271_WHQL.zip
wget http://www.steventoth.net/linux/hvr22xx/extract.sh

chmod +x extract.sh
./extract.sh
```

You can look at the `extract.sh` script before you run it. It just unzips the downloaded files and tells you where to copy the `fw` files next. For me, this is where I needed to copy the extracted firmware:

```bash
sudo cp v4l-saa7164-1.0.2.fw /lib/firmware/3.2.0-59-generic
sudo cp v4l-saa7164-1.0.3.fw /lib/firmware/3.2.0-59-generic
sudo cp dvb-fe-tda10048-1.0.fw /lib/firmware/3.2.0-59-generic
```

###Download More Firmware

I then followed some of the directions under the _Making it Work Easily_ section:

```bash
wget http://www.steventoth.net/linux/hvr22xx/firmwares/4019072/NXP7164-2010-03-10.1.fw
sudo cp NXP7164-2010-03-10.1.fw /lib/firmware
```

This just copies more firmware to your firmware directory. Next, you need to determine which type of card you have. You can find that by running the following:

```bash
dmesg | grep saa7164
```

The third line will read something like:

```bash
CORE saa7164[0]: subsystem: 0070:8851, board: Hauppauge WinTV-HVR2250 [card=7,insmod option]
```

Notice the `card=7` part. You want to create an `options` file in `/etc/modprobe.d`:

```bash
sudo nano /etc/modprobe.d/options
```

The file should contain `options saa7164 card=7`. Replace the `card=7` part with whatever your `dmesg` output said.

###Enjoy Live TV

Restart your computer and install [Tvheadend](https://tvheadend.org/) with [XBMC](http://xbmc.org/) and enjoy your TV.