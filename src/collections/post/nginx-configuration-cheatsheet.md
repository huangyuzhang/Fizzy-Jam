---
title: 'Nginx Configuration Cheatsheet'
slug: nginx-configuration-cheatsheet
date: 2019-07-04
tags: 
  - server
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/20/9EiQKgu6acryM4G.jpg
description: To log some useful Nginx Server Configurations.
---
To log some useful Nginx Server Configurations.

<!-- more -->

## Rewrite
### Between Webstites

```nginx
server {
    listen 80;
    server_name old.com www.old.com;
    return 301 $scheme://www.new.com$request_uri;
}
```
> `301` = permanent; `302` = temporary
> `$scheme` is used to define the protocol (HTTP or HTTPS)
> `$request_uri` enable redirct for the full url path.
> e.g.: www.old.com/path/ -> www.new.com/path/

