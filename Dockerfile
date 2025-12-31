ARG NODE_VERSION=22.20.0
ARG PNPM_VERSION=10.18.3

# Base stage com pnpm
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app
RUN --mount=type=cache,target=/root/.npm \
  npm install -g pnpm@${PNPM_VERSION}

# Dependencies stage (prod only)
FROM base AS deps
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  --mount=type=cache,target=/root/.local/share/pnpm/store \
  pnpm install --prod --frozen-lockfile

# Build stage (all deps)
FROM base AS build
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  --mount=type=cache,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Production stage com nginx
FROM nginx:alpine AS final

# Copiar build do stage anterior
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx
COPY ./infra/nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
