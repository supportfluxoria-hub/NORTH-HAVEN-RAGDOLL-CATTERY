/* Shared header + footer injection for multi-page site */
(function () {
  "use strict";

  var page = document.body.getAttribute("data-page") || "";

  function navClass(name) {
    return page === name ? ' class="active"' : "";
  }

  var header = [
    '<header class="site-header">',
    '  <div class="header-inner">',
    '    <a href="index.html" class="logo-link" aria-label="North Haven Ragdoll Cattery Home">',
    '      <img src="assets/logo.png" alt="North Haven Ragdoll Cattery logo" width="62" height="62" />',
    '      <span class="logo-text">',
    '        <span class="brand">North Haven</span>',
    '        <span class="sub">Ragdoll Cattery</span>',
    "      </span>",
    "    </a>",
    '    <nav class="main-nav" id="mainNav" aria-label="Primary">',
    '      <a href="index.html"' + navClass("home") + ">Home</a>",
    '      <a href="available-kittens.html"' + navClass("kittens") + ">Available Kittens</a>",
    '      <a href="blog.html"' + navClass("blog") + ">Blog</a>",
    '      <a href="about.html"' + navClass("about") + ">About Us</a>",
    '      <a href="health-care.html"' + navClass("health") + ">Health &amp; Care</a>",
    '      <a href="adoption-process.html"' + navClass("adoption") + ">Adoption Process</a>",
    '      <a href="waitlist.html#join"' + navClass("waitlist") + ">Waitlist</a>",
    '      <a href="waitlist.html#documents"' + navClass("contract") + ">Contract</a>",
    '      <a href="reviews.html"' + navClass("reviews") + ">Reviews</a>",
    '      <a href="faq.html"' + navClass("faq") + ">FAQ</a>",
    '      <a href="contact.html"' + navClass("contact") + ">Contact</a>",
    "    </nav>",
    '    <a href="available-kittens.html" class="btn btn-primary btn-header">',
    '      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.5-2c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-11 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM8.5 14c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm7 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM12 22c4.42 0 8-2.24 8-5 0-1.5-1.2-2.8-3.1-3.6-.4 1.5-1.7 2.6-3.3 2.6h-3.2c-1.6 0-2.9-1.1-3.3-2.6C5.2 14.2 4 15.5 4 17c0 2.76 3.58 5 8 5z"/></svg>',
    "      Available Kittens",
    "    </a>",
    '    <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false"><span></span></button>',
    "  </div>",
    "</header>",
  ].join("\n");

  var footer = [
    '<footer class="site-footer" id="contact">',
    '  <div class="container footer-grid">',
    '    <div class="footer-brand">',
    '      <img class="footer-logo" src="assets/logo.png" alt="North Haven Ragdoll Cattery" width="72" height="72" />',
    '      <p class="tagline">Raised with Love.<br />Bred for Excellence.</p>',
    '      <div class="footer-badges">',
    '        <a class="footer-tica" href="https://tica.org" target="_blank" rel="noopener noreferrer">',
    '          <img src="assets/tica-logo.png" alt="TICA — The International Cat Association" width="140" height="80" />',
    "        </a>",
    '        <a class="footer-cfa" href="https://cfa.org" target="_blank" rel="noopener noreferrer">',
    '          <img src="assets/cfa-logo.png" alt="CFA — The Cat Fanciers\' Association, since 1906" width="100" height="100" />',
    "        </a>",
    "      </div>",
    '      <p class="footer-tica-label">TICA &amp; CFA Registered</p>',
    "    </div>",
    '    <div class="footer-col">',
    "      <h4>Quick Links</h4>",
    "      <ul>",
    '        <li><a href="index.html">Home</a></li>',
    '        <li><a href="available-kittens.html">Available Kittens</a></li>',
    '        <li><a href="blog.html">Blog</a></li>',
    '        <li><a href="about.html">About Us</a></li>',
    '        <li><a href="health-care.html">Health &amp; Care</a></li>',
    "      </ul>",
    "    </div>",
    '    <div class="footer-col">',
    "      <h4>Support</h4>",
    "      <ul>",
    '        <li><a href="adoption-process.html">Adoption Process</a></li>',
    '        <li><a href="waitlist.html#join">Waitlist</a></li>',
    '        <li><a href="waitlist.html#documents">Contract</a></li>',
    '        <li><a href="reviews.html">Reviews</a></li>',
    '        <li><a href="faq.html">FAQ</a></li>',
    '        <li><a href="contact.html">Contact</a></li>',
    '        <li><a href="terms.html">Terms of Service</a></li>',
    '        <li><a href="privacy-policy.html">Privacy Policy</a></li>',
    "      </ul>",
    "    </div>",
    '    <div class="footer-col">',
    "      <h4>Stay Connected</h4>",
    '      <div class="social-links">',
    '        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.4.4.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.5.4 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.4-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.5.2-1.2.4-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.5-.4-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.4.2-.6.5-1 1-1.5s.9-.8 1.5-1c.5-.2 1.2-.4 2.4-.4C8.4 2.2 8.8 2.2 12 2.2m0 1.8c-3.2 0-3.5 0-4.8.1-1 .1-1.6.2-1.9.4-.4.1-.7.3-1 .6-.3.3-.5.6-.6 1-.2.4-.3.9-.4 1.9-.1 1.2-.1 1.6-.1 4.8s0 3.5.1 4.8c.1 1 .2 1.6.4 1.9.1.4.3.7.6 1 .3.3.6.5 1 .6.4.2.9.3 1.9.4 1.2.1 1.6.1 4.8.1s3.5 0 4.8-.1c1-.1 1.6-.2 1.9-.4.4-.1.7-.3 1-.6.3-.3.5-.6.6-1 .2-.4.3-.9.4-1.9.1-1.2.1-1.6.1-4.8s0-3.5-.1-4.8c-.1-1-.2-1.6-.4-1.9-.1-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.4-.2-.9-.3-1.9-.4-1.2-.1-1.6-.1-4.8-.1m0 3.1a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4m5.3-2.1a1.2 1.2 0 1 1 0 2.3 1.2 1.2 0 0 1 0-2.3"/></svg></a>',
    '        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.2h2.7V4.5H14c-2.6 0-4.4 1.9-4.4 4.7v2H7.2v3.8h2.4V22h3.9v-6.9h2.8l.5-3.8h-3.3V9.6c0-.8.3-1.4 1.5-1.4z"/></svg></a>',
    '        <a href="https://www.tiktok.com/@northhavencattery?_r=1&_t=ZP-99acC9RtzQ7" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 8.3a5.8 5.8 0 0 1-3.4-1.1v6.3a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.9a2.8 2.8 0 1 0 2 2.7V2.5h2.8c.2 1.7 1.3 3.2 2.8 4v1.8z"/></svg></a>',
    "      </div>",
    "      <h4>Contact Us</h4>",
    '      <div class="contact-info">',
    '        <p><a href="mailto:northhavenragdollcattery@yahoo.com">northhavenragdollcattery@yahoo.com</a></p>',
    '        <p><a href="tel:+14016844683">+1 (401) 684-4683</a></p>',
    "        <p>Dallas, Texas</p>",
    "      </div>",
    "    </div>",
    "  </div>",
    '  <div class="footer-bottom">',
    "    <span>© 2026 North Haven Ragdoll Cattery. All rights reserved.</span>",
    '    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.5-2c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-11 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM8.5 14c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm7 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM12 22c4.42 0 8-2.24 8-5 0-1.5-1.2-2.8-3.1-3.6-.4 1.5-1.7 2.6-3.3 2.6h-3.2c-1.6 0-2.9-1.1-3.3-2.6C5.2 14.2 4 15.5 4 17c0 2.76 3.58 5 8 5z"/></svg>',
    "  </div>",
    "</footer>",
  ].join("\n");

  var headerMount = document.getElementById("site-header");
  var footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.outerHTML = header;
  if (footerMount) footerMount.outerHTML = footer;
})();
