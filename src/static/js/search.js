(function (window, document) {
    "use strict";

    // get search inputs
    const searchInput = document.getElementById("search-input"); // nav
    const searchBox = document.getElementById("search-box"); // result page
    
    // listen navbar #search-input
    searchInput.addEventListener("input", function(e) {
      const searchTerm = e.target.value;
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("q", searchTerm);
      window.history.pushState({ path: newUrl.href }, "", newUrl.href);

      // update to result page box 
      const searchBox = document.getElementById("search-box");
      if (searchBox) {
        searchBox.value = searchTerm;
      }

    });

    // listen result page #search-box
    searchBox.addEventListener("input", function(e) {
      const searchTerm = e.target.value;
      document.getElementById("searchWord").innerHTML=`${searchTerm}`;
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("q", searchTerm);
      window.history.pushState({ path: newUrl.href }, "", newUrl.href);

      // update to nav box
      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        searchInput.value = searchTerm;
      }
    });

    // function: search
    const search = (e) => {
      const searchTerm = e.target.value;
      document.getElementById("searchWord").innerHTML=`${searchTerm}`;

       // hide title if search term is not empty
      const pageTitle = document.getElementById("search-title");
      if (searchTerm === "") {
        pageTitle.style.display = "";
      } else {
        pageTitle.style.display = "none";
      }

      const results = window.searchIndex.search(e.target.value, {
        bool: "OR",
        expand: true,
      });
  
      const resEl = document.getElementById("search-results");
      const noResultsEl = document.getElementById("no-results-found");
      

      const docTitleOrigin = 'Fizzy'
      const searchTitle = `Search Result: "${searchTerm}" - ${docTitleOrigin}`;
      document.title = searchTitle;
  
      resEl.innerHTML = "";
      if (results) {
        noResultsEl.style.display = "none";
        Array.from(results).map((r) => {
          const { id, title, tags, description } = r.doc;

          // panel-block
          const el = document.createElement("a");
          el.setAttribute("href", id);
          el.classList.add("panel-block");
          resEl.appendChild(el);
          
            // icon
            const icon = document.createElement("span");
            icon.classList.add("panel-icon");
            el.appendChild(icon);
          
              const i = document.createElement("i");
              i.classList.add("iconfont", "icon-file");
              i.setAttribute("aria-hidden", "true");
              icon.appendChild(i);
          
            // title
            const h3 = document.createElement("h3");
            el.appendChild(h3);
          
              const a = document.createElement("a");
              a.classList.add("limit-text-wide","is-padding-right-05");
              a.setAttribute("href", id);
              a.textContent = `${title}`;
              h3.appendChild(a);

            // tags
            const tagList = document.createElement("p");
            tagList.classList.add("tags","is-padding-right-05","flex-no-wrap","is-marginless-bottom");
            el.appendChild(tagList);

              tags.map((tag) => {
                const tagItem = document.createElement("li");
                tagItem.classList.add("tag","is-marginless-bottom");
                tagItem.textContent = tag;
                tagList.appendChild(tagItem);
              });
            
            // description
            const p = document.createElement("p");
            p.classList.add("limit-text-line-1");
            p.textContent = `${description}`;
            el.appendChild(p);
        });
      } else {
        noResultsEl.style.display = "block";
      }
    };
  
    fetch("/search-index.json").then((response) =>
      response.json().then((rawIndex) => {
        window.searchIndex = elasticlunr.Index.load(rawIndex);
        const urlParams = new URLSearchParams(window.location.search);

        // get searchWord from url
        const searchTerm = urlParams.get("q");
        if (searchTerm) {
          document.getElementById("search-input").value = searchTerm;
          document.getElementById("search-box").value = searchTerm;
          search({ target: { value: searchTerm } });
        }

        // update result
        document.getElementById("search-input").addEventListener("input", search);
        document.getElementById("search-box").addEventListener("input", search);
      })
    );
  })(window, document);
  