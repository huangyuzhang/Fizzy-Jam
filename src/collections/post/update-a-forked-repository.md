---
title: 'Update a Forked GitHub Repository'
slug: update-a-forked-repository
date: 2019-05-13
tags: 
  - git
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/20/FB1sY35M4mphd9v.jpg
description: This post is going to illustrate how to sync a fork of a repository to keep it up-to-date with the upstream repository.
---
This post is going to illustrate how to sync a fork of a repository to keep it up-to-date with the upstream repository.

<!-- more -->

## Configure an Upstream Remote

Before you can sync your fork with an upstream repository, you must configure a remote that points to the upstream repository in Git.

1. List the current configured remote repository for your fork.
   ```bash
   $ git remote -v
   > origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
   > origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
   ```
2. Specify a new remote upstream repository that will be synced with the fork.
   ```bash
   $ git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
   ```
3. Verify the new upstream repository you've specified for your fork.
   ```bash
   $ git remote -v
   > origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
   > origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
   > upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
   > upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
   ```
## Fetch from Upstream Repository

1. Direct to the project folder locally
2. Fetch the branches and their respective commits from the upstream repository. Commits to `master` will be stored in a local branch, `upstream/master`.
    ```bash
    $ git fetch upstream
    > remote: Counting objects: 75, done.
    > remote: Compressing objects: 100% (53/53), done.
    > remote: Total 62 (delta 27), reused 44 (delta 9)
    > Unpacking objects: 100% (62/62), done.
    > From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
    >  * [new branch]      master     -> upstream/master
    ```
3. Check out your fork's local `master` branch
    ```bash
    $ git checkout master
    > Switched to branch 'master'
    ```
4. Merge the changes from `upstream/master` into your local `master` branch. This brings your fork's `master` branch into sync with the upstream repository, without losing your local changes. 
    ```bash
    $ git merge upstream/master
    > Updating a422352..5fdff0f
    > Fast-forward
    >  README                    |    9 -------
    >  README.md                 |    7 ++++++
    >  2 files changed, 7 insertions(+), 9 deletions(-)
    >  delete mode 100644 README
    >  create mode 100644 README.md
    ```
    If your local branch didn't have any unique commits, Git will instead perform a "fast-forward":
    ```bash
    $ git merge upstream/master
    > Updating 34e91da..16c56ad
    > Fast-forward
    >  README.md                 |    5 +++--
    >  1 file changed, 3 insertions(+), 2 deletions(-)
    ```
    You may also use `--no-ff` to [merge without Fast-forward](/post/git-no-ff/).

## Push to Remote Repository
```bash
git push origin master
```