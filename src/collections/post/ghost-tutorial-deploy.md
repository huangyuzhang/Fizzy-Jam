---
title: 'Ghost Blog Tutorial - Deploy on Server'
slug: ghost-tutorial-deploy
date: 2019-04-26
tags: 
  - blogging 
  - tutorial
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/19/ZUEzPn3c15tMQDb.jpg
description: Up to this point, we have setup the environment for Ghost and have it installed in our local devices successfully. But the website on local devices can't be accessed by others. In this tutorial, we are going to discuss several ways to deploy our Ghost website publicly. 
---
Up to this point, we have setup the environment for Ghost and have it installed in our local devices successfully. But the website on local devices can't be accessed by others. In this tutorial, we are going to discuss several ways to deploy our Ghost website publicly. 
<!-- more -->

## Hosting Options
There are few options that you can use for hosing your Ghost website.

### Ghost(Pro)
The easiest way is to use the hosting service powered by Ghost Foundation. It is similar to the hosting service of WordPress. The good thing of choosing that is you don't have to worry about all of the setting and configurations. You subscribe and you have a Ghost website right away. The price list of different plans can be checked [here](https://ghost.org/pricing/). Depending on the services you need, the price varies from \$36 to \$249 monthly. It is somehow expensive for content creators and someone just need to build a blog.

### Heroku
Heroku is a good place to host your Ghost website for free. But the configuration for beginners are rather high. I might create a whole series of tutorials of Heroku if it is commonly requested.

### VPS
VPS stands for Virtual Private Server. You won't need to rent a entire server just for running a small blog. The servers are divided into small chunks and rent to individuals as us. As a result, the price could be as low as few dollars a month.

There are numerous VPS providers, and it is very hard to tell which one is the best. But some of them provide free credits for new customers through referral programs. In this tutorial, you can use my referral link to register your account on DigitalOcean with **$100** credit for free from [here](https://m.do.co/c/ef31810e8960). (==Note: you must use the link to visit their website and click the **floating banner** to finish the registration to get your credit.==)

The credits can be used to try out their services, the following tutorial is based on that. But you can still follow the tutorial if you are using other VPS.

### Linux and Ubuntu
Most of the websites and web applications are deployed on a Linux server. Ubuntu is one of the very popular Linux distribution based on Debian. Ghost is now only compatible with ubuntu, that's the Linux distribution we are going to use. (This doesn't mean you cannot run Ghost on other Linux distributions like CentOS, but the easiest way is to follow the guide and use Ubuntu for now)

## Create a VPS
After registered at DigitalOcean from the link above, you can go to your `Account - Billing` to see if the credit is there.

Then click the green `Create` button on the right of the top menu, and click `Droplets` to enter the droplet creating page. (In DigitalOcean, virtual machines are called droplets.)

> The easiest way to deploy a Ghost VPS is to go to the Marketplace and select the Ghost option, then finish the reset configurations. But as for now we are going to install the server environment manually. If you don't want to follow the process, you can skip this.

Within the **Distribution** tab (default), select Ubuntu with version `16.04 x64` or `18.04 x64` as they are the version supported by Ghost so far. Choose the Standard plan with any configuration you want. You can click the left arrow to see lower configurations.

Leave the backup and block storage settings for now. Move down to the location section to choose a physical datacenter you want to host your website. It is recommended to choose the one that is close to you, as it will have better performance in terms of speed. In addition, the access speed of the website can be achieved by using CDN service.

You don't need to tick any of the additional options for now if you know what are they. Also, if you know how to setup a SSH key for your computer, you can set one up and add it here. So you will not need to use password to connect to your VPS. If you don't know what SSH keys are, leave it for now.

Finally, you can edit your droplet's hostname as whatever you want, but you should keep it simple since it will show up every time you log in.

Now you have finished all configuration for your very first machine. Click the green Create button at the bottom, your VPS will be ready in less than a minute. After the creation is finished, the IP address of the machine will show up on the page and a SSH password randomly generated and emailed to you at your account’s email address.

You can create multiple droplets and manage them from the left sidebar `Droplets`.

## Server Configuration
### Connect to VPS
Now you can see the IP Address for your droplet, copy it and open the terminal on your computer, enter the ssh command to connect it:

```shell
ssh root@your_ip_address
```
The the terminal will show some authentication request, type yes and hit enter to continue. Then type or copy the password has been emailed to you when it ask.

Then it will initiate the password reset process, you need to first enter the default password again and create a new password and retype again for verification. 

> Passwords are typed without showing anything, not even the *s, when you finish just hit enter.

Now you are officially logged in to your machine. We can start to install the environment for Ghost. It is similar to what we have done before locally.

> All commands prefixed with a dollar sign `$` indicate the commands run in remote server (VPS) , do not copy it with the commands.

### Create a new user
Open up your terminal and login to your new server as the root user, then create a new user:
```bash
# Create a new user and follow prompts
$ adduser <user>
```
> Note: Using the user name ghost causes conflicts with the Ghost-CLI, so it’s important to use an alternative name.
```bash
# Add user to superuser group to unlock admin privileges
$ usermod -aG sudo <user>

# Then switch to the new user
$ su - <user>
```
> Instead of root, all actions below should be executed under the user you just created.

### Update packages
Ensure package lists and installed packages are up to date.
```bash
# Update package lists
$ sudo apt-get update

# Update installed packages
$ sudo apt-get upgrade
```
Follow any prompts to enter the password you just created in the previous step.

### Install Nginx
Ghost uses an NGINX server and the SSL configuration requires NGINX 1.9.5 or higher.

```bash
# Install NGINX
$ sudo apt-get install nginx
```

If `ufw` was activated, the firewall allows HTTP and HTTPS connections. Open Firewall:

```bash
$ sudo ufw allow 'Nginx Full'
```
### Install MySQL
> You can skip this if you don't want to use MySQL with your website. You can still install Ghost with SQLite3 on server, which is easier to manage and less resource required.

Next, you'll need to install MySQL to be used as the production database.

```bash
# Install MySQL
$ sudo apt-get install mysql-server
```

#### MySQL on Ubuntu 18.04
If you’re running Ubuntu 18.04, a password is required to ensure MySQL is compatible with `Ghost-CLI`. This requires a few extra steps!

```bash
# To set a password, run
$ sudo mysql

# Now update your user with this password
# Replace 'password' with your password, but keep the quote marks!
$ ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

# Then exit MySQL
$ quit

# and login to your Ubuntu user again
$ su - <user>
```
### Install Node.js

You will need to have a [supported version](https://docs.ghost.org/faq/node-versions/) of Node installed system-wide in the manner described below. If you have a different setup, you may encounter problems. (We have done this before locally, do you remember?)

You can use yum (CentOS )

> The recommended Node version so far is **10.x (Node v10 Dubnium LTS)Recommended, 11.x is not supported**!

```bash
# Add the NodeSource APT repository for Node 10
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash

# Install Node.js
$ sudo apt-get install -y nodejs
```

### Install Ghost-CLI
Ghost-CLI is a command line tool to help you get Ghost installed and configured for use, quickly and easily. Similar to install this locally, the npm module can be installed with `npm` or `yarn`.

```bash
$ sudo npm install ghost-cli@latest -g
```

Once installed, you can always run `ghost help` to see a list of available commands.

## Install Ghost
Now we have finished the server configuration, we can now start to use the Ghost-CLI to install ghost in production.

> Note: Installing Ghost in the `/root` or `home/<user>` directories results in a broken setup. Always use a custom directory with properly configured permissions.

### Create a directory

Create a directory for your installation, then set the owner and permissions.

```bash
# We'll name ours 'ghost' in this example; you can use whatever you want
$ sudo mkdir -p /www/ghost

# Replace <user> with the name of your user who will own this directory
$ sudo chown <user>:<user> /www/ghost

# Set the correct permissions
$ sudo chmod 775 /www/ghost

# Then navigate into it
cd /www/ghost
```

### Run the install process
Now you've made it this far, it's time to install Ghost with a single command!

```bash
# Install ghost with MySQL if you installed MySQL
$ ghost install

# Install ghost with SQLite3
$ ghost install --db=sqlite3
```
### Install Questions

During install, the CLI will ask a number of questions to configure your site.

#### Blog URL
Enter the exact URL your publication will be available at and include the protocol for HTTP or HTTPS. For example, https://example.com. If you use HTTPS, Ghost-CLI will offer to set up SSL for you. Using IP addresses will cause errors.

#### MySQL hostname
This determines where your MySQL database can be accessed from. When MySQL is installed on the same server, use `localhost` (press Enter to use the default value). If MySQL is installed on another server, enter the name manually.

#### MySQL username / password
If you already have an existing MySQL database enter the the username. Otherwise, enter `root`. Then supply the password for your user.

#### Ghost database name
Enter the name of your database. It will be automatically set up for you, unless you're using a non-root MySQL user/pass. In that case the database must already exist and have the correct permissions.

#### Set up a ghost MySQL user? (Recommended)
If you provided your root MySQL user, Ghost-CLI can create a custom MySQL user that can only access/edit your new Ghost database and nothing else.

#### Set up NGINX? (Recommended)
Sets NGINX up automatically enabling your site to be viewed by the outside world. Setting up NGINX manually is possible, but why would you choose a hard life?

#### Set up SSL? (Recommended)
If you used an `https` Blog URL and have already pointed your domain to the right place, Ghost-CLI can automatically set up SSL for you using [Let's Encrypt](https://letsencrypt.org/). Alternatively you do this later by running `ghost setup ssl` at any time.

#### Enter your email
SSL certification setup requires an email address so that you can be kept informed if there is any issue with your certificate, including during renewal.

#### Set up systemd? (Recommended)
`systemd` is the recommended process manager tool to keep Ghost running smoothly. We recommend choosing `yes` but it’s possible to set up your own process management.

#### Start Ghost?
Choosing `yes` runs Ghost, and makes your site work.

### What's next?
You're all set! Now you can start customizing your site. You can start to move your local content to here if you want. You can change a theme if you want. 

Please feel free to leave questions on the comment below.
