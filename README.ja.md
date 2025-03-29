*他の言語で読む: [English](README.md)*

# Chrome拡張機能テンプレート 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Manifest: v3](https://img.shields.io/badge/Manifest-v3-blue.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

<p align="center">
  <img src="https://via.placeholder.com/150?text=CET" alt="Chrome Extension Template Logo" width="150">
</p>

> 最新のChrome拡張機能を簡単に開発するためのテンプレート

## 📋 目次

- [機能概要](#機能概要-)
- [ファイル構成](#ファイル構成-)
- [インストール方法](#インストール方法-)
- [使い方](#使い方-)
- [カスタマイズガイド](#カスタマイズガイド-)
- [開発ヒント](#開発ヒント-)
- [貢献方法](#貢献方法-)
- [技術仕様](#技術仕様-)
- [Todo](#todo-)

## 機能概要 💯

<p align="center">
  <img src="assets/icons/icon128.png" alt="Chrome Extension Icon" width="128">
</p>

<table align="center">
  <tr>
    <td align="center">🌙 ⟷ ☀️<br><b>ダークモード対応</b></td>
    <td align="center">🔄<br><b>自動保存機能</b></td>
    <td align="center">🌐<br><b>サイト別設定</b></td>
  </tr>
  <tr>
    <td align="center">📦<br><b>データ管理</b></td>
    <td align="center">📱<br><b>モダンUI</b></td>
    <td align="center">🔌<br><b>ManifestV3対応</b></td>
  </tr>
</table>

- **マニフェストV3対応**: 最新のChrome拡張機能APIに準拠した設計
- **モジュール分割設計**: 背景スクリプト、コンテンツスクリプト、ポップアップ、設定画面を適切に分離
- **ダークモード対応**: ユーザー体験を向上させるダークモード切り替え機能
- **データ管理**: データのインポート・エクスポート機能で設定の移行が容易
- **サイト別設定**: 特定のドメインごとに動作をカスタマイズ可能
- **自動保存機能**: ユーザー設定をリアルタイムで保存・同期

## ファイル構成 📁

```
chrome-extension/
│
├── manifest.json           # 拡張機能の設定ファイル
│
├── scripts/
│   └── background.js       # バックグラウンドスクリプト
│
├── content/
│   ├── content.js          # コンテンツスクリプト
│   └── content.css         # コンテンツスタイル
│
├── popup/
│   ├── popup.html          # ポップアップHTML
│   ├── popup.css           # ポップアップスタイル
│   └── popup.js            # ポップアップスクリプト
│
├── options/
│   ├── options.html        # 設定画面HTML
│   ├── options.css         # 設定画面スタイル
│   └── options.js          # 設定画面スクリプト
│
└── assets/
    └── icons/              # アイコンファイル
```

## システム構成図 🔄

<div align="center">

| コンポーネント | 役割 | 特徴 |
|:---:|:---:|:---:|
| 🔄 **Background Script** | 常駐プロセス | イベント監視・データ管理 |
| 📄 **Content Script** | Webページ操作 | DOM操作・ユーザーインタラクション |
| 🖥️ **Popup UI** | ユーザー設定 | 設定変更・表示制御 |
| 💾 **Chrome Storage** | データ保存 | 設定・状態の永続化 |

</div>

<div align="center">
  <b>⚙️ コンポーネント間の連携フロー ⚙️</b><br><br>
  <code>Background Script</code> ⟷ <code>Chrome Storage</code><br>
  ⬆️ ⬇️<br>
  <code>Content Script</code> ⟷ <code>Webページ</code><br>
  ⬆️ ⬇️<br>
  <code>Popup UI</code> ⟷ <code>ユーザー</code>
</div>

## インストール方法 🔧

### 必要条件

- Google Chrome ブラウザ (v88以上推奨)
- 開発者モード有効化

### 手順

1. **リポジトリをクローン**:
   ```bash
   git clone https://github.com/yourusername/chrome-extension-template.git
   cd chrome-extension-template
   ```

2. **Chromeで拡張機能を読み込む**:
   - Chromeで `chrome://extensions` を開く
   - 「デベロッパーモード」をオンにする
   - 「パッケージ化されていない拡張機能を読み込む」をクリック
   - クローンしたディレクトリを選択

<div align="center">
  <table>
    <tr>
      <td align="center">🔍</td>
      <td><code>chrome://extensions</code> にアクセス</td>
    </tr>
    <tr>
      <td align="center">🔧</td>
      <td>右上の「デベロッパーモード」をON</td>
    </tr>
    <tr>
      <td align="center">📦</td>
      <td>「パッケージ化されていない拡張機能を読み込む」をクリック</td>
    </tr>
    <tr>
      <td align="center">✅</td>
      <td>拡張機能が正常に読み込まれたことを確認</td>
    </tr>
  </table>
</div>

## 使い方 👆

### 基本機能

- **拡張機能の有効/無効**: ポップアップの切り替えボタンでオン/オフ
- **テーマ切り替え**: ライト/ダークモードを切り替え可能
- **機能設定**: 個別機能のオン/オフが可能

### 詳細設定

- **更新間隔**: データ更新の頻度を設定
- **動作モード**: パフォーマンスに応じた動作モードを選択
- **カスタムCSS**: 独自のスタイルを適用可能
- **サイト別設定**: 特定のドメインごとに拡張機能の動作をカスタマイズ

## カスタマイズガイド 🛠️

### マニフェスト編集

`manifest.json` を編集して、拡張機能の基本情報を設定：

```json
{
  "name": "あなたの拡張機能名",
  "description": "拡張機能の説明",
  "version": "バージョン番号"
}
```

### パーミッション設定

必要なパーミッションのみ追加して、ユーザーのプライバシーを尊重：

```json
"permissions": [
  "storage",  // 基本的なデータ保存用
  // 他に必要なパーミッションがあれば追加
]
```

### アイコンの追加

`assets/icons/` ディレクトリに以下のサイズのアイコンを追加：
- icon16.png (16x16 px)
- icon48.png (48x48 px)
- icon128.png (128x128 px)

## こだわりポイント ✨

- **シンプルな設計**: 初心者でも理解しやすい構造設計
- **最小限のパーミッション**: ユーザーのプライバシーを尊重
- **モダンなUI**: 直感的に操作できるインターフェース
- **高速な動作**: パフォーマンスを最適化

## 開発ヒント 💡

1. **コンソールログ**: `background.js` と `content.js` のログは開発者ツールで確認できます。
2. **ホットリロード**: 拡張機能ページの更新ボタンで変更を反映できます。
3. **デバッグ**: バックグラウンドページのインスペクトでデバッグができます。
4. **ストレージ**: `chrome.storage.local` を使って設定を保存します。

## 貢献方法 🤝

1. リポジトリをフォーク 🍴
2. 新機能を追加・改善 ✨
3. プルリクエストを送信 🚀

貢献ガイドライン:
- コードスタイルを守る 📏
- コミットメッセージは明確に書く 📝
- 変更内容を詳細に説明する 🔍

## 技術仕様 💻

- **マニフェストバージョン**: Manifest V3
- **ES6+ 対応**: 最新のJavaScript機能を活用
- **モジュール型**: ServiceWorkerとしてのバックグラウンドスクリプト
- **ストレージAPI**: chrome.storage.localでデータ保存
- **メッセージパッシング**: コンポーネント間の通信にメッセージングを活用

## Todo 📝

- [ ] アイコンファイルの追加
- [ ] オンボーディングページの作成
- [ ] クロスブラウザ対応（Firefox向け調整）
- [ ] 単体テストの追加
- [ ] ビルド自動化スクリプトの設定

## ライセンス 📄

[MIT License](LICENSE)

---

<p align="center">
  © 2025 My Chrome Extension Template<br>
  <a href="https://github.com/e20c1">Made with ❤️ by E20C1</a>
</p>
