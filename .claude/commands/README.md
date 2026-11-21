---
description: .claude/commands の説明書（コマンドではない）
disable-model-invocation: true
---

# .claude/commands — スラッシュコマンドリファレンス

このディレクトリには 29 本のスラッシュコマンドが含まれる。
`/<ファイル名>` で呼び出すと、本文がそのままプロンプトとして Claude に渡される。

> この README も `.md` なので `/README` として読み込まれる。上の frontmatter の `disable-model-invocation: true` で、Claude が自分から呼ばないようにしている。

---

## アーキテクチャ

### 読み込みと呼び出し

```text
セッション開始
  └─► .claude/commands/*.md を読み込む
        └─► ファイル名 = コマンド名、description が一覧に並ぶ（常駐コンテキスト）

/<name> [引数]
  └─► 本文をプロンプトとして展開（$ARGUMENTS に引数）
        ├─► 手順の中で Agent ツールでサブエージェントに委譲する
        ├─► Skill ツールで skill を読み込む
        └─► .claude/scripts/ の Node スクリプトを実行する
```

### frontmatter

| フィールド | 役割 |
|---|---|
| `description` | `/` メニューと Claude の一覧に出る説明。似たコマンドとの使い分けもここに書く |
| `argument-hint` | 引数の書き方のヒント（例: `[pr-number \| pr-url \| blank for local review]`） |
| `model` | このコマンドだけモデルを変える（`astra-review` は `opus`） |

### コマンドと skill の関係

skill（`.claude/skills/`）も `/<name>` で呼べる。手順が長いもの・ファイルを伴うものは skill にし、コマンドは入口だけにすることがある（例: `/verify` → `verification-loop` skill、`/santa-loop` → `santa-method` skill、`/orch-review` → `workflows/orch-review.workflow.js`）。

---

## コマンド一覧

### 計画（PRD → 計画）

| コマンド | 引数 | 内容 | 出力 |
|---|---|---|---|
| `/plan-prd` | `[アイデア]` | 問題から始める軽い PRD を作り `/plan` に渡す | `.claude/prds/` |
| `/plan` | `[説明 \| *.prd.md]` | 要件の言い直し・リスク・手順を出し、**ユーザーの確認を待つ**。`planner` エージェント | `.claude/plans/` |
| `/feature-dev` | — | コードベースを理解してから設計・実装・レビューまで進める | — |

### PRP シリーズ（PRD → 計画 → 実装 → commit → PR）

```text
/prp-prd ──► /prp-plan ──► /prp-implement ──► /prp-commit ──► /prp-pr
  PRPs/prds/    PRPs/plans/    PRPs/reports/                  （= /pr）
                               plans/completed/ に移動
```

| コマンド | 引数 | 内容 |
|---|---|---|
| `/prp-prd` | `[アイデア]` | 質問を往復しながら仮説ベースの PRD を作る → `.claude/PRPs/prds/` |
| `/prp-plan` | `<説明 \| prd.md>` | コードベースを調べてパターンを抜き出した詳細な実装計画 → `.claude/PRPs/plans/` |
| `/prp-implement` | `<plan.md>` | 計画を検証ループ付きで実行。報告は `.claude/PRPs/reports/`、計画は `plans/completed/` へ |
| `/prp-commit` | `[対象の説明]` | 「〜の変更だけ」のように自然な言葉で対象を選んで commit |
| `/prp-pr` | `[base]` | `/pr` の別名（PRP の流れの中で使う） |

### 実装・修正

| コマンド | 内容 | 使うもの |
|---|---|---|
| `/build-fix` | ビルドシステムを判別し、ビルド・型エラーを少しずつ直す | — |
| `/react-build` | React のビルド失敗を直す | `react-build-resolver` |
| `/react-test` | React Testing Library で先にテストを書く TDD | `tdd-guide`・`react-testing` skill |
| `/refactor-clean` | 使われていないコードを 1 つずつ確かめながら消す | — |
| `/gan-build` | 生成と評価を繰り返すビルドループ（回数と合格点を指定） | `gan-planner`・`gan-generator`・`gan-evaluator` |

### レビュー

| コマンド | 引数 | 内容 |
|---|---|---|
| `/code-review` | `[PR 番号 \| URL \| 空]` | チェックリストで 1 ステップずつ見る。空ならローカルの未 commit の変更 |
| `/review-pr` | — | 専門エージェント 6 本で多角的に見る（`agents/README.md` 参照） |
| `/orch-review` | `[PR 番号 \| URL \| 空]` | ネイティブ Workflow で並列に見て、反証で確かめ、重複を除き、blocking と advisory に分ける |
| `/react-review` | — | React 専用。`react-reviewer`（＋ TSX なら `typescript-reviewer`） |
| `/santa-loop` | — | 独立した 2 つのレビュアーが両方合格するまで直す |
| `/astra-review` | `[--base \| --commit \| --files ...]` | Codex CLI 経由で別の会社のモデルにレビューさせて直す（`.claude/scripts/astra-review.js`） |

使い分け: 手早く順番に → `/code-review`、多角的に → `/review-pr`、確実に（反証つき）→ `/orch-review`、別のモデルの目 → `/astra-review`。

### 検証・Git

| コマンド | 内容 |
|---|---|
| `/verify` | `verification-loop` skill の入口（ビルド・型・lint・テスト・セキュリティ・差分） |
| `/checkpoint` | 検証してチェックポイントを作る・確かめる・一覧する（`.claude/checkpoints.log`） |
| `/pr` | 未 push の commit から PR を作る（テンプレートを探し、変更を分析して push） |

### セッション

| コマンド | 内容 |
|---|---|
| `/save-session` | 今のセッションの状態を `~/.claude/vivastack-cc-workflows/sessions/` に保存 |
| `/resume-session` | 最新（または指定）のセッションファイルを読み込んで続きから再開 |
| `/sessions` | セッション履歴・別名・メタデータの管理（`list`・`load`・`alias`・`info`） |

### 自律ループ

| コマンド | 内容 |
|---|---|
| `/loop-start` | 安全な既定値と停止条件つきでループ（sequential・continuous-pr・rfc-dag・infinite）を準備し、起動・監視コマンドを表示 |
| `/loop-status` | 動いているループの進み具合・失敗の兆候・介入の提案 |

### ドキュメント

| コマンド | 内容 |
|---|---|
| `/update-codemaps` | プロジェクト構造を調べ、トークンの少ないアーキテクチャのコードマップを作る |
| `/update-docs` | スクリプト・スキーマ・ルート・export などの元情報からドキュメントを同期 |

---

## ポイント

- **ファイルを置くとすべてコマンドになる。** メモや下書きをこのディレクトリに置かない（`.claude/docs/` へ）
- **`description` は毎セッション読み込まれる。** 似たコマンド（レビュー系・PR 系）は、使い分けを `description` に書いておくと Claude が正しく選べる
- 成果物の置き場所は流れごとに違う: `/plan-prd`・`/plan` は `.claude/prds/`・`.claude/plans/`、PRP シリーズは `.claude/PRPs/` の下
- `/plan` は計画を出したら止まる。確認してから実装を指示する

---

## 追加・変更するとき

1. `<name>.md` を作り、frontmatter に `description`（と必要なら `argument-hint`）を書く
2. 同じ名前の skill があると紛らわしいので避ける
3. エージェント・skill・スクリプトを参照するなら、それが存在することを確かめる（参照切れは `docs/ecc/check-report.md` で洗い出した）
4. ECC からコピーしたものは、`docs/ecc/check-report.md` に記録する
