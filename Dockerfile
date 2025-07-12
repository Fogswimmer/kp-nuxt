FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]
