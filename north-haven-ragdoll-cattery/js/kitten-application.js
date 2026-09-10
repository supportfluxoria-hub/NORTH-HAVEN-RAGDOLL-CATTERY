/* Shared kitten application form (reserve + waitlist) */
(function (global) {
  "use strict";

  function fieldsHtml(opts) {
    opts = opts || {};
    var mode = opts.mode === "waitlist" ? "waitlist" : "reserve";
    var kittenSelect = "";

    if (mode === "reserve") {
      if (opts.lockedKitten) {
        kittenSelect = [
          '<div class="form-group full">',
          '  <label for="preferredKitten">Kitten</label>',
          '  <input id="preferredKitten" name="preferredKitten" type="text" readonly value="' +
            String(opts.lockedKitten).replace(/"/g, "&quot;") +
            '" />',
          "</div>",
        ].join("\n");
      } else {
        kittenSelect = [
          '<div class="form-group full">',
          '  <label for="preferredKitten">Available kitten (if choosing now)</label>',
          '  <select id="preferredKitten" name="preferredKitten">',
          '    <option value="">Select an available kitten (optional)</option>',
          "  </select>",
          "</div>",
        ].join("\n");
      }
    }

    return [
      '<div class="form-section">',
      '  <h3 class="form-section-title">1. Applicant Information</h3>',
      '  <div class="form-grid">',
      '    <div class="form-group full"><label for="purpose">Purpose</label>',
      '      <input id="purpose" name="purpose" type="text" readonly value="' +
        (mode === "waitlist" ? "Waitlist" : "Reserve available kitten") +
        '" /></div>',
      '    <div class="form-group full"><label for="fullName">Full name</label><input id="fullName" name="fullName" type="text" required autocomplete="name" /></div>',
      '    <div class="form-group"><label for="age">Age (18+)</label><input id="age" name="age" type="number" min="18" max="120" required placeholder="18+" /></div>',
      '    <div class="form-group"><label for="phone">Phone number</label><input id="phone" name="phone" type="tel" required autocomplete="tel" /></div>',
      '    <div class="form-group"><label for="email">Email</label><input id="email" name="email" type="email" required autocomplete="email" /></div>',
      '    <div class="form-group full"><label for="address">Full address</label><input id="address" name="address" type="text" required autocomplete="street-address" /></div>',
      '    <div class="form-group"><label for="city">City</label><input id="city" name="city" type="text" required autocomplete="address-level2" /></div>',
      '    <div class="form-group"><label for="state">State</label><input id="state" name="state" type="text" required autocomplete="address-level1" /></div>',
      '    <div class="form-group"><label for="zip">ZIP</label><input id="zip" name="zip" type="text" required autocomplete="postal-code" /></div>',
      "  </div>",
      "</div>",

      '<div class="form-section">',
      '  <h3 class="form-section-title">2. Household</h3>',
      '  <div class="form-grid">',
      '    <div class="form-group"><label for="adultsInHome">Adults in household</label><input id="adultsInHome" name="adultsInHome" type="number" min="1" required /></div>',
      '    <div class="form-group"><label for="childrenAges">Children + ages</label><input id="childrenAges" name="childrenAges" type="text" placeholder="e.g. None, or ages 5 &amp; 8" required /></div>',
      '    <div class="form-group full"><label for="everyoneAgrees">Does everyone agree to getting the kitten?</label>',
      '      <select id="everyoneAgrees" name="everyoneAgrees" required><option value="">Select</option><option>Yes</option><option>No</option></select></div>',
      '    <div class="form-group full"><label for="otherPets">Do you have other pets? If yes, list species, age, and sex.</label>',
      '      <textarea id="otherPets" name="otherPets" required placeholder="e.g. None, or Dog — 4 yrs, male; Cat — 2 yrs, female"></textarea></div>',
      "  </div>",
      "</div>",

      '<div class="form-section">',
      '  <h3 class="form-section-title">3. Home</h3>',
      '  <div class="form-grid">',
      '    <div class="form-group"><label for="ownOrRent">Own or rent?</label>',
      '      <select id="ownOrRent" name="ownOrRent" required><option value="">Select</option><option>Own</option><option>Rent</option></select></div>',
      '    <div class="form-group"><label for="catsPermitted">If renting, are cats permitted?</label>',
      '      <select id="catsPermitted" name="catsPermitted"><option value="">N/A — I own</option><option>Yes</option><option>No</option><option>Need to confirm</option></select></div>',
      '    <div class="form-group"><label for="indoorOnly">Will the kitten be indoor-only?</label>',
      '      <select id="indoorOnly" name="indoorOnly" required><option value="">Select</option><option>Yes</option><option>No</option></select></div>',
      '    <div class="form-group"><label for="hoursAlone">Hours alone each day (typical)</label><input id="hoursAlone" name="hoursAlone" type="text" required placeholder="e.g. 4–6 hours" /></div>',
      "  </div>",
      "</div>",

      '<div class="form-section">',
      '  <h3 class="form-section-title">4. Experience</h3>',
      '  <div class="form-grid">',
      '    <div class="form-group"><label for="ownedCatsBefore">Have you owned cats before?</label>',
      '      <select id="ownedCatsBefore" name="ownedCatsBefore" required><option value="">Select</option><option>Yes</option><option>No</option></select></div>',
      '    <div class="form-group"><label for="ownedRagdollBefore">Have you owned a Ragdoll before?</label>',
      '      <select id="ownedRagdollBefore" name="ownedRagdollBefore" required><option value="">Select</option><option>Yes</option><option>No</option></select></div>',
      '    <div class="form-group full"><label for="whyRagdoll">Why do you want a Ragdoll?</label><textarea id="whyRagdoll" name="whyRagdoll" required></textarea></div>',
      '    <div class="form-group full"><label for="whyCattery">Why are you interested in our cattery?</label><textarea id="whyCattery" name="whyCattery" required></textarea></div>',
      "  </div>",
      "</div>",

      '<div class="form-section">',
      '  <h3 class="form-section-title">5. Care</h3>',
      '  <div class="form-grid">',
      '    <div class="form-group"><label for="hasVeterinarian">Do you have a veterinarian?</label>',
      '      <select id="hasVeterinarian" name="hasVeterinarian" required><option value="">Select</option><option>Yes</option><option>No — will establish one</option></select></div>',
      '    <div class="form-group"><label for="preparedForVetCosts">Prepared for routine &amp; emergency vet expenses?</label>',
      '      <select id="preparedForVetCosts" name="preparedForVetCosts" required><option value="">Select</option><option>Yes</option><option>No</option></select></div>',
      '    <div class="form-group full"><label for="feedingPlan">What will you feed the kitten?</label><textarea id="feedingPlan" name="feedingPlan" required placeholder="Brand / type of food you plan to use"></textarea></div>',
      '    <div class="form-group full"><label for="followCareRecommendations">Willing to follow the breeder’s care recommendations?</label>',
      '      <select id="followCareRecommendations" name="followCareRecommendations" required><option value="">Select</option><option>Yes</option><option>No</option></select></div>',
      "  </div>",
      "</div>",

      '<div class="form-section">',
      '  <h3 class="form-section-title">6. Kitten Preference</h3>',
      '  <div class="form-grid">',
      kittenSelect,
      '    <div class="form-group"><label for="sexPreference">Male / Female / No preference</label>',
      '      <select id="sexPreference" name="sexPreference" required><option value="">Select</option><option>Male</option><option>Female</option><option>No preference</option></select></div>',
      '    <div class="form-group"><label for="colorPreference">Preferred color/pattern</label><input id="colorPreference" name="colorPreference" type="text" placeholder="e.g. Blue Point, Seal Bicolor, Open" required /></div>',
      '    <div class="form-group"><label for="placementType">Pet / Breeding / Show</label>',
      '      <select id="placementType" name="placementType" required><option value="">Select</option><option>Pet</option><option>Breeding</option><option>Show</option></select></div>',
      '    <div class="form-group"><label for="willingToWait">Willing to wait for the right kitten (temperament &amp; availability)?</label>',
      '      <select id="willingToWait" name="willingToWait" required><option value="">Select</option><option>Yes</option><option>No</option></select></div>',
      '    <div class="form-group full"><label for="deliveryOrPickup">Delivery or pickup?</label>',
      '      <select id="deliveryOrPickup" name="deliveryOrPickup" required><option value="">Select</option><option>Pickup</option><option>Delivery</option><option>Either / discuss options</option></select></div>',
      "  </div>",
      "</div>",

      '<div class="form-section">',
      '  <h3 class="form-section-title">7. Important Agreement</h3>',
      '  <div class="form-agreements">',
      '    <label class="form-check"><input type="checkbox" name="agreeNoGuarantee" id="agreeNoGuarantee" required /> <span>I understand that submitting this application does not guarantee a kitten.</span></label>',
      '    <label class="form-check"><input type="checkbox" name="agreeTruthful" id="agreeTruthful" required /> <span>I confirm that the information provided is truthful.</span></label>',
      '    <label class="form-check"><input type="checkbox" name="agreeCareHome" id="agreeCareHome" required /> <span>I agree to provide proper veterinary care and a safe indoor home.</span></label>',
      mode === "waitlist"
        ? '    <label class="form-check"><input type="checkbox" name="agreeContract" id="agreeContract" required /> <span>I have reviewed and agree to the <a href="document-viewer.html?doc=waitlist-agreement" target="_blank" rel="noopener">Waitlist Agreement</a>, refund policy, and related <a href="terms.html" target="_blank" rel="noopener">Terms</a>. I understand the separate <a href="document-viewer.html?doc=sale-contract" target="_blank" rel="noopener">Sale Contract</a> applies at adoption.</span></label>'
        : '    <label class="form-check"><input type="checkbox" name="agreeContract" id="agreeContract" required /> <span>I have reviewed and agree to the <a href="document-viewer.html?doc=sale-contract" target="_blank" rel="noopener">Sale / Adoption Contract</a>, health guarantee, refund policy, reservation terms, and <a href="terms.html" target="_blank" rel="noopener">Terms of Service</a>.</span></label>',
      "  </div>",
      "</div>",
    ].join("\n");
  }

  function val(form, name) {
    var el = form.elements[name];
    if (!el) return "";
    if (el.type === "checkbox") return el.checked ? "Yes" : "No";
    return String(el.value || "").trim();
  }

  function readForm(form) {
    var fullName = val(form, "fullName");
    var parts = fullName.split(/\s+/);
    var firstName = parts[0] || "";
    var lastName = parts.slice(1).join(" ") || "";

    var sex = val(form, "sexPreference");
    var color = val(form, "colorPreference");
    var preferredKitten = val(form, "preferredKitten");
    var preferenceParts = [];
    if (preferredKitten) preferenceParts.push(preferredKitten);
    if (sex) preferenceParts.push(sex);
    if (color) preferenceParts.push(color);
    preferenceParts.push(val(form, "placementType"));

    return {
      purpose: val(form, "purpose"),
      fullName: fullName,
      firstName: firstName,
      lastName: lastName,
      age: val(form, "age"),
      phone: val(form, "phone"),
      email: val(form, "email"),
      address: val(form, "address"),
      city: val(form, "city"),
      state: val(form, "state"),
      zip: val(form, "zip"),
      adultsInHome: val(form, "adultsInHome"),
      childrenAges: val(form, "childrenAges"),
      everyoneAgrees: val(form, "everyoneAgrees"),
      otherPets: val(form, "otherPets"),
      ownOrRent: val(form, "ownOrRent"),
      catsPermitted: val(form, "catsPermitted"),
      indoorOnly: val(form, "indoorOnly"),
      hoursAlone: val(form, "hoursAlone"),
      ownedCatsBefore: val(form, "ownedCatsBefore"),
      ownedRagdollBefore: val(form, "ownedRagdollBefore"),
      whyRagdoll: val(form, "whyRagdoll"),
      whyCattery: val(form, "whyCattery"),
      hasVeterinarian: val(form, "hasVeterinarian"),
      preparedForVetCosts: val(form, "preparedForVetCosts"),
      feedingPlan: val(form, "feedingPlan"),
      followCareRecommendations: val(form, "followCareRecommendations"),
      preferredKitten: preferredKitten,
      sexPreference: sex,
      colorPreference: color,
      placementType: val(form, "placementType"),
      willingToWait: val(form, "willingToWait"),
      deliveryOrPickup: val(form, "deliveryOrPickup"),
      preference: preferenceParts.filter(Boolean).join(" · "),
      agreeNoGuarantee: val(form, "agreeNoGuarantee"),
      agreeTruthful: val(form, "agreeTruthful"),
      agreeCareHome: val(form, "agreeCareHome"),
      agreeContract: val(form, "agreeContract"),
      about:
        "Household: " +
        val(form, "adultsInHome") +
        " adults; Children: " +
        val(form, "childrenAges") +
        "; Pets: " +
        val(form, "otherPets") +
        " | Home: " +
        val(form, "ownOrRent") +
        ", indoor-only: " +
        val(form, "indoorOnly") +
        ", alone: " +
        val(form, "hoursAlone") +
        " | Why Ragdoll: " +
        val(form, "whyRagdoll"),
    };
  }

  function fillAvailableKittens(selectEl, store) {
    if (!selectEl || !store) return;
    var available = store.getKittens().filter(function (k) {
      return k.status === "available";
    });
    if (!available.length) {
      var none = document.createElement("option");
      none.value = "";
      none.textContent = "No kittens available right now — use the Waitlist for future litters";
      selectEl.appendChild(none);
      return;
    }
    available.forEach(function (k) {
      var opt = document.createElement("option");
      opt.value = store.preferenceLabel(k);
      opt.textContent = store.preferenceLabel(k);
      selectEl.appendChild(opt);
    });
  }

  function mount(form, opts) {
    opts = opts || {};
    var fieldsMount = form.querySelector("[data-application-fields]");
    if (!fieldsMount) return;

    fieldsMount.innerHTML = fieldsHtml(opts);

    if (opts.mode === "reserve" && !opts.lockedKitten && global.NHStore) {
      fillAvailableKittens(form.querySelector("#preferredKitten"), global.NHStore);
    }

    if (opts.defaults) {
      Object.keys(opts.defaults).forEach(function (key) {
        var el = form.elements[key];
        if (el && opts.defaults[key] != null && opts.defaults[key] !== "") {
          el.value = opts.defaults[key];
        }
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!global.NHStore) return;
      if (!global.NHMail) {
        var dataOnly = readForm(form);
        dataOnly.applicationType = opts.mode === "waitlist" ? "waitlist" : "reserve";
        dataOnly.purpose = opts.mode === "waitlist" ? "Waitlist" : dataOnly.purpose || "Reserve available kitten";
        global.NHStore.addApplication(dataOnly);
        form.classList.add("sent");
        return;
      }

      global.NHMail.clearError(form);
      global.NHMail.setBusy(form, true);

      var data = readForm(form);
      data.applicationType = opts.mode === "waitlist" ? "waitlist" : "reserve";
      data.purpose = opts.mode === "waitlist" ? "Waitlist" : data.purpose || "Reserve available kitten";
      if (opts.mode === "waitlist") {
        data.about = "[WAITLIST] " + data.about;
        if (!data.preference) data.preference = "Future litter / waitlist";
      } else {
        var prefix = opts.lockedKitten ? "[KITTEN APPLICATION] " : "[RESERVE] ";
        data.about = prefix + data.about;
        if (!data.preference) {
          data.preference = opts.lockedKitten || "Available kitten — reserve now";
        }
      }

      var subject =
        opts.mode === "waitlist"
          ? "North Haven — Waitlist Application"
          : opts.lockedKitten
            ? "North Haven — Kitten Application (" + opts.lockedKitten + ")"
            : "North Haven — Adoption / Reserve Application";

      var mailPayload = Object.assign({}, data, {
        _subject: subject,
        formType: data.applicationType,
        sourcePage: typeof location !== "undefined" ? location.href : "",
        _replyto: data.email || "",
      });

      Promise.resolve()
        .then(function () {
          global.NHStore.addApplication(data);
        })
        .then(function () {
          return global.NHMail.send(mailPayload);
        })
        .then(function () {
          form.classList.add("sent");
          form.scrollIntoView({ behavior: "smooth", block: "start" });
        })
        .catch(function (err) {
          global.NHMail.showError(
            form,
            (err && err.message) ||
              "Your application was saved locally, but email delivery failed. Please also email " +
                global.NHMail.INBOX +
                "."
          );
        })
        .then(function () {
          global.NHMail.setBusy(form, false);
        });
    });
  }

  global.NHApplication = {
    fieldsHtml: fieldsHtml,
    readForm: readForm,
    mount: mount,
    fillAvailableKittens: fillAvailableKittens,
  };
})(window);
