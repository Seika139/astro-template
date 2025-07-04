# 開発環境用Dockerfile
FROM node:24-slim

# 必要なパッケージのインストール
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install git bash-completion make \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# pnpmのインストール
RUN npm install -g pnpm

# 作業ディレクトリの設定
WORKDIR /workspaces/app

# ユーザー設定
USER node
