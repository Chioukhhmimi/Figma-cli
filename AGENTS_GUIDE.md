# Using Multiple AI Agents with figma-ds-cli

Quick guide to switching between Gemini, Claude, and Qwini.

## Quick Start

### 1. Check Available Agents

```bash
figma-ds-cli agent list
```

Shows which agents are installed:
```
✓ gemini      (installed)
✗ claude      (not installed)
✗ qwini       (not installed)
```

### 2. Set Your Default Agent

```bash
figma-ds-cli agent set claude
```

Now `fig-start` will use Claude by default.

### 3. Launch figma-ds-cli

```bash
fig-start                    # Uses your default agent (Claude in this example)
```

## Advanced Usage

### Override Default for One Session

```bash
fig-start --agent qwini      # Temporarily use Qwini
# Default agent remains unchanged
```

### Use Environment Variable

```bash
FIGMA_AGENT=gemini fig-start # Temporarily use Gemini
```

### Safe Mode with Specific Agent

```bash
fig-start --safe --agent claude  # Connect safely, then launch Claude
```

## Check Current Configuration

```bash
figma-ds-cli agent current
```

Output:
```
Agent Status

  Current: claude
  Available: gemini, claude

  ⚠ No agents installed. Install one with:
    • npm install -g @google/generative-ai
    • npm install -g @anthropic-ai/sdk
```

## Installing Agents

If you see "not installed", install the agent first:

**Gemini:**
```bash
npm install -g @google/generative-ai
```

**Claude:**
```bash
npm install -g @anthropic-ai/sdk
```

**Qwencode:**
```bash
npm install -g @qwen-code/qwen-code
```

Then set it as default:
```bash
figma-ds-cli agent set claude
fig-start
```

## Priority Order

The system uses agents in this priority:

1. **Command line flag** (highest priority)
   ```bash
   fig-start --agent qwini
   ```

2. **Environment variable**
   ```bash
   FIGMA_AGENT=gemini fig-start
   ```

3. **Configuration file** (`~/.figma-cli/config.json`)
   ```json
   { "defaultAgent": "claude" }
   ```

4. **Default** (lowest priority)
   - Defaults to `gemini`

## Troubleshooting

### "Agent not installed: gemini"
Install the agent:
```bash
npm install -g @google/generative-ai
```

### "No AI agents installed"
Install at least one agent (see Installing Agents section above).

### Want to remove an agent from being default?
Just uninstall it, and the system will automatically use another available agent:
```bash
npm uninstall -g @anthropic-ai/sdk
figma-ds-cli agent current  # Will show gemini as default if available
```

## Mode Support

Multi-agent selection works in both modes:

**Normal Mode (Yolo Mode):**
```bash
fig-start --agent claude
```

**Safe Mode:**
```bash
fig-start --safe --agent claude
```

Both modes support all agent selection methods.

## Configuration

Your configuration is stored in: `~/.figma-cli/config.json`

Example:
```json
{
  "defaultAgent": "claude",
  "repoPath": "/Users/you/projects/figma-cli"
}
```

You can manually edit this file or use:
```bash
figma-ds-cli agent set qwini
```

## Keyboard Shortcuts in fig-start

When no agents are installed and figma-ds-cli tries to select one:
- Use arrow keys (↑↓) to navigate
- Press Enter to select

## Still Need Help?

Run the help commands:

```bash
figma-ds-cli agent --help
figma-ds-cli agent set --help
figma-ds-cli agent list --help
figma-ds-cli agent current --help
```

Or check `AGENT_SETUP.md` for technical details.
