# .claude/skills — スキルリファレンス

このディレクトリには 75 本の skill が含まれる。そのうち 29 本は `.claude/settings.json` の `skillOverrides` で `"off"` にしてあり、有効なのは 46 本。
skill は「必要になったときだけ読み込む手順書」。ふだんは名前と description だけがコンテキストにあり、使うときに本文が読み込まれる。

---

## アーキテクチャ

### 読み込みと呼び出し

```text
セッション開始
  └─► .claude/skills/<name>/SKILL.md を読み込む
        ├─► skillOverrides で "off" → 読み込まない
        └─► name + description だけを skill 一覧に載せる（常駐コンテキスト）

呼び出し
  ├─► Claude が description を見て、Skill ツールで自分から読み込む
  ├─► ユーザーが /<name> で呼ぶ
  └─► コマンドや別の skill の手順から（/verify → verification-loop など）
        └─► SKILL.md の本文を読み込む
              └─► 必要なら同じディレクトリの references/・scripts/ などを読む・実行する
```

### ディレクトリ構成

```text
skills/<name>/
  ├─ SKILL.md        # frontmatter（name・description・metadata）＋ 本文
  ├─ references/     # 本文から参照する長い資料（必要なときだけ読む）
  └─ scripts/        # skill が実行するスクリプト
```

### frontmatter

| フィールド | 役割 |
|---|---|
| `name` | skill の名前。ディレクトリ名と同じにする |
| `description` | 何をするか ＋ いつ使うか（「Use when ...」）。Claude はこれだけで使うかどうかを決める |
| `metadata.origin` | 出どころ。ほとんどが `ECC`。`community` などもある |
| `argument-hint` | `/<name>` で呼ぶときの引数のヒント（`tdd-workflow` など） |

### 有効・無効

| 場所 | 用途 |
|---|---|
| `.claude/settings.json` の `skillOverrides` | チーム共通で無効にする（git に入る）。この repo の技術スタックと関係のないもの |
| `.claude/settings.local.json` の `skillOverrides` | 自分だけ無効にする（git に入らない） |

使わない skill は消さずに `"off"` にする。この repo は雛形なので、ほかのプロジェクトでは使うことがある。

---

## skill 一覧

「状態」が `off` のものは `.claude/settings.json` で無効にしてある。

### orch-* ファミリー（ゲート付きの開発パイプライン）

```text
orch-add-feature ─┐
orch-change-feature ─┤
orch-fix-defect ─────┼─► orch-pipeline（共通エンジン）
orch-refine-code ────┤     Research → Plan →【GATE 1: 計画の承認】→ TDD → Review →【GATE 2: commit の確認】→ Commit
orch-build-mvp ──────┘     規模の分類・エージェントの割り当て・セキュリティレビューの条件
```

| skill | 状態 | いつ使うか |
|---|---|---|
| `orch-pipeline` | | 直接は使わない。orch-* が共通で使う。新しい操作を足すとき・フェーズを調整するときに読む |
| `orch-add-feature` | | まだない機能を作る |
| `orch-change-feature` | | 動いている機能の振る舞いを変える（テストを新しい仕様に合わせる） |
| `orch-fix-defect` | | バグを直す（まず失敗する回帰テストで再現する） |
| `orch-refine-code` | | 振る舞いを変えずに構造を直す |
| `orch-build-mvp` | | 設計書・仕様書から MVP を作る（縦の薄い単位で、生成と評価のループ） |

### 開発の流れ・品質

| skill | 状態 | いつ使うか |
|---|---|---|
| `tdd-workflow` | | テストを先に書く → 失敗を確かめる → 最小の実装 → リファクタリング |
| `verification-loop` | | 作業の検証（ビルド・型・lint・テストとカバレッジ・セキュリティ・差分）→ PASS / FAIL。`/verify` の本体 |
| `coding-standards` | | 言語を問わない命名・読みやすさ・不変性 |
| `git-workflow` | | ブランチ戦略・commit の書き方・merge か rebase か・衝突の解決 |
| `github-ops` | | `gh` で Issue・PR・CI・リリースを操作する |
| `project-flow-ops` | | GitHub と Linear にまたがる Issue・PR の整理 |
| `santa-method` | | 独立した 2 つのレビュアーが両方合格するまで直す。`/santa-loop` の本体 |
| `safety-guard` | | 破壊的な操作の前に確認する・書き込みを 1 つのディレクトリに限る（フックではなく Claude 自身が守る） |
| `security-review` | | 認証・入力・秘密情報・API・決済を扱うときのチェックリスト |
| `security-scan` | | `.claude/` の設定（CLAUDE.md・settings・MCP・フック・エージェント）の脆弱性を AgentShield で調べる |
| `production-audit` | | 本番に出す前・merge の後に「本番で何が壊れるか」をローカルの情報だけで調べる |
| `codebase-onboarding` | | 初めてのコードベースを調べて案内と最初の CLAUDE.md を作る |
| `workspace-surface-audit` | | repo・MCP・プラグイン・フックを調べ、役に立つ skill・フック・エージェントを提案する |

### プロダクト・計画

| skill | 状態 | いつ使うか |
|---|---|---|
| `product-capability` | | PRD や要望を、制約・不変条件・インターフェース・未決事項を明らかにした実装計画にする |
| `product-lens` | | 作る前に「なぜ作るか」を確かめる（PRODUCT-BRIEF.md・優先順位づけ） |

### フロントエンド

| skill | 状態 | いつ使うか |
|---|---|---|
| `frontend-patterns` | | React・Next.js のコンポーネント・状態・描画性能 |
| `frontend-design-direction` | | 製品に合ったデザインの方向性を決める（`scripts/` あり） |
| `design-system` | | コードからデザインシステムを作る・見た目の一貫性を監査する |
| `accessibility` | | WCAG 2.2 AA（Web・iOS・Android） |
| `react-patterns` | | React 18/19 の hooks・Server/Client 境界・Suspense |
| `react-performance` | | React・Next.js の性能（Vercel のベストプラクティス） |
| `react-testing` | | React Testing Library・Vitest/Jest・MSW |
| `motion-foundations` | | アニメーションの土台（トークン・spring・アクセシビリティ・SSR）。motion-* はこれに依存 |
| `motion-patterns` | | ボタン・モーダル・トースト・ページ遷移などのアニメーション |
| `motion-advanced` | | ドラッグ・ジェスチャー・テキスト・SVG・`useAnimate` |
| `nextjs-turbopack` | | Next.js 16+ と Turbopack |
| `vite-patterns` | | Vite の設定・プラグイン・HMR・SSR |
| `e2e-testing` | | Playwright の E2E・Page Object・不安定なテスト |
| `browser-qa` | | デプロイ後の UI 確認（コンソール・Web Vitals・操作・見た目・axe）→ SHIP / DO-NOT-SHIP |
| `ui-demo` | | Playwright で UI のデモ動画を録る |
| `angular-developer` | off | Angular |
| `frontend-slides` | off | アニメーション付きの HTML スライド |
| `dashboard-builder` | off | Grafana・SigNoz などの監視ダッシュボード |

### TypeScript・バックエンド

| skill | 状態 | いつ使うか |
|---|---|---|
| `typescript-patterns` | | strict な設定・型設計・絞り込み・非同期とエラー処理 |
| `backend-patterns` | | Node.js・Express・Next.js の API ルートとデータアクセス |
| `api-design` | | REST の命名・ステータスコード・ページング・バージョン |
| `api-connector-builder` | | 既存の連携と同じ形で新しい API 連携を足す |
| `nestjs-patterns` | | NestJS のモジュール・DTO 検証・ガード |
| `prisma-patterns` | | Prisma のスキーマ・クエリ・トランザクション・落とし穴 |
| `bun-runtime` | | Bun（ランタイム・パッケージ管理・テスト） |

### インフラ・運用

| skill | 状態 | いつ使うか |
|---|---|---|
| `deployment-patterns` | | CI/CD・コンテナ・ヘルスチェック・ロールバック |
| `docker-patterns` | | Dockerfile・Compose・コンテナのセキュリティ |
| `canary-watch` | | デプロイ後の URL の監視（HTTP・SSE・静的ファイル・性能） |

### Java（すべて off）

| skill | 状態 | いつ使うか |
|---|---|---|
| `java-coding-standards` | off | Spring Boot・Quarkus 共通のコーディング規約 |
| `jpa-patterns` | off | JPA / Hibernate |
| `springboot-patterns`・`springboot-security`・`springboot-tdd`・`springboot-verification` | off | Spring Boot の設計・セキュリティ・TDD・検証 |
| `quarkus-patterns`・`quarkus-security`・`quarkus-tdd` | off | Quarkus の設計・セキュリティ・TDD |

Java のレビューは `java-reviewer` エージェントと `rules/java/` が有効なので、そちらを使う。

### Python・Rust（すべて off）

| skill | 状態 | いつ使うか |
|---|---|---|
| `python-patterns`・`python-testing` | off | Python の書き方・pytest |
| `rust-patterns`・`rust-testing` | off | Rust の書き方・テスト |

### コンテンツ・メディア（すべて off）

| skill | 状態 | いつ使うか |
|---|---|---|
| `article-writing`・`brand-voice` | off | 長文の記事・文体プロファイル |
| `content-engine`・`connections-optimizer`・`x-api` | off | SNS 向けコンテンツ・X / LinkedIn・X API |
| `fal-ai-media` | off | fal.ai での画像・動画・音声の生成 |
| `remotion-video-creation`・`video-editing` | off | React での動画作成・動画編集 |
| `taste`・`taste-distillation`・`taste-application`・`tasteforge-video` | off | 映像のスタイルの抽出と適用 |

### その他（off）

| skill | 状態 | いつ使うか |
|---|---|---|
| `production-scheduling` | off | 製造の生産計画・工程の順序づけ |

---

## コマンド・エージェントとの関係

| skill | 入口のコマンド | 使うエージェント |
|---|---|---|
| `verification-loop` | `/verify` | — |
| `santa-method` | `/santa-loop` | `code-reviewer` |
| `orch-pipeline`・orch-* | `/orch-review`（レビューだけ） | `code-explorer`・`planner`・`tdd-guide`・`code-reviewer`・`security-reviewer` ほか |
| `orch-build-mvp` | — | `gan-planner`・`gan-generator`・`gan-evaluator`（`/gan-build` 経由） |
| `react-testing`・`tdd-workflow` | `/react-test` | `tdd-guide`・`react-reviewer` |

---

## ポイント

- **description は毎セッション読み込まれる。** 有効な 46 本で約 14,500 文字（推定 3.6k トークン）。一覧には上限（コンテキストの約 1%）があり、超えると description が切り詰められて skill を選び間違えやすくなる。使わない skill は `"off"` にする
- **description が呼び出しを決める。** 「何をするか」だけでなく「Use when ...」で使う場面を書く。似た skill（`frontend-patterns` と `react-patterns` など）は違いが分かるようにする
- 本文は呼ばれるまで読み込まれないので、長い説明は本文や `references/` に置いてよい
- `rules/` と近い内容の skill がある（`rules/common/coding-style.md` と `coding-standards`、`rules/common/security.md` と `security-review` など）。片方を変えたら、もう片方も確かめる

---

## 追加・変更するとき

1. `<name>/SKILL.md` を作り、frontmatter に `name`（ディレクトリ名と同じ）と `description` を書く
2. ECC からコピーしたものは `metadata.origin: ECC` を残し、`docs/ecc/check-report.md` に記録する
3. 参照するエージェント・コマンド・スクリプトが存在することを確かめる
4. この repo で使わないなら `.claude/settings.json` の `skillOverrides` で `"off"` にし、この一覧の「状態」も更新する
