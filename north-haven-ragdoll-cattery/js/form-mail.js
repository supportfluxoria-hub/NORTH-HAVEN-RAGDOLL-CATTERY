/* Sends website form submissions to the cattery inbox via FormSubmit */
(function (global) {
  "use strict";

  var INBOX = "northhavenragdollcattery@yahoo.com";
  var ENDPOINT = "https://formsubmit.co/ajax/" + INBOX;

  function isTruthySuccess(value) {
    return value === true || value === "true" || value === 1 || value === "1";
  }

  function flatten(data) {
    var out = {};
    Object.keys(data || {}).forEach(function (key) {
      var value = data[key];
      if (value == null) return;
      if (typeof value === "object") {
        out[key] = JSON.stringify(value);
      } else {
        out[key] = String(value);
      }
    });
    return out;
  }

  function pageUrl() {
    try {
      if (/^https?:/i.test(location.href)) return location.href;
    } catch (e) {}
    return "";
  }

  function send(payload) {
    if (typeof location !== "undefined" && location.protocol === "file:") {
      return Promise.reject(
        new Error(
          "Forms cannot email from a file opened on your computer. Open the site through a local web server (for example http://localhost:8765), then submit again."
        )
      );
    }

    var body = flatten(payload || {});
    body._subject = body._subject || "North Haven website form";
    body._template = "table";
    body._captcha = "false";
    body._honey = "";
    if (!body._url) {
      var url = pageUrl();
      if (url) body._url = url;
    }

    return fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }).then(function (res) {
      return res
        .json()
        .catch(function () {
          return {};
        })
        .then(function (json) {
          var message =
            (json && (json.message || json.error)) ||
            "Unable to send your message right now. Please email " + INBOX + " directly.";

          // FormSubmit often returns HTTP 200 with success:"false"
          if (!res.ok || (json && Object.prototype.hasOwnProperty.call(json, "success") && !isTruthySuccess(json.success))) {
            if (/activation/i.test(message)) {
              throw new Error(
                "Almost there — FormSubmit emailed an activation link to " +
                  INBOX +
                  ". Open that Yahoo inbox (and Spam/Junk), click Activate Form, then submit again."
              );
            }
            throw new Error(message);
          }

          return json;
        });
    });
  }

  function setBusy(form, busy) {
    var btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    if (busy) {
      btn.disabled = true;
      btn.dataset.originalText = btn.textContent;
      btn.textContent = "Sending…";
    } else {
      btn.disabled = false;
      if (btn.dataset.originalText) {
        btn.textContent = btn.dataset.originalText;
      }
    }
  }

  function showError(form, message) {
    var existing = form.querySelector(".form-error");
    if (!existing) {
      existing = document.createElement("p");
      existing.className = "form-error";
      existing.setAttribute("role", "alert");
      var fields = form.querySelector(".form-fields") || form;
      fields.appendChild(existing);
    }
    existing.textContent = message;
    existing.hidden = false;
  }

  function clearError(form) {
    var existing = form.querySelector(".form-error");
    if (existing) existing.hidden = true;
  }

  /**
   * Handle a form submit: optional local save + email delivery.
   * opts: {
   *   subject: string,
   *   buildPayload: function(form) -> object,
   *   onLocalSave: function(payload) optional,
   *   successClass: string (default "sent")
   * }
   */
  function bind(form, opts) {
    if (!form || !opts || typeof opts.buildPayload !== "function") return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearError(form);
      setBusy(form, true);

      var payload;
      try {
        payload = opts.buildPayload(form) || {};
      } catch (err) {
        setBusy(form, false);
        showError(form, err.message || "Please check the form and try again.");
        return;
      }

      payload._subject = opts.subject || payload._subject || "North Haven website form";

      Promise.resolve()
        .then(function () {
          if (typeof opts.onLocalSave === "function") {
            opts.onLocalSave(payload);
          }
        })
        .then(function () {
          return send(payload);
        })
        .then(function () {
          form.classList.add(opts.successClass || "sent");
          form.scrollIntoView({ behavior: "smooth", block: "start" });
        })
        .catch(function (err) {
          showError(
            form,
            (err && err.message) ||
              "Something went wrong. Please email " + INBOX + " directly."
          );
        })
        .then(function () {
          setBusy(form, false);
        });
    });
  }

  global.NHMail = {
    INBOX: INBOX,
    send: send,
    bind: bind,
    setBusy: setBusy,
    showError: showError,
    clearError: clearError,
  };
})(window);
