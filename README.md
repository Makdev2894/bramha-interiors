# Bramha Interiors — Landing Website

A complete, production-ready single-page landing site for **Bramha Interiors**, a premium interior design and woodwork company based in Bengaluru, India.

---

## Quick Start

1. Open `index.html` directly in any modern browser — no build step, no server required.
2. To view it served (recommended for gallery images to load correctly in some browsers), run:
   ```bash
   # Python 3
   python3 -m http.server 8080
   # Then open http://localhost:8080
   ```

---

## Adding Images to the Gallery

The gallery section is designed to be updated by dropping image files into the `gallery/` folder.

### Step 1 — Place your images
Copy your `.jpg`, `.png`, or `.webp` files into the `gallery/` folder:

```
bramha-interiors/
├── index.html
├── style.css
├── script.js
└── gallery/
    ├── living-room.jpg      ← drop files here
    ├── bedroom.jpg
    ├── kitchen.jpg
    └── ...
```

### Step 2 — The HTML is already wired up
Open `index.html` and look for this comment block inside the `#portfolio` section:

```html
<!-- ADD YOUR IMAGES HERE — place files in the /gallery folder and add <img> tags below -->
```

The following gallery slots are pre-configured and will automatically show your images once files are in place:

| Filename | Gallery Label |
|---|---|
| `living-room.jpg` | Living Room |
| `bedroom.jpg` | Master Bedroom |
| `kitchen.jpg` | Modular Kitchen |
| `pooja-room.jpg` | Pooja Room |
| `study.jpg` | Study / Library |
| `office.jpg` | Home Office |
| `wardrobe.jpg` | Wardrobe Unit |
| `dining-room.jpg` | Dining Room |

### Step 3 — Adding more images
To add extra images beyond the 8 defaults, copy any existing `<div class="gallery-item">` block in `index.html` and update the `src`, `alt`, and `data-label` attributes:

```html
<div class="gallery-item" data-label="Your Label Here">
  <img src="./gallery/your-image.jpg" alt="Description"
    onerror="this.parentElement.classList.add('img-missing')" loading="lazy"/>
  <div class="gallery-overlay">
    <span class="gallery-label">Your Label Here</span>
  </div>
</div>
```

### Missing images
If an image file is missing or fails to load, the gallery slot will display a graceful styled placeholder with the room label — no broken image icons.

---

## Customising Content

| What to change | Where to find it |
|---|---|
| Phone number | Search `+91 XXXXX XXXXX` in `index.html` — appears in the contact section and footer |
| Email address | Search `hello@bramhainteriors.in` in `index.html` |
| Address | Footer section, `.footer-address` paragraph |
| Social links | Footer `.footer-socials` — replace `href="#"` with real URLs |
| Hero headline | `<h1 class="hero-headline">` in the Hero section |
| Testimonials | `.testimonial-card` blocks in the Testimonials section |
| Services text | `.service-card` blocks in the Services section |

---

## File Structure

```
bramha-interiors/
├── index.html        ← All page sections (single file)
├── style.css         ← All styles, responsive breakpoints
├── script.js         ← Navbar, scroll-reveal, lightbox, form
├── gallery/          ← Drop your project images here
│   └── (place .jpg / .png / .webp files here)
└── README.md         ← This file
```

---

## Browser Support
Works in all modern browsers: Chrome, Firefox, Safari, Edge. No dependencies, no build tools, no frameworks — pure HTML, CSS, and vanilla JS.

---

## SEO
Update these tags in the `<head>` of `index.html` before going live:
- `<title>` — page title
- `<meta name="description">` — search snippet
- `<meta property="og:title">` and `<meta property="og:description">` — social share preview

---

*Built with care. Honouring tradition.*
