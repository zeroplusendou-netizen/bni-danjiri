# BNI だんじりチャプター 公式LP/HP

BNI だんじりチャプター（大阪東エリア・オンライン開催）の公式ランディングページ/ホームページです。

## 📋 プロジェクト概要

### 目的
- **ビジター見学者の獲得**: チャプターの魅力を伝え、見学申込を促進
- **メンバー間紹介の促進**: メンバーが活用できる紹介導線の構築
- **BNIブランドの価値発信**: Givers Gain®の理念と成果の可視化

### ターゲット
- ビジター見学希望者（潜在的な新規メンバー）
- 既存メンバー（紹介ツールとして活用）
- BNI活動に興味がある経営者・事業主

## 🎯 完成機能

### ✅ 実装済み機能
1. **トップページ（LP機能）**
   - ヒーローセクション（キャッチコピー + CTA）
   - BNI Japan / だんじりチャプター実績表示
   - だんじりチャプター紹介
   - 得られる5つの価値
   - オンライン参加の7つの価値
   - Givers Gain®ストーリー
   - カテゴリー別メンバー紹介（7カテゴリー・22名）
   - ビジター参加案内
   - FAQ（アコーディオン形式）
   - 最終CTA

2. **メンバー一覧ページ**
   - カテゴリー別フィルター機能
   - 22名のメンバーカード表示
   - 7カテゴリー（士業4名、金融3名、不動産2名、クリエイティブ3名、IT2名、美容健康3名、スポーツ1名）

3. **活動報告ページ**
   - 最新活動レポート（6件）
   - 成功事例（3件）
   - メンバーの声（3件）

4. **ビジター見学案内ページ**
   - 見学の流れ（4ステップ）
   - ビジター見学のメリット（4項目）
   - 参加に必要なもの
   - FAQ

5. **お問い合わせページ**
   - 見学申込フォーム
   - バリデーション機能付き
   - プライバシーポリシー記載

6. **共通機能**
   - レスポンシブデザイン（PC/タブレット/スマホ対応）
   - ハンバーガーメニュー（モバイル）
   - スムーススクロール
   - FAQアコーディオン
   - ページトップへ戻るボタン
   - スクロールアニメーション

## 📁 ファイル構成

```
/
├── index.html              # トップページ（LP機能）
├── members.html            # メンバー一覧ページ
├── activity.html           # 活動報告ページ
├── visitor.html            # ビジター見学案内ページ
├── contact.html            # お問い合わせページ
├── css/
│   └── styles.css         # 全体スタイルシート
├── js/
│   └── main.js            # JavaScript機能
└── README.md              # このファイル
```

## 🎨 デザイン仕様

### カラーパレット
- **Primary**: `#E31C24` (BNI Red)
- **Secondary**: `#1A1A1A` (Dark)
- **Accent**: `#F5A623` (Orange)
- **Text**: `#333333`
- **Background**: `#FFFFFF`
- **Light BG**: `#F8F9FA`

### タイポグラフィ
- **日本語**: Noto Sans JP (Google Fonts)
- **英語**: Roboto (Google Fonts)

### UI要素
- **ボタン角丸**: 8px
- **カード角丸**: 12px
- **基本余白**: 24px
- **コンテナ幅**: 最大1200px

## 🚀 デプロイ手順

### 1. エックスサーバーへのアップロード

1. エックスサーバーの「ファイルマネージャー」にログイン
2. ドメインのフォルダ → `public_html/` を開く
3. 以下のファイルをアップロード:
   - `index.html`
   - `members.html`
   - `activity.html`
   - `visitor.html`
   - `contact.html`
   - `css/` フォルダ（styles.css）
   - `js/` フォルダ（main.js）

### 2. 確認
ブラウザで `https://あなたのドメイン/` にアクセスして表示を確認

## 🔧 カスタマイズ方法

### メンバー情報の更新

#### 1. メンバー写真の追加
`members.html` の以下の部分を編集:

```html
<div class="member-image">
    <!-- 現在: ダミーアイコン -->
    <i class="fas fa-user-circle"></i>
    
    <!-- 変更後: 実際の画像 -->
    <img src="images/member-name.jpg" alt="メンバー名">
</div>
```

#### 2. メンバー情報の追加・変更
`members.html` のメンバーカードを編集:

```html
<div class="member-card" data-category="カテゴリー名">
    <div class="member-image">
        <img src="images/member.jpg" alt="メンバー名">
    </div>
    <div class="member-info">
        <h3 class="member-name">メンバー名</h3>
        <p class="member-company">会社名</p>
        <span class="member-category-tag">業種</span>
        <div class="member-pr">一言PR</div>
    </div>
</div>
```

### 活動報告の追加

`activity.html` に新しい活動報告を追加:

```html
<div class="activity-card">
    <div class="activity-image">
        <img src="images/activity.jpg" alt="活動写真">
    </div>
    <div class="activity-content">
        <span class="activity-date">2024年12月1日</span>
        <h3 class="activity-title">タイトル</h3>
        <p class="activity-description">説明文...</p>
        <div class="activity-tags">
            <span class="activity-tag">#タグ</span>
        </div>
    </div>
</div>
```

## 📊 SEO対策

### 実装済み
- ✅ メタタグ最適化（title, description, keywords）
- ✅ OGP（SNSシェア用）
- ✅ 構造化データ（Schema.org）
- ✅ セマンティックHTML
- ✅ レスポンシブデザイン
- ✅ 画像alt属性

### 推奨対策
- [ ] Google Analytics導入
- [ ] Google Search Console登録
- [ ] サイトマップ作成・送信
- [ ] ページ速度最適化（WebP画像使用など）
- [ ] SSL証明書導入（https化）

## 🔍 ターゲットキーワード

### メインキーワード
- BNI だんじり
- BNI 大阪
- 大阪 ビジネス交流会
- オンライン ビジネスネットワーキング

### ロングテールキーワード
- 大阪 オンライン ビジネス交流会
- BNI 見学 大阪
- ビジネスリファーラル 大阪
- Zoom ビジネス交流会

## 📈 期待される成果

### ビジター獲得
- **現状**: 月2〜3名
- **目標**: 月5〜8名（2.5倍増）

### 紹介創出
- **現状**: メンバー1人あたり月1〜2件
- **目標**: メンバー1人あたり月3〜5件（2倍増）
- **年間総紹介数目標**: 約800件

## 🛠️ 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: Flexbox, Grid, カスタムプロパティ
- **JavaScript (Vanilla)**: DOM操作、イベント処理
- **Google Fonts**: Noto Sans JP, Roboto
- **Font Awesome 6.4.0**: アイコン

## 📱 対応ブラウザ

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）
- モバイルブラウザ（iOS Safari, Chrome for Android）

## 🔒 セキュリティ

- フォーム送信時のバリデーション実装済み
- XSS対策（入力値のサニタイズ推奨）
- HTTPS化推奨

## 📝 今後の拡張案

### 優先度: 高
- [ ] Google Formsとの連携（お問い合わせフォーム）
- [ ] Google Analyticsによるアクセス解析
- [ ] メンバー写真の差し替え（全22名分）
- [ ] 活動報告の定期更新体制構築

### 優先度: 中
- [ ] 成功事例の詳細ページ作成
- [ ] メンバー個別ページ（22名分）
- [ ] ブログ機能追加
- [ ] SNSシェアボタン強化

### 優先度: 低
- [ ] 多言語対応（英語版）
- [ ] チャットボット導入
- [ ] 会員専用ページ

## 📞 サポート・お問い合わせ

サイトに関するご質問・修正依頼は、チャプター代表までお問い合わせください。

---

## 📄 ライセンス

© 2024 BNI だんじりチャプター. All Rights Reserved.

**注意**: BNI®およびGivers Gain®は、BNI Global, LLCの登録商標です。

---

## 🎉 制作完了日

**2024年12月1日**

制作: GenSpark AI Developer

---

**このサイトがだんじりチャプターのビジター獲得と、メンバー間の紹介促進に貢献することを願っています!** 🚀