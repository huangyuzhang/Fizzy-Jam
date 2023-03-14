const elasticlunr = require("elasticlunr");

module.exports = function(collection) {
  var index = elasticlunr(function() {
    this.addField("title");
    this.addField("url");
    this.addField("tags");
    this.addField("authors");
    this.addField("description");
    this.setRef("id");
  });

  collection.forEach(post => {
    index.addDoc({
      id: post.url,
      title: post.template.frontMatter.data.title,
      url: post.template.frontMatter.data.url,
      tags: post.template.frontMatter.data.tags,
      authors: post.template.frontMatter.data.authors,
      description: post.template.frontMatter.data.description
    });
  });

  return index.toJSON();
};
