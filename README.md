# Agency Website — React + Vite

Premium software development agency website.
**Theme**: Light Gray & Charcoal + Gold Accents | Friendly & Approachable

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI library |
| Vite 5 | Build tool & dev server |
| React Router v6 | Client-side routing |
| Framer Motion | Animations |
| Lucide React | Icons |
| @formspree/react | Form submission |
| react-countup | Animated stats numbers |
| react-intersection-observer | Scroll-triggered animations |

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Then open `.env` and fill in:
- `VITE_FORMSPREE_ENDPOINT` — your Formspree form URL (see below)
- `VITE_WHATSAPP_NUMBER` — your WhatsApp number with country code
- `VITE_CONTACT_EMAIL` — your business email
- `VITE_CONTACT_PHONE` — your business phone

### 3. Set up Formspree (takes 2 minutes)
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Click "New Form" → give it a name → copy the endpoint URL
3. Paste it into `.env` as `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_ID`

### 4. Run development server
```bash
npm run dev
```
Opens at `http://localhost:3000`

### 5. Build for production
```bash
npm run build
npm run preview  # Preview the production build locally
```

---

## Project Structure

```
src/
├── assets/          # Images, fonts, icons
├── components/
│   ├── layout/      # Navbar, Footer, Layout wrapper
│   ├── ui/          # Reusable UI: Button, Card, Badge, etc.
│   ├── home/        # All Home page sections
│   ├── questionnaire/ # 4-step contact form
│   └── about/       # About page components
├── pages/           # One file per route
├── data/            # All content as JS arrays (edit content here)
├── hooks/           # Custom React hooks
├── styles/          # Global CSS with design tokens
└── utils/           # Constants, form helpers, scroll helpers
```

---

## Updating Content

All website content is in `src/data/`. You never need to touch components to update text.

| File | What it controls |
|---|---|
| `services.js` | All 6 service categories and sub-services |
| `portfolio.js` | Case studies shown in the Work section |
| `testimonials.js` | Client quotes and photos |
| `blogPosts.js` | Blog articles |
| `team.js` | Team member cards |
| `stats.js` | The 4 animated numbers (projects, clients, etc.) |

---

## Customising the Theme

All colours, fonts, and spacing are CSS variables in `src/styles/index.css`.

Key variables:
```css
--color-gold: #C9A84C;        /* Primary accent — change this to rebrand */
--color-charcoal: #1E1E2E;    /* Primary text and footer background */
--color-bg: #F5F4F0;          /* Page background */
--font-display: 'Playfair Display'; /* Headings font */
--font-body: 'DM Sans';             /* Body font */
```

---

## Deployment

The `dist/` folder after `npm run build` can be deployed to:
- **Vercel** — `vercel deploy` (recommended, zero config)
- **Netlify** — drag and drop `dist/` to netlify.com
- **GitHub Pages** — with `vite-plugin-gh-pages`
- Any static hosting (AWS S3, Cloudflare Pages, etc.)

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `VITE_FORMSPREE_ENDPOINT` | ✅ Yes | Formspree form URL |
| `VITE_WHATSAPP_NUMBER` | ✅ Yes | WhatsApp number (digits only, with country code) |
| `VITE_CONTACT_EMAIL` | ✅ Yes | Business email shown in footer |
| `VITE_CONTACT_PHONE` | ✅ Yes | Business phone shown in footer |
| `VITE_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 ID |