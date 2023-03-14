---
title: Search Result
path: search
date: 2023-03-14
layout: section-main
toc: false
comment: true
---
<section class="section is-paddingless-bottom">
  <div class="container">
      <h1 class="title has-text-centered"><i class="iconfont icon-tags"></i> {{ title }}: <span id="searchWord"></span> </h1>
      <div class="content has-text-centered post-content is-size-6-mobile">

  <ol id="searchResults"></ol>
  <div id="noResultsFound" style="display: none">
    <p>No results found.</p>
  </div>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/elasticlunr/0.9.6/elasticlunr.min.js"></script>
  <script type="text/javascript" src="/static/js/search.js"></script>

      </div>
  </div>
</section>