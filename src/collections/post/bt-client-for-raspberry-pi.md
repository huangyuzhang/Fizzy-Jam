---
title: 'BT Client for Raspberry Pi 4 with External Storage and Remotely Control'
slug: bt-client-for-raspberry-pi
date: 2020-11-21
authors:
  - huangyuzhang
image: 
description: "Often people use Raspberry Pi as a remote downloader to perform BitTorrent tasks. In this post, we will setup the BitTorrent download client and store downloaded files into an external hard disk. Further, the VNC (Virtual Network Computing) will be setup so you can access to your BitTorrent Downloader anywhere in the world."
---
Often people use Raspberry Pi as a remote downloader to perform BitTorrent tasks. In this post, we will setup the BitTorrent download client and store downloaded files into an external hard disk. Further, the VNC (Virtual Network Computing) will be setup so you can access to your BitTorrent Downloader anywhere in the world.

<!-- more -->

## BitTorrent for Raspberry Pi
Transmission is an open-source BitTorrent client that can be installed to Raspberry Pi.
...
By default, the Transmission will store all completed and processing files on local disk (Raspberry Pi's micro sd card). But a micro sd card is not optimal for storage large files due to the space limitation. So you might want to mount an external hard disk as extra storage.

## Mount External Storage on Raspberry Pi
If you're using Raspberry Pi 4B with Raspbian desktop installed, external Hard Drives should mount automatically at `/media/pi/<HARD-DRIVE-LABEL>`. But if you want it to be mounted at a different location when the Raspberry Pi boots, further configuration is required:

Get the UUID of the disk partition: 
```shell
sudo blkid
```
List all the disk partitions on the Pi using the following command:
```shell
sudo lsblk -o UUID,NAME,FSTYPE,SIZE,MOUNTPOINT,LABEL,MODEL
```
Edit the `fstab` file:
```shell
sudo nano /etc/fstab
```
Now let's mount the disk at `/home/mydisk`:
```fstab
UUID=5C24-1453 /home/mydisk FSTYPE defaults,auto,users,rw,nofail 0 0
```
<center>replace the first argument with your device's actual UUID; replace FSTYPE with actual filesystem type</center>

```fstab
# for FAT or NTFS filesystem type
UUID=5C24-1453 /home/mydisk FSTYPE defaults,auto,users,rw,nofail,umask=000 0 0
```
<center>replace the first argument with your device's actual UUID; replace FSTYPE with actual filesystem type</center>

> **Note**: if you do not have the storage device attached when the Pi starts, the Pi will take an extra 90 seconds to start up (looking for external storage). You can shorten this by adding `,x-systemd.device-timeout=30` immediately after `nofail` in above's `fstab` configuration. This will change the timeout to 30 seconds, meaning the system will only wait 30 seconds before giving up trying to mount the disk.

> For more information, visit the official documentation by Raspberrypi.org: [https://www.raspberrypi.org/documentation/configuration/external-storage.md](https://www.raspberrypi.org/documentation/configuration/external-storage.md)

Now we can stop the transmission service then modify the transmission's configuration:
```shell
# first stop the service
sudo service transmission-daemon stop

# edit the configuration
nano /etc/transmission-daemon/settings.json

    # settings.json
    > ...
    > "download-dir": "/home/mydisk/bt/complete",
    > ...
    > "incomplete-dir": "/home/mydisk/bt/incomplete",
    > ...

# start the service again
sudo service transmission-daemon start
```
Finally, visit `http://<your_raspberrypi_ip>:9091`.

## Enable Remote Control by RealVNC on Raspberry Pi
