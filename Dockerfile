# ビルドステージ
FROM node:24-slim AS builder

# pnpmのインストール
RUN npm install -g pnpm

# 作業ディレクトリの作成
WORKDIR /app

# 依存関係ファイルのコピーと依存関係のインストール
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# ソースコードをコピー
COPY . .

# ビルド実行
RUN pnpm build

# 実行ステージ
FROM node:24-slim AS runner

# 作業ディレクトリの作成
WORKDIR /app

# pnpmのインストール（本番モード）
RUN npm install -g pnpm

# package.jsonのコピー（本番依存関係のインストールに必要）
COPY package.json ./
RUN pnpm install --prod

# builderからビルド済みアプリをコピー
COPY --from=builder /app/dist ./dist

# ポートの公開
EXPOSE 4321

# サーバー起動コマンド
CMD ["pnpm", "preview"]
