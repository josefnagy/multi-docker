FROM node:lts-alpine AS base
RUN npm i -g pnpm 

FROM base AS builder
WORKDIR '/app'
COPY ./package.json ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html