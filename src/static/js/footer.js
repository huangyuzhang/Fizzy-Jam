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

// =========================================================
// External link new tab @ 2021.03.16
// =========================================================
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

// =========================================================
// Footnote scroll offset @ 2023.04.19
// =========================================================
const fn_offset = 104;

// 监听所有带有#fn链接的点击事件
document.querySelectorAll('a[href^="#fn"]').forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // 阻止默认的跳转行为
    var targetId = this.getAttribute('href').substring(1); // 获取目标元素的id
    var targetElement = document.getElementById(targetId); // 获取目标元素
    var targetOffset = targetElement.getBoundingClientRect().top + window.pageYOffset; // 计算目标元素距离页面顶部的距离
    var offsetPosition = targetOffset - fn_offset; // 计算偏移后的位置
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth' // 平滑滚动
    });
    // 高亮显示脚注文本
    setTimeout(function() {
      // var fnText = targetElement.parentElement;
      targetElement.classList.add('highlight');
      setTimeout(function() {
        targetElement.classList.remove('highlight');
      }, 3000);
    }, 500);
  });
});

// =========================================================
// search 
// =========================================================
// click search button event
document.getElementById("search-btn").addEventListener("click", function(event) {
  // document.getElementById("search-input").value = "";
  document.getElementById("search-btn").style.display = "none";
  document.getElementById("search-container").style.display = "";
  document.getElementById("search-input").focus();
  document.getElementById("search-results").style.display = "";
  event.stopPropagation();
});
  
// click close button event
document.getElementById("close-btn").addEventListener("click", function(event) {
  document.getElementById("search-btn").style.display = "";
  document.getElementById("search-container").style.display = "none";
  // document.getElementById("search-results").style.display = "none";
  // document.getElementById("search-input").value = ""; //clear search field text
  event.stopPropagation();
});
  
// click outside of search form event
document.addEventListener("mouseup", function(e) {
  var container = document.getElementById("search-container");
  // if the target of the click isn't the container nor a descendant of the container
  if (!container.contains(e.target)) 
  {
    container.style.display = "none";
    document.getElementById("search-btn").style.display = "";
    // document.getElementById("search-results").style.display = "none"; 
  }
});
  
// scroll event
window.addEventListener("scroll", function(){
  document.getElementById("search-btn").style.display = "";
  document.getElementById("search-container").style.display = "none";
  // document.getElementById("search-results").style.display = "none";
});
