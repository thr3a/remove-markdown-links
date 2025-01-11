FROM --platform=linux/x86_64 oven/bun:1.1-slim as base

WORKDIR /app

# 依存関係をインストールするステージ
FROM base as dependencies

COPY package.json ./
COPY package-lock.json ./
RUN bun install

# ビルドステージ
FROM dependencies as build

COPY . .

# 実行ステージ
FROM base

WORKDIR /app

COPY --from=build /app/main.ts /opt/remove-markdown-links/main.ts
COPY --from=build /app/markdownProcessor.ts /opt/remove-markdown-links/markdownProcessor.ts
COPY --from=build /app/node_modules /opt/remove-markdown-links/node_modules

ENTRYPOINT ["bun", "run", "/opt/remove-markdown-links/main.ts"]
