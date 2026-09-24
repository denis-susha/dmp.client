# syntax=docker/dockerfile:1

FROM node:24-alpine AS deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:24-alpine AS build
WORKDIR /usr/src/app

# NEXT_PUBLIC_* values are inlined into the bundle at build time, so they are build arguments.
ARG NEXT_PUBLIC_HOST=""
ARG NEXT_PUBLIC_API_HOST_URL=""
ARG NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_ORIGIN=""
ARG NEXT_PUBLIC_IMAGES_HOST_URL=""
ARG NEXT_PUBLIC_SELLER_HOST_URL=""
ARG NEXT_PUBLIC_CLIENT_HOST_URL=""
ARG NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY=""
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST \
    NEXT_PUBLIC_API_HOST_URL=$NEXT_PUBLIC_API_HOST_URL \
    NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_ORIGIN=$NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_ORIGIN \
    NEXT_PUBLIC_IMAGES_HOST_URL=$NEXT_PUBLIC_IMAGES_HOST_URL \
    NEXT_PUBLIC_SELLER_HOST_URL=$NEXT_PUBLIC_SELLER_HOST_URL \
    NEXT_PUBLIC_CLIENT_HOST_URL=$NEXT_PUBLIC_CLIENT_HOST_URL \
    NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:24-alpine AS runner
WORKDIR /usr/src/app

# Server-side only; read at runtime, so it can also be overridden with `environment:` in compose.
ARG NEXT_INTERNAL_API_HOST_URL="http://dmp-api-web:80"
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_INTERNAL_API_HOST_URL=$NEXT_INTERNAL_API_HOST_URL

RUN npm install -g pm2 --no-audit --no-fund

COPY --from=build --chown=node:node /usr/src/app/package.json /usr/src/app/pm2.config.js /usr/src/app/next.config.js /usr/src/app/next-i18next.config.js ./
COPY --from=build --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=node:node /usr/src/app/public ./public
COPY --from=build --chown=node:node /usr/src/app/.next ./.next

USER node

EXPOSE 3000

CMD ["npm", "run", "pm2"]
