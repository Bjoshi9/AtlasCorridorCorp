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

  // ----- Exchange-rate calculator -----
  function initRateCalculator() {
    var sendInput = document.getElementById("youSend");
    var getInput  = document.getElementById("receiverGets");
    if (!sendInput || !getInput) return;

    var RATE = 61.85; // 1 USD = 83.45 INR

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

    function recalc() {
      var usd = parseNumber(sendInput.value);
      if (isNaN(usd)) {
        getInput.value = formatNumber(0);
        return;
      }
      getInput.value = formatNumber(usd * RATE);
    }

    // Re-format on blur so the input always shows clean thousands-sep form
    sendInput.addEventListener("input", recalc);
    sendInput.addEventListener("blur", function () {
      var usd = parseNumber(sendInput.value);
      sendInput.value = isNaN(usd) ? formatNumber(0) : formatNumber(usd);
    });
    sendInput.addEventListener("focus", function () {
      // select all so typing replaces cleanly
      setTimeout(function () { sendInput.select(); }, 0);
    });
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
    initRateCalculator();
    initSmoothScroll();
    initWhatsAppLinks();
  });
})();
