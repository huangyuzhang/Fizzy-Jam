---
title: 'Get URL and URL Parts in JavaScript'
slug: get-url-and-url-parts-in-javascript
date: 2020-11-23
tags: 
  - javascript
authors:
  - huangyuzhang
image: 
description: "If you are looking for a site's URL information, then the `window.location` object is for you! Use its properties to get information on the current page address or use its methods to do some page redirect or refresh."
---
If you are looking for a site's URL information, then the `window.location` object is for you! Use its properties to get information on the current page address or use its methods to do some page redirect or refresh.
<!-- more -->

> Notice: window.location only works in browser site rendering

For the following URL:
`https://fizzy.cc:8080/example/index.html?s=javascript#2`

```js
window.location.origin   → 'https://fizzy.cc'
               .protocol → 'https:'
               .host     → 'fizzy.cc:8080'
               .hostname → 'fizzy.cc'
               .port     → '8080'
               .pathname → '/example/'
               .search   → '?s=javascript'
               .hash     → '#2'
               .href     → 'https://fizzy.cc:8080/example/index.html?s=javascript#2'
```
So to get the full URL path in JavaScript:
```js
var fullURL = window.location.protocol + "//" 
                + window.location.host + "/" 
                + window.location.pathname 
                + window.location.search 
                + window.location.hash
```

## Pathname Break-up
If you need to break up the pathname, for example, a URL like `https://fizzy.cc/blah/blah/blah/index.html`, you can split the string on “/” characters:

```js
var pathArray = window.location.pathname.split('/');
```
Then access the different parts by the parts of the array, like:
```js
var secondLevelLocation = pathArray[0];
```
To put that pathname back together, you can stitch together the array and put the “/”s back in:
```js
var newPathname = "";
for (i = 0; i < pathArray.length; i++) {
  newPathname += "/";
  newPathname += pathArray[i];
}
```

## How to change URL properties
Not only can you call these location properties to retrieve the URL information. You can use it to set new properties and change the URL.
```javascript
// START 'fizzy.cc'

window.location.pathname = '/example'; // Set the pathname

// RESULT 'fizzy.cc/example'
```
Here's the complete list of properties that you can change:
```javascript
// Example
window.location.protocol = 'https'
               .host     = 'localhost:8080'
               .hostname = 'localhost'
               .port     = '8080'
               .pathname = 'path'
               .search   = 'query string' // (you don't need to pass "?")
               .hash     = 'new-hash' // (you don't need to pass "#")
               .href     = 'url'
```

## window.location Methods
| window.location | Description |
|---|--|
|`.assign()`	| Navigates to the given URL |
|`.replace()`	| Navigates to given URL & removes current page from the session history |
|`.reload()`	| Reload the current page |
|`.toString()`	| Returns the URL |

### .assign vs .replace

#### Assign
```js
1. Open a new blank page
2. Go to fizzy.cc (current page)

3. Load new page 👉 `window.location.assign('https://www.google.com')`
4. Press "Back"
5. Returns to 👉 fizzy.cc
```
#### Replace
```js
1. Open a new blank place
2. Go to fizzy.cc (current Page)

3. Load new page 👉 `window.location.replace('https://www.google.com')`
4. Press "Back"
5. Return to 👉 blank page
```