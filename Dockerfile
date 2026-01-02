ARG NODE_VERSION=22.20.0
ARG PNPM_VERSION=10.18.3

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app
RUN --mount=type=cache,target=/root/.npm \
  npm install -g pnpm@${PNPM_VERSION}

FROM base AS deps
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  --mount=type=cache,target=/root/.local/share/pnpm/store \
  pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  --mount=type=cache,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:alpine AS final

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD nginx -t || exit 1

CMD ["nginx", "-g", "daemon off;"]
