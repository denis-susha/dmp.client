# dmp.client

Buyer-facing storefront of the DMP digital goods and data marketplace. It is a server-rendered Next.js app where
buyers browse the catalog, search, manage favorites and a cart, place orders, pay with crypto (Bitcart invoices,
with live payment status over SignalR), download purchased files, and manage their account. It holds no data of its
own: it calls the **dmp.api.web** REST API from the browser and from the Next.js server (SSR), and it serves product
images and static assets from the S3-compatible object storage (MinIO).

## Tech stack

| Area          | Technology                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------ |
| Runtime       | Node.js 24 LTS                                                                                   |
| Framework     | Next.js 16 (Pages Router, Turbopack), React 19.3, TypeScript 6 (strict)                          |
| Styling       | Tailwind CSS 4 (CSS-first config, `@tailwindcss/postcss`), styled-components 6, tailwind-merge 3 |
| i18n          | next-i18next 16 (`next-i18next/pages`), i18next 26, react-i18next 17 (en, ru)                    |
| State         | zustand 5                                                                                        |
| HTTP/realtime | axios 1.x, `@microsoft/signalr` 10                                                               |
| UI extras     | framer-motion 13, react-markdown 10, qrcode.react 4, SVGR (SVG icons as components)              |
| Tooling       | ESLint 9 flat config (eslint-config-next, typescript-eslint), Prettier 3                         |
| Process mgr   | pm2 (cluster mode) inside the Docker image                                                       |

## Project structure

```
.
├── public/
│   ├── images/icons/      SVG icons, loaded on demand as React components by <Icon>
│   ├── locales/{en,ru}/   Translation namespaces used by next-i18next
│   └── sitemaps/, robots.txt
├── src/
│   ├── pages/             Next.js Pages Router routes; getServerSideProps loads data via the API
│   ├── application/       Feature modules (cart, catalog, product, payment, orders, registration, ...)
│   │                      with their components, styles and zustand stores
│   ├── components/        Shared UI (common/*), layout (header, footer, catalog menu) and grid
│   ├── contexts/          Main zustand store (user info, menu, search) shared by all pages
│   ├── hooks/             useLocalStorage, useInView, host helper
│   ├── services/          SignalR client, page API service and API models (request/response types)
│   ├── utils/api/         axios client (SSR cookie forwarding + token refresh) and fetch helper
│   ├── styles/            Global CSS (Tailwind entry), styled-components theme
│   ├── proxy.ts           Next.js proxy (formerly middleware): auth-based redirects
│   └── appConfig.ts       Access to environment configuration
├── next.config.js         Next.js config (i18n, images, SVGR rule for Turbopack)
├── next-i18next.config.js Locales (en default, ru)
├── pm2.config.js          pm2 cluster configuration used by the Docker image
└── Dockerfile
```

## Configuration

All settings are environment variables (see [`.env.example`](.env.example)). `NEXT_PUBLIC_*` values are inlined into
the bundle at **build time**; for Docker they are passed as build arguments.

| Variable                                  | Used by      | Description                                                                                  |
| ----------------------------------------- | ------------ | -------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_HOST_URL`                | browser      | Public URL of dmp.api.web; also the base of the SignalR hub `/paymenthub`                    |
| `NEXT_INTERNAL_API_HOST_URL`              | server (SSR) | URL of dmp.api.web reachable from the Next.js server (e.g. `http://dmp-api-web:80`)          |
| `NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_ORIGIN` | browser, SSR | Value of the `Access-Control-Allow-Origin` header sent with API requests                     |
| `NEXT_PUBLIC_IMAGES_HOST_URL`             | browser, SSR | Object storage base URL serving `/images/**` and `/static/**`; also allowed for `next/image` |
| `NEXT_PUBLIC_SELLER_HOST_URL`             | browser      | Public URL of the seller portal (links "Become a seller", blog)                              |
| `NEXT_PUBLIC_CLIENT_HOST_URL`             | browser, SSR | Public URL of this storefront (canonical and Open Graph URLs)                                |
| `NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY`       | browser      | Cloudflare Turnstile site key for registration/login forms                                   |
| `NEXT_PUBLIC_HOST`                        | server (SSR) | Optional override of the request host passed to pages                                        |

The pm2 config sets `APP_ENV` (`local`, `dev`, `prod`) and picks the number of cluster instances by it.

## Getting started

### Prerequisites

- Node.js 24 (`nvm use` reads `.nvmrc`)
- A running dmp.api.web and MinIO; the easiest way is the dmp.docker stack

### Run locally

```bash
npm ci
cp .env.example .env.local   # adjust the URLs
npm run dev                  # http://localhost:3000
```

### Run with Docker

```bash
docker build -t dmp-client \
  --build-arg NEXT_PUBLIC_API_HOST_URL=https://api.example.com \
  --build-arg NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_ORIGIN=https://api.example.com \
  --build-arg NEXT_PUBLIC_IMAGES_HOST_URL=https://s3.example.com \
  --build-arg NEXT_PUBLIC_SELLER_HOST_URL=https://seller.example.com \
  --build-arg NEXT_PUBLIC_CLIENT_HOST_URL=https://example.com \
  --build-arg NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY=1x00000000000000000000AA \
  .
docker run -p 3000:3000 -e NEXT_INTERNAL_API_HOST_URL=http://dmp-api-web:80 dmp-client
```

The image runs `next start` under pm2 in cluster mode as the non-root `node` user and listens on port **3000**.
In the full system it is started by the `client-ui-dmp` service of dmp.docker behind nginx.

## Scripts

| Command             | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Development server with Turbopack                     |
| `npm run build`     | Production build                                      |
| `npm start`         | Start the production build                            |
| `npm run pm2`       | Start the production build under pm2 (used in Docker) |
| `npm run lint`      | ESLint                                                |
| `npm run typecheck` | Generate Next.js route types and run `tsc --noEmit`   |
| `npm run format`    | Prettier (write); `format:check` only checks          |

## Related repositories

- [dmp](https://github.com/denis-susha/dmp) - umbrella repository with the overall architecture
- [dmp.api.web](https://github.com/denis-susha/dmp.api.web) - REST API and SignalR payment hub used by this app
- [dmp.api.notifications](https://github.com/denis-susha/dmp.api.notifications) - notification service of the platform (not called directly by this app)
- [dmp.seller](https://github.com/denis-susha/dmp.seller) - seller portal linked from the storefront
- [dmp.docker](https://github.com/denis-susha/dmp.docker) - Docker Compose stack (nginx, APIs, Redis, databases, MinIO, Bitcart)
