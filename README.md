# Sri Gomathi Sanker Lorry Body Labour Works

A responsive, single-page workshop portfolio built with Vite, React, TypeScript, Tailwind CSS, Framer Motion, GSAP/ScrollTrigger and Lenis.

## Setup

```bash
npm install
npm run dev
```

Create and locally preview the production build:

```bash
npm run build
npm run preview
```

## Update business content

Edit [`data/content.ts`](./data/content.ts) to change the business description, navigation, phone and WhatsApp numbers, email, address, map links, stats, owner details, services, project gallery, process steps, benefits, testimonials and social links. Replace remaining `REPLACE_ME` values before publishing; the stats carry a `placeholder: 'REPLACE_ME'` marker alongside the illustrative preview counts. Phone and WhatsApp numbers can be entered as local digits; ten-digit WhatsApp numbers automatically receive India's `91` country code in the chat link.

Contact form submissions open a prefilled email draft in the visitor's email app after a real email address has been configured. To deliver form submissions without relying on the visitor's email app, connect a form provider or server endpoint in `src/App.tsx`.

The JSON-LD address, site URL and telephone/email in `index.html`, plus the canonical domain in `public/sitemap.xml` and `public/robots.txt`, also contain `REPLACE_ME` placeholders. Update these values to your production address and domain before launch.

## Replace images

- Replace `public/assets/logo.png` with the company badge. Keep the filename or update its references in `index.html` and `src/App.tsx`.
- Replace `public/assets/owner.png` and its optimized `public/assets/owner.webp` counterpart with the transparent owner portrait. Both the hero and About section use a `<picture>` element with WebP first and PNG fallback; keep the filenames or update both image references.
- Project illustration placeholders are in `public/assets/projects/`. Replace the SVGs with optimized WebP or AVIF photos and update the matching `image` paths in `data/content.ts`. Use descriptive alt text when changing the project entries.
- Keep the real images reasonably sized and use WebP/AVIF for photographic gallery images. The gallery and portrait load lazily; the hero visual is prioritized.

## Deploy

The output is a static Vite site in `dist/`. Import the project into Vercel or Netlify and use:

- Build command: `npm run build`
- Publish/output directory: `dist`

Both platforms detect Vite projects automatically. Update the SEO domain placeholders, contact information and map embed before deploying.
