# .claude/agents — サブエージェントリファレンス

このディレクトリには 24 本のサブエージェント定義が含まれる。
メインの Claude が `Agent` ツール（`subagent_type: "<name>"`）で呼び出し、独立したコンテキストで作業させて結果だけを受け取る。

---

## アーキテクチャ

### 読み込みと呼び出し

```text
セッション開始
  └─► .claude/agents/*.md を読み込む
        ├─► frontmatter に name と description がある → エージェントとして登録
        ├─► name がない（この README など）→ ドキュメントとして無視
        └─► description が Agent ツールの説明に並ぶ（常駐コンテキスト）

呼び出し
  ├─► コマンド・skill の手順から（/review-pr、orch-* など）
  ├─► rules/common/agents.md の「Immediate Agent Usage」に従って自動で
  └─► ユーザーが名前を指定して
        └─► 本文がシステムプロンプトになり、tools に書いたツールだけで作業する
```

### frontmatter

| フィールド | 役割 |
|---|---|
| `name` | `subagent_type` に渡す名前。ファイル名と同じにする |
| `description` | いつ使うか。メインの Claude はこれを見て委譲先を選ぶ |
| `tools` | 使えるツール。読むだけのレビュー系は `Read, Grep, Glob`（＋ `Bash`）に絞っている |
| `model` | `opus`（設計・計画）・`sonnet`（大半）・`haiku`（軽い分析） |

### 呼び名

ECC プラグインは入れていないので、`ecc:<name>` のようなプラグイン付きの名前は解決しない。必ず素の名前で呼ぶ（`rules/common/agents.md`）。

---

## エージェント一覧

### 計画・設計

| エージェント | model | tools | 用途 |
|---|---|---|---|
| `planner` | opus | 読み取りのみ | 複雑な機能・リファクタリングの実装計画。orch-* の Plan フェーズの主担当 |
| `architect` | opus | 読み取りのみ | システム設計・スケーラビリティ・技術判断 |
| `code-architect` | sonnet | 読み取り + Bash | 既存のパターンに合わせた機能設計図（ファイル・インターフェース・データフロー・作る順番） |
| `code-explorer` | sonnet | 読み取りのみ | 既存機能の実行経路・層・依存を追う。変更や修正の前の調査 |

### 実装・修正

| エージェント | model | tools | 用途 |
|---|---|---|---|
| `tdd-guide` | sonnet | 編集 + Bash | テストを先に書く TDD。カバレッジ 80% 以上 |
| `build-error-resolver` | sonnet | 編集 + Bash | ビルド・型エラーを最小の差分で直す。設計は変えない |
| `react-build-resolver` | sonnet | 編集 + Bash | React のビルド失敗（Vite・webpack・Next.js・CRA・Parcel・esbuild・Bun） |
| `refactor-cleaner` | sonnet | 編集 + Bash | 使われていないコードの削除（knip・depcheck・ts-prune） |
| `code-simplifier` | sonnet | 編集 + Bash | 動作を変えずに読みやすくする。最近の変更が対象 |
| `e2e-runner` | sonnet | 編集 + Bash | E2E テストの作成・実行（Vercel Agent Browser、なければ Playwright） |

### レビュー

| エージェント | model | tools | 用途 |
|---|---|---|---|
| `code-reviewer` | sonnet | 読み取り + Bash | 品質・セキュリティ・保守性の総合レビュー。コードを書いた直後に使う |
| `security-reviewer` | sonnet | 読み取り + Bash | 秘密情報・SSRF・インジェクション・OWASP Top 10 |
| `typescript-reviewer` | sonnet | 読み取り + Bash | TypeScript / JavaScript |
| `react-reviewer` | sonnet | 読み取り + Bash | hooks・描画性能・Server/Client 境界・アクセシビリティ |
| `python-reviewer` | sonnet | 読み取り + Bash | Python（PEP 8・型ヒント） |
| `rust-reviewer` | sonnet | 読み取り + Bash | Rust（所有権・ライフタイム・unsafe） |
| `java-reviewer` | sonnet | 読み取り + Bash | Java（Spring Boot・Quarkus を自動判別） |

### PR レビューの専門エージェント（`/review-pr` が並列で使う）

| エージェント | model | tools | 用途 |
|---|---|---|---|
| `comment-analyzer` | haiku | 読み取りのみ | コメントの正確さ・古くなっていないか |
| `pr-test-analyzer` | sonnet | 読み取り + Bash | テストが振る舞いを押さえているか |
| `silent-failure-hunter` | sonnet | 読み取り + Bash | 握りつぶしたエラー・誤ったフォールバック |
| `type-design-analyzer` | sonnet | 読み取りのみ | 型のカプセル化・不変条件の表現 |

### GAN ハーネス（`/gan-build`・`orch-build-mvp` が使う）

| エージェント | model | tools | 用途 |
|---|---|---|---|
| `gan-planner` | sonnet | 読み取り + Write | 1 行の依頼を仕様（機能・スプリント・評価基準）に広げる |
| `gan-generator` | sonnet | 編集 + Bash | 仕様どおりに実装し、評価者のフィードバックで直す |
| `gan-evaluator` | sonnet | Bash + Playwright MCP | 動いているアプリを Playwright で操作して採点する |

---

## どこから呼ばれるか

| 呼び出し元 | 使うエージェント |
|---|---|
| `/review-pr` | `code-reviewer`・`comment-analyzer`・`pr-test-analyzer`・`silent-failure-hunter`・`type-design-analyzer`・`code-simplifier` |
| `/feature-dev` | `code-explorer`・`code-architect`・`architect`・`code-reviewer` |
| `/gan-build` | `gan-planner`・`gan-generator`・`gan-evaluator` |
| `/plan` | `planner` |
| `/react-review`・`/react-build`・`/react-test` | `react-reviewer`・`typescript-reviewer`・`security-reviewer`・`react-build-resolver`・`tdd-guide` |
| `/santa-loop` | `code-reviewer` |
| `orch-pipeline` skill（orch-* 共通） | Intake `code-explorer` → Plan `planner` → Implement `tdd-guide` → Review `code-reviewer` ＋ 言語別 → Security `security-reviewer` |

---

## ポイント

- **`gan-evaluator` は Playwright MCP が必要。** `.mcp.json` には `context7` と `deepwiki` しかないので、使う前に Playwright MCP を追加する。ツールがないと採点できない
- **`description` は毎セッション読み込まれる。** 長くすると常駐コンテキストが増える。いつ使うかが分かる範囲で短く書く
- 読むだけのエージェントには `Write`・`Edit` を渡さない。レビュー結果は返り値で受け取り、直すのはメインの Claude か編集系のエージェント

---

## 追加・変更するとき

1. `<name>.md` を作り、frontmatter に `name`・`description`・`tools`・`model` を書く（`name` はファイル名と同じ）
2. 同じ `name` のファイルを 2 つ置かない。どちらが使われるかは環境で変わる
3. ECC からコピーしたものは、`docs/ecc/check-report.md` に元の場所と書き換えた内容を記録する
4. 新しいエージェントをコマンドや skill から呼ぶなら、呼び出し側にも名前を書く（上の「どこから呼ばれるか」も更新）
