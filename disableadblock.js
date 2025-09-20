(function () {
  const n = document,
        o = n.head;

  // bait elemen (trik deteksi adblock)
  const styleBait = "pointer-events:none;height:1px;width:0;opacity:0;visibility:hidden;position:fixed;bottom:0;";
  const a = n.createElement("div"),
        s = n.createElement("div"),
        d = n.createElement("ins");

  a.id = "div-gpt-ad-3061307416813-0";
  a.style = styleBait;

  s.className = "textads banner-ads banner_ads ad-unit ad-zone ad-space adsbox ads";
  s.style = styleBait;

  d.className = "adsbygoogle";
  d.style = "display:none;";

  const i = { allowed: null, elements: [a, s, d] };

  this.checkAdsStatus = function (cb) {
    const body = n.body;
    if (typeof cb === "function") {
      if (typeof i.allowed === "boolean") {
        cb(i);
      } else {
        body.appendChild(a);
        body.appendChild(s);
        body.appendChild(d);

        setTimeout(function () {
          if (a.offsetHeight === 0 || s.offsetHeight === 0 || d.firstElementChild) {
            i.allowed = false;
            cb(i);
          } else {
            const e = n.createElement("script");
            e.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
            e.async = true;
            e.crossOrigin = "anonymous";

            e.onload = function () {
              i.allowed = true;
              cb(i);
            };
            e.onerror = function () {
              i.allowed = false;
              cb(i);
            };

            o.appendChild(e);
          }
          a.remove();
          s.remove();
          d.remove();
        }, 40);
      }
    }
  };
}).call(this);

function antiAdBlockerHandler() {
  window.checkAdsStatus(function (ads) {
    if (!ads.allowed) {
      console.log("%c[ADS]", "color:#d32f2f;", "Blocked");

      const icon =
        "<svg style='stroke:none;fill:rgb(255 0 0) !important' viewBox='0 0 24 24'><path d='M12.2 9L10.2 7H13C14.1 7 15 7.9 15 9V11.8L13 9.8V9H12.2M23 9V7H19C17.9 7 17 7.9 17 9V11C17 12.1 17.9 13 19 13H21V15H18.2L20.2 17H21C22.1 17 23 16.1 23 15V13C23 11.9 22.1 11 21 11H19V9H23M22.1 21.5L20.8 22.8L14.4 16.4C14.1 16.7 13.6 17 13 17H9V10.9L7 8.9V17H5V13H3V17H1V9C1 7.9 1.9 7 3 7H5.1L1.1 3L2.4 1.7L22.1 21.5M5 9H3V11H5V9M13 14.9L11 12.9V15H13V14.9Z'/></svg>";

      const title = "Ad blocker detected!";
      const message = `
        <p>
          Please use Chrome browser! Disable your ad blocker & DNS.<br>
          Silakan gunakan browser Chrome! Matikan pemblokir iklan & DNS Anda.
        </p>`;

      // buat popup
      const element = document.createElement("div");
      element.className = "popSc";
      element.innerHTML = `
        <div class='popBo'>
          ${icon}
          <h2>${title}</h2>
          <div class='popCo'>${message}</div>
          <button class="popBtn" onclick="location.reload()">
            <svg class="r" viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.3 0 6 2.7 6 6 0 .7-.1 1.4-.4 2l1.5 1.5c.6-1 1-2.2 1-3.5 0-4.4-3.6-8-8-8zm-6 6c0-.7.1-1.4.4-2L4.9 6.5C4.3 7.5 4 8.7 4 10c0 4.4 3.6 8 8 8v3l4-4-4-4v3c-3.3 0-6-2.7-6-6z"/></svg>
          </button>
        </div>`;
      document.body.appendChild(element);
    } else {
      console.log("%c[ADS]", "color:#43a047;", "Allowed");
    }
  });
  document.removeEventListener("DOMContentLoaded", antiAdBlockerHandler);
}

if (document.readyState === "complete" || document.readyState !== "loading") {
  antiAdBlockerHandler();
} else {
  document.addEventListener("DOMContentLoaded", antiAdBlockerHandler);
}
