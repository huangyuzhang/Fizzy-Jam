---
title: 'Gui - A Ghost Static Site Generator'
slug: ghost-static-generator
date: 2019-06-23
tags: 
  - blogging 
  - git
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/20/T1xNVkRJhti7maq.jpg
description: If you don't want to host your Ghost blog on a server, you may want to try Ghost Static Generator and push the content to your GitHub repo. There is one Python-based Ghost content crawler call buster. However, the tool is no longer maintained by the author for more than 5 years. 
---
If you don't want to host your Ghost blog on a server, you may want to try Ghost Static Generator and push the content to your GitHub repo. There is one Python-based Ghost content crawler call buster. However, the tool is no longer maintained by the author for more than 5 years. 

<!-- more -->

There is another bash-based generator I found but still the file requires changes and the author didn't identify specifically which links need to be changed and I have done several modifications to make it easier to customize. I have also saved it on GitHub called [Gui](https://github.com/huangyuzhang/gui/) (Ghost in Chinese pinyin).

This post is going to provide details for you to have this tool work and post in onto your GitHub repo.

First, install `wget`. If you are using MacOS, simply run:

```bash
brew install wget
```

Then, have your locally installed Ghost website ready. Create a bash file  `gui.sh` in the root of the blog directory with the following content:

```bash
#!/bin/bash

# Define urls and https
from_url=http://localhost:2368
to_url=yourdomain.com 
to_https=true

# Copy blog content
wget --recursive --no-host-directories --directory-prefix=static --adjust-extension --timeout=30 --no-parent --convert-links ${from_url}/

# Copy 404 page
wget --no-host-directories --directory-prefix=static --adjust-extension --timeout=30 --no-parent --convert-links --content-on-error --timestamping ${from_url}/404.html

# Copy sitemaps
wget --recursive --no-host-directories --directory-prefix=static --adjust-extension --timeout=30 --no-parent --convert-links ${from_url}/sitemap.xsl
wget --recursive --no-host-directories --directory-prefix=static --adjust-extension --timeout=30 --no-parent --convert-links ${from_url}/sitemap.xml
wget --recursive --no-host-directories --directory-prefix=static --adjust-extension --timeout=30 --no-parent --convert-links ${from_url}/sitemap-pages.xml
wget --recursive --no-host-directories --directory-prefix=static --adjust-extension --timeout=30 --no-parent --convert-links ${from_url}/sitemap-posts.xml
wget --recursive --no-host-directories --directory-prefix=static --adjust-extension --timeout=30 --no-parent --convert-links ${from_url}/sitemap-authors.xml
wget --recursive --no-host-directories --directory-prefix=static --adjust-extension --timeout=30 --no-parent --convert-links ${from_url}/sitemap-tags.xml

# Replace localhost with real domain
if [ "${to_https}" == true ]; 
then LC_ALL=C find ./static -type f -not -wholename *.git* -exec sed -i '' -e "s,http://${from_url},https://${to_url},g" {} +; 
fi
if [ "${to_https}" == false ]; 
then LC_ALL=C find ./static -type f -not -wholename *.git* -exec sed -i '' -e "s,http://${from_url},http://${to_url},g" {} +; 
fi
LC_ALL=C find ./static -type f -not -wholename *.git* -exec sed -i '' -e "s,${from_url},${to_url},g" {} +
LC_ALL=C find ./static -type f -not -wholename *.git* -exec sed -i '' -e 's,http://www.gravatar.com,https://www.gravatar.com,g' {} +

# Set up Github Pages CNAME
echo "${to_url}" > static/CNAME
```

## Things you need to change
All you need to do is the `# Define urls and https` section
1. if your ghost domain in your local machine is not localhost:2368, you need to change `from_url` (e.g. `localhost:2369` if this is your second ghost on this machine);
2. you need to replace `yourdomain.com` with your own domain name (notice the https);
3. if your website is activate HTTPS, you need to make sure `to_https` is `true`, otherwise `false`.

## How does it work?
1. This file will crawling all links from the home page, and store everything into a subfolder `static`.
2. Then it will change all links from `localhost:2368` to `yourdomain.com`
3. It set up a CNAME file as GitHub Pages need.
4. After the folder is generated, you should `cd static` then push everything in here to your GitHub repo and setup GitHub Pages with your own domain.

## Install
1. Have your local Ghost website ready first.

2. Install `wget`. For MacOS, simply run `brew install wget`.

3. Save `gui.sh` file in the root directory of your local Ghost website. Modify the `# Define urls and https` section as follows:

    ```bash
    # Define urls and https
    from_url=http://localhost:2368 # change this if your local ghost url is different
    to_url=yourdomain.com # change it to your real domain name
    to_https=true # set true to enable HTTPS (e.g. GitHub Pages)
    ```

4. Give execution permission to it:
    ```bash
    chmod +x gui.sh
    ```

5. Run it:
    ```bash
    ./gui.sh
    ```
6. Then go to `static` folder:
    ```bash
    cd static
    ```
7. Initiate a new git repo, commit everything here and push to your new GitHub repo:
    ```bash
    git init
    git add .
    git commit "Initial Commit"
    git remote add origin git@github.com:<your_user_name>/<repo_name>.git
    git push -u origin master
    ```
8. Enable GitHub Pages in settings.

> Read full document here: [https://github.com/huangyuzhang/gui/](https://github.com/huangyuzhang/gui/)

## Notice
The advantage of host everything on GitHub is that you don't need to pay anything for the server and your website is quite safe with GitHub.

However, the static generator may not work with some of the dynamic features of your website, e.g. search function uses Ghost API. Also, every time you edit something on your local machine, you need to generate the pages and commit changes then push them onto your GitHub repo then wait to see the changes.

You should test it by yourself and decide whether to use it or not.