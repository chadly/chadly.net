---
id: 09bd061f-6a09-44a4-92e0-a5371eae8e2d
title: Moving Steam Folder Out of Home in Linux
date: 2014-03-01
template: layout.hbs
rtemplate: post.jsx
cover: steam.jpg
nav: blog
---

I like to switch distros from time to time and remembering all of my little system tweaks becomes...problematic over time. Hence, I am documenting this for myself. Maybe it will benefit you too, dear reader.

I have a large <abbr title="Solid State Drive">SSD</abbr> I use as my system disk and it annoys me greatly when [Steam](http://store.steampowered.com/) installs itself to my `home` folder. Yes, it is a larger disk, but I'd like to reap the benefits of my SSD (faster loading times) when playing games.

Luckily, it is [pretty easy to move](http://askubuntu.com/a/257654). After you install Steam, issue the following in terminal:

```bash
sudo mv ~/.local/share/Steam /opt
sudo chmod a+rwx /opt/Steam -R
```

This moves your Steam folder out of `home` and into `opt`. Then it updates the permissions to allow everyone read/write/execute access. You may not need to do that last part, but I want to make sure I don't have any permissions issues when trying to install games.

Once that is done, open the Steam client and it will complain that it can't find its files. Tell it to calm down and point it to the new location. This works because the Steam installer only installs a shell wrapper in `/usr/bin` that sets up the environment to run the Steam client from your `home` folder.
