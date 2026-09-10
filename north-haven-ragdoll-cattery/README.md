# North Haven Ragdoll Cattery

Website for **North Haven Ragdoll Cattery** — a static multi-page site for available kittens, waitlist, adoption process, blog, reviews, and admin tools.

## Pages

- `index.html` — Home
- `available-kittens.html` — Kitten listings
- `kitten.html` — Kitten detail + application
- `waitlist.html` — Waitlist + downloadable contracts
- `adoption-process.html` — Reservation / adoption flow
- `about.html`, `health-care.html`, `blog.html`, `reviews.html`, `faq.html`, `contact.html`
- `admin.html` — Private admin dashboard (kittens, applications, reviews, blog, documents)
- `document-viewer.html` — Opens default or admin-uploaded contracts

## Run locally

Open a terminal in this folder and start a simple server:

```bash
python -m http.server 5500
```

Then visit: [http://localhost:5500](http://localhost:5500)

Do **not** open the HTML files directly with `file://` if you need forms to email correctly.

## Features

- Responsive layout (desktop + mobile)
- Kitten inventory, applications, reviews, and blog stored in browser `localStorage`
- Admin uploads for kitten photos (auto square-cropped) and contract documents
- Contact / application forms send to **northhavenragdollcattery@yahoo.com** via FormSubmit

## Admin

1. Go to `/admin.html`
2. Sign in with your admin password
3. Manage Applications, Reviews, Kittens, Blog, and Documents

## Forms (first-time setup)

After deploying the live site, submit one test form. FormSubmit will email an activation link to:

`northhavenragdollcattery@yahoo.com`

Open Yahoo Mail (check Spam/Junk), click **Activate Form**, then forms will arrive in that inbox.

## Deploy on GitHub Pages

1. Create a new GitHub repository
2. Upload these project files (or push with Git)
3. In the repo: **Settings → Pages**
4. Set source to the branch that contains `index.html` (usually `main`)
5. Save — GitHub will give you a public site URL

## Project structure

```
assets/      images and logos
css/         styles
documents/   default contract HTML
js/          site + admin scripts
*.html       public pages
```

## Notes

- Kitten photos, blog posts, applications, reviews, and uploaded contracts are saved in the visitor/admin browser storage (not a cloud database).
- For a permanent shared inventory across devices, you would later connect a backend or hosting database.
