---
title: 'Remove Pushed Files in .gitignore'
slug: remove-gitignore-files
date: 2019-05-12
tags: 
  - git
authors:
  - huangyuzhang
image: 
description: We use `.gitignore` file to untrack certain folder and/or files to the remote repository. However sometimes you have some files already pushed to your remote repository. Now you want to only keep them locally, so here is how to remove them from the remote repository.
---
We use `.gitignore` file to untrack certain folder and/or files to the remote repository. However sometimes you have some files already pushed to your remote repository. Now you want to only keep them locally, so here is how to remove them from the remote repository.

<!-- more -->

## Commit all your changes
Make sure all your changes beforehand are committed before proceed.

## Remove Cached Folder or File
```bash
git rm -r --cached <path/file.ext>
```
> - `rm` - remove
> - `-r` - recursive removal (if it's a folder, files within it will also be deleted)
> - `-cached` - only remove files in the cache, not the actual files
> - `<path/file.ext>` - path of the folder or files you want to delete, e.g. `assets/password.md`

## Commit
```bash
git commit -m "FIX: untrack files in .gitignore"
```
## Push
Push the changes to your repository to see the changes effective there as well.

## Appendix
### Basic Rules for .gitignore
```bash
*.temp     # ignore all files end with .temp 
!lib.a     # exclude lib.a (not ignore it) 
/TODO      # only ignore the TODO folder under the root folder, not other TODO like subdir/TODO 
build/     # ignore all files under build/ folder 
doc/*.txt  # ingore doc/notes.txt, but not doc/server/arch.txt 
```