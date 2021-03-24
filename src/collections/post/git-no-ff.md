---
title: 'Merge Git Branch without Fast Forward'
slug: git-no-ff
date: 2019-05-08
tags: 
  - git
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/20/eJ9ypxHSb3Fafvz.jpg
description: By default, git will use fast forward when merging a branch. The problem with fast forward is the HEAD will move to the new branch and the branch merging information will be lost after deletion. 
---
By default, git will use fast forward when merging a branch. The problem with fast forward is the HEAD will move to the new branch and the branch merging information will be lost after deletion. 

<!-- more -->

However, if we specifically forbid the fast forward mode, a new commit will occur with the new branch information when merging. So it will appear in the history of the repository. Now lets use an example to illustrate the procedure of `--no-ff` merge.
![git merge --no-ff](https://i.loli.net/2020/11/20/E3yMkOHz2Sg9cRN.jpg)
Create and switch to branch `feature-1`:
```bash
git checkout -b feature-1
```
Now we do some development. For example change the `README.md` and submit a new commit:
```bash
git add README.md
git commit -m "changed README.md"
```
Then we switch back to master branch:
```bash
git checkout master
```
Start to merge the `feature-1` branch, we use `--no-ff` to disable the fast forward:
```bash
# merge feature-1 to master without fast forward
git merge --no-ff feature-1

# merge feature-1 to master without fast forward and commit at the same time
git merge --no-ff feature-1 -m "merge feature-1 with noff"
```
Now we can delete the branch:
```bash
git branch -d feature-1 # delete branch feature-1
```