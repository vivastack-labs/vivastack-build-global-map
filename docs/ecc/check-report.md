# .claude 参照チェックレポート

- 調査日：2026-11-16
- 対象：`.claude/agents`、`.claude/commands`、`.claude/skills` の Markdown
- 調査したコミット：`cae52d7`（ブランチ `chore/add-agents-skills-commands`）
- 目的：存在しない資源（agent・skill・command・rules・スクリプト・ファイル）を参照している箇所を洗い出し、ECC からコピーして埋める
- コピー元：`${ECC_REPO_ROOT}` = `/home/biba/works/references/ECC`（コミット `d2ef268`）

パスは特に断りがなければ `.claude/` からの相対パス。

## 状況のまとめ

| 状態 | 内容 |
|---|---|
| ✅ 解消 | ECC からのコピー（下の一覧）と、ルールの配置変更で、最初に見つかった参照切れのほとんどが解消した |
| ✅ 書き換えで解消 | コピーでは直らなかった 4 件と、`ecc:` 接頭辞の残り（`rules/common/agents.md`）。ファイルを書き換えて直した |
| ℹ️ 残り（意図的に対応しない） | ECC リポジトリ専用の資源 |
| ℹ️ 新しく見つかったもの | コピーしたファイルが「関連」として挙げているだけの資源。動作には影響しない |

## ECC からコピーしたもの

### 1 回目：最初の調査で見つかった資源

| 種類 | コピー先 | 内容 |
|---|---|---|
| command | `commands/` | `plan`、`plan-prd`、`gan-build`、`build-fix`、`feature-dev`、`refactor-clean`、`review-pr`、`orch-review`、`react-review`、`react-build`、`react-test`、`santa-loop` |
| command | `commands/verify.md` | ECC の `legacy-command-shims/commands/verify.md`。`verification-loop` skill へ渡すだけの互換用の入口 |
| agent | `agents/` | `react-build-resolver`、`gan-generator`、`gan-evaluator`、`gan-planner` |
| skill | `skills/` | ~~`agent-self-evaluation`~~（のちに廃止。下の「廃止したもの」を参照）、`accessibility`、`angular-developer`、`coding-standards`、`deployment-patterns`、`verification-loop`、`video-editing`、`remotion-video-creation`、`motion-foundations`、`motion-patterns`、`motion-advanced`、`content-engine`、`fal-ai-media`、`frontend-design-direction`、`brand-voice`、`connections-optimizer`、`api-connector-builder`、`dashboard-builder`、`project-flow-ops`、`workspace-surface-audit`、`nestjs-patterns`、`prisma-patterns`、`bun-runtime` |
| skill（command として参照されていたもの） | `skills/` | `browser-qa`、`design-system`、`canary-watch`。ECC では skill として提供されており、`/名前` で呼べる |
| rules | `rules/react/` | `coding-style`、`hooks`、`patterns`、`security`、`testing`。`paths:` で `*.tsx` などに絞られている |
| rules | `rules/typescript/` | 同上の 5 本（内容は ECC と同じ。コミット `54f3ceb` に含まれている） |
| script | `scripts/astra-review.js`、`scripts/lib/astra-review/` | `/astra-review` が探しに行く候補の 1 つ（`./.claude/scripts/astra-review.js`）に置いた |
| docs | `docs/examples/product-capability-template.md`（リポジトリ直下） | `product-capability` skill が使うテンプレート |

### 2 回目：コピーしたものが動くのに必要な資源

| 種類 | コピー先 | 必要とするもの |
|---|---|---|
| agent | `agents/` の `comment-analyzer`、`pr-test-analyzer`、`silent-failure-hunter`、`type-design-analyzer` | `/review-pr` がこれらの agent に作業を振り分ける |
| skill | `skills/santa-method` | `/santa-loop` はこの skill を包んだもの |
| workflow | `workflows/orch-review.workflow.js`（リポジトリ直下） | `/orch-review` が `Workflow({ scriptPath: "workflows/orch-review.workflow.js" })` で呼ぶ |
| docs | `docs/PLAN-PRD-PATTERN.md` | `commands/plan-prd.md:162` のリンク先（`../docs/PLAN-PRD-PATTERN.md`） |

### 3 回目：あとから必要になったもの（2026-11-16）

| 種類 | コピー先 | 理由 |
|---|---|---|
| agent | `agents/java-reviewer.md` | Java のレビューに必要と判断した。ECC と同じ内容 |
| skill | `skills/quarkus-patterns` | `java-reviewer` が Quarkus の詳しいパターンの参照先に挙げている（Spring 側の `springboot-patterns` はもともとある）。ほかの資源への参照はない |
| rules | `rules/java/`（`coding-style`、`hooks`、`patterns`、`security`、`testing`） | Java 向けのルール。ECC と同じ内容。どれも `paths:` で `**/*.java`（`hooks.md` は `pom.xml`・`build.gradle*` も）に絞られているので、Java のファイルを扱うときだけ読み込まれる |
| skill | `skills/quarkus-security`、`skills/quarkus-tdd`、`skills/jpa-patterns` | `rules/java/` の `security.md`・`testing.md`・`patterns.md`・`coding-style.md` が「See skill:」で参照している。3 つともほかの資源への参照はない |

`java-reviewer` と `rules/java/*` が参照する資源は、これで全部そろっている。
- `java-reviewer`：`springboot-patterns`、`quarkus-patterns`、`security-reviewer`
- `rules/java/*`：`java-coding-standards`、`jpa-patterns`、`quarkus-patterns`、`quarkus-security`、`quarkus-tdd`、`security-review`、`springboot-patterns`、`springboot-security`、`springboot-tdd`
- `rules/java/*` から `../common/*.md` へのリンク 5 本も、`rules/common/` を指して正しく開ける。

ECC の `quarkus-verification` は、どこからも参照されていないのでコピーしていない。

## パスの対応表（移行前 → 移行後）

ECC からコピーしたものを、1 資源 1 行で記録する。

- **移行前**：ECC リポジトリのルート `${ECC_REPO_ROOT}` からの相対パス
- **移行後**：このリポジトリのルートからの相対パス（ここだけは `.claude/` からではない）
- 末尾が `/` の行はフォルダごとコピーしたもの
- **回**：上の「1 回目」〜「3 回目」のどれでコピーしたか
- **ECC との差**：2026-11-16 時点で、移行後のファイルと ECC のファイルを中身まで比べた結果

| 種類 | 移行前（ECC） | 移行後（このリポジトリ） | 回 | ECC との差 | 備考 |
|---|---|---|---|---|---|
| command | `${ECC_REPO_ROOT}/commands/plan.md` | `.claude/commands/plan.md` | 1 | 同じ |  |
| command | `${ECC_REPO_ROOT}/commands/plan-prd.md` | `.claude/commands/plan-prd.md` | 1 | 同じ |  |
| command | `${ECC_REPO_ROOT}/commands/gan-build.md` | `.claude/commands/gan-build.md` | 1 | 同じ |  |
| command | `${ECC_REPO_ROOT}/commands/build-fix.md` | `.claude/commands/build-fix.md` | 1 | 同じ |  |
| command | `${ECC_REPO_ROOT}/commands/feature-dev.md` | `.claude/commands/feature-dev.md` | 1 | 同じ |  |
| command | `${ECC_REPO_ROOT}/commands/refactor-clean.md` | `.claude/commands/refactor-clean.md` | 1 | 同じ |  |
| command | `${ECC_REPO_ROOT}/commands/review-pr.md` | `.claude/commands/review-pr.md` | 1 | 同じ |  |
| command | `${ECC_REPO_ROOT}/commands/orch-review.md` | `.claude/commands/orch-review.md` | 1 | 同じ |  |
| command | `${ECC_REPO_ROOT}/commands/react-review.md` | `.claude/commands/react-review.md` | 1 | 同じ |  |
| command | `${ECC_REPO_ROOT}/commands/react-build.md` | `.claude/commands/react-build.md` | 1 | 同じ |  |
| command | `${ECC_REPO_ROOT}/commands/react-test.md` | `.claude/commands/react-test.md` | 1 | 同じ |  |
| command | `${ECC_REPO_ROOT}/commands/santa-loop.md` | `.claude/commands/santa-loop.md` | 1 | **書き換えあり** | Antigravity（ccg-workflow）の分岐を外した |
| command | `${ECC_REPO_ROOT}/legacy-command-shims/commands/verify.md` | `.claude/commands/verify.md` | 1 | 同じ | ECC では互換用の置き場にある |
| agent | `${ECC_REPO_ROOT}/agents/react-build-resolver.md` | `.claude/agents/react-build-resolver.md` | 1 | 同じ |  |
| agent | `${ECC_REPO_ROOT}/agents/gan-generator.md` | `.claude/agents/gan-generator.md` | 1 | 同じ |  |
| agent | `${ECC_REPO_ROOT}/agents/gan-evaluator.md` | `.claude/agents/gan-evaluator.md` | 1 | 同じ |  |
| agent | `${ECC_REPO_ROOT}/agents/gan-planner.md` | `.claude/agents/gan-planner.md` | 1 | 同じ |  |
| agent | `${ECC_REPO_ROOT}/agents/comment-analyzer.md` | `.claude/agents/comment-analyzer.md` | 2 | 同じ |  |
| agent | `${ECC_REPO_ROOT}/agents/pr-test-analyzer.md` | `.claude/agents/pr-test-analyzer.md` | 2 | 同じ |  |
| agent | `${ECC_REPO_ROOT}/agents/silent-failure-hunter.md` | `.claude/agents/silent-failure-hunter.md` | 2 | 同じ |  |
| agent | `${ECC_REPO_ROOT}/agents/type-design-analyzer.md` | `.claude/agents/type-design-analyzer.md` | 2 | 同じ |  |
| agent | `${ECC_REPO_ROOT}/agents/java-reviewer.md` | `.claude/agents/java-reviewer.md` | 3 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/agent-self-evaluation/` | `.claude/skills/agent-self-evaluation/` | 1 | —（廃止） | 廃止して削除した |
| skill | `${ECC_REPO_ROOT}/skills/accessibility/` | `.claude/skills/accessibility/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/angular-developer/` | `.claude/skills/angular-developer/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/coding-standards/` | `.claude/skills/coding-standards/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/deployment-patterns/` | `.claude/skills/deployment-patterns/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/verification-loop/` | `.claude/skills/verification-loop/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/video-editing/` | `.claude/skills/video-editing/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/remotion-video-creation/` | `.claude/skills/remotion-video-creation/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/motion-foundations/` | `.claude/skills/motion-foundations/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/motion-patterns/` | `.claude/skills/motion-patterns/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/motion-advanced/` | `.claude/skills/motion-advanced/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/content-engine/` | `.claude/skills/content-engine/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/fal-ai-media/` | `.claude/skills/fal-ai-media/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/frontend-design-direction/` | `.claude/skills/frontend-design-direction/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/brand-voice/` | `.claude/skills/brand-voice/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/connections-optimizer/` | `.claude/skills/connections-optimizer/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/api-connector-builder/` | `.claude/skills/api-connector-builder/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/dashboard-builder/` | `.claude/skills/dashboard-builder/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/project-flow-ops/` | `.claude/skills/project-flow-ops/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/workspace-surface-audit/` | `.claude/skills/workspace-surface-audit/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/nestjs-patterns/` | `.claude/skills/nestjs-patterns/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/prisma-patterns/` | `.claude/skills/prisma-patterns/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/bun-runtime/` | `.claude/skills/bun-runtime/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/browser-qa/` | `.claude/skills/browser-qa/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/design-system/` | `.claude/skills/design-system/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/canary-watch/` | `.claude/skills/canary-watch/` | 1 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/santa-method/` | `.claude/skills/santa-method/` | 2 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/quarkus-patterns/` | `.claude/skills/quarkus-patterns/` | 3 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/quarkus-security/` | `.claude/skills/quarkus-security/` | 3 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/quarkus-tdd/` | `.claude/skills/quarkus-tdd/` | 3 | 同じ |  |
| skill | `${ECC_REPO_ROOT}/skills/jpa-patterns/` | `.claude/skills/jpa-patterns/` | 3 | 同じ |  |
| rules | `${ECC_REPO_ROOT}/rules/react/` | `.claude/rules/react/` | 1 | 同じ |  |
| rules | `${ECC_REPO_ROOT}/rules/typescript/` | `.claude/rules/typescript/` | 1 | 同じ | コミット `54f3ceb` で追加 |
| rules | `${ECC_REPO_ROOT}/rules/java/` | `.claude/rules/java/` | 3 | 同じ |  |
| script | `${ECC_REPO_ROOT}/scripts/astra-review.js` | `.claude/scripts/astra-review.js` | 1 | 同じ | ECC の `scripts/` 直下 → `.claude/scripts/` |
| script | `${ECC_REPO_ROOT}/scripts/lib/astra-review/` | `.claude/scripts/lib/astra-review/` | 1 | 同じ |  |
| workflow | `${ECC_REPO_ROOT}/workflows/orch-review.workflow.js` | `workflows/orch-review.workflow.js` | 2 | **書き換えあり** | `ecc:` を外し、言語の対応表を実在する reviewer に絞った |
| docs | `${ECC_REPO_ROOT}/docs/examples/product-capability-template.md` | `docs/examples/product-capability-template.md` | 1 | 同じ |  |
| docs | `${ECC_REPO_ROOT}/docs/PLAN-PRD-PATTERN.md` | `.claude/docs/PLAN-PRD-PATTERN.md` | 2 | 同じ | ECC の `docs/` 直下 → `.claude/docs/`（`commands/plan-prd.md` からの相対リンクに合わせた） |

まとめ：61 件のうち 58 件は ECC と同じ。違うのは、意図して書き換えた 2 件（`santa-loop.md`、`orch-review.workflow.js`）と、廃止した 1 件（`agent-self-evaluation`）だけ。

置き場所の対応のきまり：

| ECC | このリポジトリ |
|---|---|
| `${ECC_REPO_ROOT}/agents/` | `.claude/agents/` |
| `${ECC_REPO_ROOT}/commands/` | `.claude/commands/` |
| `${ECC_REPO_ROOT}/legacy-command-shims/commands/` | `.claude/commands/` |
| `${ECC_REPO_ROOT}/skills/` | `.claude/skills/` |
| `${ECC_REPO_ROOT}/rules/` | `.claude/rules/` |
| `${ECC_REPO_ROOT}/scripts/` | `.claude/scripts/` |
| `${ECC_REPO_ROOT}/workflows/` | `workflows/`（リポジトリ直下。`/orch-review` がこのパスで呼ぶため） |
| `${ECC_REPO_ROOT}/docs/examples/` | `docs/examples/`（リポジトリ直下。`product-capability` skill がこのパスを指すため） |
| `${ECC_REPO_ROOT}/docs/PLAN-PRD-PATTERN.md` | `.claude/docs/PLAN-PRD-PATTERN.md`（`commands/plan-prd.md` からのリンク `../docs/` に合わせるため） |

この表に載せたのは、この作業で ECC からコピーしたものだけ。それより前からあったファイル（`rules/common/*`、`commands/sessions.md`、`rules/common/agents.md` など）は、ECC 由来でも載せていない。

## 解消したもの

最初の調査で見つかった参照切れのうち、次のものが解消した。

- **command**：`/plan`、`/plan-prd`、`/gan-build`、`/build-fix`、`/feature-dev`、`/refactor-clean`、`/verify`、`/review-pr`、`/orch-review`、`/react-review`、`/react-build`、`/react-test`、`/santa-loop`、`/browser-qa`、`/design-system`、`/canary-watch`
- **agent**：`react-build-resolver`、`gan-generator`、`gan-evaluator`、`gan-planner`
- **skill**：「4. 存在しない skill」に挙げたものすべて（`accessibility`、`coding-standards`、`video-editing`、`bun-runtime` ほか）
- **rules**：`rules/react/*`、`rules/typescript/*`、`rules/common/*`（配置変更による。下の「ルールの配置」を参照）
- **ファイル**：
  - `agents/agent-evaluator.md` の `skills/agent-self-evaluation/SKILL.md` と `scripts/evaluate.py`：参照していた agent ごと廃止したので、参照そのものがなくなった
  - `commands/astra-review.md` の `scripts/astra-review.js` と `scripts/lib/astra-review/`
  - `skills/product-capability/SKILL.md:28` の `docs/examples/product-capability-template.md`
- **実行時に作られる出力先になったもの**：`gan-harness/*.md` は `/gan-build` と gan-* agent が作るファイル。いまはそれらがあるので、問題なし

### ルールの配置（コミット `94f06c1`）

Claude Code が自動で読み込むのは `.claude/rules/` 以下だけで、`.claude/common/` は読み込まれていなかった。ECC の構成に合わせて次のように移した。

- `.claude/common/*.md`（10 本）→ `.claude/rules/common/`：`paths:` がないので毎回読み込まれる
- `.claude/rules/*.md`（7 本）→ `.claude/rules/web/`：`paths:` に合うファイルを扱うときだけ読み込まれる
- `rules/web/*.md` から `../common/*.md` へのリンクはそのまま正しく指す。`skills/orch-pipeline/SKILL.md` の `rules/common/*.md` という参照（62、104、112、121 行）も解消した。

## 廃止したもの（2026-11-16）

| 資源 | 状態 | 理由 |
|---|---|---|
| skill `agent-self-evaluation`（7 ファイル） | 削除。ECC からコピーしただけで、未コミットだった | 使わないと判断 |
| agent `agent-evaluator`（`agents/agent-evaluator.md`） | 削除（コミット `cae52d7` で追加したもの） | この skill の agent 版で、評価の基準も報告の形式もこの skill に頼っていた。skill だけ消すと参照切れになるため、一緒に廃止 |

ほかに、この 2 つを参照している agent・skill・command・hooks・設定はない。

## ✅ 対応済み：コピーでは直らなかったもの（書き換えた）

コピーしたファイルのうち、次のものは ECC の中身から書き換えている。

| 場所 | 問題 | 対応 | 確認したこと |
|---|---|---|---|
| `commands/sessions.md`（6 か所の `_r`） | スクリプトのある場所（`_r`）を `~/.claude` か ECC プラグインからしか探さないため、プロジェクトの `.claude/scripts/lib/` にある実物が見つからず、`/sessions` が失敗していた | `CLAUDE_PLUGIN_ROOT` の次に、`$CLAUDE_PROJECT_DIR/.claude`（なければ `./.claude`）を探すようにした | 書き換えた処理を実行し、`_r` がプロジェクトの `.claude` になること、`session-manager` と `session-aliases` が読み込めることを確かめた |
| `commands/sessions.md:302` | `scripts/hooks/cost-tracker.js` は ECC の配置だった | `.claude/hooks/scripts/cost-tracker.js` に書き換えた | ファイルがあることを確かめた |
| `workflows/orch-review.workflow.js` | レビュー役の agent を `ecc:code-reviewer` のように ECC プラグインの名前で呼んでいた | `ecc:` の接頭辞を外した。言語ごとの reviewer は、プロジェクトにあるもの（`typescript`・`javascript`→`typescript-reviewer`、`python-reviewer`、`rust-reviewer`、`java-reviewer`、`react-reviewer`）だけにした。`java-reviewer` は 3 回目のコピーのときに足した。ほかの言語では言語別のレビューを飛ばし、`code-reviewer` が見る（もともとの、対応表にない言語での動き） | 構文が正しいことと、ECC 版との違いがこの部分だけであることを確かめた。Workflow として実際には動かしていない |
| `commands/santa-loop.md` | 2 人目のレビュー役の候補に、外部ツール（ccg-workflow の `~/.claude/bin/codeagent-wrapper` と `~/.claude/.ccg/...`）を使う Antigravity が入っていた | Antigravity の分岐と、その説明をすべて外した。候補の順番は Codex → Gemini → Claude | シェルの部分が構文として正しいことを確かめ、実行して `CLAUDE_FALLBACK` が出ることを確かめた |
| `rules/common/agents.md` | 毎セッション読み込まれるルールで、agent を `ecc:planner`、`ecc:code-reviewer` のように ECC プラグインの名前で案内していた（使用例と表に 12 か所）。プラグインが入っていないので、この名前では呼べない。表には、このプロジェクトにない `ecc:doc-updater`、`ecc:harmonyos-app-resolver`、コマンド `/ecc:ecc-guide` も載っていた | `ecc:` を外し、実在する agent の名前にした。ない agent 2 つは表から外し、言語別の reviewer（`typescript`・`python`・`rust`・`java`・`react`）を 1 行にまとめた。「`ecc:` は使わない」という説明を足し、`/ecc:ecc-guide` の案内は `.claude/agents/` を見るように書き換えた | 表に載せた agent がすべて `.claude/agents/` にあることを確かめた |

補足：

- `ecc:` の接頭辞がほかに残っていないかを、リポジトリ全体で調べた。残っているのは、「使わない」と説明している 2 か所（`rules/common/agents.md:5`、`workflows/orch-review.workflow.js:35`）だけ。ほかに `ecc@ecc` が 2 か所ある。`commands/sessions.md` のものは、ECC プラグインが入っていれば探しにいくだけの処理なので害はない。`skills/github-ops/references/ecc-release-checklist.md` のものは、意図的に対応しないとしたファイル。
- `santa-loop` は、Antigravity が入っていなければもともと Claude に切り替わる作りで、失敗はしていなかった。この環境には ccg-workflow も codex も gemini も入っていないので、2 人目のレビュー役も Claude（`code-reviewer`）になる。違うモデルに見てもらいたい場合は、Codex か Gemini の CLI を入れる。
- 言語別の reviewer を agent に足したら、`workflows/orch-review.workflow.js` の `LANGUAGE_REVIEWER` にも 1 行足す。

## ℹ️ 残り：意図的に対応しないもの

ECC リポジトリ自体のための資源で、このプロジェクトに持ち込んでも意味がない。

- `skills/github-ops/references/ecc-release-checklist.md`：ファイル全体が ECC のリリース手順（`scripts/release.sh`、`.github/workflows/release.yml` など）。不要なら、ファイルごと消してよい。
- `skills/docker-patterns/SKILL.md:312` の `docker/plugin-setup/compose.yaml`：ECC のインストーラーを試すための仕組み（`prepare-packed-cli.js`、`codex-auth-relay.js` など）。「参考にする実装」として挙げられているだけなので、コピーしなかった。
- `commands/astra-review.md:124` の `docs/ASTRA-REVIEW-GUIDE.md`：本文に「ECC リポジトリの」と明記されている外部の参照。
- `skills/typescript-patterns/SKILL.md:10, 591` の `rules/ecc/typescript/*`：`rules/typescript/*` の別名で、「どちらか」という書き方。`rules/typescript/` があるので問題なし。

## ℹ️ 新しく見つかったもの：コピーしたファイルが挙げている、存在しない資源

コピーしたファイルの「関連」や「代わりに使えるもの」として名前が出ているだけで、ないと動かない依存ではない。必要になったら ECC から足す。

| 参照 | 参照している場所 |
|---|---|
| `/multi-plan`、`/plan-canvas`（と skill `plan-canvas`） | `commands/plan.md:2, 115, 189` |
| `frontend-design` | `skills/frontend-design-direction/SKILL.md:16`、`skills/taste/SKILL.md` |
| `liquid-glass-design`、`swiftui-patterns` | `skills/accessibility/SKILL.md`、`skills/frontend-slides/SKILL.md` |
| `postgres-patterns`、`database-migrations` | `skills/prisma-patterns/SKILL.md` |
| `mcp-server-patterns` | `skills/api-connector-builder/SKILL.md` |
| `lead-intelligence`、`social-graph-ranker` | `skills/brand-voice/SKILL.md`、`skills/connections-optimizer/SKILL.md` |
| `research-ops`、`terminal-ops` | `skills/dashboard-builder/SKILL.md` |
| `typescript-build-resolver` | `agents/react-build-resolver.md:23`。本文に「将来の」と書かれており、ECC にもまだない |

## 問題なしとして除いたもの

- **例示のパス**：`path/to/file.ts`、`app/api/...`、`lib/auth.ts`、`src/app/app.ts` など
- **実行時に作られる出力先**：`.claude/PRPs/*`、`.claude/plans/`、`docs/CODEMAPS/`、`docs/CONTRIBUTING.md`、`checkpoints.log`、`session-aliases.json`、`assets/`、`gan-harness/*`、`~/.claude/canary-watch.log`
- **あれば使う任意のファイル**：PR テンプレート、`.claude/package-manager.json`、各エディタの `mcp.json`
- **組み込み**：agent の `general-purpose`、command の `/release-notes`
- **本文に断り書きがあるもの**：`react-native-patterns` は「まだない」と明記、`react-best-practices` は外部の出典の表記
- **パッケージ名やモデル名、URL の一部**：`eslint-plugin-security`、`kling-video`、`/pricing`、`/docs` など

## 調べ方と限界

- 存在の判定：プロジェクトの `.claude/{agents,commands,skills}`、Claude Code の組み込み、このプロジェクトで有効なプラグイン（`enabledPlugins`）と照らし合わせた。
- 名前の検出は正規表現と前後の文脈で行い、候補は 1 件ずつ目で確かめた。バッククォートで囲まれていない 1 語だけの名前は拾えていない可能性がある。
- コピーした資源の依存は 2 段目まで追った。ないと動かないものだけを 2 回目にコピーし、「関連」として名前が出ているだけのものはコピーしていない。
- コピーしたファイルは、「対応済み：コピーでは直らなかったもの」に挙げた 3 つ（`commands/sessions.md`、`commands/santa-loop.md`、`workflows/orch-review.workflow.js`）を除き、ECC のままで中身は変えていない。コマンドを実際に最後まで動かす確認はしていない。
- 対象は agents・skills・commands の Markdown と、コピーで足したファイル。`rules/` はリンク切れだけを確かめた。
