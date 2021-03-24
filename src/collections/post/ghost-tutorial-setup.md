---
title: Ghost Blog Tutorial - Setup
slug: ghost-tutorial-setup
date: 2019-04-16
authors:
  - huangyuzhang
tags: 
  - blogging
  - tutorial
image: https://i.loli.net/2020/11/19/WI8aP1DrqBxAj52.jpg
description: In this tutorial, we are going to talk about the requirements to build a Ghost website and the infrastructures you can choose to suit your own needs.
---
In this tutorial, we are going to talk about the requirements to build a Ghost website and the infrastructures you can choose to suit your own needs. 
<!-- more -->
For illustration purpose, we will install a Ghost website locally, and in later tutorials we will deploy Ghost on server or third party provider.

> Check [Ghost official documentation](https://docs.ghost.org/setup/) to following the latest version's requirements.

---

## Declaration
- The commands in code blocks need to be executed in the terminal prompt of your device.
- In order to separate local and remote (server) environment, I use `$` to indicate the remote environment commands. 
- The lines start with `#` indicate comment which I use for explanation, anything after it won't be executed.

---

## Setup Node.js & npm
Since Ghost is a [Node.js](https://nodejs.org/) application and can be managed through `npm` (node package manager), we need to install node.js in our computer first. Specifically, Ghost requires a certain version of Node.js to install. Up to this tutorial, Ghost can be installed with Node 10.x version, check the [documentation](https://docs.ghost.org/faq/node-versions/) for latest supported node version for Ghost.

### Install Homebrew
If you are using MacOS, you can install Node v10 and npm by [Homebrew](https://brew.sh/) (MacOS package manager), this will automatically install npm for you too:

```bash
# install Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# upgrade homebrew
brew upgrade
```

### Install Nodejs and npm

```bash
# use Homebrew to install node v10
brew install node@10
```

You can also use the following Homebrew command to manage with the node version:

```bash
brew search node # search for available node versions
brew unlink node@11 # unlink the node with v11
brew link node@10 # re-link node with v10
brew uninstall node@11 # uninstall node v11
```

After installation, you need to add node to your PATH (as the installation guide warned), so node@10 is installed globally as default at your computer:

```bash
echo 'export PATH="/usr/local/opt/node@10/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile

```

After installed, you can use the following command to check if correct version is installed:

```bash
node -v
v10.15.2 # returned version number
npm -v
6.4.1 # returned version number
```

You can also use `yarn` to manage packages, but for simplicity, we will use npm to manage packages in this tutorial.

---

## Install Ghost-CLI
Ghost provides a CLI (Command Line Interface) tool for us to easily install and manage with Ghost websites. 

```bash
# use npm to install package called ghost-cli
# at the latest version globally
npm install ghost-cli@latest -g
```
If missing permission error occurs:

> Missing write access to `/usr/local/lib/node_modules`

You may need to install this with `sudo` (lock-screen password required, won't be shown on screen, hit enter after you done):

```bash
sudo npm install ghost-cli@latest -g
```

After installing this Ghost-CLI, you can use `ghost <command>` to execute ghost commands to manage ghost related tasks. For example, you can always use `ghost help` for command help.

## Update Ghost-CLI
If the terminal gives you a notification about you are using an outdated Ghost-cli, you can use the install command provided above to upgrade it.

Now we have everything we need to install a Ghost website, in the next tutorial we will use the Ghost-CLI to install our first Ghost website.