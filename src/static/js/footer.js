// Header: navbar Burgers | 2019.04.08
document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  };
});

// External link new tab | 2021.03.16
function extLinks() {
  for(var aTags = document.getElementsByTagName("a"), i = 0; i < aTags.length; i++) {
    var aTag = aTags[i];
    aTag.getAttribute("href") && 
    aTag.hostname !== location.hostname && 
    (aTag.target = "_blank") && 
    aTag.classList.add("ext-link")
  }
};
extLinks();
