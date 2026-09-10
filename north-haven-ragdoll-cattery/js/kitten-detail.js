/* Renders kitten.html detail view */
(function () {
  "use strict";

  function showMissing(mount, message) {
    mount.innerHTML =
      '<div class="container kitten-missing">' +
      "<h1>Kitten Not Found</h1>" +
      "<p>" +
      (message || "This kitten is no longer listed or the link is incorrect.") +
      "</p>" +
      '<p class="kitten-missing-hint">Open a kitten from the Available Kittens page.</p>' +
      '<a class="btn btn-primary" href="available-kittens.html">Back to Available Kittens</a>' +
      "</div>";
  }

  function render() {
    var S = window.NHStore;
    var mount = document.getElementById("kittenDetail");
    if (!mount) return;

    if (!S || typeof S.getKittenById !== "function") {
      showMissing(mount, "Kitten data failed to load. Please refresh the page.");
      return;
    }

    var id = S.getKittenIdFromLocation(window.location);
    if (!id) {
      showMissing(mount, "No kitten was selected.");
      return;
    }

    var kitten = S.getKittenById(id);
    if (!kitten) {
      // Try case-insensitive match
      kitten =
        S.getKittens().find(function (k) {
          return String(k.id).toLowerCase() === String(id).toLowerCase();
        }) || null;
    }

    if (!kitten || kitten.status === "placed") {
      showMissing(mount, "This kitten is no longer listed or has already been placed.");
      return;
    }

    document.title = kitten.name + " | North Haven Ragdoll Cattery";

    var isAvailable = kitten.status === "available";
    var preference = S.preferenceLabel(kitten);

    var facts = [
      ["Status", S.statusLabel(kitten.status)],
      ["Color / Pattern", kitten.color || "—"],
      ["Sex", kitten.sex || "—"],
      ["Born", kitten.born || "—"],
      ["Ready", kitten.ready || "—"],
      ["Age / Timing", kitten.age || "—"],
      ["Eye Color", kitten.eyes || "Blue"],
      ["Weight", kitten.weight || "Growing — ask for current weight"],
      ["Temperament", kitten.temperament || "—"],
      ["Price", kitten.price || "$1,500"],
    ];

    var healthRows = [
      ["Vaccinations", kitten.vaccinations],
      ["Deworming", kitten.deworming],
      ["Veterinary Check", kitten.vetCheck],
      ["Litter Trained", kitten.litterTrained],
      ["Socialization", kitten.socialized],
    ];

    var inquiryBlock = "";
    if (isAvailable) {
      inquiryBlock = [
        '<section class="kitten-inquiry" id="inquiry">',
        '  <div class="page-intro">',
        '    <p class="eyebrow">Available Now</p>',
        "    <h2>Apply for " + S.escapeHtml(kitten.name) + "</h2>",
        "    <p>Complete the full application below to inquire about reserving " +
          S.escapeHtml(kitten.name) +
          ". Submitting does not guarantee a kitten. After approval, the $500 reservation fee holds your match.</p>",
        "  </div>",
        '  <form class="application-form application-form-wide" id="inquiryForm">',
        '    <div class="form-fields">',
        "      <div data-application-fields></div>",
        '      <p class="form-note">This application is for ' +
          S.escapeHtml(kitten.name) +
          '. It does not place you on the future-litter waitlist. Prefer a future litter? <a href="waitlist.html#join">Join the Waitlist</a>.</p>',
        '      <button type="submit" class="btn btn-primary">Submit Application for ' +
          S.escapeHtml(kitten.name) +
          " →</button>",
        "    </div>",
        '    <div class="form-success" role="status">Thank you! Your application about ' +
          S.escapeHtml(kitten.name) +
          " has been received. We will be in touch soon.</div>",
        "  </form>",
        "</section>",
      ].join("\n");
    } else {
      inquiryBlock = [
        '<aside class="kitten-reserved-note">',
        '  <p class="eyebrow">Currently Reserved</p>',
        "  <h2>" + S.escapeHtml(kitten.name) + " Is Reserved</h2>",
        "  <p>This kitten is no longer open for new applications. You can browse other available kittens or join our waitlist for a future match.</p>",
        '  <div class="kitten-reserved-actions">',
        '    <a class="btn btn-primary" href="available-kittens.html">View Available Kittens</a>',
        '    <a class="btn btn-outline" href="waitlist.html#join">Join the Waitlist</a>',
        "  </div>",
        "</aside>",
      ].join("\n");
    }

    mount.innerHTML = [
      '<div class="container">',
      '  <a class="kitten-back" href="available-kittens.html">&larr; Back to Available Kittens</a>',
      '  <div class="kitten-detail-layout">',
      '    <div class="kitten-detail-media">',
      '      <img src="' +
        S.escapeHtml(kitten.photo) +
        '" alt="' +
        S.escapeHtml(kitten.name) +
        '" />',
      "    </div>",
      '    <div class="kitten-detail-copy">',
      '      <span class="badge ' +
        S.badgeClass(kitten.status) +
        '">' +
        S.statusLabel(kitten.status) +
        "</span>",
      "      <h1>" + S.escapeHtml(kitten.name) + "</h1>",
      '      <p class="kitten-detail-meta">' +
        S.escapeHtml(kitten.color) +
        " &bull; " +
        S.escapeHtml(kitten.sex) +
        "</p>",
      '      <p class="kitten-detail-desc">' + S.escapeHtml(kitten.description) + "</p>",
      isAvailable
        ? '<a class="btn btn-primary" href="#inquiry" data-scroll-to="inquiry">Apply for ' +
          S.escapeHtml(kitten.name) +
          " →</a>"
        : "",
      "    </div>",
      "  </div>",
      '  <div class="kitten-facts">',
      "    <h2>Kitten Details</h2>",
      '    <dl class="kitten-facts-grid">',
      facts
        .map(function (row) {
          return (
            "<div><dt>" +
            S.escapeHtml(row[0]) +
            "</dt><dd>" +
            S.escapeHtml(row[1] || "—") +
            "</dd></div>"
          );
        })
        .join(""),
      "    </dl>",
      "  </div>",
      '  <div class="kitten-health">',
      "    <h2>Health &amp; Care</h2>",
      '    <div class="kitten-health-grid">',
      healthRows
        .map(function (row) {
          return (
            '<article class="kitten-health-card"><h3>' +
            S.escapeHtml(row[0]) +
            "</h3><p>" +
            S.escapeHtml(row[1] || "—") +
            "</p></article>"
          );
        })
        .join(""),
      "    </div>",
      '    <p class="kitten-health-notes">' +
        S.escapeHtml(kitten.healthNotes || "") +
        "</p>",
      "  </div>",
      inquiryBlock,
      "</div>",
    ].join("\n");

    var form = document.getElementById("inquiryForm");
    if (form && window.NHApplication) {
      var defaults = {
        sexPreference: kitten.sex === "Male" || kitten.sex === "Female" ? kitten.sex : "",
        colorPreference: kitten.color || "",
        placementType: "Pet",
      };
      window.NHApplication.mount(form, {
        mode: "reserve",
        lockedKitten: preference,
        defaults: defaults,
      });
    }

    var applyBtn = mount.querySelector("[data-scroll-to='inquiry']");
    if (applyBtn) {
      applyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.getElementById("inquiry");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          if (history.replaceState) {
            history.replaceState(null, "", "#inquiry");
          }
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
