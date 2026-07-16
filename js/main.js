/* =================================================================
   Atlas Corridor Corp — main.js
   - Lucide icon init
   - Mobile nav toggle
   - Exchange-rate calculator
   - Smooth-scroll for in-page links (scroll-padding handles offset)
   ================================================================= */
(function () {
  "use strict";

  // ----- Lucide icon renderer -----
  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  // ----- Mobile nav toggle -----
  function initNavToggle() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("primaryNav");
    if (!toggle || !nav) return;

    function setOpen(isOpen) {
      nav.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      // swap icon
      var icon = toggle.querySelector("[data-lucide]");
      if (icon) {
        icon.setAttribute("data-lucide", isOpen ? "x" : "menu");
        renderIcons();
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    // Close menu when a link is clicked (mobile UX)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });

    // Close on resize back to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) setOpen(false);
    });
  }

  // ----- Live exchange rates (Frankfurter / ECB) -----
  var FRANKFURTER_URL = "https://api.frankfurter.dev/v1/latest?base=EUR";
  var FETCH_TIMEOUT_MS = 5000;

  // Snapshot rates relative to EUR — used if the network is unreachable.
  // Values are approximate; just enough to keep the widget functional offline.
  var FALLBACK_RATES = {
    base: "EUR",
    date: "offline",
    rates: {
      CAD: 1.60, USD: 1.14, EUR: 1.00, GBP: 0.85, INR: 109.80
    }
  };

  var rateTable = null; // { base, date, rates: { CODE: rate-vs-EUR } }

  function fetchRates() {
    if (!window.fetch) return Promise.resolve(FALLBACK_RATES);
    var controller = (typeof AbortController === "function") ? new AbortController() : null;
    var timer = null;
    var opts = controller ? { signal: controller.signal } : {};
    var p = fetch(FRANKFURTER_URL, opts).then(function (resp) {
      if (!resp.ok) throw new Error("HTTP " + resp.status);
      return resp.json();
    });
    if (controller) {
      timer = setTimeout(function () { controller.abort(); }, FETCH_TIMEOUT_MS);
    }
    return p
      .then(function (data) {
        if (timer) clearTimeout(timer);
        if (data && data.rates && data.base) {
          // Inject EUR itself so same-currency pair (EUR→EUR) works.
          data.rates.EUR = 1;
          return data;
        }
        throw new Error("malformed response");
      })
      .catch(function (err) {
        if (timer) clearTimeout(timer);
        console.warn("[Atlas] Frankfurter fetch failed, using fallback rates:", err.message);
        return FALLBACK_RATES;
      });
  }

  // Convert `amount` from `src` to `tgt` using the cached EUR-based table.
  function convert(amount, src, tgt) {
    if (!rateTable || !rateTable.rates) return amount;
    var rs = rateTable.rates[src];
    var rt = rateTable.rates[tgt];
    if (typeof rs !== "number" || typeof rt !== "number") return amount;
    if (rs === 0) return amount;
    return (amount * rt) / rs;
  }

  // ----- Currency dropdown component -----
  // Wraps any [data-currency-dropdown] element. Reads/writes its
  // [data-target] field as "youSend" or "receiverGets", and emits a
  // "currencychange" CustomEvent on selection.
  function initCurrencyDropdowns() {
    var triggers = document.querySelectorAll("[data-currency-dropdown]");
    if (!triggers.length) return;

    // Track which dropdown is open, so click-outside can close it.
    var openTrigger = null;

    function closeAll(except) {
      triggers.forEach(function (t) {
        if (t === except) return;
        var menu = t.querySelector(".currency-menu");
        if (menu) menu.hidden = true;
        t.classList.remove("is-open");
        t.setAttribute("aria-expanded", "false");
      });
    }

    function openTriggerFn(trigger) {
      var menu = trigger.querySelector(".currency-menu");
      if (!menu) return;
      closeAll(trigger);
      menu.hidden = false;
      trigger.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      openTrigger = trigger;
    }

    function closeTrigger(trigger) {
      var menu = trigger.querySelector(".currency-menu");
      if (menu) menu.hidden = true;
      trigger.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      if (openTrigger === trigger) openTrigger = null;
    }

    function selectOption(trigger, option) {
      var value = option.getAttribute("data-value");
      var flag = option.getAttribute("data-flag") || "";
      if (!value) return;

      // Update trigger label
      var flagEl = trigger.querySelector("[data-flag]");
      var codeEl = trigger.querySelector("[data-code]");
      if (flagEl) flagEl.textContent = flag;
      if (codeEl) codeEl.textContent = value;

      // Mark selection
      trigger.querySelectorAll('[role="option"]').forEach(function (li) {
        li.setAttribute("aria-selected", li === option ? "true" : "false");
      });

      closeTrigger(trigger);

      var target = trigger.getAttribute("data-target") || "";
      document.dispatchEvent(new CustomEvent("currencychange", {
        detail: { target: target, currency: value }
      }));
    }

    function moveFocus(trigger, delta) {
      var options = Array.prototype.slice.call(trigger.querySelectorAll('[role="option"]'));
      if (!options.length) return;
      var currentIndex = options.findIndex(function (o) { return o.getAttribute("aria-selected") === "true"; });
      var nextIndex = (currentIndex + delta + options.length) % options.length;
      options[nextIndex].focus();
    }

    triggers.forEach(function (trigger) {
      var menu = trigger.querySelector(".currency-menu");
      if (!menu) return;

      // Open on click / Enter / Space / ArrowDown when focused
      trigger.addEventListener("click", function () {
        if (trigger.classList.contains("is-open")) {
          closeTrigger(trigger);
        } else {
          openTriggerFn(trigger);
        }
      });

      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          if (!trigger.classList.contains("is-open")) {
            openTriggerFn(trigger);
            var sel = trigger.querySelector('[role="option"][aria-selected="true"]');
            if (sel) sel.focus();
          } else {
            moveFocus(trigger, 1);
          }
        } else if (e.key === "Escape") {
          closeTrigger(trigger);
        }
      });

      // Keyboard nav inside the menu
      menu.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          moveFocus(trigger, 1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          moveFocus(trigger, -1);
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          var active = document.activeElement;
          if (active && active.getAttribute("role") === "option") {
            selectOption(trigger, active);
            trigger.focus();
          }
        } else if (e.key === "Escape") {
          e.preventDefault();
          closeTrigger(trigger);
          trigger.focus();
        } else if (e.key === "Tab") {
          closeTrigger(trigger);
        }
      });

      // Mouse selection
      menu.addEventListener("click", function (e) {
        var option = e.target.closest('[role="option"]');
        if (!option || !menu.contains(option)) return;
        e.stopPropagation();
        selectOption(trigger, option);
        trigger.focus();
      });
    });

    // Click outside closes any open menu
    document.addEventListener("click", function (e) {
      if (!openTrigger) return;
      if (openTrigger.contains(e.target)) return;
      closeTrigger(openTrigger);
    });
  }

  // ----- Exchange-rate calculator -----
  function initRateCalculator() {
    var sendInput = document.getElementById("youSend");
    var getInput  = document.getElementById("receiverGets");
    if (!sendInput || !getInput) return;

    var rateDisplay = document.getElementById("rateDisplay");
    var feeDisplay  = document.getElementById("feeDisplay");
    var TRANSFER_FEE = 4.99;

    // Current source/target — read from the dropdowns, default to HTML defaults.
    var state = { source: "CAD", target: "INR" };

    function getCurrencyFor(target) {
      var trigger = document.querySelector('[data-currency-dropdown][data-target="' + target + '"]');
      if (!trigger) return null;
      var codeEl = trigger.querySelector("[data-code]");
      return codeEl ? codeEl.textContent.trim() : null;
    }

    // Format with thousands separators and 2 decimals
    function formatNumber(n) {
      if (!isFinite(n)) return "0.00";
      var fixed = n.toFixed(2);
      var parts = fixed.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    // Parse user input → number (strips commas / currency glyphs)
    function parseNumber(str) {
      if (!str) return NaN;
      var cleaned = String(str).replace(/[^0-9.]/g, "");
      return parseFloat(cleaned);
    }

    function updateLabels() {
      // Sync state from the DOM (the source of truth is the dropdown labels)
      state.source = getCurrencyFor("youSend") || state.source;
      state.target = getCurrencyFor("receiverGets") || state.target;

      if (rateDisplay) {
        var rate = (state.source === state.target) ? 1 : convert(1, state.source, state.target);
        rateDisplay.textContent = "1 " + state.source + " = " + formatNumber(rate) + " " + state.target;
      }
      if (feeDisplay) {
        feeDisplay.textContent = formatNumber(TRANSFER_FEE) + " " + state.source;
      }
    }

    function recalc() {
      var src = parseNumber(sendInput.value);
      if (isNaN(src)) {
        getInput.value = formatNumber(0);
        return;
      }
      var out = (state.source === state.target) ? src : convert(src, state.source, state.target);
      getInput.value = formatNumber(out);
    }

    function refresh() {
      updateLabels();
      recalc();
    }

    // Re-format on blur so the input always shows clean thousands-sep form
    sendInput.addEventListener("input", recalc);
    sendInput.addEventListener("blur", function () {
      var src = parseNumber(sendInput.value);
      sendInput.value = isNaN(src) ? formatNumber(0) : formatNumber(src);
    });
    sendInput.addEventListener("focus", function () {
      // select all so typing replaces cleanly
      setTimeout(function () { sendInput.select(); }, 0);
    });

    // React to currency changes from the dropdowns
    document.addEventListener("currencychange", refresh);
  }

  // ----- Smooth scroll polyfill for older browsers -----
  // Modern browsers honor `scroll-behavior: smooth` in CSS; this is the
  // safety net. It also closes the mobile nav after navigation.
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        // Don't hijack WhatsApp / external placeholder links                                                                                                                                 
        if (a.classList.contains("js-whatsapp")) return;      
        var href = a.getAttribute("href");
        if (!href || href === "#") return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL hash without jumping
        if (history.replaceState) history.replaceState(null, "", href);
      });
    });
  }

  // ----- WhatsApp deep-link for contact CTAs -----                                                                                                                                          
  // Number pulled from the footer; the user can change it here once and                                                                                                                      
  // every .js-whatsapp button on the page will pick it up.                                                                                                                                   
  function initWhatsAppLinks() {                                                                                                                                                              
    var PHONE = "14165004836"; // E.164, no '+' — wa.me/ format                                                                                                                               
    var links = document.querySelectorAll(".js-whatsapp");                                                                                                                                    
    if (!links.length) return;                                                                                                                                                                
                                                                                                                                                                                              
    links.forEach(function (a) {                                                                                                                                                              
      var msg = a.getAttribute("data-wa-msg") || "";                                                                                                                                          
      var url = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg);                                                                                                                
      a.setAttribute("href", url);                                                                                                                                                            
      a.setAttribute("target", "_blank");                                                                                                                                                     
      a.setAttribute("rel", "noopener noreferrer");                                                                                                                                           
    });                                                                                                                                                                                       
  }                                                                                                                                                                                           
        

  // ----- Boot -----
  document.addEventListener("DOMContentLoaded", function () {
    renderIcons();
    initNavToggle();
    initCurrencyDropdowns();
    initSmoothScroll();
    initWhatsAppLinks();

    // Fetch live rates, then wire the calculator. Dropdowns must be
    // initialized first so the calculator can read the initial
    // source/target values out of the DOM.
    fetchRates().then(function (data) {
      rateTable = data;
      initRateCalculator();
      // Trigger one initial render so labels & value reflect live rates.
      var evt = new CustomEvent("currencychange", { detail: { target: null, currency: null } });
      document.dispatchEvent(evt);
    });
  });
})();
