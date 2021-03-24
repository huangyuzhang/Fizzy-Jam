---
title: Ghost Blog Tutorial - Want More?
slug: ghost-tutorial-more
date: 2019-04-30
authors:
  - huangyuzhang
tags:
  - blogging
  - tutorial
image: https://i.loli.net/2020/11/19/fZQ7AdzoXq9DETH.jpg
description: ""
---
We have talked how to use Ghost as the main platform to create our own website from scratch. 
<!-- more -->
If you haven't got a chance to give them a look, here is full the list:
1. [Ghost blog tutorial - introduction](/post/ghost-tutorial-intro/)
2. [Ghost blog tutorial - Setup](/post/ghost-tutorial-setup/)
3. [Ghost blog tutorial - Install](/post/ghost-tutorial-install/)
4. [Ghost blog tutorial - Start blogging](/post/ghost-tutorial-start/)
5. [Ghost blog tutorial - Deploy on Server](/post/ghost-tutorial-deploy/)

Now I want to briefly mention some stuff you might be interested in while your website is gradually growing.

## Domain Name
Any website needs a domain name, and you should have one if you want to deploy your website publicly. So do it before you deploy Ghost website on a server (tutorial 5). There are a lot of extensions other than `.com`, don't feel upset if your ideal `.com` domain is taken. Popular extensions that people are widely used are: `.me`, `.co`, `.cc`, `.io`. There are also numerous new extensions like `.life`, `.work`, `.press` and `.icu`. However the price of different extensions are not the same, choose the one that suits your budget and your ambition.

## Track your traffic
There are several ways to track the traffic of your website, the commonly used one is the [Google Analytics](https://analytics.google.com/analytics/web/). It is a free online analytical platform which only requires you to insert few lines of code to your website. You can review all visiting behavior all over the world. And you will be able to tell the top read articles from different time periods. I highly recommend you to install that right after your website is online. All you need to do is find the **Code Injection** on the left pane of the admin portal, and insert the code to the site header.

## SEO
Some might wondering how can I do SEO (Search Engine Optimization) with my website. As mentioned in previous tutorials, SEO is integrated with Ghost. Simply open the settings pane by clicking the gear icon when you editing a post, scroll down to **Meta Data**. From here you can edit the meta information if you want them to be different. 

**Canonical URL** is the unique url for certain page or post. The search engine will look at the canonical url to prevent multiple result of a single page.

## Focus on Content
Instead of focusing heavily on SEO, you should focus on creating unique content. Content is the core of most of websites and your content speaks for you. Update your website regularly will also help the website to get better weight from the search engines.

## Update Your Ghost
Ghost is a software keeps updating for new features and bug fix. It is so easy to update your Ghost:
1. Backup your content (Export)
2. run `ghost update` under your ghost app folder

> If an update fails you can start by forcing a retry to attempt the upgrade a second time: `ghost update --force` 
> If something goes wrong, you can always revert to the previous stable version of Ghost: `ghost update --rollback`

## Store Images on Cloud
Instead of hosting all your images on the same server, there are many cloud storage service providers, such as **Amazon S3**, **Cloudinary** and **Google Cloud**. They usually provide media optimization tools as well. Amazon S3 and Cloudinary are paid services, however they come with free tiers which is more than sufficient for most people.

A big advantage of store images on cloud is that you don't need to backup your content (i.e. images) on the server. That means all you need to do regularly is backup your website data. As long as the image link is working, you can recover your website immediately after import the data.

Integration tutorials: [Amazon S3](https://docs.ghost.org/integrations/amazon-s3/), [Cloudinary](https://docs.ghost.org/integrations/cloudinary/), [Google Cloud](https://docs.ghost.org/integrations/google-cloud-storage/)

There is an open-source softwares that could turn your GitHub repo into an image hosting for free, check out the tutorial: [Use GitHub Repo to Host Images](/use-github-repo-to-host-images/)