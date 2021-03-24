---
title: 'Connect Server with SSH'
slug: connect-server-with-ssh
date: 2019-06-24
tags: 
  - server
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/20/R4YybnmkXwt8LGh.jpg
description: "Secure Shell (SSH) is a cryptographic network protocol for operating network services securely over an unsecured network. It is so far the best way to connect with your servers. GitHub also allows SSH with secure connection."
---
Secure Shell (SSH) is a cryptographic network protocol for operating network services securely over an unsecured network. It is so far the best way to connect with your servers. GitHub also allows SSH with secure connection. 

<!-- more -->

Instead of using password to login a server, the way that SSH work is letting a device (server) to store a public key from another device (your PC), so the server recognizes you every time you log in. 

This tutorial is based on MacOS. You should be able to find similar things for Windows and Linux systems.

## Generate a SSH Key
First, we need to generate a public key for your device. Open terminal and run the following command to generate your SSH key (replace the last part with your email address):

```bash
ssh-keygen -t rsa -C "youremail@example.com"
```

During the generating procedure, hit enter to allow default settings. You don't have to set up a password for this.

Then you should be able to find a `.ssh` folder under the folder of your username. There are two files `id_rsa`(private key) and `id_rsa.pub`(public key). `id_rsa.pub` is the public SSH key you can share with others and is also the one we will use later. ==Do not share your private key with anyone else.==

## Save Public SSH Key to Servers
For GitHub, go to account settings -> "SSH and GPG keys". Create a new SSH key and paste your public SSH key here and name it with your device name for reference.

For other servers, there are two ways to save it:

1. If you are login with root user, you should able to find a `.ssh` folder under `root` folder. Save your public SSH key to file `authorized_keys`. If it is not exist, you need to create one.
2. on your local machine, run the following code to push your public SSH key to your server:
    ```bash
    ssh-copy-id -i ~/.ssh/id_rsa.pub root@<server_ip> -p <port>
    ```
    > You need to type the login password for root once.

## Error Handling
If you get "Permission denied (publickey)" error when connect the server through SSH, is could be the problem that the login authentication methods has not been enabled in your ssh configuration.

For example in Ubuntu 18.04:

```bash
sudo nano /etc/ssh/sshd_config
PermitRootLogin prohibit-password to PermitRootLogin yes 
PasswordAuthentication no to PasswordAuthentication yes
```

then, restart ssh service:

```bash
sudo service ssh restart
```