.PHONY: dev build preview install clean docker-build docker-run update-deps check-deps help

help: ## このヘルプを表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## 依存関係をインストールする
	pnpm install

dev: ## 開発サーバーを起動する
	pnpm dev

build: ## プロジェクトをビルドする
	pnpm build

preview: ## ビルド済みプロジェクトをプレビューする
	pnpm preview

clean: ## ビルド成果物とnode_modulesを削除する
	rm -rf dist node_modules .astro

docker-build: ## Dockerイメージをビルドする
	docker build -t astro-template .

docker-run: ## Dockerコンテナを実行する
	docker run -p 4321:4321 astro-template

update-deps: ## 依存パッケージを最新バージョンに更新する
	pnpm update --latest

check-deps: ## 更新可能な依存パッケージを確認する
	pnpm outdated
