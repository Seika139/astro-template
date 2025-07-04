# Astro の基本

このドキュメントでは、Astroの基本的な構造と、コンテンツの追加・更新方法について説明します。

## ディレクトリ構造

Astroプロジェクトの主要なディレクトリ構造は以下の通りです：

```text
/
├── public/          # 静的アセット（処理されずにそのまま公開されるファイル）
│   ├── favicon.svg
│   └── images/      # 画像ファイル
├── src/             # プロジェクトのソースコード
│   ├── components/  # 再利用可能なUI部品
│   ├── layouts/     # ページのレイアウト
│   ├── pages/       # ページとなるAstroファイル
│   │   └── posts/   # ブログ記事
│   └── styles/      # CSSファイル
└── astro.config.mjs # Astroの設定ファイル
```

### 主要ディレクトリの役割

- **`src/pages/`**: このディレクトリ内のファイルは自動的にWebサイトのページとしてルーティングされます。ファイル構造がそのままURLパスになります。例えば、`src/pages/about.astro`は`/about/`というURLになります。

- **`src/layouts/`**: 共通のページ構造を定義するレイアウトコンポーネントを格納します。ヘッダー、フッター、メタデータなど、複数のページで共有する要素を含みます。

- **`src/components/`**: 再利用可能なUI要素を格納します。ボタン、カード、ナビゲーションバーなどの部品をここに定義します。

- **`public/`**: このディレクトリ内のファイルはビルド時に処理されずにそのまま公開ディレクトリにコピーされます。フォント、画像、ファビコンなどの静的ファイルを格納します。

## コンテンツの追加・更新

### ブログ記事を追加する

1. `src/pages/posts/` ディレクトリに新しいMarkdownファイル（`.md`）またはMarkdown + JSX（`.mdx`）ファイルを作成します。

   ```md
   ---
   title: "新しい記事タイトル"
   pubDate: 2023-04-01
   description: "この記事についての短い説明"
   author: "あなたの名前"
   tags: ["astro", "web開発", "チュートリアル"]
   ---

   # ここから記事の内容を書きます

   これは新しいブログ記事の内容です。Markdown形式で記述できます。

   ## 見出し2

   - リスト項目1
   - リスト項目2
   ```

2. ファイル名がURLになります。例えば、`first-post.md`は`/posts/first-post/`というURLになります。

### 新しいページを追加する

1. `src/pages/` ディレクトリに新しい `.astro` ファイルを作成します。

   ```astro
   ---
   // フロントマター - インポートやJavaScriptコードをここに書きます
   import MainLayout from '../layouts/MainLayout.astro';
   const pageTitle = "新しいページ";
   ---

   <MainLayout title={pageTitle}>
     <h1>{pageTitle}</h1>
     <p>これは新しいページの内容です。</p>
   </MainLayout>
   ```

2. ファイル名がURLになります。例えば、`about.astro`は`/about/`というURLになります。

### コンポーネントを作成する

1. `src/components/` ディレクトリに新しい `.astro` ファイルを作成します。

   ```astro
   ---
   // フロントマター - プロパティの定義やJavaScriptコードをここに書きます
   const { title, url } = Astro.props;
   ---

   <div class="card">
     <h2>{title}</h2>
     <a href={url}>詳細を見る</a>
   </div>

   <style>
     .card {
       padding: 1rem;
       border: 1px solid #ccc;
       border-radius: 4px;
     }
   </style>
   ```

2. 他のAstroファイルからこのコンポーネントをインポートして使用します。

   ```astro
   ---
   import Card from '../components/Card.astro';
   ---

   <Card title="素晴らしい機能" url="/features" />
   ```

## Astroの詳細情報

より詳細な情報については、以下の公式リソースを参照してください：

- [Astro公式ドキュメント](https://docs.astro.build/ja/getting-started/)
- [Astroコンポーネントの書き方](https://docs.astro.build/ja/core-concepts/astro-components/)
- [Astroレイアウトの作成](https://docs.astro.build/ja/core-concepts/layouts/)
- [MarkdownとMDXのサポート](https://docs.astro.build/ja/guides/markdown-content/)

Astroは直感的なシンタックスと優れたパフォーマンスを提供するフレームワークです。必要に応じてReactやVueなどのUIフレームワークと組み合わせることも可能です。
