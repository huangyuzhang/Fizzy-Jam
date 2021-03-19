---
title: Use gulp to set up workflows for theme development
slug: gulp-theme-workflow
authors:
  - huangyuzhang
date: 2019-04-11
tags: 
  - theme
isFeatured: true
image: https://i.loli.net/2020/11/19/IVeZdtjRmcAQukH.jpg
description: Gulp is an open-source automation toolkit for front-end development. It is built on Node.js and you can use it to automate repetitive and time-consuming tasks by setting up the `gulpfile.js`.
---
Gulp is an open-source automation toolkit for front-end development. It is built on Node.js and you can use it to automate repetitive and time-consuming tasks by setting up the `gulpfile.js`. 

<!-- more -->

This post is going to illustrate how to set up the theme development environment for a Ghost theme. So basically we could have three folders under a root folder: 
- the source folder `src` contains all theme development we are working in; 
- the destination folder `dest` is where we deploy and test the theme, usually its the theme folder of a local Ghost website; 
- the distribution folder `dist` is where we output the finished theme with a zip file.

The main tasks are: 

1. watch all file changes in the `./src` folder and copy the exact same files to a `./dest` folder;
2. package the `./src` files into a zip file and put it in `./dist` folder.

> Since gulp is based on Node.js and requires npm to install, you should have them installed in your computer.

Open your terminal tool and create a folder as the root folder:
```bash
mkdir theme-dev
cd theme-dev
```
Create a `package.json` file within the root folder with content `{}`.
Use `npm` to install gulp dependencies under root folder in dev mode:

```bash
npm install gulp --save-dev
npm install gulp-watch --save-dev
npm install gulp-zip --save-dev
npm install gulp-sass --save-dev
npm install del --save-dev
```
After you install all the dev packages, your `package.json` file should look like:
```json
{
  "devDependencies": {
    "del": "^4.1.0",
    "gulp": "^4.0.0",
    "gulp-sass": "^4.0.2",
    "gulp-watch": "^5.0.1",
    "gulp-zip": "^4.2.0"
  }
}
```
Then we create a `gulpfile.js` file within the root folder with following content:
(in here I take the gulpfile I use for the Fizzy theme, you should change it based on your project.)
```js
// import dependencies
var gulp    = require('gulp'),
    watch   = require('gulp-watch'),
    sass    = require('gulp-sass'),
    zip     = require('gulp-zip'),
    del     = require('del');

// define some variables 
var source = './fizzy-src',
    destination = './fizzy',
    distribution = './dist';

// task: compile sass to css
gulp.task('sass', function(){
    return gulp.src(source + 'assets/scss/**/*.scss') // source
        .pipe(sass())   // compile sass()
        .pipe(gulp.dest(source + 'assets/css')) // generate
});

// task: package to zip
gulp.task('package', function(done){
    gulp.src([
        source + '/**/*', // include all in source folder
        '!' + source + '/node_modules', // exclude node_modles
        '!' + source + '/node_modules/**/*', // exclude sub folders of node_modles
        '!' + source + '/*.png', // exclude screenshots in source folder
    ], { base: source })
        .pipe(zip('fizzy.zip'))
        .pipe(gulp.dest(distribution));
    done();
});

// watch changes
gulp.task('watch', function(){
    gulp.src([
        source + '/**/*',
        '!' + source + '/node_modules', // exclude node_modles
        '!' + source + '/node_modules/**/*' // exclude sub folders of node_modles
    ], { base: source })
        .pipe(watch(source, { base: source }))
        .pipe(gulp.dest(destination));
});

// task: clean old files
gulp.task('clean:build', function(done) {
    del(distribution + '/fizzy.zip'); // remove old zip file
    done();
});

// task: clean without images
gulp.task('clean:dev', function(done){
    del([
        destination + '/**/*', // remove all old files
        '!' + destination + 'assets/images', // exclude images folder
        '!' + destination + 'assets/images/**/*' // exclude image files
    ]);
    done();
});

// dev
gulp.task('dev', gulp.series('clean:dev', ['sass','watch']));

// package
gulp.task('build', gulp.series('clean:build', ['sass','package']));
```

Here we create several tasks and at the end we use `gulp.series` to perform tasks sequentially.

Now you can run `gulp dev` to let gulp clean previous folder and then compile sass and watch file changes. After that, you can run `gulp build` to zip the files into a zip file under the `dist` folder.