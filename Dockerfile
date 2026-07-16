ARG NODE_VERSION=24.15.0
ARG PNPM_VERSION=10.18.3

FROM node:${NODE_VERSION}-alpine AS base
ARG PNPM_VERSION
WORKDIR /usr/src/app
RUN --mount=type=cache,target=/root/.npm \
  npm install --global --no-audit --no-fund "pnpm@${PNPM_VERSION}" \
  && test "$(pnpm --version)" = "${PNPM_VERSION}"

FROM base AS deps
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  --mount=type=bind,source=pnpm-workspace.yaml,target=pnpm-workspace.yaml \
  --mount=type=cache,target=/root/.local/share/pnpm/store \
  pnpm install --prod --frozen-lockfile --config.strict-dep-builds=true

FROM base AS build

ARG VITE_APP_SERVER_URL
ARG VITE_PUBLIC_POSTHOG_KEY
ARG VITE_PUBLIC_POSTHOG_HOST

RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  --mount=type=bind,source=pnpm-workspace.yaml,target=pnpm-workspace.yaml \
  --mount=type=cache,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile --config.strict-dep-builds=true

ENV VITE_APP_SERVER_URL=${VITE_APP_SERVER_URL}
ENV VITE_PUBLIC_POSTHOG_KEY=${VITE_PUBLIC_POSTHOG_KEY}
ENV VITE_PUBLIC_POSTHOG_HOST=${VITE_PUBLIC_POSTHOG_HOST}

COPY . .

RUN pnpm build

FROM nginx:alpine AS final
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD nginx -t || exit 1

CMD ["nginx", "-g", "daemon off;"]
