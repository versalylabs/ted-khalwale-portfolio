# Ted Khalwale — Personal Portfolio & Engineering Showcase

A personal portfolio for **Ted Khalwale**, presenting real-world web engineering capabilities, modern business management systems, interactive dashboards, and custom software.

Built with a dark aesthetic, liquid-glass cards, spotlight interactions, full keyboard accessibility, and SEO metadata.

---

## 🌟 Highlights & Features

- **Positioning**: Built specifically around modern websites, business management systems, operational dashboards, and custom business software.
- **Project Catalog & Dedicated Case Studies**:
  - Detailed case study views with problems, solutions, architecture highlights, technologies, and code breakdowns.
  - Interactive "Explore Shipped Projects" catalog with live search, keyword filters, and category toggles.
- **Production-Ready Contact Flow**:
  - Full client-side input validation and anti-spam honeypot.
  - Direct mail client launch with pre-filled subject and message body.
  - Optional support for webhook endpoints (e.g. Formspree, Formsubmit, Web3Forms) via `VITE_CONTACT_ENDPOINT`.
- **Search Engine Optimization (SEO)**:
  - Canonical URL, OpenGraph tags, and Twitter/X summary cards.
  - Social preview image (`og-image.svg`), SVG favicon, and Apple Touch Icon.
  - `robots.txt` and `sitemap.xml`.
  - Schema.org JSON-LD structured data for `Person` and `WebSite`.
- **Performance & Accessibility**:
  - Hardware-accelerated CSS and RAF-managed caustic cursor tracking that sleeps when idle.
  - Respects user preferences for `prefers-reduced-motion`.
  - WCAG-compliant color contrasts, semantic headings, `role="dialog"`, `aria-modal="true"`, and keyboard Escape listeners on all modals.
  - Zero accidental horizontal overflow across all viewport widths (320px – 1440px+).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Motion**: [Motion](https://motion.dev/)

---

## 📁 Content Architecture (How to Update Your Info)

All portfolio data is centralized in **`src/data/portfolioData.ts`**:

1. **Profile Info** (`defaultProfile`): Name, title, bio, contact email, phone, location, and social links.
2. **Featured Projects** (`featuredProjects`): Add, update, or remove projects. Each project supports:
   - `id`: Unique identifier
   - `title`: Project name
   - `category`: `'web'` | `'business'` | `'dashboard'` | `'saas'`
   - `role`: Your specific role
   - `status`: `'Production Ready'` | `'Active'` | `'Completed'` | `'In Development'`
   - `tagline`: Concise one-line description
   - `summary`, `problem`, `solution`: Real-world case study breakdown
   - `keyFeatures`: Array of core capabilities
   - `technologies`: Tech stack badges
   - `imageUrl` & `screenshots`: Preview images
   - `githubUrl` & `liveUrl`: Optional real links (hidden if omitted)
   - `measurableResults`: Realistic outcome metrics
3. **Master Skills** (`masterSkills`): Skills and proficiency percentages.
4. **Articles** (`technicalArticles`): Architecture and engineering posts.
5. **Resume & Career Timeline** (`experienceData` & `skillCategories`): Displayed inside the Curriculum Vitae modal and print view.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/khalwaleted/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server on http://localhost:3000
npm run dev
```

### Build for Production

```bash
npm run build
```

This generates an optimized static bundle in the `dist/` directory.

---

## 🌐 Deployment Instructions

### 1. Vercel
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com/).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. (Optional) Add `VITE_CONTACT_ENDPOINT` in Environment Variables.
7. Click **Deploy**.

### 2. Netlify
1. Connect repository in [Netlify](https://www.netlify.com/).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Deploy!

### 3. Cloud Run / Docker
A standard static web server (Nginx or Node `serve`) can host the `dist/` directory.

---

## 🔒 Environment Variables

See `.env.example`:

| Variable | Description | Default |
|---|---|---|
| `VITE_CONTACT_ENDPOINT` | Optional webhook endpoint for form submissions (e.g. Formspree) | `""` (uses direct mail client fallback) |
| `VITE_APP_URL` | Canonical domain for SEO and social share cards | `https://tedkhalwale.dev` |

---

## 📄 License

MIT © Ted Khalwale
