---
title: 'Schedule a Cron job'
slug: schedule-a-crontab-task
date: 2019-11-05
tags: 
  - server
authors:
  - huangyuzhang
image: 
description: "crontab is often used in Linux systems to perform automation jobs."
---
`crontab` is often used in Linux systems to perform automation jobs.

<!-- more -->

## Crontab
```bahs
crontab -l # list crontab jobs
crontab -e # edit crontab jobs
```
```bash
20 10 * * * cd /project/my_project/ && /opt/pythonhome/env/python3/bin/python3.7 /project/my_project/run.py >> /project/my_project/log/run.log 2>&1
```
> **Note**
> - This job will run at 10:20 everyday.
> - First it will enter the project path just in case your code contains relative path like `./path/file.extension` 
> - Use absolute path for your python- it will also export the log to `./log/run.log`

## Resources
- [Chinese documentation for Crontab](https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/crontab.html)
- [Crontab Generator](https://crontab-generator.org/)