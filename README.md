# BNI だんじりチャプター公式サイト

本リポジトリは https://bni-danjiri.jp/ の公開向け静的フロントエンドを管理します。

## 2026-11-04 同期
- 公開サイトから HTML / CSS / JavaScript と公開ページが参照する画像を取り込み
- HTML: index.html / members.html / activity.html / visitor.html / contact.html / about-bni.html / concierge.html / contactcircle.html / timer.html / lp/index.html
- CSS: css/styles.css
- JS: js/main.js
- 画像は GitHub と既存画像の差分を照合
- 容量の大きい公開画像3点は import-live-assets.yml により XServer の実物を SHA-256 で検証しながら取得する構成

## 編集ルール
1. 編集者は新しい作業ブランチを作成
2. HTML・CSS・JavaScript・画像の変更をコミット
3. Pull Request を送って確認依頼
4. 内容を確認してから main にマージ

## 本番環境について
現時点で GitHub から XServer への自動デプロイは未設定です。GitHub で変更しても自動的に公開サイトは更新されません。
自動デプロイには XServer の適切なデプロイ用 SSH 鍵・GitHub Actions Secrets と公開対象の厳格な限定が必要です。
公開サイト側の app / member 等のサーバー実行コード、認証情報、ログ、個人情報、サーバー固有の設定やバックアップは、このフロントエンド同期には含めません。フルバックアップ・完全な Git 管理には別途管理されたアクセスが必要です。
