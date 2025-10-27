FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

FROM node:20-alpine AS runtime

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/.output /app/.output

EXPOSE 5010

CMD ["node", "/app/.output/server/index.mjs"]