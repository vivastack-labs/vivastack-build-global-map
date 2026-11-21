# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

共通の指示は AGENTS.md に書く（Codex と共有するため）。Claude Code 固有の内容だけをここに追記する。

@AGENTS.md

## Claude Code 固有の注意

- `ECC`の格納先 : `/home/biba/works/references/ECC`
- `.claude/settings.json` はプラグイン版の設定（`vivastack-core` を有効にし、`VCW_PLUGIN_ROOT` はプラグインのキャッシュを指す）。この repo で作業するときは、git に入らない `.claude/settings.local.json` がそのプラグインを無効にし、`VCW_PLUGIN_ROOT` をこの repo の `.claude` に向ける。この上書きがないと、フックはキャッシュ側のコピーで動き、`.claude/hooks/` の変更は反映されない。
- フックは `.claude/hooks/hooks.json` と `.claude/settings.json` の `hooks` の両方に登録されている。フックを追加・変更したら両方を揃える。
- `.claude/rules/common/*.md` は毎回読み込まれる。言語別（`react`・`java`・`web`・`typescript`）は `paths` frontmatter があり、該当するファイルを扱うときだけ読み込まれる。
- 使わない skill は消さずに、`.claude/settings.json` の `skillOverrides` で `"off"` にしている。
