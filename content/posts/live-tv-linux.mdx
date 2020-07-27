---
id: 0c647962-288f-550f-8690-2887b8564593
title: Live TV with Hauppauge WinTV-HVR2250 in Elementary OS
description: Download a bunch of random drivers and firmware to get a TV card working in Linux.
date: '2014-03-02'
redirect_from:
  - /2014/03/live-tv-in-linux
  - /2014/03/live-tv-with-hauppauge-wintv-hvr2250-in-elementary-os
---

I've been using [elementary OS Luna](http://elementaryos.org/) lately, an Ubuntu derivative, and I really like it so far. It is very smooth and lightweight. Anyway, since I had to reinstall my OS, I've needed to setup all of my hardware again. Here is how I got my [WinTV-HVR2250](http://hauppauge.com/site/products/data_hvr2250.html) working.

I followed the [guide on linuxtv.org](http://www.linuxtv.org/wiki/index.php/Hauppauge_WinTV-HVR-2200). Here are the steps that I ran to get my setup working.

## Download Firmware

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

## Download More Firmware

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

## Install Tvheadend

Restart your computer and your hardware should now be working. Next, you'll want to install [Tvheadend](https://tvheadend.org/) backend TV server:

```bash
sudo apt-add-repository http://apt.tvheadend.org/unstable
sudo apt-get update
sudo apt-get install tvheadend
```

<Alert type="warning" title="Warning">

I'm using the unstable PPA because the stable version [didn't correctly parse service names](https://tvheadend.org/issues/1695) from my over-the-air signal. **v3.9.385~g7d8d81a~precise** works great for me but <abbr title="Your mileage may vary">YMMV</abbr>.

</Alert>

Once you install Tvheadend, you can access the web UI from `localhost:9981`. Go to _Configuration_ ➡️ _DVB Inputs_ ➡️ _Networks_. Add a new ATSC network for _us_NTSC_center_frequencies_8VSB_ if you are like me and trying to pick up HDTV over the air. Don't skip the initial scan for this network. Navigate to _TV Adapters_ and enable each of the dual tuners listed (they both showed up as Samsung tuners for me) with the network you just created.

It should start scanning and picking up channels. Once services start showing up on your _Services_ tab, you can click on _Map All_ to map the services to TV channels.

## Install XBMC

Now that you have the backend TV server setup, you'll need a client to connect to it.

```bash
sudo add-apt-repository ppa:team-xbmc/ppa
sudo apt-get update
sudo apt-get install xbmc xbmc-pvr-tvheadend-hts
```

Open XBMC, and navigate to _Settings_ ➡️ _Add Ons_ ➡️ _Disabled Add Ons_ ➡️ _PVR Clients_ and configure the Tvheadend client with whatever username/password you created when you installed Tvheadend. This should enable the client and enable Live TV within XBMC. If it didn't, just navigate to _Live TV_ from the settings menu and enable it.

Finally, go to the XBMC menu home screen and click on _Live TV_ and watch something.

## Easy?

Yeah, this was kind of a pain-in-the-ass to get setup. Once you know what to do, it is mostly straight-forward but it is definitely not the ease of setting up TV in Windows Media Center. This solution, however, is much more robust in that I can now share live TV with any device on the network. Once it is all running, it is a very nice setup.