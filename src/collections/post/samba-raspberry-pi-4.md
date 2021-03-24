---
title: 'Set Up a Local File Sharing Server on Raspberry Pi 4 B'
slug: samba-raspberry-pi-4
date: 2019-10-10
tags: 
  - raspberry-pi 
  - tutorial
authors:
  - huangyuzhang
image: 
description: The latest Raspberry Pi 4B comes with a Gigabit ethernet port, up to 4GB RAM and 2 USB3 port. Because of its low power supply, Raspberry Pi 4 surely has the capability of working as an affordable file server to back up and share files from anywhere on your local network. In other words, all your local devices not only can backup your important files to the Raspberry Pi, but also plays movies stored in the Raspberry Pi. You can even plug external drives to it to enlarge the disk space. In this tutorial, we will use Samba to set up a file server on your Raspberry Pi 4. 
---
The latest Raspberry Pi 4B comes with a Gigabit ethernet port, up to 4GB RAM and 2 USB3 port. Because of its low power supply, Raspberry Pi 4 surely has the capability of working as an affordable file server to back up and share files from anywhere on your local network. In other words, all your local devices not only can backup your important files to the Raspberry Pi, but also plays movies stored in the Raspberry Pi. You can even plug external drives to it to enlarge the disk space. In this tutorial, we will use Samba to set up a file server on your Raspberry Pi 4. 

<!-- more -->

## Samba?
Samba is the Linux implementation of the SMB/CIFS file sharing standard used by Windows PCs and Apple computers, and widely supported by media streamers, games consoles and mobile apps. With Samba activated you can quickly copy files from a computer on your network to a Raspberry using wireless LAN (or a direct Ethernet connection).

## Installation
First we need to update and upgrade the apt source and package list:
```bash
sudo apt-get update
sudo apt-get upgrade
```
Then we can install the Samba:
```bash
sudo apt-get install -y samba-common-bin
sudo apt-get install -y samba
```
## Configuration
First we create a folder under pi:
```bash
sudo mkdir -m 1777 /home/pi/share
```
Now we need to modify the configuration of Samba:
```bash
# backup the original configuration file
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.backup
# edit the configuration file
sudo vim /etc/samba/smb.conf
# add the following content at the end
```
```conf
# =====================
[share]
comment = Raspberry Pi Shared Folder
path = /home/pi/share/
valid users = pi
public = yes
browseable = yes
writable = yes
create mask = 0777
directory mask = 0777
only guest = no
```
<center>type "I" to insert; use ":wq" to save and exit in vim</center>

> reference: [https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html)

Give the `share` folder full permission:
```bash
sudo chmod -R 777 /home/pi/share
```
Change the default Samba password for user `pi`:
```bash
sudo smbpasswd -a pi
```
Lastly, we need to restart the Samba service to apply all changes:
```bash
sudo /etc/init.d/smbd restart
```
## Private Directory
In some cases you might want to set a private folder for yourself only. Here is how you should do it:

Create a new user `adduser username`. The `/home/username` folder will be created, and you need to type the password.

Edit Samba config `sudo vim /etc/samba/smb.conf`, add a new block as above and modify as follow:

```conf
# =====================
[share]
comment = Raspberry Pi Shared Folder
path = /home/pi/share/
valid users = pi, username
public = yes
browseable = yes
writable = yes
create mask = 0777
directory mask = 0777
only guest = no

# =====================
[username]
comment = Username's Private Folder
path = /home/username/
valid users = username
public = no
browseable = yes
writable = yes
create mask = 0777
directory mask = 0777
only guest = no
```
<center>type "I" to insert; use ":wq" to save and exit in vim</center>

> **Notice**
> - For `[share]`, we added `username` to `valid user` because we want `username` has access to the share folder like others.
> - For `[username]`, we change the `comment`, `path`, `valid users` and `public` since we don't want others to see this folder.

Then we change the `smbpasswd` for `username`:
```bash
sudo smbpasswd -a username
```
Lastly we restart the smb service again.

## Connection
You’ll now be able to find your Raspberry Pi file server (named `RASPBERRYPI` by default) from any device on your local network. If you’ve left `smb.conf` default settings as they are, it will appear in a Windows network workgroup called WORKGROUP.

> Sometimes you will need to reboot your other devices if you modify the configuration file later.

## Further Discussion
1. Ideally you might want to connect your Raspberry Pi to the local network through the Gigabyte ethernet port since the WiFi may not work as fast and stable as the ethernet cable. Also make sure to use CAT.5E  or CAT.6 ethernet cable and your router also has Gigabyte port.
2. If you want to expand your disk space by plugging in external USB drives, make sure the disk is correctly mounted by Raspberry Pi and condifured in `smb.conf`.

