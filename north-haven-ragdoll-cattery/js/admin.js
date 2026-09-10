/* Admin dashboard logic */
(function () {
  "use strict";

  var S = window.NHStore;
  var AI = window.NHBlogAI;
  var pendingPhotoData = null;
  var pendingBlogCover = null;

  var loginScreen = document.getElementById("loginScreen");
  var adminApp = document.getElementById("adminApp");
  var loginForm = document.getElementById("loginForm");
  var loginError = document.getElementById("loginError");
  var logoutBtn = document.getElementById("logoutBtn");
  var applicationsList = document.getElementById("applicationsList");
  var applicationsEmpty = document.getElementById("applicationsEmpty");
  var appCount = document.getElementById("appCount");
  var kittensList = document.getElementById("kittensList");
  var kittenModal = document.getElementById("kittenModal");
  var kittenForm = document.getElementById("kittenForm");
  var kittenPreview = document.getElementById("kittenPreview");
  var modalTitle = document.getElementById("kittenModalTitle");

  var blogsList = document.getElementById("blogsList");
  var blogsEmpty = document.getElementById("blogsEmpty");
  var blogCount = document.getElementById("blogCount");
  var blogModal = document.getElementById("blogModal");
  var blogForm = document.getElementById("blogForm");
  var blogPreview = document.getElementById("blogPreview");
  var blogModalTitle = document.getElementById("blogModalTitle");
  var aiBlogBox = document.getElementById("aiBlogBox");
  var aiStatus = document.getElementById("aiStatus");
  var adminReviewsList = document.getElementById("adminReviewsList");
  var reviewsEmpty = document.getElementById("reviewsEmpty");
  var reviewCount = document.getElementById("reviewCount");

  function showApp() {
    loginScreen.hidden = true;
    adminApp.hidden = false;
    renderAll();
  }

  function showLogin() {
    adminApp.hidden = true;
    loginScreen.hidden = false;
    closeModal();
    closeBlogModal();
  }

  function renderAll() {
    renderApplications();
    renderKittens();
    renderBlogs();
    renderReviews();
    renderDocuments();
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch (e) {
      return iso || "";
    }
  }

  function formatDateShort(iso) {
    try {
      return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
    } catch (e) {
      return iso || "";
    }
  }

  function typeLabel(type) {
    if (type === "waitlist") return "Waitlist";
    if (type === "reserve") return "Reserve";
    return "Application";
  }

  function appName(a) {
    return a.fullName || (a.firstName + " " + a.lastName).trim() || "Applicant";
  }

  function row(label, value, full) {
    return (
      "<div" +
      (full ? ' class="full"' : "") +
      "><dt>" +
      S.escapeHtml(label) +
      "</dt><dd>" +
      S.escapeHtml(value || "—") +
      "</dd></div>"
    );
  }

  function renderApplications() {
    var apps = S.getApplications();
    var newCount = apps.filter(function (a) {
      return a.status === "new";
    }).length;
    appCount.textContent = String(newCount || apps.length);

    if (!apps.length) {
      applicationsEmpty.hidden = false;
      applicationsList.innerHTML = "";
      return;
    }

    applicationsEmpty.hidden = true;
    applicationsList.innerHTML = apps
      .map(function (a) {
        var location = [a.city, a.state, a.zip].filter(Boolean).join(", ") || a.city || "—";
        return [
          '<article class="admin-app-card' + (a.status === "new" ? " is-new" : "") + '" data-id="' + S.escapeHtml(a.id) + '">',
          '  <div class="admin-app-top">',
          "    <div>",
          "      <h3>" + S.escapeHtml(appName(a)) + "</h3>",
          '      <p class="admin-app-meta">' +
            S.escapeHtml(formatDate(a.createdAt)) +
            " · " +
            S.escapeHtml(typeLabel(a.applicationType)) +
            "</p>",
          "    </div>",
          '    <div class="admin-app-actions">',
          '      <select data-action="status" aria-label="Application status">',
          '        <option value="new"' + (a.status === "new" ? " selected" : "") + ">New</option>",
          '        <option value="reviewed"' + (a.status === "reviewed" ? " selected" : "") + ">Reviewed</option>",
          '        <option value="approved"' + (a.status === "approved" ? " selected" : "") + ">Approved</option>",
          '        <option value="declined"' + (a.status === "declined" ? " selected" : "") + ">Declined</option>",
          "      </select>",
          '      <button type="button" class="danger" data-action="delete">Delete</button>',
          "    </div>",
          "  </div>",
          '  <dl class="admin-app-grid">',
          row("Type", typeLabel(a.applicationType)),
          row("Purpose", a.purpose || typeLabel(a.applicationType)),
          row("Age", a.age),
          '    <div><dt>Email</dt><dd><a href="mailto:' + S.escapeHtml(a.email) + '">' + S.escapeHtml(a.email || "—") + "</a></dd></div>",
          row("Phone", a.phone),
          row("Address", a.address, true),
          row("City / State / ZIP", location),
          row("Adults", a.adultsInHome),
          row("Children", a.childrenAges),
          row("Everyone agrees", a.everyoneAgrees),
          row("Other pets", a.otherPets, true),
          row("Own / Rent", a.ownOrRent),
          row("Cats permitted", a.catsPermitted),
          row("Indoor-only", a.indoorOnly),
          row("Hours alone", a.hoursAlone),
          row("Owned cats before", a.ownedCatsBefore),
          row("Owned Ragdoll before", a.ownedRagdollBefore),
          row("Why Ragdoll", a.whyRagdoll, true),
          row("Why our cattery", a.whyCattery, true),
          row("Veterinarian", a.hasVeterinarian),
          row("Prepared for vet costs", a.preparedForVetCosts),
          row("Feeding plan", a.feedingPlan, true),
          row("Follow care recommendations", a.followCareRecommendations),
          row("Preferred kitten", a.preferredKitten),
          row("Sex preference", a.sexPreference),
          row("Color / pattern", a.colorPreference),
          row("Pet / Breeding / Show", a.placementType),
          row("Willing to wait", a.willingToWait),
          row("Delivery or pickup", a.deliveryOrPickup),
          row("Preference summary", a.preference, true),
          row("Agreements", [a.agreeNoGuarantee, a.agreeTruthful, a.agreeCareHome, a.agreeContract].filter(Boolean).join(" · ") || "—", true),
          '    <div class="full"><dt>Notes / summary</dt><dd>' + S.escapeHtml(a.about || "—") + "</dd></div>",
          "  </dl>",
          "</article>",
        ].join("\n");
      })
      .join("");
  }

  function renderKittens() {
    var list = S.getKittens();
    kittensList.innerHTML = list
      .map(function (k) {
        return [
          '<article class="admin-kitten-card" data-id="' + S.escapeHtml(k.id) + '">',
          '  <img src="' + S.escapeHtml(k.photo) + '" alt="' + S.escapeHtml(k.name) + '" />',
          "  <div>",
          "    <h3>" + S.escapeHtml(k.name) + "</h3>",
          '    <p class="meta">' + S.escapeHtml(k.color + " • " + k.sex) + (k.featured ? " · Featured" : "") + "</p>",
          '    <span class="badge ' + S.badgeClass(k.status) + '">' + S.statusLabel(k.status) + "</span>",
          "  </div>",
          '  <div class="admin-kitten-actions">',
          '    <button type="button" class="btn btn-primary" data-action="edit">Edit</button>',
          '    <button type="button" class="btn btn-danger" data-action="delete">Delete</button>',
          "  </div>",
          "</article>",
        ].join("\n");
      })
      .join("");
  }

  function renderBlogs() {
    var list = S.getBlogs();
    blogCount.textContent = String(list.length);

    if (!list.length) {
      blogsEmpty.hidden = false;
      blogsList.innerHTML = "";
      return;
    }

    blogsEmpty.hidden = true;
    blogsList.innerHTML = list
      .map(function (b) {
        return [
          '<article class="admin-blog-card" data-id="' + S.escapeHtml(b.id) + '">',
          '  <img src="' + S.escapeHtml(b.coverImage || "") + '" alt="" />',
          "  <div>",
          "    <h3>" + S.escapeHtml(b.title) + "</h3>",
          '    <p class="meta">' +
            S.escapeHtml((b.category || "Guides") + " · " + formatDateShort(b.createdAt)) +
            (b.generatedFrom ? " · AI: " + S.escapeHtml(b.generatedFrom) : "") +
            "</p>",
          '    <span class="badge ' + (b.status === "published" ? "badge-available" : "badge-placed") + '">' +
            S.escapeHtml(b.status === "published" ? "Published" : "Draft") +
            "</span>",
          "  </div>",
          '  <div class="admin-kitten-actions">',
          '    <a class="btn btn-outline" href="blog-post.html?slug=' + encodeURIComponent(b.slug) + '" target="_blank" rel="noopener">View</a>',
          '    <button type="button" class="btn btn-primary" data-action="edit">Edit</button>',
          '    <button type="button" class="btn btn-danger" data-action="delete">Delete</button>',
          "  </div>",
          "</article>",
        ].join("\n");
      })
      .join("");
  }

  function reviewStatusBadge(status) {
    if (status === "approved") return '<span class="badge badge-available">Approved</span>';
    if (status === "declined") return '<span class="badge badge-placed">Declined</span>';
    return '<span class="badge badge-reserved">Pending</span>';
  }

  function renderReviews() {
    var list = S.getReviews();
    var pending = list.filter(function (r) {
      return r.status === "pending";
    }).length;
    reviewCount.textContent = String(pending || list.length);

    if (!list.length) {
      reviewsEmpty.hidden = false;
      adminReviewsList.innerHTML = "";
      return;
    }

    reviewsEmpty.hidden = true;
    adminReviewsList.innerHTML = list
      .map(function (r) {
        return [
          '<article class="admin-app-card' + (r.status === "pending" ? " is-new" : "") + '" data-id="' + S.escapeHtml(r.id) + '">',
          '  <div class="admin-app-top">',
          "    <div>",
          "      <h3>" + S.escapeHtml(r.name) + "</h3>",
          '      <p class="admin-app-meta">' +
            S.escapeHtml((r.location || "—") + " · " + formatDate(r.createdAt)) +
            " · " +
            S.starsHtml(r.rating) +
            "</p>",
          "    </div>",
          '    <div class="admin-app-actions">',
          reviewStatusBadge(r.status),
          r.status !== "approved"
            ? '      <button type="button" data-action="approve">Approve</button>'
            : "",
          r.status !== "declined"
            ? '      <button type="button" data-action="decline">Decline</button>'
            : "",
          '      <button type="button" class="danger" data-action="delete">Delete</button>',
          "    </div>",
          "  </div>",
          '  <dl class="admin-app-grid">',
          r.email
            ? "    <div><dt>Email</dt><dd><a href=\"mailto:" + S.escapeHtml(r.email) + "\">" + S.escapeHtml(r.email) + "</a></dd></div>"
            : "",
          '    <div class="full"><dt>Review</dt><dd>“' + S.escapeHtml(r.text) + '”</dd></div>',
          "  </dl>",
          "</article>",
        ].join("\n");
      })
      .join("");
  }

  function openModal(kitten) {
    pendingPhotoData = null;
    kittenForm.reset();
    document.getElementById("kittenPhotoFile").value = "";

    if (kitten) {
      modalTitle.textContent = "Edit Kitten";
      document.getElementById("kittenId").value = kitten.id;
      document.getElementById("kittenName").value = kitten.name;
      document.getElementById("kittenColor").value = kitten.color;
      document.getElementById("kittenSex").value = kitten.sex;
      document.getElementById("kittenBorn").value = kitten.born || "";
      document.getElementById("kittenReady").value = kitten.ready || "";
      document.getElementById("kittenAge").value = kitten.age || "";
      document.getElementById("kittenEyes").value = kitten.eyes || "";
      document.getElementById("kittenWeight").value = kitten.weight || "";
      document.getElementById("kittenPrice").value = kitten.price || "";
      document.getElementById("kittenTemperament").value = kitten.temperament || "";
      document.getElementById("kittenDescription").value = kitten.description || "";
      document.getElementById("kittenVaccinations").value = kitten.vaccinations || "";
      document.getElementById("kittenDeworming").value = kitten.deworming || "";
      document.getElementById("kittenVetCheck").value = kitten.vetCheck || "";
      document.getElementById("kittenLitter").value = kitten.litterTrained || "";
      document.getElementById("kittenSocialized").value = kitten.socialized || "";
      document.getElementById("kittenHealthNotes").value = kitten.healthNotes || "";
      document.getElementById("kittenStatus").value = kitten.status || "available";
      document.getElementById("kittenPhotoUrl").value = kitten.photo || "";
      document.getElementById("kittenFeatured").checked = !!kitten.featured;
      kittenPreview.src = kitten.photo || "";
    } else {
      modalTitle.textContent = "Add Kitten";
      document.getElementById("kittenId").value = "";
      document.getElementById("kittenStatus").value = "available";
      document.getElementById("kittenSex").value = "Female";
      document.getElementById("kittenEyes").value = "Blue";
      document.getElementById("kittenPrice").value = "$1,500";
      document.getElementById("kittenFeatured").checked = false;
      kittenPreview.removeAttribute("src");
    }

    kittenModal.hidden = false;
  }

  function closeModal() {
    kittenModal.hidden = true;
    pendingPhotoData = null;
  }

  function updatePreview() {
    var url = document.getElementById("kittenPhotoUrl").value.trim();
    if (pendingPhotoData) {
      kittenPreview.src = pendingPhotoData;
    } else if (url) {
      kittenPreview.src = url;
    }
  }

  function fillBlogForm(post) {
    pendingBlogCover = null;
    document.getElementById("blogCoverFile").value = "";
    document.getElementById("blogId").value = post.id || "";
    document.getElementById("blogTitle").value = post.title || "";
    document.getElementById("blogSlug").value = post.slug || "";
    document.getElementById("blogStatus").value = post.status || "published";
    document.getElementById("blogCategory").value = post.category || "";
    document.getElementById("blogTags").value = (post.tags || []).join(", ");
    document.getElementById("blogMeta").value = post.metaDescription || "";
    document.getElementById("blogExcerpt").value = post.excerpt || "";
    document.getElementById("blogCover").value = post.coverImage || "";
    document.getElementById("blogCoverAlt").value = post.coverImageAlt || "";
    document.getElementById("blogContent").value = post.contentHtml || "";
    if (post.coverImage) blogPreview.src = post.coverImage;
    else blogPreview.removeAttribute("src");
  }

  function openBlogModal(post) {
    blogForm.reset();
    pendingBlogCover = null;
    document.getElementById("blogCoverFile").value = "";
    if (post && post.id) {
      blogModalTitle.textContent = "Edit Blog Post";
      fillBlogForm(post);
    } else if (post) {
      blogModalTitle.textContent = "Review AI Post";
      fillBlogForm(Object.assign({ id: "" }, post));
    } else {
      blogModalTitle.textContent = "New Blog Post";
      fillBlogForm({
        id: "",
        title: "",
        slug: "",
        status: "published",
        category: "Guides",
        tags: [],
        metaDescription: "",
        excerpt: "",
        coverImage: "",
        coverImageAlt: "",
        contentHtml: "<p></p>",
      });
    }
    blogModal.hidden = false;
  }

  function closeBlogModal() {
    blogModal.hidden = true;
    pendingBlogCover = null;
  }

  function updateBlogCoverPreview() {
    if (pendingBlogCover) {
      blogPreview.src = pendingBlogCover;
      return;
    }
    var url = document.getElementById("blogCover").value.trim();
    if (url) blogPreview.src = url;
    else blogPreview.removeAttribute("src");
  }

  function setAiStatus(msg, isError) {
    if (!msg) {
      aiStatus.hidden = true;
      aiStatus.textContent = "";
      return;
    }
    aiStatus.hidden = false;
    aiStatus.textContent = msg;
    aiStatus.classList.toggle("is-error", !!isError);
  }

  // Auth
  if (S.isLoggedIn()) showApp();
  else showLogin();

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    loginError.hidden = true;
    var ok = S.login(document.getElementById("adminPassword").value);
    if (ok) {
      loginForm.reset();
      showApp();
    } else {
      loginError.hidden = false;
    }
  });

  logoutBtn.addEventListener("click", function () {
    S.logout();
    showLogin();
  });

  // Tabs
  document.querySelectorAll(".admin-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".admin-tab").forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      document.querySelectorAll(".admin-panel").forEach(function (p) {
        p.classList.remove("active");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      document.getElementById("panel-" + tab.getAttribute("data-tab")).classList.add("active");
    });
  });

  // Applications
  applicationsList.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn || btn.tagName !== "BUTTON") return;
    var card = btn.closest("[data-id]");
    if (!card) return;
    var id = card.getAttribute("data-id");
    if (btn.getAttribute("data-action") === "delete") {
      if (confirm("Delete this application?")) {
        S.deleteApplication(id);
        renderApplications();
      }
    }
  });

  applicationsList.addEventListener("change", function (e) {
    var select = e.target.closest("select[data-action='status']");
    if (!select) return;
    var card = select.closest("[data-id]");
    if (!card) return;
    S.updateApplication(card.getAttribute("data-id"), { status: select.value });
    renderApplications();
  });

  // Reviews moderation
  adminReviewsList.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn || btn.tagName !== "BUTTON") return;
    var card = btn.closest("[data-id]");
    if (!card) return;
    var id = card.getAttribute("data-id");
    var action = btn.getAttribute("data-action");
    if (action === "approve") {
      S.updateReview(id, { status: "approved" });
      renderReviews();
    } else if (action === "decline") {
      S.updateReview(id, { status: "declined" });
      renderReviews();
    } else if (action === "delete") {
      if (confirm("Delete this review?")) {
        S.deleteReview(id);
        renderReviews();
      }
    }
  });

  // Kittens
  document.getElementById("addKittenBtn").addEventListener("click", function () {
    openModal(null);
  });

  kittensList.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    var card = btn.closest("[data-id]");
    if (!card) return;
    var id = card.getAttribute("data-id");
    var action = btn.getAttribute("data-action");
    if (action === "edit") {
      var kitten = S.getKittens().find(function (k) {
        return k.id === id;
      });
      if (kitten) openModal(kitten);
    } else if (action === "delete") {
      if (confirm("Remove this kitten from the listing?")) {
        S.deleteKitten(id);
        renderKittens();
      }
    }
  });

  kittenModal.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.getElementById("kittenPhotoUrl").addEventListener("input", function () {
    pendingPhotoData = null;
    updatePreview();
  });

  function prepareKittenPhoto(file) {
    return new Promise(function (resolve, reject) {
      if (!file || !file.type || file.type.indexOf("image/") !== 0) {
        reject(new Error("Please choose an image file."));
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        reject(new Error("Please choose an image under 4 MB."));
        return;
      }

      var reader = new FileReader();
      reader.onerror = function () {
        reject(new Error("Could not read that image."));
      };
      reader.onload = function () {
        var img = new Image();
        img.onerror = function () {
          reject(new Error("Could not process that image."));
        };
        img.onload = function () {
          var size = 900;
          var sourceSize = Math.min(img.naturalWidth || img.width, img.naturalHeight || img.height);
          var sx = Math.max(0, ((img.naturalWidth || img.width) - sourceSize) / 2);
          var sy = Math.max(0, ((img.naturalHeight || img.height) - sourceSize) / 2);
          var canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = "#f3ebe0";
          ctx.fillRect(0, 0, size, size);
          ctx.drawImage(img, sx, sy, sourceSize, sourceSize, 0, 0, size, size);
          resolve(canvas.toDataURL("image/jpeg", 0.86));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  document.getElementById("kittenPhotoFile").addEventListener("change", function (e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    prepareKittenPhoto(file)
      .then(function (dataUrl) {
        pendingPhotoData = dataUrl;
        document.getElementById("kittenPhotoUrl").value = "";
        kittenPreview.src = dataUrl;
      })
      .catch(function (err) {
        alert(err.message || "Could not process that image.");
        e.target.value = "";
      });
  });

  kittenForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var id = document.getElementById("kittenId").value;
    var photo =
      pendingPhotoData ||
      document.getElementById("kittenPhotoUrl").value.trim() ||
      (id
        ? (S.getKittens().find(function (k) {
            return k.id === id;
          }) || {}).photo
        : "") ||
      "";

    var payload = {
      name: document.getElementById("kittenName").value.trim(),
      color: document.getElementById("kittenColor").value.trim(),
      sex: document.getElementById("kittenSex").value,
      born: document.getElementById("kittenBorn").value.trim(),
      ready: document.getElementById("kittenReady").value.trim(),
      age: document.getElementById("kittenAge").value.trim(),
      eyes: document.getElementById("kittenEyes").value.trim(),
      weight: document.getElementById("kittenWeight").value.trim(),
      price: document.getElementById("kittenPrice").value.trim(),
      temperament: document.getElementById("kittenTemperament").value.trim(),
      description: document.getElementById("kittenDescription").value.trim(),
      vaccinations: document.getElementById("kittenVaccinations").value.trim(),
      deworming: document.getElementById("kittenDeworming").value.trim(),
      vetCheck: document.getElementById("kittenVetCheck").value.trim(),
      litterTrained: document.getElementById("kittenLitter").value.trim(),
      socialized: document.getElementById("kittenSocialized").value.trim(),
      healthNotes: document.getElementById("kittenHealthNotes").value.trim(),
      status: document.getElementById("kittenStatus").value,
      photo: photo,
      featured: document.getElementById("kittenFeatured").checked,
    };

    if (!payload.photo) {
      alert("Please add a photo URL or upload an image.");
      return;
    }

    if (id) S.updateKitten(id, payload);
    else S.addKitten(payload);

    closeModal();
    renderKittens();
  });

  // Blog
  document.getElementById("addBlogBtn").addEventListener("click", function () {
    openBlogModal(null);
  });

  document.getElementById("aiBlogBtn").addEventListener("click", function () {
    aiBlogBox.hidden = !aiBlogBox.hidden;
    if (!aiBlogBox.hidden) document.getElementById("aiKeyword").focus();
  });

  document.getElementById("aiGenerateBtn").addEventListener("click", function () {
    var keyword = document.getElementById("aiKeyword").value.trim();
    if (!keyword) {
      setAiStatus("Enter a keyword or topic first.", true);
      return;
    }
    if (!AI) {
      setAiStatus("AI module failed to load.", true);
      return;
    }

    var btn = document.getElementById("aiGenerateBtn");
    btn.disabled = true;
    setAiStatus("Generating SEO post + image… this may take a few seconds.");

    AI.generateBlogFromKeyword(keyword)
      .then(function (draft) {
        setAiStatus("Draft ready — review and save.");
        openBlogModal(draft);
      })
      .catch(function (err) {
        setAiStatus(err.message || "Generation failed.", true);
      })
      .finally(function () {
        btn.disabled = false;
      });
  });

  document.getElementById("aiKeyword").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("aiGenerateBtn").click();
    }
  });

  blogsList.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    var card = btn.closest("[data-id]");
    if (!card) return;
    var id = card.getAttribute("data-id");
    var action = btn.getAttribute("data-action");
    if (action === "edit") {
      var post = S.getBlogs().find(function (b) {
        return b.id === id;
      });
      if (post) openBlogModal(post);
    } else if (action === "delete") {
      if (confirm("Delete this blog post?")) {
        S.deleteBlog(id);
        renderBlogs();
      }
    }
  });

  blogModal.querySelectorAll("[data-close-blog-modal]").forEach(function (el) {
    el.addEventListener("click", closeBlogModal);
  });

  document.getElementById("blogTitle").addEventListener("input", function () {
    var id = document.getElementById("blogId").value;
    if (id) return;
    document.getElementById("blogSlug").value = S.slugify(this.value);
  });

  document.getElementById("blogCover").addEventListener("input", function () {
    pendingBlogCover = null;
    document.getElementById("blogCoverFile").value = "";
    updateBlogCoverPreview();
  });

  document.getElementById("blogCoverFile").addEventListener("change", function (e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Please choose an image under 1.5 MB, or use an image URL instead.");
      e.target.value = "";
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      pendingBlogCover = reader.result;
      document.getElementById("blogCover").value = "";
      blogPreview.src = pendingBlogCover;
    };
    reader.readAsDataURL(file);
  });

  blogForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var id = document.getElementById("blogId").value;
    var tags = document
      .getElementById("blogTags")
      .value.split(",")
      .map(function (t) {
        return t.trim();
      })
      .filter(Boolean);

    var coverImage =
      pendingBlogCover ||
      document.getElementById("blogCover").value.trim() ||
      (id
        ? (S.getBlogs().find(function (b) {
            return b.id === id;
          }) || {}).coverImage
        : "") ||
      "";

    var payload = {
      title: document.getElementById("blogTitle").value.trim(),
      slug: document.getElementById("blogSlug").value.trim(),
      status: document.getElementById("blogStatus").value,
      category: document.getElementById("blogCategory").value.trim() || "Guides",
      tags: tags,
      metaDescription: document.getElementById("blogMeta").value.trim(),
      excerpt: document.getElementById("blogExcerpt").value.trim(),
      coverImage: coverImage,
      coverImageAlt: document.getElementById("blogCoverAlt").value.trim(),
      contentHtml: document.getElementById("blogContent").value.trim(),
    };

    if (!payload.coverImage) {
      alert("Please add a cover image URL or upload a photo.");
      return;
    }

    if (id) S.updateBlog(id, payload);
    else S.addBlog(payload);

    closeBlogModal();
    renderBlogs();
    setAiStatus("");
  });

  // Documents
  function formatBytes(n) {
    var size = Number(n) || 0;
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  }

  function renderDocuments() {
    var mount = document.getElementById("documentsList");
    if (!mount || !S.listDocumentDefs) return;
    mount.innerHTML = S.listDocumentDefs()
      .map(function (def) {
        var custom = S.getDocument(def.id);
        var status = custom
          ? '<span class="admin-doc-badge is-custom">Custom upload</span>'
          : '<span class="admin-doc-badge">Default document</span>';
        var meta = custom
          ? "<p><strong>File:</strong> " +
            S.escapeHtml(custom.fileName) +
            " · " +
            formatBytes(custom.size) +
            "<br /><strong>Updated:</strong> " +
            S.escapeHtml(formatDate(custom.updatedAt)) +
            "</p>"
          : "<p>Using the built-in site document. Upload a new file to replace it for visitors.</p>";

        return [
          '<article class="admin-doc-card" data-doc-id="' + S.escapeHtml(def.id) + '">',
          "  <div>",
          "    <h3>" + S.escapeHtml(def.title) + "</h3>",
          "    " + status,
          '    <p class="admin-doc-desc">' + S.escapeHtml(def.description) + "</p>",
          "    " + meta,
          "  </div>",
          '  <div class="admin-doc-actions">',
          '    <a class="btn btn-outline" href="' +
            S.getDocumentViewerUrl(def.id) +
            '" target="_blank" rel="noopener">View</a>',
          '    <label class="btn btn-primary admin-upload-btn">',
          "      Upload new",
          '      <input type="file" class="admin-doc-file" accept=".pdf,.html,.htm,.doc,.docx,application/pdf,text/html,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden />',
          "    </label>",
          custom
            ? '<button type="button" class="btn btn-outline admin-doc-reset">Reset to default</button>'
            : "",
          "  </div>",
          "</article>",
        ].join("\n");
      })
      .join("");
  }

  document.getElementById("documentsList").addEventListener("change", function (e) {
    var input = e.target.closest(".admin-doc-file");
    if (!input) return;
    var card = input.closest(".admin-doc-card");
    var id = card && card.getAttribute("data-doc-id");
    var file = input.files && input.files[0];
    if (!id || !file) return;

    if (file.size > 2.5 * 1024 * 1024) {
      alert("Please choose a file under 2.5 MB.");
      input.value = "";
      return;
    }

    var reader = new FileReader();
    reader.onload = function () {
      try {
        S.setDocument(id, {
          fileName: file.name,
          mime: file.type || "application/octet-stream",
          dataUrl: reader.result,
          size: file.size,
        });
        renderDocuments();
        alert("Document updated. Visitors will see the new file.");
      } catch (err) {
        alert("Could not save that file. Try a smaller PDF or HTML file.");
      }
      input.value = "";
    };
    reader.onerror = function () {
      alert("Could not read that file.");
      input.value = "";
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("documentsList").addEventListener("click", function (e) {
    var resetBtn = e.target.closest(".admin-doc-reset");
    if (!resetBtn) return;
    var card = resetBtn.closest(".admin-doc-card");
    var id = card && card.getAttribute("data-doc-id");
    if (!id) return;
    if (!confirm("Reset this document to the built-in default?")) return;
    S.clearDocument(id);
    renderDocuments();
  });
})();
