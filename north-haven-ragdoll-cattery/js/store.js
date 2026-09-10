/* Shared kitten inventory + adoption applications (localStorage) */
(function (global) {
  "use strict";

  var KEYS = {
    kittens: "nh_kittens",
    applications: "nh_applications",
    auth: "nh_admin_auth",
    version: "nh_data_version",
    blogs: "nh_blogs",
    reviews: "nh_reviews",
    documents: "nh_documents",
  };

  var DATA_VERSION = 7;

  var DEFAULT_KITTENS = [
    {
      id: "luna",
      name: "Luna",
      color: "Blue Bicolor",
      sex: "Female",
      born: "Jan 2025",
      ready: "April 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=700&q=80",
      featured: true,
    },
    {
      id: "oliver",
      name: "Oliver",
      color: "Seal Point",
      sex: "Male",
      born: "Jan 2025",
      ready: "April 2025",
      status: "reserved",
      photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=80",
      featured: true,
    },
    {
      id: "bella",
      name: "Bella",
      color: "Blue Point",
      sex: "Female",
      born: "Jan 2025",
      ready: "April 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=700&q=80",
      featured: true,
    },
    {
      id: "theo",
      name: "Theo",
      color: "Seal Bicolor",
      sex: "Male",
      born: "Jan 2025",
      ready: "April 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=700&q=80",
      featured: true,
    },
    {
      id: "mia",
      name: "Mia",
      color: "Lilac Point",
      sex: "Female",
      born: "Jan 2025",
      ready: "April 2025",
      status: "reserved",
      photo: "https://images.unsplash.com/photo-1526336024174-45223f32a3f2?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "leo",
      name: "Leo",
      color: "Chocolate Point",
      sex: "Male",
      born: "Jan 2025",
      ready: "April 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "nora",
      name: "Nora",
      color: "Cream Point",
      sex: "Female",
      born: "Mar 2025",
      ready: "June 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "jasper",
      name: "Jasper",
      color: "Blue Point",
      sex: "Male",
      born: "Mar 2025",
      ready: "June 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "willow",
      name: "Willow",
      color: "Seal Point",
      sex: "Female",
      born: "Mar 2025",
      ready: "June 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "felix",
      name: "Felix",
      color: "Lilac Bicolor",
      sex: "Male",
      born: "Mar 2025",
      ready: "June 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "sophie",
      name: "Sophie",
      color: "Chocolate Bicolor",
      sex: "Female",
      born: "Mar 2025",
      ready: "June 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "henry",
      name: "Henry",
      color: "Blue Mink",
      sex: "Male",
      born: "Mar 2025",
      ready: "June 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "chloe",
      name: "Chloe",
      color: "Seal Mink",
      sex: "Female",
      born: "Mar 2025",
      ready: "June 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1615789591457-74a63395c990?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "asher",
      name: "Asher",
      color: "Red Point",
      sex: "Male",
      born: "Mar 2025",
      ready: "June 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "ivy",
      name: "Ivy",
      color: "Tortie Point",
      sex: "Female",
      born: "Mar 2025",
      ready: "June 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "ruby",
      name: "Ruby",
      color: "Flame Point",
      sex: "Female",
      born: "Apr 2025",
      ready: "July 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1511044568932-b9ca9ccb3332?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "milo",
      name: "Milo",
      color: "Seal Bicolor",
      sex: "Male",
      born: "Apr 2025",
      ready: "July 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1494256997604-768d8f27ab01?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "aria",
      name: "Aria",
      color: "Blue Point",
      sex: "Female",
      born: "Apr 2025",
      ready: "July 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "owen",
      name: "Owen",
      color: "Chocolate Point",
      sex: "Male",
      born: "Apr 2025",
      ready: "July 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "elise",
      name: "Elise",
      color: "Lilac Point",
      sex: "Female",
      born: "Apr 2025",
      ready: "July 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
    {
      id: "caleb",
      name: "Caleb",
      color: "Blue Bicolor",
      sex: "Male",
      born: "Apr 2025",
      ready: "July 2025",
      status: "available",
      photo: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=700&q=80",
      featured: false,
    },
  ];

  // Simple client-side gate — change ADMIN_PASSWORD below if needed
  var ADMIN_PASSWORD = "Peller@123";

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function slugify(name) {
    return String(name || "kitten")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "kitten";
  }

  function defaultDetailsFor(k) {
    var name = k.name || "This kitten";
    var color = k.color || "Ragdoll";
    var sex = (k.sex || "kitten").toLowerCase();
    return {
      age: k.born ? "Born " + k.born + (k.ready ? " · Ready " + k.ready : "") : "See availability dates",
      eyes: "Blue",
      weight: "",
      temperament: "Gentle, affectionate, and people-oriented",
      description:
        name +
        " is a beautiful " +
        color +
        " Ragdoll " +
        sex +
        ", lovingly raised in our home with daily socialization, careful veterinary care, and plenty of affection. " +
        name +
        " is growing into a confident companion ready for a lifelong family.",
      vaccinations: "Age-appropriate vaccinations, as applicable",
      deworming: "Age-appropriate deworming and preventative care",
      vetCheck: "Veterinary health check completed / cleared",
      litterTrained: "Yes — litter trained in our home",
      socialized: "Daily handling, play, and family socialization",
      price: "$1,500",
      healthNotes:
        "Comes with veterinary health records. Specific inclusions are documented in the adoption agreement.",
    };
  }

  function enrichKitten(k) {
    var defaults = defaultDetailsFor(k || {});
    var out = Object.assign({}, defaults, k || {});
    Object.keys(defaults).forEach(function (key) {
      if (out[key] == null || out[key] === "") {
        out[key] = defaults[key];
      }
    });
    return out;
  }

  function migrateKittens(list) {
    var version = Number(localStorage.getItem(KEYS.version) || 0);
    if (version >= DATA_VERSION) {
      return list.map(enrichKitten);
    }

    var photoUpdates = {
      oliver: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=80",
      bella: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=700&q=80",
    };

    list = list.map(function (k) {
      var next = Object.assign({}, k);
      if (photoUpdates[k.id]) {
        next.photo = photoUpdates[k.id];
      }
      return enrichKitten(next);
    });

    // Add any new default slots that are missing from saved data
    var existingIds = {};
    list.forEach(function (k) {
      existingIds[k.id] = true;
    });
    DEFAULT_KITTENS.forEach(function (k) {
      if (!existingIds[k.id]) {
        list.push(enrichKitten(Object.assign({}, k)));
      }
    });

    write(KEYS.kittens, list);
    localStorage.setItem(KEYS.version, String(DATA_VERSION));
    return list;
  }

  function getKittens() {
    var list = read(KEYS.kittens, null);
    if (!list || !list.length) {
      var seeded = DEFAULT_KITTENS.map(function (k) {
        return enrichKitten(Object.assign({}, k));
      });
      write(KEYS.kittens, seeded);
      localStorage.setItem(KEYS.version, String(DATA_VERSION));
      return seeded.slice();
    }
    return migrateKittens(list);
  }

  function getKittenById(id) {
    if (!id) return null;
    return (
      getKittens().find(function (k) {
        return k.id === id;
      }) || null
    );
  }

  function saveKittens(list) {
    write(KEYS.kittens, list);
    return list;
  }

  function updateKitten(id, patch) {
    var list = getKittens();
    var idx = list.findIndex(function (k) {
      return k.id === id;
    });
    if (idx === -1) return null;
    list[idx] = enrichKitten(Object.assign({}, list[idx], patch, { id: list[idx].id }));
    saveKittens(list);
    return list[idx];
  }

  function addKitten(data) {
    var list = getKittens();
    var base = slugify(data.name);
    var id = base;
    var n = 2;
    while (list.some(function (k) { return k.id === id; })) {
      id = base + "-" + n++;
    }
    var kitten = enrichKitten({
      id: id,
      name: data.name || "New Kitten",
      color: data.color || "",
      sex: data.sex || "Female",
      born: data.born || "",
      ready: data.ready || "",
      status: data.status === "reserved" || data.status === "placed" ? data.status : "available",
      photo: data.photo || "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=700&q=80",
      featured: !!data.featured,
      age: data.age || "",
      eyes: data.eyes || "",
      weight: data.weight || "",
      temperament: data.temperament || "",
      description: data.description || "",
      vaccinations: data.vaccinations || "",
      deworming: data.deworming || "",
      vetCheck: data.vetCheck || "",
      litterTrained: data.litterTrained || "",
      socialized: data.socialized || "",
      price: data.price || "",
      healthNotes: data.healthNotes || "",
    });
    list.push(kitten);
    saveKittens(list);
    return kitten;
  }

  function deleteKitten(id) {
    var list = getKittens().filter(function (k) {
      return k.id !== id;
    });
    saveKittens(list);
    return list;
  }

  function kittenDetailUrl(id) {
    return "kitten.html#" + encodeURIComponent(id);
  }

  function getKittenIdFromLocation(loc) {
    loc = loc || (typeof window !== "undefined" ? window.location : null);
    if (!loc) return null;
    try {
      var params = new URLSearchParams(loc.search || "");
      var q = params.get("id") || params.get("kitten");
      if (q) return decodeURIComponent(String(q)).trim();
    } catch (e) {}
    var hash = String(loc.hash || "").replace(/^#/, "").trim();
    if (!hash) return null;
    if (hash.indexOf("=") !== -1) {
      try {
        var hp = new URLSearchParams(hash);
        var hid = hp.get("id") || hp.get("kitten");
        if (hid) return decodeURIComponent(String(hid)).trim();
      } catch (e2) {}
    }
    return decodeURIComponent(hash.split("&")[0]).trim() || null;
  }

  function getApplications() {
    return read(KEYS.applications, []);
  }

  function addApplication(app) {
    var list = getApplications();
    var entry = {
      id: "app-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      createdAt: new Date().toISOString(),
      status: "new",
      applicationType: app.applicationType || "general",
      purpose: app.purpose || "",
      fullName: app.fullName || ((app.firstName || "") + " " + (app.lastName || "")).trim(),
      firstName: app.firstName || "",
      lastName: app.lastName || "",
      age: app.age || "",
      email: app.email || "",
      phone: app.phone || "",
      address: app.address || "",
      city: app.city || "",
      state: app.state || "",
      zip: app.zip || "",
      adultsInHome: app.adultsInHome || "",
      childrenAges: app.childrenAges || "",
      everyoneAgrees: app.everyoneAgrees || "",
      otherPets: app.otherPets || "",
      ownOrRent: app.ownOrRent || "",
      catsPermitted: app.catsPermitted || "",
      indoorOnly: app.indoorOnly || "",
      hoursAlone: app.hoursAlone || "",
      ownedCatsBefore: app.ownedCatsBefore || "",
      ownedRagdollBefore: app.ownedRagdollBefore || "",
      whyRagdoll: app.whyRagdoll || "",
      whyCattery: app.whyCattery || "",
      hasVeterinarian: app.hasVeterinarian || "",
      preparedForVetCosts: app.preparedForVetCosts || "",
      feedingPlan: app.feedingPlan || "",
      followCareRecommendations: app.followCareRecommendations || "",
      preferredKitten: app.preferredKitten || "",
      sexPreference: app.sexPreference || "",
      colorPreference: app.colorPreference || "",
      placementType: app.placementType || "",
      willingToWait: app.willingToWait || "",
      deliveryOrPickup: app.deliveryOrPickup || "",
      preference: app.preference || "",
      agreeNoGuarantee: app.agreeNoGuarantee || "",
      agreeTruthful: app.agreeTruthful || "",
      agreeCareHome: app.agreeCareHome || "",
      agreeContract: app.agreeContract || "",
      about: app.about || "",
    };
    list.unshift(entry);
    write(KEYS.applications, list);
    return entry;
  }

  function updateApplication(id, patch) {
    var list = getApplications();
    var idx = list.findIndex(function (a) {
      return a.id === id;
    });
    if (idx === -1) return null;
    list[idx] = Object.assign({}, list[idx], patch, { id: list[idx].id });
    write(KEYS.applications, list);
    return list[idx];
  }

  function deleteApplication(id) {
    var list = getApplications().filter(function (a) {
      return a.id !== id;
    });
    write(KEYS.applications, list);
    return list;
  }

  function isLoggedIn() {
    return sessionStorage.getItem(KEYS.auth) === "1";
  }

  function login(password) {
    if (String(password) === ADMIN_PASSWORD) {
      sessionStorage.setItem(KEYS.auth, "1");
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(KEYS.auth);
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function statusLabel(status) {
    if (status === "reserved") return "Reserved";
    if (status === "placed") return "Placed";
    return "Available";
  }

  function badgeClass(status) {
    if (status === "reserved") return "badge-reserved";
    if (status === "placed") return "badge-placed";
    return "badge-available";
  }

  function preferenceLabel(k) {
    return k.name + " — " + k.color + " " + k.sex;
  }

  var DEFAULT_BLOGS = [
    {
      id: "welcoming-home",
      slug: "welcoming-your-ragdoll-kitten-home",
      title: "Welcoming Your Ragdoll Kitten Home",
      metaDescription:
        "How to prepare your home for a Ragdoll kitten — quiet spaces, litter setup, diet, and the first nights together at North Haven.",
      category: "Care Tips",
      excerpt:
        "Simple steps to help your new companion settle in — from quiet spaces and litter setup to the first nights together.",
      coverImage: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1200&q=80",
      coverImageAlt: "Ragdoll kitten resting in a soft bed",
      tags: ["ragdoll kitten", "new kitten", "kitten care"],
      status: "published",
      createdAt: "2025-03-01T12:00:00.000Z",
      updatedAt: "2025-03-01T12:00:00.000Z",
      contentHtml:
        "<p>The first days home set the tone for a confident, happy Ragdoll. Prepare a quiet room with food, water, a litter box, and a cozy bed before arrival.</p><p>Keep introductions slow — let your kitten explore at their own pace, then gradually meet household members and other pets. Stick to the diet we send home for the first weeks, keep play gentle, and <a href=\"contact.html\">call us anytime</a>.</p><p>When you are ready, browse our <a href=\"available-kittens.html\">available kittens</a> or start the <a href=\"adoption-process.html\">adoption process</a>.</p>",
    },
    {
      id: "ragdoll-temperament",
      slug: "why-ragdolls-make-gentle-companions",
      title: "Why Ragdolls Make Gentle Companions",
      metaDescription:
        "Learn what makes the Ragdoll temperament so special and how North Haven nurtures calm, affectionate kittens for family life.",
      category: "Breed Guide",
      excerpt:
        "What makes the Ragdoll temperament so special, and how we nurture that calm, affectionate nature from the start.",
      coverImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=80",
      coverImageAlt: "Blue-eyed Ragdoll looking calmly at the camera",
      tags: ["ragdoll temperament", "ragdoll personality"],
      status: "published",
      createdAt: "2025-02-01T12:00:00.000Z",
      updatedAt: "2025-02-01T12:00:00.000Z",
      contentHtml:
        "<p>Ragdolls are known for soft temperaments, people-focused affection, and a calm presence in the home. At North Haven, we socialize every kitten daily so that gentle nature is ready for family life.</p><p>Meet our breeding cats on the <a href=\"our-ragdolls.html\">Our Ragdolls</a> page, or learn more <a href=\"about.html\">about our cattery</a>.</p>",
    },
    {
      id: "health-first",
      slug: "health-testing-and-what-it-means",
      title: "Health Testing & What It Means for You",
      metaDescription:
        "How genetic testing and veterinary care shape every litter at North Haven Ragdoll Cattery — and the peace of mind it brings families.",
      category: "Health",
      excerpt:
        "How genetic testing and veterinary care shape every litter at North Haven — and the peace of mind it brings families.",
      coverImage: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=80",
      coverImageAlt: "Healthy Ragdoll kitten",
      tags: ["ragdoll health", "genetic testing"],
      status: "published",
      createdAt: "2025-01-15T12:00:00.000Z",
      updatedAt: "2025-01-15T12:00:00.000Z",
      contentHtml:
        "<p>Our breeding cats are genetically health-tested, and every kitten receives veterinary checks, vaccinations, and deworming before going home.</p><p>Read more on our <a href=\"health-care.html\">Health &amp; Care</a> page, or <a href=\"contact.html\">contact us</a> with questions.</p>",
    },
  ];

  function getBlogs() {
    var list = read(KEYS.blogs, null);
    if (!list || !list.length) {
      write(KEYS.blogs, DEFAULT_BLOGS);
      return DEFAULT_BLOGS.slice();
    }
    return list;
  }

  function saveBlogs(list) {
    write(KEYS.blogs, list);
    return list;
  }

  function getPublishedBlogs() {
    return getBlogs()
      .filter(function (b) {
        return b.status === "published";
      })
      .sort(function (a, b) {
        return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
      });
  }

  function getBlogBySlug(slug) {
    return (
      getBlogs().find(function (b) {
        return b.slug === slug || b.id === slug;
      }) || null
    );
  }

  function addBlog(data) {
    var list = getBlogs();
    var base = slugify(data.slug || data.title || "post");
    var slug = base;
    var n = 2;
    while (list.some(function (b) { return b.slug === slug; })) {
      slug = base + "-" + n++;
    }
    var now = new Date().toISOString();
    var post = {
      id: "blog-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
      slug: slug,
      title: data.title || "Untitled Post",
      metaDescription: data.metaDescription || "",
      category: data.category || "Guides",
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || "",
      coverImageAlt: data.coverImageAlt || data.title || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      status: data.status === "draft" ? "draft" : "published",
      contentHtml: data.contentHtml || "",
      createdAt: now,
      updatedAt: now,
      seoKeywords: Array.isArray(data.seoKeywords) ? data.seoKeywords : [],
      generatedFrom: data.generatedFrom || "",
    };
    list.unshift(post);
    saveBlogs(list);
    return post;
  }

  function updateBlog(id, patch) {
    var list = getBlogs();
    var idx = list.findIndex(function (b) {
      return b.id === id;
    });
    if (idx === -1) return null;
    var next = Object.assign({}, list[idx], patch, { id: list[idx].id });
    if (patch.slug) next.slug = slugify(patch.slug);
    next.updatedAt = new Date().toISOString();
    list[idx] = next;
    saveBlogs(list);
    return next;
  }

  function deleteBlog(id) {
    var list = getBlogs().filter(function (b) {
      return b.id !== id;
    });
    saveBlogs(list);
    return list;
  }

  var DEFAULT_REVIEWS = [
    {
      id: "rev-sarah",
      name: "Sarah M.",
      location: "California",
      rating: 5,
      text: "Bringing Luna home from North Haven was the best decision our family ever made. She is gentle, affectionate, and perfectly socialized. The ongoing support has been wonderful.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
      status: "approved",
      createdAt: "2025-01-10T12:00:00.000Z",
    },
    {
      id: "rev-james",
      name: "James R.",
      location: "Texas",
      rating: 5,
      text: "From the first inquiry to bringing Theo home, every step felt personal and professional. His temperament is exceptional — truly a gentle soul raised with love.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      status: "approved",
      createdAt: "2025-01-18T12:00:00.000Z",
    },
    {
      id: "rev-emily",
      name: "Emily K.",
      location: "Oregon",
      rating: 5,
      text: "North Haven’s health testing and care standards gave us complete peace of mind. Bella settled in immediately and has been the sweetest addition to our home.",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      status: "approved",
      createdAt: "2025-02-02T12:00:00.000Z",
    },
    {
      id: "rev-michael",
      name: "Michael T.",
      location: "Colorado",
      rating: 5,
      text: "We were on a waitlist and the communication was excellent the entire time. When Oliver came home, he already knew how to be part of a family. Worth every moment of waiting.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
      status: "approved",
      createdAt: "2025-02-14T12:00:00.000Z",
    },
    {
      id: "rev-priya",
      name: "Priya S.",
      location: "Washington",
      rating: 5,
      text: "Raised with love is not just a slogan — you can feel it in every kitten’s personality. Mia is confident, cuddly, and so well socialized with kids and other pets.",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
      status: "approved",
      createdAt: "2025-02-28T12:00:00.000Z",
    },
    {
      id: "rev-david",
      name: "David L.",
      location: "Arizona",
      rating: 5,
      text: "The health paperwork, starter kit guidance, and follow-up check-ins made us feel supported. Leo is thriving and we already recommend North Haven to friends.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      status: "approved",
      createdAt: "2025-03-08T12:00:00.000Z",
    },
  ];

  var DEFAULT_AVATARS = [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  ];

  function getReviews() {
    var list = read(KEYS.reviews, null);
    if (!list || !list.length) {
      write(KEYS.reviews, DEFAULT_REVIEWS);
      return DEFAULT_REVIEWS.slice();
    }
    return list;
  }

  function saveReviews(list) {
    write(KEYS.reviews, list);
    return list;
  }

  function getApprovedReviews() {
    return getReviews()
      .filter(function (r) {
        return r.status === "approved";
      })
      .sort(function (a, b) {
        return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
      });
  }

  function addReview(data) {
    var list = getReviews();
    var rating = Math.max(1, Math.min(5, Number(data.rating) || 5));
    var entry = {
      id: "rev-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
      name: String(data.name || "").trim() || "Anonymous",
      location: String(data.location || "").trim(),
      email: String(data.email || "").trim(),
      rating: rating,
      text: String(data.text || "").trim(),
      photo: data.photo || DEFAULT_AVATARS[list.length % DEFAULT_AVATARS.length],
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    list.unshift(entry);
    saveReviews(list);
    return entry;
  }

  function updateReview(id, patch) {
    var list = getReviews();
    var idx = list.findIndex(function (r) {
      return r.id === id;
    });
    if (idx === -1) return null;
    list[idx] = Object.assign({}, list[idx], patch, { id: list[idx].id });
    saveReviews(list);
    return list[idx];
  }

  function deleteReview(id) {
    var list = getReviews().filter(function (r) {
      return r.id !== id;
    });
    saveReviews(list);
    return list;
  }

  function starsHtml(rating) {
    var n = Math.max(1, Math.min(5, Number(rating) || 5));
    return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
  }

  var DOCUMENT_DEFAULTS = {
    "waitlist-agreement": {
      id: "waitlist-agreement",
      title: "Waitlist Agreement",
      description: "Covers the $300 waitlist fee, future-litter placement, and refunds before matching.",
      defaultUrl: "documents/waitlist-agreement.html",
    },
    "sale-contract": {
      id: "sale-contract",
      title: "Sale / Adoption Contract",
      description: "Used when reserving or adopting a specific kitten — pricing, care terms, and final-sale policy.",
      defaultUrl: "documents/sale-contract.html",
    },
  };

  function getDocumentsMap() {
    return read(KEYS.documents, {}) || {};
  }

  function saveDocumentsMap(map) {
    write(KEYS.documents, map || {});
  }

  function getDocumentMeta(id) {
    return DOCUMENT_DEFAULTS[id] || null;
  }

  function listDocumentDefs() {
    return Object.keys(DOCUMENT_DEFAULTS).map(function (id) {
      return DOCUMENT_DEFAULTS[id];
    });
  }

  function getDocument(id) {
    var map = getDocumentsMap();
    return map[id] || null;
  }

  function getDocumentUrl(id) {
    var custom = getDocument(id);
    if (custom && custom.dataUrl) return custom.dataUrl;
    var meta = getDocumentMeta(id);
    return meta ? meta.defaultUrl : "";
  }

  function getDocumentViewerUrl(id) {
    return "document-viewer.html?doc=" + encodeURIComponent(id);
  }

  function setDocument(id, payload) {
    if (!DOCUMENT_DEFAULTS[id]) return null;
    var map = getDocumentsMap();
    map[id] = {
      id: id,
      fileName: payload.fileName || "document",
      mime: payload.mime || "application/octet-stream",
      dataUrl: payload.dataUrl || "",
      size: payload.size || 0,
      updatedAt: new Date().toISOString(),
    };
    saveDocumentsMap(map);
    return map[id];
  }

  function clearDocument(id) {
    var map = getDocumentsMap();
    delete map[id];
    saveDocumentsMap(map);
    return true;
  }

  global.NHStore = {
    getKittens: getKittens,
    getKittenById: getKittenById,
    kittenDetailUrl: kittenDetailUrl,
    getKittenIdFromLocation: getKittenIdFromLocation,
    enrichKitten: enrichKitten,
    saveKittens: saveKittens,
    updateKitten: updateKitten,
    addKitten: addKitten,
    deleteKitten: deleteKitten,
    getApplications: getApplications,
    addApplication: addApplication,
    updateApplication: updateApplication,
    deleteApplication: deleteApplication,
    getBlogs: getBlogs,
    saveBlogs: saveBlogs,
    getPublishedBlogs: getPublishedBlogs,
    getBlogBySlug: getBlogBySlug,
    addBlog: addBlog,
    updateBlog: updateBlog,
    deleteBlog: deleteBlog,
    getReviews: getReviews,
    saveReviews: saveReviews,
    getApprovedReviews: getApprovedReviews,
    addReview: addReview,
    updateReview: updateReview,
    deleteReview: deleteReview,
    starsHtml: starsHtml,
    listDocumentDefs: listDocumentDefs,
    getDocumentMeta: getDocumentMeta,
    getDocument: getDocument,
    getDocumentUrl: getDocumentUrl,
    getDocumentViewerUrl: getDocumentViewerUrl,
    setDocument: setDocument,
    clearDocument: clearDocument,
    DOCUMENT_DEFAULTS: DOCUMENT_DEFAULTS,
    slugify: slugify,
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
    escapeHtml: escapeHtml,
    statusLabel: statusLabel,
    badgeClass: badgeClass,
    preferenceLabel: preferenceLabel,
    DEFAULT_KITTENS: DEFAULT_KITTENS,
    DEFAULT_BLOGS: DEFAULT_BLOGS,
    DEFAULT_REVIEWS: DEFAULT_REVIEWS,
  };
})(window);
