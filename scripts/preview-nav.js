// Page switching for the design preview. The preview host serves only the first page
// as a real web page: following a link to another page shows the host's own "not
// found". It does let a page fetch the other published files, so each page is fetched
// and shown in a full-screen frame instead. The real site doesn't use this.
(function () {
  var frame = window.frameElement;
  var inFrame = !!(frame && frame.id === "drs-page");
  var host = inFrame ? parent : window;
  var here = (inFrame ? window.__drsPage : new URL("./index.html", document.baseURI).href).split("#")[0];

  if (inFrame) {
    // A page shown this way has no address of its own, so it can't change one.
    ["pushState", "replaceState"].forEach(function (m) {
      var original = history[m];
      history[m] = function (state, title) {
        try {
          return original.call(history, state, title);
        } catch (e) {}
      };
    });
  }

  function scrollToHash(doc, hash) {
    var target = hash ? doc.getElementById(decodeURIComponent(hash)) : null;
    if (target) target.scrollIntoView();
    else (doc.scrollingElement || doc.documentElement).scrollTop = 0;
  }

  if (!inFrame) {
    var home = here;
    window.__drsNav = function (url) {
      var parts = url.split("#");
      var page = parts[0];
      var hash = parts[1] || "";
      var el = document.getElementById("drs-page");
      if (page === home) {
        if (el) el.remove();
        document.documentElement.style.overflow = "";
        scrollToHash(document, hash);
        return;
      }
      fetch(page)
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          return r.text();
        })
        .then(function (html) {
          var base = page.slice(0, page.lastIndexOf("/") + 1);
          html = html.replace(
            "<head>",
            '<head><base href="' + base + '"><script>window.__drsPage=' + JSON.stringify(page) + "<\/script>",
          );
          if (!el) {
            el = document.createElement("iframe");
            el.id = "drs-page";
            el.title = "Website page";
            el.style.cssText = "position:fixed;inset:0;width:100%;height:100%;border:0;background:#fff;z-index:2147483647";
            document.body.appendChild(el);
          }
          el.onload = function () {
            scrollToHash(el.contentDocument, hash);
            el.contentWindow.focus();
          };
          el.srcdoc = html;
          document.documentElement.style.overflow = "hidden";
        })
        .catch(function () {
          location.href = url;
        });
    };
    // Links leaving the site (WhatsApp, phone, maps) open the way the host opens them.
    window.__drsOpen = function (href) {
      var a = document.createElement("a");
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
  }

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a || a.hasAttribute("download")) return;
    var url = new URL(a.getAttribute("href"), document.baseURI);
    var internal = url.origin === new URL(here).origin && /\.html$/.test(url.pathname);
    if (!internal) {
      if (inFrame) {
        e.preventDefault();
        host.__drsOpen(url.href);
      }
      return;
    }
    var page = url.href.split("#")[0];
    if (page === here) {
      // Same page: scroll only. Inside the frame a "#" link would otherwise load the address.
      if (inFrame) {
        e.preventDefault();
        scrollToHash(document, url.hash.slice(1));
      }
      return;
    }
    e.preventDefault();
    host.__drsNav(url.href);
  });
})();
