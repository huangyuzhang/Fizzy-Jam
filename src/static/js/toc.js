"use strict";
var h =
  "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
    ? function (e) {
        return typeof e;
      }
    : function (e) {
        return e &&
          "function" == typeof Symbol &&
          e.constructor === Symbol &&
          e !== Symbol.prototype
          ? "symbol"
          : typeof e;
      };
!(function (e, t) {
  "function" == typeof define && define.amd
    ? define(function () {
        return t;
      })
    : "object" === ("undefined" == typeof exports ? "undefined" : h(exports))
    ? (module.exports = t)
    : (e.fizzyToc = t);
})(window, function (e) {
  function f(e, t) {
    return (
      !!e.className && e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
    );
  }
  function d(e, t) {
    if (f(e, t)) {
      var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
      e.className = e.className.replace(n, " ");
    }
  }
  function t(e) {
    for (
      var t,
        n = void 0,
        o = [],
        l = {},
        a = { id: -1 },
        r = null,
        i = void 0,
        c = 0;
      c < e.length;
      c++
    )
      (i = "heading-" + c),
        (l = {
          name: e[c].innerText || e[c].textContent,
          tagName: (n = e[c].tagName),
          id: (e[c].id = i),
          level: ((t = n), t ? t.slice(1) : 0),
          parent: a,
        }),
        r &&
          (u(l.tagName) < u(r.tagName) ? (l.parent = r) : (l.parent = s(l, r))),
        (r = l),
        o.push(l);
    return o;
  }
  function s(e, t) {
    for (var n = t.parent; n && u(e.tagName) >= u(n.tagName); ) n = n.parent;
    return n || { id: -1 };
  }
  function u(e) {
    var t = 0;
    if (e)
      switch (e.toLowerCase()) {
        case "h1":
          t = 6;
          break;
        case "h2":
          t = 5;
          break;
        case "h3":
          t = 4;
          break;
        case "h4":
          t = 3;
          break;
        case "h5":
          t = 2;
          break;
        case "h6":
          t = 1;
      }
    return t;
  }
  function n(e, t, n) {
    e &&
      (e.attachEvent
        ? ((e["e" + t + n] = n),
          (e[t + n] = function () {
            e["e" + t + n](window.event);
          }),
          e.attachEvent("on" + t, e[t + n]))
        : e.addEventListener(t, n, !1));
  }
  function i(e, t) {
    var n,
      o,
      l = void 0,
      a = !1;
    if (e) {
      l = "<ul>";
      for (var r = 0; r < e.length; r++)
        (n = e[r].parent),
          (o = t),
          n &&
            o &&
            "object" === (void 0 === n ? "undefined" : h(n)) &&
            "object" === (void 0 === o ? "undefined" : h(o)) &&
            n.id === o.id &&
            ((a = !0),
            (l +=
              '<li class="' + p.linkClass + " h" + e[r].level + '">'
              + '<a data-target="' + e[r].id + '" title="' + e[r].name + '">'
              + e[r].name
              + "</a>"
              ),
            (l += i(e, e[r])),
            (l += "</li>"));
      l += "</ul>";
    }
    return a ? l : "";
  }
  "function" != typeof Object.assign &&
    Object.defineProperty(Object, "assign", {
      value: function (e, t) {
        if (null == e)
          throw new TypeError("Cannot convert undefined or null to object");
        for (var n = Object(e), o = 1; o < arguments.length; o++) {
          var l = arguments[o];
          if (null != l)
            for (var a in l)
              Object.prototype.hasOwnProperty.call(l, a) && (n[a] = l[a]);
        }
        return n;
      },
      writable: !0,
      configurable: !0,
    });
  var p = Object.assign(
      {},
      {
        linkClass: "toc-item",
        linkActiveClass: "active",
        supplyTop: 0,
        selector: ["h1", "h2", "h3", "h4", "h5", "h6"],
        active: null,
      },
      e
    ),
    o = (this.contentEl =
      p.contentEl instanceof HTMLElement
        ? p.contentEl
        : document.getElementById(p.contentEl)),
    v =
      p.tocEl instanceof HTMLElement
        ? p.tocEl
        : document.getElementById(p.tocEl),
    l = o.querySelectorAll(p.selector.join()),
    a = t(l),
    r = !1;
  v.innerHTML = i(a, { id: -1 });
  var c = "\n    .k-catelog-list > ul { position: relative; }    \n  ",
    m = document.createElement("style");
  function g(e) {
    var t,
      n = v.querySelectorAll("[data-target]");
    (t = n), (n = Array.prototype.slice.call(t));
    for (var o, l, a, r, i = null, c = void 0, s = 0; s < n.length; s++)
      if (
        ((c = n[s]),
        (r = "target"),
        ((a = c).dataset ? a.dataset[r] : a.getAttribute("data-" + r)) === e)
      ) {
        (o = c), (l = p.linkActiveClass), f(o, l) || (o.className += " " + l);
        var u = y((i = c), v);
        v.scrollTop = u - v.offsetHeight / 2;
      } else d(c, p.linkActiveClass);
    "function" == typeof p.active && p.active.call(this, i);
  }
  function y(e) {
    for (
      var t =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
        n = e.offsetTop;
      (e = e.offsetParent) && t !== e;

    )
      n += e.offsetTop;
    return n;
  }
  (m.type = "text/css"),
    m.styleSheet ? (m.styleSheet.cssText = c) : (m.innerHTML = c),
    document.getElementsByTagName("head")[0].appendChild(m),
    n(v, "click", function (e) {
      var t = (e.target || e.srcElement).getAttribute("data-target");
      if (t) {
        var n = document.getElementById(t);
        r = !0;
        var o = y(n);
        window.scrollTo(0, o - p.supplyTop), g(t);
      }
    }),
    n(window, "scroll", function (e) {
      if (!r) {
        for (
          var t =
              (document.documentElement.scrollTop || document.body.scrollTop) +
              p.supplyTop,
            n = null,
            o = l.length - 1;
          0 <= o;
          o--
        )
          if (y(l[o]) <= t) {
            n = l[o];
            break;
          }
        g(n ? n.id : null);
      }
      r = !1;
    }),
    (this.rebuild = function () {
      var e = t((l = o.querySelectorAll(p.selector.join())));
      v.innerHTML = i(e, { id: -1 });
    });
});
