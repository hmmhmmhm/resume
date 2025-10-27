[![Resume Preview](https://hmart.app/ko/og.png)](https://hmart.app)

[한국어](README_KR.md) | English

## Project Overview

This project is a personal resume and portfolio website built with Astro. It leverages a modern web technology stack to create a fast and efficient static site, deployed via Cloudflare Pages.

**🌐 Live Site**: [https://hmart.app](https://hmart.app)

## Tech Stack

- **Framework**: Astro 5.x
- **UI Library**: Preact (React-compatible)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide Preact
- **Deployment**: Cloudflare Pages
- **Build Tools**: Turborepo (monorepo management), pnpm
- **Language**: TypeScript

## Project Structure

This project uses a monorepo structure managed by Turborepo:

- `apps/resume`: Main resume application
- `packages/`: Shared packages
  - `astro-i18n`: Internationalization support
  - `astro-icon`: Icon integration
  - `astro-lint`: Linting configuration
  - `astro-preact`: Preact integration
  - `astro-pwa`: PWA functionality
  - `astro-tailwind`: Tailwind CSS integration
  - `sitemap-generator`: Sitemap generation

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 9.0.0

### Installation

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

The development server will start and you can view the site in your browser.

### Build

```bash
pnpm build
```

### Deploy

```bash
cd apps/resume
pnpm deploy
```

## Key Features

- **Responsive Design**: Optimized experience across mobile, tablet, and desktop devices
- **Fast Performance**: Lightning-fast loading with Astro's static site generation
- **Modern UI**: Sleek design powered by Tailwind CSS and Framer Motion
- **PWA Support**: Offline access and app-like experience
- **Internationalization**: i18n integration (currently supports Korean and English)
- **Edge Deployment**: Global CDN deployment via Cloudflare Pages

## Development Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Production build
- `pnpm lint`: Code linting and formatting
- `pnpm format`: Code formatting with Prettier
- `pnpm check-types`: TypeScript type checking

## License

MIT License - See [LICENSE](LICENSE) file for details.
