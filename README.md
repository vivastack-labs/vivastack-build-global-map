# vivastack-build-seeds

a framework seed for developing with claudecode

---
## Dev Steps

### 1. Install the `andrej-karpathy-skills@karpathy-skills`

```bash
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

### 2. Install the `viva-cc-agents` plugin

```bash
claude plugin marketplace add https://github.com/vivastack-labs/viva-cc-agents.git
claude plugin install vivastack-core --scope project
claude plugin install vivastack-statusline
```

### 3. Install the [`playwright-cli`](https://github.com/microsoft/playwright-cli) plugin for testing

```bash
npm install -g @playwright/cli@latest
playwright-cli --help

playwright-cli install --skills
```

### 4. Install the `gitleaks` for secret scanning

```bash
sudo apt install gitleaks
gitleaks --help
gitleaks detect --no-git gitleaks-report.json
gitleaks detect --no-git -v
```

### 5. Install the `prettier` for code formatting (Optional)

```bash
npm install -g prettier
prettier --help

# add .prettierignore file
echo "node_modules" > .prettierignore
echo "dist" >> .prettierignore
echo "build" >> .prettierignore
prettier --write .
```

### 6. Install the `eslint` for JavaScript/TypeScript linting (Optional)

```bash
npm install -g eslint
eslint --help 
# initialize eslint config
eslint --init
```

### 7. Install the `tmux` for terminal multiplexing (Optional)

- install tmux
```bash
sudo apt install tmux
tmux new -s mysession
tmux attach -t mysession
```

- customize tmux config (`~/.tmux.conf`)

```conf
# change prefix key from C-b to C-a
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# split window with | or -
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"

# enable switch window by mouse 
set -g mouse on

# press E to capture pane content and ask Claude to explain errors
bind-key E run-shell "tmux capture-pane -pS -100 | claude '解释以上错误原因'"

# focus events for better integration 
set-option -g focus-events on

# extended keys for better key handling in agents
set -g allow-passthrough on
set -s extended-keys on
set -as terminal-features 'xterm*:extkeys'

#  clipboard integration for easy copy-paste between tmux and system clipboard (WSL2 specific)
set -g mouse on
set -s set-clipboard on

unbind -T copy-mode-vi MouseDragEnd1Pane
bind-key -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel "clip.exe"
```

***After editing `~/.tmux.conf`, reload the config***:
```bash
tmux source-file ~/.tmux.conf
```


### 8. Install the `markdownlint-cli2` for markdown linting

```bash
npm install -g markdownlint-cli2

markdownlint-cli2 --help
markdownlint-cli2 "**/*.md"
```

### 9. Install the `yamllint` for YAML linting  

```bash
sudo apt install yamllint
yamllint --help
yamllint .
```

### 10. Install the `jq` for JSON processing

```bash
sudo apt install jq
jq --help
jq . somefile.json
```

### 11. Install the `shellcheck` for shell script linting

```bash
sudo apt install shellcheck
shellcheck --help
shellcheck somefile.sh
```


---

## Cladue plugin offical (recommended)

- claude-md-mangement
- skill-create


## Use Local Hooks

***.cladue/settings.local.json***

```json
{
  "env": {
    "VCW_PLUGIN_ROOT": "/home/biba/works/vivastack-build-seeds/.claude",
    "VCW_HOOK_PROFILE": "standard",
    "CLAUDE_CODE_SUBAGENT_MODEL": "claude-sonnet-5-5",
    "VCW_DISABLED_HOOKS": "vcw:pre:edit:gateguard,vcw:pre:bash:gateguard,vcw:stop:desktop-notify",
    "ENABLE_LSP_TOOL": "1"
  },
  "enabledPlugins": {
    "vivastack-core@viva-cc-agents": false,
    "vtsls@claude-code-lsps": true,
    "rust-analyzer@claude-code-lsps": true
  },
  "statusLine": {
    "type": "command",
    "command": "echo \"VivaStack's best practice status line\"",
    "padding": 0
  },
}
```
