---
title: 'Ghost Blog Tutorial - Install'
slug: ghost-tutorial-install
date: 2019-04-16
tags: 
  - blogging
  - tutorial
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/19/or3BKTFxcUWzIHh.jpg
description: This is probably the most exciting part.
---
This is probably the most exciting part. 
<!-- more -->
Now we will use Ghost-CLI to install a new Ghost website in our local environment. It's easy and you can browse it even without Internet. The only problem is that you cannot actually publish it to the rest of the world. But it is crucial to get yourself familiar with the installation process for now. We will publish our Ghost website soon.

## Create a folder for your website
Each web application needs a place in your hard drive to live (except for virtual machine like Docker), so the first step is to create a new folder to store all your web applications. 

You can actually place it wherever you want. This tutorial is based on MacOS, you should change the path for Windows or Linux accordingly.

### MacOS
The default path when you open the Terminal in Mac is located on your account folder /`Users/<your-name>/`, indicated as `~`. I'm going to create a `app` folder underneath it to store all my future applications:

```bash
cd # go to default directory (cd stands for change directory)
mkdir app # make directory called app
cd app # enter app
```

Now we are inside the `app` folder,  we need to create a folder for our Ghost website `my-ghost`:

```bash
mkdir my-ghost # create folder
cd my-ghost # enter folder
```

## Install Ghost
Now we use the Ghost-CLI we installed in previous tutorial to install our website:
```bash
ghost install local
```
**That's it, your website is installed!**

Now open your browser, you will be able to access your website on [http://localhost:2368]().

### Finish the Admin Panel
After installation, we need to go to [http://localhost:2368/ghost/]() to access the Ghost admin panel. You will be asking for some information and you will be registered as the owner of the website. The admin panel is where you will be managing your website.

> You can also manage your website by using the [Ghost Native Application](https://ghost.org/downloads/) in MacOS, Windows, Linux and Android.

### Behind the Scene
Your website is installed automatically by the Ghost-CLI in `development mode`, which uses SQLite3 as the database stored in `~/app/my-ghost/content/data/`, so you don't need to figure MySQL on your device.

Also, you can install as many Ghost websites on your device now, just create a new folder under `app` folder and run the installation `ghost install local` again, boom you have another Ghost website. Isn't that easy?

There are few commands that you can manage your ghost website(s):

```bash
# need to be executed within app's root directory 
# (eg. ~/app/my-ghost/):
ghost stop # stop a Ghost app
ghost start # start a Ghost app
ghost restart # restart Ghost app
ghost log # view logs
ghost update # update current Ghost app to the latest version

# can be executed in any directory of your machine
# (eg. ~/):
ghost ls # list all running Ghost apps with details
```

### Backup Your Content
It is very important to backup your content regularly, especially before updating your ghost to a newer version. You can export your posts data to a `.json` file from the admin panel.