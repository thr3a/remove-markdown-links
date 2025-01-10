FROM --platform=linux/x86_64 oven/bun:1.1-slim as base

WORKDIR /app

# 依存関係をインストールするステージ
FROM base as dependencies

COPY package.json .
COPY package-lock.json .
RUN bun install

# ビルドステージ
FROM dependencies as build

COPY . .

# 実行ステージ
FROM base

COPY --from=build /app/index.ts /app/index.ts
COPY --from=build /app/node_modules /app/node_modules

ENTRYPOINT ["bun", "run", "/app/index.ts"]
