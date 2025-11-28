# 🔥 コンフリクトゾーン・アルファ版 🔥

> 複雑なマージコンフリクトを学習するための教育プラットフォーム

## ⚠️ 重要な注意事項

**このブランチは意図的に複雑なコンフリクトを発生させるために大幅に変更されています。**

マージを行う際は、以下のファイルで複雑なコンフリクトが発生する可能性があります：
- `index.html` - 完全な構造変更
- `css/style.css` - CSSアーキテクチャの再設計
- `js/app.js` - JavaScriptの完全リファクタリング
- `practice.html` - UIの大幅な拡張
- `about.html` - コンテンツの全面改訂

## 📋 プロジェクト概要

コンフリクトゾーン・アルファ版は、Git のマージコンフリクト解決スキルを向上させることを目的とした教育プラットフォームです。

### 🎯 主な機能

| 機能 | 説明 | ステータス |
|------|------|-----------|
| 🏠 ルーム管理 | ルームの作成・参加・管理 | ✅ 実装済み |
| 📚 トレーニング | 複数の難易度でコンフリクト解決練習 | ✅ 実装済み |
| 💬 チャット | リアルタイムコミュニケーション | ⚠️ ローカルのみ |
| 🏆 実績システム | 学習進捗の可視化 | 🚧 開発中 |
| 📊 統計 | パフォーマンス分析 | 🚧 開発中 |

### 🛠️ 技術スタック

- **フロントエンド**: HTML5, CSS3 (カスタムプロパティ), JavaScript (ES2020+)
- **スタイリング**: BEM命名規則, CSS Grid & Flexbox
- **バージョン管理**: Git

## 🚀 クイックスタート

```bash
# リポジトリをクローン
git clone https://github.com/makimaki04192424-oss/sample20251128.git

# ディレクトリに移動
cd sample20251128

# ブラウザで開く
open index.html
# または
python -m http.server 8000
```

## 📁 ディレクトリ構造

```
sample20251128/
├── index.html          # メインページ（アルファ版）
├── practice.html       # トレーニングルーム
├── about.html          # プロジェクト情報
├── css/
│   └── style.css       # メインスタイルシート（アルファ版）
├── js/
│   └── app.js          # アプリケーションロジック（アルファ版）
└── README.md           # このファイル
```

## 🔧 設定オプション（アルファ版）

`js/app.js` 内の `CONFIG_ALPHA` オブジェクトで以下の設定が可能です：

```javascript
const CONFIG_ALPHA = {
  version: '3.0.0-alpha',
  maxRooms: 50,
  maxParticipantsDefault: 10,
  timerDuration: 120,
  enableAdvancedFeatures: true,
  debugMode: true
};
```

## 🎮 隠しコマンド

- **コナミコマンド**: ↑↑↓↓←→←→BA - シークレットゲーム起動
- **CONFLICT**: C-O-N-F-L-I-C-T - コンフリクトモード有効化
- **ALPHA**: A-L-P-H-A - イースターエッグ表示

## 🗺️ ロードマップ

- [x] フェーズ1: 基盤構築
- [x] フェーズ2: アルファ版リリース
- [ ] フェーズ3: WebSocket リアルタイム同期
- [ ] フェーズ4: ユーザー認証・クラウド保存

## 👥 コントリビューター

| 名前 | GitHub | 役割 |
|------|--------|------|
| IGO(いぐお) | [@IGO-kon](https://github.com/IGO-kon) | コアコントリビューター |
| Conflict Generator | Alpha Team | アルファ版開発 |

## 📄 ライセンス

このプロジェクトは教育目的で作成されています。

## 📬 お問い合わせ

- 🐛 [Issues](https://github.com/makimaki04192424-oss/sample20251128/issues)
- 📦 [Repository](https://github.com/makimaki04192424-oss/sample20251128)

---

<div align="center">
  <sub>Built with 🔥 by the Conflict Zone Alpha Team</sub>
</div>