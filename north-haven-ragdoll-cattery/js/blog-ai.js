/* SEO blog generator — keyword → full post with image + internal links */
(function (global) {
  "use strict";

  var INTERNAL_LINKS = [
    { href: "available-kittens.html", label: "available Ragdoll kittens" },
    { href: "adoption-process.html", label: "adoption process" },
    { href: "health-care.html", label: "health & care standards" },
    { href: "our-ragdolls.html", label: "breeding cats" },
    { href: "about.html", label: "about North Haven Ragdoll Cattery" },
    { href: "contact.html", label: "contact our cattery" },
    { href: "faq.html", label: "frequently asked questions" },
  ];

  function titleCase(str) {
    return String(str || "")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\b\w/g, function (c) {
        return c.toUpperCase();
      });
  }

  function slugify(str) {
    return String(str || "post")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "post";
  }

  function pickCategory(keyword) {
    var k = keyword.toLowerCase();
    if (/health|vet|vaccine|test|genetic/.test(k)) return "Health";
    if (/groom|coat|brush|fur/.test(k)) return "Care Tips";
    if (/temper|personality|behav|gentle|family/.test(k)) return "Breed Guide";
    if (/food|diet|nutrition|feed/.test(k)) return "Care Tips";
    if (/adopt|bring home|new kitten|welcome/.test(k)) return "Care Tips";
    if (/litter|kitten|available/.test(k)) return "Cattery News";
    return "Guides";
  }

  function coverImageUrl(keyword) {
    var prompt =
      "professional photo of a fluffy ragdoll cat, " +
      keyword +
      ", soft natural light, cozy home, high quality, photorealistic";
    return (
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(prompt) +
      "?width=1200&height=800&nologo=true&enhance=true"
    );
  }

  function link(href, text) {
    return '<a href="' + href + '">' + text + "</a>";
  }

  function buildLocalPost(keyword) {
    var topic = titleCase(keyword);
    var category = pickCategory(keyword);
    var title = topic + ": A Complete Guide for Ragdoll Families";
    if (title.length > 65) {
      title = topic + " | North Haven Ragdoll Guide";
    }

    var meta =
      "Learn about " +
      keyword.toLowerCase() +
      " from North Haven Ragdoll Cattery — expert tips, breed insights, and how to welcome a healthy Ragdoll into your home.";
    if (meta.length > 158) meta = meta.slice(0, 155) + "...";

    var excerpt =
      "Everything families should know about " +
      keyword.toLowerCase() +
      " — practical advice from a home-based Ragdoll cattery focused on health, temperament, and lifelong support.";

    var k = keyword.toLowerCase();
    var h2a = "What Families Should Know About " + topic;
    var h2b = "How North Haven Approaches " + topic;
    var h2c = "Practical Tips You Can Use Today";
    var h2d = "Ready for Your Ragdoll Companion?";

    var body = [
      "<p><strong>" +
        topic +
        "</strong> is one of the most common questions we hear from families researching Ragdoll cats. At North Haven Ragdoll Cattery, we raise kittens in our home with a focus on health, socialization, and a gentle temperament that fits real family life.</p>",
      "<h2>" + h2a + "</h2>",
      "<p>Understanding " +
        k +
        " helps you make confident decisions before you adopt. Ragdolls are known for affectionate personalities, soft coats, and a calm presence — but every household still needs clear expectations around care, environment, and timing.</p>",
      "<p>Whether you are comparing breeders, preparing your home, or waiting for a litter, reliable information about " +
        k +
        " protects both your family and your future kitten.</p>",
      "<h2>" + h2b + "</h2>",
      "<p>Our " +
        link("our-ragdolls.html", "breeding cats") +
        " are selected for classic Ragdoll type and verified genetic health. Daily handling, enrichment, and veterinary care shape kittens who transition smoothly into forever homes.</p>",
      "<p>We are transparent about our " +
        link("health-care.html", "health & care standards") +
        " so you know exactly what support comes with a North Haven kitten — from early vaccines to guidance after go-home day.</p>",
      '<figure class="blog-inline-figure"><img src="' +
        coverImageUrl(keyword + " close up portrait") +
        '" alt="Ragdoll cat related to ' +
        topic +
        '" /><figcaption>Healthy, home-raised Ragdolls are at the heart of every North Haven recommendation.</figcaption></figure>',
      "<h2>" + h2c + "</h2>",
      "<ul>",
      "<li>Start with a quiet room, consistent feeding, and a clean litter box before your kitten arrives.</li>",
      "<li>Ask breeders about health testing, socialization, and written agreements — not just photos.</li>",
      "<li>Plan for lifelong grooming, enrichment, and indoor-only living that suits Ragdoll temperaments.</li>",
      "<li>Use trusted resources and stay in touch with your cattery after adoption.</li>",
      "</ul>",
      "<p>Have more questions? Browse our " +
        link("faq.html", "frequently asked questions") +
        " or " +
        link("contact.html", "contact our cattery") +
        " directly.</p>",
      "<h2>" + h2d + "</h2>",
      "<p>Explore current " +
        link("available-kittens.html", "available Ragdoll kittens") +
        ", learn our " +
        link("adoption-process.html", "adoption process") +
        ", or read more " +
        link("about.html", "about North Haven Ragdoll Cattery") +
        ". We match each kitten thoughtfully — never rushed — so families and cats thrive together.</p>",
      "<p><em>Looking for guidance on " +
        k +
        "? We are happy to help you plan the right next step.</em></p>",
    ].join("\n");

    return {
      title: title,
      slug: slugify(topic + "-ragdoll-guide"),
      metaDescription: meta,
      category: category,
      excerpt: excerpt,
      coverImage: coverImageUrl(keyword),
      coverImageAlt: "Ragdoll cat — " + topic,
      tags: [k, "ragdoll", "ragdoll kitten", "north haven ragdolls"],
      seoKeywords: [k, "ragdoll " + k, "ragdoll kitten " + k, "ethical ragdoll breeder"],
      contentHtml: body,
      status: "published",
      generatedFrom: keyword,
    };
  }

  function parseAiJson(text) {
    if (!text) return null;
    var cleaned = String(text).trim();
    var fence = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fence) cleaned = fence[1].trim();
    var start = cleaned.indexOf("{");
    var end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    try {
      return JSON.parse(cleaned.slice(start, end + 1));
    } catch (e) {
      return null;
    }
  }

  function normalizeAiPost(raw, keyword) {
    var local = buildLocalPost(keyword);
    if (!raw || typeof raw !== "object") return local;

    var title = String(raw.title || local.title).trim();
    var content = String(raw.contentHtml || raw.content || "").trim();
    if (!content) content = local.contentHtml;

    // Ensure at least one internal link exists
    if (content.indexOf("available-kittens.html") === -1) {
      content +=
        "<p>Browse our " +
        link("available-kittens.html", "available Ragdoll kittens") +
        " or start the " +
        link("adoption-process.html", "adoption process") +
        ".</p>";
    }

    return {
      title: title,
      slug: slugify(raw.slug || title),
      metaDescription: String(raw.metaDescription || local.metaDescription).slice(0, 160),
      category: String(raw.category || local.category),
      excerpt: String(raw.excerpt || local.excerpt),
      coverImage: String(raw.coverImage || local.coverImage),
      coverImageAlt: String(raw.coverImageAlt || title),
      tags: Array.isArray(raw.tags) ? raw.tags : local.tags,
      seoKeywords: Array.isArray(raw.seoKeywords) ? raw.seoKeywords : local.seoKeywords,
      contentHtml: content,
      status: "published",
      generatedFrom: keyword,
    };
  }

  function buildPrompt(keyword) {
    return [
      "You are an expert SEO content writer for North Haven Ragdoll Cattery, an ethical home-based Ragdoll cat breeder in the United States.",
      "Write a high-quality blog post about this keyword: \"" + keyword + "\".",
      "Return ONLY valid JSON with these keys:",
      "title (max 60 chars, include primary keyword naturally),",
      "slug,",
      "metaDescription (max 155 chars),",
      "category,",
      "excerpt (1-2 sentences),",
      "coverImageAlt,",
      "tags (array of 4-6 strings),",
      "seoKeywords (array),",
      "contentHtml (HTML string using <p>, <h2>, <ul><li>, and include 3-5 internal links using these exact hrefs: available-kittens.html, adoption-process.html, health-care.html, our-ragdolls.html, about.html, contact.html, faq.html).",
      "Tone: warm, trustworthy, helpful, not spammy. Do not invent fake statistics. Do not wrap JSON in markdown.",
    ].join(" ");
  }

  function tryRemoteAi(keyword) {
    var prompt = buildPrompt(keyword);
    var urls = [
      "https://text.pollinations.ai/" + encodeURIComponent(prompt),
      "https://gen.pollinations.ai/text/" + encodeURIComponent(prompt),
    ];

    function attempt(i) {
      if (i >= urls.length) {
        return Promise.reject(new Error("AI unavailable"));
      }
      return fetch(urls[i], { method: "GET" })
        .then(function (res) {
          if (!res.ok) throw new Error("AI request failed");
          return res.text();
        })
        .then(function (text) {
          var parsed = parseAiJson(text);
          if (!parsed) throw new Error("Could not parse AI response");
          return normalizeAiPost(parsed, keyword);
        })
        .catch(function () {
          return attempt(i + 1);
        });
    }

    return attempt(0);
  }

  /**
   * Generate a full SEO blog draft from a keyword.
   * Tries live AI first; always falls back to a strong local SEO writer.
   */
  function generateBlogFromKeyword(keyword) {
    var key = String(keyword || "").trim();
    if (!key) {
      return Promise.reject(new Error("Enter a keyword first."));
    }

    return tryRemoteAi(key).catch(function () {
      return buildLocalPost(key);
    });
  }

  global.NHBlogAI = {
    generateBlogFromKeyword: generateBlogFromKeyword,
    buildLocalPost: buildLocalPost,
    coverImageUrl: coverImageUrl,
  };
})(window);
