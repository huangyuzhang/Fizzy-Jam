---
title: 'Notes for Raspberry Pi 4'
slug: notes-for-raspberry-pi
date: 2019-10-04
tags: 
  - raspberry-pi 
  - tutorial
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/21/i7csgKpLmE4SlH6.png
description: The following notes are under the official Raspbian system.
---
The following notes are under the official Raspbian system.

<!-- more -->

![Raspberry Pi 4 Model B](https://i.loli.net/2020/11/21/aiLWfTC8wJvrktl.png)

## Shutdown
Make sure you are shutting your Raspberry Pi down properly before powering it off. Type `sudo halt` and wait for the Pi to signal it is ready to be powered off by flashing the activity LED. This will protect your sd card as well ([ref](https://www.raspberrypi.org/documentation/installation/sd-cards.md)).

## GPIO Reference
Use terminal command pinout to output a reference.

![Raspberry Pi Model B GPIO Reference](https://i.loli.net/2020/11/21/MSUVwYeB7Jc1FRt.png)

![Raspberry Pi Model B GPIO Reference](https://i.loli.net/2020/11/21/3sezlCBGA4D5pSb.png)

> - [Official GPIO Documentation](https://www.raspberrypi.org/documentation/usage/gpio/)
> - [GPIO Guide](https://pinout.xyz/)

## Enable SSH
The SSH server for Raspberry Pi by default isn't enabled. But it is quite easy to enable it:
1. Launch `Raspberry Pi Configuration` from the `Preferences` menu
2. Navigate to the `Interfaces` tab
3. Select `Enabled` next to `SSH`
4. Click `OK`

Alternatively, [raspi-config](https://www.raspberrypi.org/documentation/configuration/raspi-config.md) can be used in the terminal:
1. Enter `sudo raspi-config` in a terminal window
2. Select `Interfacing Options`
3. Navigate to and select `SSH`
4. Choose `Yes`
5. Select `Ok`
6. Choose `Finish`

Alternatively, use `systemctl` to start the service
```bash
sudo systemctl enable ssh
sudo systemctl start ssh
```
When enabling SSH on a Pi that may be connected to the internet, you should change its default password to ensure that it remains secure.

> [Official SSH Documentation](https://www.raspberrypi.org/documentation/remote-access/ssh/)

## Enable ROOT SSH Connection
After enabling the SSH server, you can connect to your Pi via SSH:

```bash
ssh pi@<ip-address> # default password: raspberry

sudo passwd root # change default root password

sudo passwd --unlock root # unlock root user

sudo sed -i "s/^#PermitRootLogin.*/PermitRootLogin yes/g" /etc/ssh/sshd_config # enable SSH login for root user 

sudo systemctl restart ssh # restart SSH server

sudo cp ~/.bashrc /root/.bashrc # copy the same bash configuration from current user to root
```
After figuring the SSH, we can also use SFTP tools such as [FileZilla](https://filezilla-project.org/) to manage the files on the Raspberry Pi from other devices.

### Monitor CPU Temperature
There are several way to get the temperature of CPU:
```bash
/opt/vc/bin/vcgencmd measure_temp
```
```bash
cat /sys/class/thermal/thermal_zone0/temp
# divide the result by 10000, Celsius
```
To continuously monitor the temperature of the CPU, save the first command into a file name `monitor-temp.sh`.

Create Python file `monitor-temp.py` by issuing following command:
```bash
import os
import time

def measure_temp():
        temp = os.popen("vcgencmd measure_temp").readline()
        return (temp.replace("temp=",""))

while True:
        print(measure_temp())
        time.sleep(1)
```
> Use `nano monitor-temp.py` to create Python file, use `Ctl+X` and then `Y` to save that file
> This script issues the command `/opt/vc/bin/vcgencmd measure_temp` every second and print the formatted temperature in the console.

Now by running `python monitor-temp.py` you can monitor the CPU Temperature every second. Further, we can also use this feature to turn on the cooling fan when CPU temperature is too high, details: [Temperature Controlled Fan for Raspberry Pi 4](/raspberry-pi-fan/)

## Change apt Sources in Mainland China
The official apt source the Raspbian uses can be extremely slow in mainland China, follow this guide to change the sources for apt:
[Raspbian | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirror.tuna.tsinghua.edu.cn/help/raspbian/)

> Remember to backup two lists before editing them. Use `sudo cp <original-file-path> <backup-file-path>` to backup files.

## Install Chinese Keyboards
```bash
sudo apt install ibus ibus-clutter ibus-gtk ibus-gtk3 ibus-qt4 im-config -s ibus
sudo apt install ibus-pinyin ibus-sunpinyin
```

Then go to `Preferences` -> `iBus Preferences`, add keyboards from there.

## Install Autojump
```bash
sudo apt install autojump
```

On Debian-based distros, manual activation is required. Add the following line to `~/.bashrc` (for Bash) or `~/.zshrc` (if you use zsh):

```bash
. /usr/share/autojump/autojump.sh
```
