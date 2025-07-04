# テンプレートの使い方

このドキュメントでは、このAstroテンプレートに含まれる様々なテンプレートとその使用方法について説明します。

## 含まれているテンプレート

このプロジェクトには以下の3つのテンプレートが含まれています：

1. **ブログテンプレート**: ブログ記事を公開・管理するための基本構造
2. **ポートフォリオテンプレート**: プロジェクトやスキルを紹介するためのページ
3. **ランディングページテンプレート**: 製品・サービス紹介のための高変換率ページ
4. **React & TailwindCSS デモ**: インタラクティブなUIの実装例

## テンプレートの使用方法

### ブログテンプレート

ブログテンプレートは `/blog` で利用可能です。ブログ記事は `src/content/blog/` ディレクトリ内にMarkdownファイルとして作成します。

#### ブログ記事の追加手順

1. `src/content/blog/` ディレクトリに新しいMarkdownファイル（`.md`）を作成します。
2. 以下のようなフロントマターを記事の先頭に追加します：

```markdown
---
title: '記事のタイトル'
description: '記事の短い説明'
pubDate: '2025-07-04T00:00:00Z'
author: '著者名'
tags: ['タグ1', 'タグ2']
image: '/images/記事の画像.jpg'  # オプション
---

ここから記事の本文を書きます...
```

### ポートフォリオテンプレート

ポートフォリオテンプレートは `/portfolio` で利用可能です。自分のプロジェクトを紹介するためのページです。

#### カスタマイズ方法

`src/pages/portfolio.astro` ファイルを編集し、`projects` 配列を更新してあなた自身のプロジェクトを追加します：

```astro
const projects = [
  {
    title: 'プロジェクト名',
    description: 'プロジェクトの説明',
    imageUrl: '/images/project-image.jpg',
    projectUrl: 'https://project-demo.com',  // オプション
    githubUrl: 'https://github.com/username/project',  // オプション
    tags: ['使用技術1', '使用技術2']
  },
  // 他のプロジェクトを追加...
];
```

### ランディングページテンプレート

ランディングページテンプレートは `/landing` で利用可能です。製品やサービスを紹介し、コンバージョンを促進するためのページです。

#### カスタマイズ方法

`src/pages/landing.astro` ファイルを編集して、以下のセクションを更新します：

1. **Hero セクション**: メインビジュアルとキャッチフレーズ
2. **Features セクション**: 製品・サービスの特徴
3. **Call to Action セクション**: ユーザーアクション促進

```astro
<Hero
  title="あなたのキャッチコピー"
  subtitle="サービスの簡潔な説明"
  ctaText="行動を促すボタンテキスト"
  ctaUrl="#target-section"
  backgroundImage="/images/your-background.jpg"
/>
```

### React & TailwindCSS の活用

このテンプレートでは、React コンポーネントと TailwindCSS を使用してインタラクティブなUI要素を簡単に実装できます。

#### Reactコンポーネントの追加

1. 必要なパッケージをインストール（既にテンプレートには含まれています）:
   ```bash
   pnpm add @astrojs/react react react-dom
   ```

2. `src/components/react/` ディレクトリに新しいReactコンポーネントを作成します。

3. Astroファイル内でReactコンポーネントを使用する例:
   ```astro
   ---
   import MyReactComponent from '../components/react/MyReactComponent';
   ---

   <MyReactComponent client:load />
   ```

#### TailwindCSSの使用

このテンプレートにはTailwindCSSが設定済みです。クラス名を使用してスタイリングできます：

```html
<div class="p-4 bg-blue-100 rounded-lg shadow hover:shadow-lg transition-shadow">
  <h2 class="text-xl font-bold text-blue-800">TailwindCSSでスタイル</h2>
  <p class="mt-2 text-gray-600">TailwindCSSを使用すると、HTMLクラスだけでスタイリングができます。</p>
</div>
```

## テンプレートの組み合わせ

これらのテンプレートは互いに排他的ではありません。異なるテンプレートの要素を組み合わせて、より充実したWebサイトを構築できます。例えば：

- ブログテンプレートをベースにして、ポートフォリオセクションを追加
- ランディングページにReactコンポーネントを組み込んでインタラクティブ性を向上
- どのテンプレートでもTailwindCSSを活用してカスタムデザインを実現

## テンプレートのカスタマイズ

各テンプレートはAstroの柔軟性を活かして自由にカスタマイズできます。コンポーネントの修正、新機能の追加、デザインの変更など、プロジェクトに合わせて調整してください。

詳細は [Astro公式ドキュメント](https://docs.astro.build) を参照してください。
