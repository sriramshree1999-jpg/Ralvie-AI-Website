# Ralvie AI Website - Complete Setup Guide

This is a modern, high-performance SaaS website built with cutting-edge technologies for optimal user experience and deployment.

## 🚀 Tech Stack

- **Framework**: Astro 4.x (Static Site Generation)
- **UI Components**: React 18 + TypeScript
- **Styling**: Tailwind CSS 4 + CSS Variables
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animations**: GSAP + Motion for React
- **CMS**: Sanity (Free tier, blog content)
- **Deployment**: Cloudflare Pages
- **Version Control**: GitHub

## 📋 Prerequisites

- Node.js 22+ (download from https://nodejs.org/)
- npm 11+
- Git (download from https://git-scm.com/)
- GitHub account (for version control)
- Cloudflare account (for hosting)

## ⚙️ Local Development Setup

### 1. Install Dependencies

```bash
cd ralvie-ai-website
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Customization

### Update Brand Colors
Edit `src/styles/global.css` to change the color scheme:
```css
--color-primary: #7357ff;
--color-secondary: #ff6b6b;
--color-dark: #080812;
```

### Modify Homepage Content
Edit `src/pages/index.astro` to update:
- Hero section text
- Feature descriptions
- Call-to-action buttons

### Add New Pages
Create `.astro` files in `src/pages/`:
```
src/pages/
  ├── index.astro (homepage)
  ├── about.astro (about page)
  ├── blog.astro (blog listing)
  └── contact.astro (contact form)
```

### Create React Components
Store React components in `src/components/`:
```typescript
// src/components/MyComponent.tsx
import type { FC } from 'react';

export const MyComponent: FC = () => {
  return <div>Hello World</div>;
};
```

Use in Astro with `client:` directives:
```astro
<MyComponent client:load />
```

### Three.js 3D Scenes
Create 3D components in `src/components/three/`:
```typescript
// src/components/three/MyScene.tsx
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export default function MyScene() {
  return (
    <Canvas>
      <ambientLight intensity={1.5} />
      <Float>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="#7357ff" />
        </mesh>
      </Float>
    </Canvas>
  );
}
```

## ✍️ Blog CMS (Sanity)

The blog at `/blog` reads posts from Sanity. There's a separate Studio app in `studio/` where you write content — it is not deployed to Cloudflare, it runs on Sanity's own hosting (free tier).

### 1. Create a Sanity project

```bash
cd studio
npx sanity@latest login
npx sanity@latest init --env
```

- Choose **Create new project**, give it a name (e.g. "Ralvie AI").
- Dataset: `production`.
- When asked to add configuration files, say no (they already exist here).
- This writes your **Project ID** into `studio/.env` — copy it.

### 2. Point the main site at your project

In the site root (`ralvie-ai-website/`, not `studio/`), copy `.env.example` to `.env` and fill in:
```
SANITY_PROJECT_ID=<paste the project ID from studio/.env>
SANITY_DATASET=production
```

### 3. Run the Studio locally to write posts

```bash
cd studio
npm install
npm run dev
```

Opens at `http://localhost:3333`. Create **Post** documents there — title, slug, image, body, etc.

### 4. Deploy the Studio (so you can edit content from anywhere, not just your laptop)

```bash
cd studio
npm run deploy
```

Sanity hosts it for free at `https://<your-project-name>.sanity.studio`.

### 5. Allow your Cloudflare Pages domain to read the data

In [sanity.io/manage](https://sanity.io/manage) → your project → **API** → **CORS origins**, add your Cloudflare Pages URL (and custom domain once you have one) so the built site can fetch content at build time and from the browser if needed.

Once `SANITY_PROJECT_ID` is set, `/blog` automatically starts listing posts — no code changes needed.

## 🌐 Cloudflare Pages Deployment

### Prerequisites
- Cloudflare account
- GitHub repository connected

### Setup Steps

#### 1. Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ralvie-ai-website.git
git branch -M main
git push -u origin main
```

#### 2. Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Select **Connect to Git**
4. Authorize GitHub
5. Select your repository
6. Configure build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 22 (add to Environment)

#### 3. Add Environment Variables

In Cloudflare Pages settings, add:
```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
PUBLIC_SITE_URL=https://your-domain.com
```

#### 4. Deploy

Push to main branch:
```bash
git push origin main
```

Cloudflare will automatically build and deploy!

### Custom Domain

1. In Cloudflare Dashboard → Pages → Your Project
2. **Custom domains** → **Add custom domain**
3. Follow the DNS configuration instructions

## 📚 Project Structure

```
ralvie-ai-website/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Features.astro
│   │   ├── CTA.astro
│   │   ├── three/           # 3D components
│   │   │   └── HeroScene.tsx
│   │   └── ...
│   ├── layouts/             # Page layouts
│   │   └── Layout.astro
│   ├── lib/                 # Sanity client + GROQ queries
│   │   ├── sanity.ts
│   │   └── queries.ts
│   ├── pages/               # Routes
│   │   ├── index.astro      # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro  # Blog listing
│   │   │   └── [slug].astro # Blog post
│   │   └── ...
│   ├── styles/              # Global styles
│   │   └── global.css
│   └── assets/              # Images, fonts, etc.
├── public/                  # Static files
│   ├── favicon.svg
│   └── favicon.ico
├── studio/                  # Sanity Studio (separate app, hosted by Sanity)
│   ├── schemaTypes/         # post, author, category, blockContent
│   └── sanity.config.ts
├── astro.config.mjs         # Astro config (Tailwind v4 configured via CSS, no config file needed)
├── tsconfig.json            # TypeScript config
├── wrangler.toml            # Cloudflare Pages config
└── package.json             # Dependencies
```

## 🔧 VS Code Setup

Recommended extensions (auto-installed):
- **astro-build.astro-vscode** - Astro syntax highlighting
- **esbenp.prettier-vscode** - Code formatting
- **dbaeumer.vscode-eslint** - Linting
- **bradlc.vscode-tailwindcss** - Tailwind intellisense
- **dsznajder.es7-react-js-snippets** - React snippets
- **GitHub.copilot** - AI code completion

All extensions are recommended in `.vscode/extensions.json`

## 🧪 Quality Checks

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Format Code
```bash
npx prettier --write "src/**/*.{astro,ts,tsx,json}"
```

## 🔐 Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit with your actual values:
- Sanity CMS credentials
- Analytics IDs
- API keys

## 📖 Documentation

- [Astro Docs](https://docs.astro.build)
- [React Docs](https://react.dev)
- [Three.js Docs](https://threejs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Cloudflare Pages](https://developers.cloudflare.com/pages)

## 🐛 Troubleshooting

### Build fails with "Missing dependencies"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
npm run dev -- --port 3001
```

### 3D Scene not rendering
- Check browser console for errors
- Ensure WebGL is enabled in browser
- Try a different browser (Chrome/Edge recommended)

### Cloudflare deployment fails
1. Check build logs in Cloudflare Dashboard
2. Ensure `npm run build` works locally
3. Verify environment variables are set
4. Clear cache: **Pages** → **Deployments** → **Clear all**

## 📞 Support

For issues or questions:
- Check existing [GitHub Issues](https://github.com/yourusername/ralvie-ai-website/issues)
- Create a new issue with detailed description
- Email: support@ralvie.ai

## 🎉 Next Steps

1. ✅ Install dependencies
2. ✅ Customize branding and content
3. ✅ Set up GitHub repository
4. ✅ Connect to Cloudflare Pages
5. ✅ Add custom domain
6. ✅ Monitor analytics and performance

Happy building! 🚀
