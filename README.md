# SEP 2026 Website

The public landing page for the Seed Empowerment Program 2026 flagship event.
Built as a single-file, dependency-free static site — ready to deploy on any host.

**Live goal**: drive registrations for October 8–10, 2026, and grow the year-round SEP community.

---

## 📁 What's in this folder

```
sep_2026_site/
├── index.html          ← The site (single self-contained file)
├── og-image.jpg        ← Social share preview image (1200×630)
├── README.md           ← This file
└── gallery/            ← Where SEP 2025 photos go (see "Adding photos" below)
```

---

## 🚀 Deploy in under 5 minutes

Pick one option below. All three are free and support custom domains.

### Option A — Vercel (recommended, easiest)

1. Sign up at [vercel.com](https://vercel.com) with your GitHub or Google account
2. Click **Add New → Project → Deploy without Git**
3. Drag the entire `sep_2026_site` folder into the browser
4. Vercel deploys instantly and gives you a URL like `sep-2026.vercel.app`
5. To use your own domain: **Settings → Domains → Add** (e.g., `sep.onechurch.tv`)

### Option B — Netlify (equally simple)

1. Sign up at [netlify.com](https://netlify.com)
2. Go to **Sites → Deploy manually**
3. Drag the `sep_2026_site` folder onto the drop zone
4. Live URL is generated instantly
5. Custom domain: **Site settings → Domain management → Add custom domain**

### Option C — GitHub Pages (if you want version control)

1. Create a new public repo on GitHub named `sep-2026-site` (or similar)
2. Upload all files from this folder to the repo root
3. Go to **Settings → Pages → Source: `main` branch, `/root`**
4. Site goes live at `https://YOUR-USERNAME.github.io/sep-2026-site/`

---

## ⚠️ Before going live — 3 things to update

Open `index.html` and search-replace these placeholders:

### 1. Domain URL

Search for `YOUR-DOMAIN.com` — it appears about 8 times in the SEO/OG meta tags near the top of the file. Replace with your actual domain (e.g., `sep.onechurch.tv`).

This matters because social share previews on WhatsApp, Facebook, and LinkedIn use the full absolute URL to fetch the preview image.

### 2. YouTube video IDs

Search for `VIDEO_ID_1`, `VIDEO_ID_2`, `VIDEO_ID_3` (in the Gallery section) and replace each with the real YouTube video ID.

The video ID is the string of characters after `v=` in a YouTube URL:
- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID: `dQw4w9WgXcQ`

You can also update the accompanying `data-title="..."` attribute for accessibility.

### 3. Registration form endpoint

The registration form currently shows a fake success message. To collect real registrations, wire it up to one of:

- **Google Forms** (simplest) — create a Google Form with matching fields, then use the [form-to-Google-Sheets pattern](https://github.com/jamiewilson/form-to-google-sheets)
- **Airtable** — free plan, generous limits, easy to build a dashboard
- **Mailchimp / ConvertKit** — if you also want email marketing
- **Eventbrite** — replace the form entirely with an Eventbrite link if you want ticket management

Find `<form id="registration-form">` in the HTML and update the JS handler at the bottom of the file.

The same applies to `<form id="hub-form">` (the SEP Hub Directory notify list).

---

## 📸 Adding SEP 2025 photos to the gallery

The gallery currently shows 8 gradient placeholder blocks. Here's how to replace them with real photos without slowing the site.

### Step 1 — Optimize your photos

Before uploading, compress each photo. Use one of these free tools:

- **[squoosh.app](https://squoosh.app)** (recommended) — drag-drop, in-browser, no upload. Best for quality control
- **[tinypng.com](https://tinypng.com)** — batch upload up to 20 at once
- **[imageoptim.com](https://imageoptim.com)** (Mac app) — bulk process a folder

**Targets:**
- **Grid tiles**: 800px on the long edge, ~80KB, JPEG quality 75
- **Lightbox view** (optional larger version): 1600px on the long edge, ~250KB, JPEG quality 80

If you save both sizes, name them `sep2025-1.jpg` (grid) and `sep2025-1-lg.jpg` (large). If you save just one size, use 1200px at ~150KB — a reasonable compromise.

### Step 2 — Drop them in the `gallery/` folder

Name them predictably. Suggested naming:

```
gallery/
├── sep2025-01-opening.jpg
├── sep2025-02-kate-henshaw.jpg
├── sep2025-03-photography-track.jpg
└── ... etc
```

### Step 3 — Update the HTML

Find the `<!-- ============ GALLERY ... -->` section in `index.html`. Each gallery item currently looks like this:

```html
<div class="gallery-item" data-caption="Day 1 · Opening session">
  <div class="gallery-ph gallery-ph-1"><span>Day 1 · Opening</span></div>
</div>
```

Replace the inner `<div class="gallery-ph...">` with an `<img>` tag:

```html
<div class="gallery-item" data-caption="Day 1 · Opening session">
  <img src="gallery/sep2025-01-opening.jpg"
       alt="Attendees arriving for the opening session of SEP 2025"
       loading="lazy"
       width="800" height="600">
</div>
```

**Why these attributes matter:**
- `loading="lazy"` — the browser only downloads the image when it's about to be scrolled into view (huge performance win)
- `width` and `height` — reserves layout space before the image loads (prevents "jumping" as the page renders)
- `alt` — describes the photo for screen readers and shows if the image fails to load. Be specific — "attendees arriving for SEP 2025 opening" not just "photo"

Do this for each of the 8 slots. Add or remove slots as needed by copying the pattern.

### Optional — separate lightbox image

If you saved a larger version for the lightbox, use a `data-full` attribute:

```html
<div class="gallery-item" data-caption="..." data-full="gallery/sep2025-01-opening-lg.jpg">
  <img src="gallery/sep2025-01-opening.jpg" ...>
</div>
```

You'll need to add one line to the `openLightbox` function in the JS to use `data-full` when present. Or just leave both the same — modern devices handle 800px images fine at lightbox size.

---

## 🎥 Adding YouTube videos

The gallery has 3 video slots using a "lite embed" pattern that loads ~95% less data than a normal YouTube embed. It shows YouTube's thumbnail as a background image, and only loads the full player when someone clicks play.

To wire in a real video, edit the `data-video-id` attribute:

```html
<div class="lite-yt" data-video-id="dQw4w9WgXcQ" data-title="SEP 2025 opening highlights">
```

The thumbnail loads automatically from YouTube's CDN. No further setup needed.

To add more than 3 videos, copy an existing `.lite-yt` block and change the ID. The grid will re-flow.

---

## 🎨 Customization

### Colours

All colours are defined as CSS variables at the top of the `<style>` block. Update these to change the whole site:

```css
:root {
  --forest: #0F3E1D;       /* Primary brand green */
  --forest-deep: #08251A;  /* Dark backgrounds */
  --lime: #8CC63F;         /* Accent / highlights */
  --amber: #D9A441;        /* Warm accent */
  --paper: #FAF8F1;        /* Off-white background */
  --paper-warm: #F4EFDF;   /* Section backgrounds */
  --ink: #0A1410;          /* Body text */
}
```

### Fonts

Currently uses Fraunces (display serif), Mona Sans (body), and JetBrains Mono (labels) — all loaded from Google Fonts in the `<head>`.

To change: update the Google Fonts `<link>` URL at the top, then the `--font-display`, `--font-body`, `--font-mono` variables.

### Copy

All copy is in the HTML directly. Search for the section headers (`Hero`, `Growth`, `About`, etc.) to find and edit specific sections.

### Speakers

Currently uses initial-based coloured avatars. To use real speaker photos:

1. Add photos to `gallery/speakers/` (150×150px square, ~30KB each)
2. Find the speaker cards in the HTML
3. Replace `<div class="speaker-avatar"><div class="speaker-avatar-initials">KH</div></div>` with `<img src="gallery/speakers/kate-henshaw.jpg" alt="Kate Henshaw" class="speaker-avatar-img">`
4. Add this CSS to make the images fill the card: `.speaker-avatar-img { width: 100%; aspect-ratio: 1; object-fit: cover; }`

---

## 📊 Adding analytics (optional but recommended)

To track visits and conversions, add one of these before the closing `</head>` tag:

**Google Analytics 4** — free, most common:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Plausible** — privacy-friendly, simpler, paid but affordable:
```html
<script defer data-domain="YOUR-DOMAIN.com" src="https://plausible.io/js/script.js"></script>
```

Replace `G-XXXXXXXXXX` or `YOUR-DOMAIN.com` with your actual values.

---

## 🔍 Testing before launch

Before you announce the site, check these:

1. **Open Graph preview** — go to [opengraph.xyz](https://www.opengraph.xyz) and paste your live URL. Confirm the og-image and description look right for WhatsApp / LinkedIn / Facebook shares.
2. **Mobile view** — open on a phone. Check the hamburger menu, gallery grid, and registration form all work.
3. **Registration flow** — submit a test entry to confirm your form endpoint receives it.
4. **Lightbox** — click any gallery photo, check navigation arrows and escape-to-close work.
5. **Video click** — click a video, confirm it plays (only works once real video IDs are set).
6. **PageSpeed** — run your URL through [pagespeed.web.dev](https://pagespeed.web.dev). Target: 90+ on mobile.

---

## 🆘 Common problems

**Social share previews aren't working** → check that `og:image` uses an *absolute* URL (starts with `https://`), not a relative path. And confirm `og-image.jpg` is actually accessible at that URL by pasting it into a browser.

**Gallery photos are slow** → they're probably not compressed. Run them through squoosh.app — most photos can drop 60-80% in size with no visible quality change.

**Form isn't collecting entries** → the current form is a prototype (shows success without sending). Wire it to Google Forms, Airtable, or your CRM (see "Registration form endpoint" above).

**YouTube videos won't play** → make sure you replaced `VIDEO_ID_1` etc. with real video IDs (the string after `v=` in the YouTube URL).

**Fonts look wrong** → check that your host isn't blocking Google Fonts. If it is, download the fonts and host them yourself, or switch to system fonts (`font-family: system-ui`).

---

## Contact

Built for the SEP 2026 team. Questions on the code? Open an issue or reach the team via the OneChurch admin group.

Planting Purpose · Equipping Lives · Empowering Future.
