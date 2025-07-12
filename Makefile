.PHONY: help
help: ## このヘルプを表示する
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## 依存関係をインストールする
	pnpm install

.PHONY: dev
dev: ## 開発サーバーを起動する
	pnpm dev

.PHONY: build
build: ## プロジェクトをビルドする
	pnpm install
	pnpm build

.PHONY: preview
preview: ## ビルド済みプロジェクトをプレビューする
	pnpm preview

.PHONY: check
check: ## コードの静的解析と型チェックを行う
	pnpm lint
	pnpm tsc --noEmit

.PHONY: test
test: ## テストを実行する
	pnpm test

.PHONY: test-ui
test-ui: ## テストをUIモードで実行する
	pnpm test:ui

.PHONY: test-coverage
test-coverage: ## テストカバレッジを確認する
	pnpm test:coverage

.PHONY: clean
clean: ## ビルド成果物とnode_modulesを削除する
	rm -rf dist node_modules .astro

.PHONY: docker-build
docker-build: ## Dockerイメージをビルドする
	docker build -t astro-template .

.PHONY: docker-run
docker-run: ## Dockerコンテナを実行する
	docker run -p 4321:4321 astro-template

.PHONY: update-deps
update-deps: ## 依存パッケージを最新バージョンに更新する
	pnpm update --latest

.PHONY: check-deps
check-deps: ## 更新可能な依存パッケージを確認する
	pnpm outdated
