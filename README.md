# Titans East Coast Agency Landing Page (TECA)

Production-ready static landing page for **Titans East Coast Agency** focused on WhatsApp lead generation, brand presence, and training/program showcase.

## Tech Stack

- HTML5 (semantic sections + SEO metadata)
- CSS3 (mobile-first responsive layout)
- Vanilla JavaScript (no framework)

## Project Structure

```text
.
|-- index.html
|-- styles.css
|-- script.js
`-- assets
    |-- hero section
    |   `-- MainHero.mp4
    `-- images
        |-- academy-1.svg
        |-- academy-2.svg
        |-- recruitment-1.svg
        |-- recruitment-2.svg
        |-- events-1.svg
        |-- events-2.svg
        |-- awards-1.svg
        |-- awards-2.svg
        `-- trainer-profile.svg
```

## Features Implemented

- Sticky floating pill navbar
- Mobile hamburger menu
- Smooth scrolling with section offset handling
- Reveal-on-scroll animations (IntersectionObserver)
- Hero section with conversion CTAs
- Structured corporate content sections (About, Trainer, System, Programs, Sales Cycle)
- Gallery with lazy-loaded local placeholder images
- Lightbox preview with next/previous controls
- Floating WhatsApp CTA
- Back-to-top button
- SEO essentials:
  - Meta title, description, keywords
  - Open Graph tags
  - Canonical link
  - JSON-LD Organization schema
- Footer icon attribution text: **Icons by Flaticon**

## Run Locally

You can serve this as static files with any simple server:

```bash
npx serve .
```

Then open the local URL shown in terminal.

## Deploy to Cloudflare Pages

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. In Cloudflare Dashboard, go to **Workers & Pages** > **Create** > **Pages**.
3. Connect your repository.
4. Build settings:
   - Framework preset: `None`
   - Build command: *(leave empty)*
   - Build output directory: `/` (root)
5. Deploy.

## Customization Notes

- Main contact links are hardcoded in `index.html` (WhatsApp deep link, email, Facebook).
- Replace placeholder images in `assets/images/` with real photos while keeping filenames to avoid HTML updates.
- Update canonical/OG URL when final domain is live.

## Credits

- Icons by Flaticon
