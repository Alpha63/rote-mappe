# syntax=docker/dockerfile:1.7
# Stufe 1: Bauen der React-Anwendung
FROM node:24-alpine AS builder
WORKDIR /app
COPY --link package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit --fund=false
COPY --link . .
ENV NODE_ENV=production
RUN npm run build

# Stufe 2: Servieren mit NGINX (unprivileged, läuft als nicht-root)
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY --link --from=builder /app/dist /usr/share/nginx/html
COPY --link nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:8080/ > /dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
