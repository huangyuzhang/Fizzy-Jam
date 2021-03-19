const yaml = require("js-yaml");
const { DateTime } = require("luxon");
// const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const htmlmin = require("html-minifier");


module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // 404 page sync when eleventy --serve.
  // https://www.11ty.dev/docs/quicktips/not-found/

  // Current Year (Coming soon in Eleventy v1.0.0, doc: https://www.11ty.dev/docs/data-global-custom/)
  // eleventyConfig.addGlobalData(
  //   "currentYear",
  //   async () => {
  //     return (new Date()).getFullYear();
  //   }
  // );

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "DD"
    );
  });

  // date to yyyy-MM-dd
  eleventyConfig.addFilter("dateFormat", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "yyyy-MM-dd"
    );
  });

  // Syntax Highlighting for Code blocks
  // eleventyConfig.addPlugin(syntaxHighlight);

  // Image Lazy Loading
  eleventyConfig.addPlugin(lazyImagesPlugin, {
    imgSelector: '.single-article img', // only post images
    // preferNativeLazyLoad: false,
    // cacheFile: '', // Pass an empty string to turn off the cache.
  });

  // To Support .yaml Extension in _data (more readable)
  // You may remove this if you prefer JSON
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  // Add Tailwind Output CSS as Watch Target
  eleventyConfig.addWatchTarget("./src/static/css/main.scss");

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/static/fonts/*": "./static/fonts/",
    "./src/admin/config.yml": "./admin/config.yml",
    "./src/static/js/footer.js": "./static/js/footer.js",
  });

  // Katex Files (CSS use CDN)
  eleventyConfig.addPassthroughCopy({
    "./node_modules/katex/dist/katex.min.js": "./static/js/katex.min.js",
    "./node_modules/katex/dist/contrib/auto-render.min.js": "./static/js/auto-render.min.js",
  });

  // TOC Files (CSS use CDN)
  eleventyConfig.addPassthroughCopy({
    "./src/static/js/toc.js": "./static/js/toc.js"
  });

  // PrismJS Files
  eleventyConfig.addPassthroughCopy({
    "./src/static/css/lib/prism.css": "./static/css/prism.css", // customized
    // "./node_modules/prismjs/themes/prism-tomorrow.css": "./static/css/prism.css", // only for basic languages
    "./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css": "./static/css/prism-line-numbers.css",
    "./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.min.js": "./static/js/prism-line-numbers.min.js",
    "./src/static/js/prism.js": "./static/js/prism.js",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // Custom Filter: split()
  eleventyConfig.addFilter("split", function(str, seperator) {
    return str.split(seperator);
  });
  // Custom Filter: includes()
  eleventyConfig.addFilter("includes", function(array, item) {
    return array.includes(item);
  });
  // Custom Filter: substring()
  eleventyConfig.addFilter("substring", function(str, start, end) {
    return str.substring(start,end);
  });
  // Custom Filter: indexOf()
  eleventyConfig.addFilter("indexOf", function(array, indexItem) {
    return array.indexOf(indexItem);
  });

  // // Custom Filter: push()
  // eleventyConfig.addFilter("push", function(array, item) {
  //  return array.push(item);
  // });
  // // Custom Filter: pop()
  // eleventyConfig.addFilter("pop", function(array, item) {
  //  return array.pop(item);
  // });

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    };
    return content;
  });

  return {
    dir: {
      // input directory
      input: "src",
      // ⚠️ These values are relative to input directory, i.e.: src/
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data", // global data files

      // output directory
      output: "_site",
    },

    // Let Eleventy transform HTML files as nunjucks, so we can use .html instead of .njk
    htmlTemplateEngine: "njk",
  };
};
