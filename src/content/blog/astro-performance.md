---
title: 'Astroで高速なWebサイトを構築する方法'
description: 'Astroフレームワークを使って高パフォーマンスなWebサイトを構築する基本的な手順を解説します。'
pubDate: '2025-06-15T00:00:00Z'
author: '山田 太郎'
tags: ['Astro', 'パフォーマンス', 'チュートリアル']
image: '/images/astro-performance.jpg'
---

Astroは、コンテンツ重視のWebサイト構築のために設計された最新のWebフレームワークです。「アイランドアーキテクチャ」と呼ばれるアプローチを採用しており、クライアント側のJavaScriptを最小限に抑えることで、非常に高速なWebサイトを構築できます。

## Astroの特長

Astroには以下のような特長があります：

1. **デフォルトでゼロJavaScript** - 必要な部分だけをハイドレーションできます
2. **コンポーネントアイランド** - 複数のUIフレームワークを混在させることが可能
3. **サーバーファーストAPI設計** - リクエスト時にHTML生成を行います
4. **デフォルトでSSR/SSG** - 最適なレンダリング戦略を自動選択
5. **優れた開発者体験** - TypeScript、ホットモジュールリプレイスメントなど

## はじめ方

Astroプロジェクトを始めるには、まず新しいプロジェクトを作成します：

```bash
# npm
npm create astro@latest

# pnpm
pnpm create astro@latest

# yarn
yarn create astro
```

プロジェクトが作成されたら、開発サーバーを起動できます：

```bash
npm run dev
```

## ページとルーティング

Astroでは、ファイルベースのルーティングを使用します。`src/pages`ディレクトリに`.astro`、`.md`、`.mdx`ファイルを配置すると、自動的にルートとして認識されます。

例えば：

- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/blog/index.astro` → `/blog`
- `src/pages/blog/[slug].astro` → `/blog/:slug`（動的ルート）

## コンポーネントの作成

Astroコンポーネントは、HTMLに似た構文を使用します：

```astro
---
// フロントマター - JavaScriptコード
const title = "私のAstroサイト";
---

<!-- HTMLテンプレート -->
<h1>{title}</h1>
<slot /> <!-- 子コンポーネントが挿入される場所 -->

<style>
  /* スコープ付きCSS */
  h1 {
    color: blue;
  }
</style>
```

## パフォーマンス最適化のヒント

Astroで構築するWebサイトをさらに高速化するためのヒントをいくつか紹介します：

### 1. 画像の最適化

Astro Image統合を使用して、画像を最適化しましょう：

```bash
npm install @astrojs/image
```

そして、`astro.config.mjs`に追加します：

```js
import image from '@astrojs/image';

export default {
  integrations: [image()],
};
```

### 2. 必要な部分だけJavaScriptを使用する

Reactなどのフレームワークコンポーネントを使用する場合は、必要な部分だけクライアントでハイドレーションするよう指定できます：

```astro
<ReactComponent client:load /> <!-- ページロード時にすぐハイドレーション -->
<ReactComponent client:idle /> <!-- ブラウザのアイドル時にハイドレーション -->
<ReactComponent client:visible /> <!-- 要素が表示されたときにハイドレーション -->
```

### 3. コンテンツのプリロード

ユーザーが訪問する可能性が高いページへのリンクをプリロードします：

```astro
<head>
  <link rel="preload" href="/fonts/custom-font.woff2" as="font" type="font/woff2" crossorigin>
</head>
```

## まとめ

Astroは、高速でSEOに優れたWebサイトを構築するための優れたフレームワークです。「アイランドアーキテクチャ」を活用することで、必要最小限のJavaScriptでWebサイトを構築でき、優れたユーザー体験を提供できます。

詳細については、[Astro公式ドキュメント](https://docs.astro.build/ja/getting-started/)を参照してください。
