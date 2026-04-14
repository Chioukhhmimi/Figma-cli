# Quick Reference: Multi-Agent Commands

## Check Agent Status
```bash
figma-ds-cli agent list      # See which agents are available
figma-ds-cli agent current   # Check current default agent
```

## Set Default Agent
```bash
figma-ds-cli agent set gemini   # Use Gemini by default
figma-ds-cli agent set claude   # Use Claude by default
figma-ds-cli agent set qwini    # Use Qwini by default
```

## Launch with Default Agent
```bash
fig-start                       # Uses your default agent
fig-start --safe                # Safe mode with default agent
```

## Override Agent for One Session
```bash
fig-start --agent claude        # Use Claude this time only
fig-start --safe --agent qwini  # Safe mode with Qwini
```

## Environment Variable Override
```bash
FIGMA_AGENT=gemini fig-start    # Uses Gemini this time
```

## Install Agents
```bash
npm install -g @google/generative-ai    # Install Gemini
npm install -g @anthropic-ai/sdk        # Install Claude
npm install -g @qwen-code/qwen-code                # Install Qwencode
```

## Selection Priority (Highest → Lowest)
1. `fig-start --agent claude` (CLI flag)
2. `FIGMA_AGENT=gemini` (environment variable)
3. `~/.figma-cli/config.json` (config file)
4. `gemini` (default)

## Help & Info
```bash
figma-ds-cli agent --help           # General help
figma-ds-cli agent set --help       # Help for set command
figma-ds-cli agent current --help   # Help for current command
figma-ds-cli agent list --help      # Help for list command
```

## Troubleshooting
```bash
# Agent not installed?
figma-ds-cli agent list           # Check which are available
npm install -g @anthropic-ai/sdk  # Install Claude, for example

# Want to check before paying?
figma-ds-cli agent current        # See all available options

# Config file location
cat ~/.figma-cli/config.json      # View current config
```

## Common Workflows

### First Time Setup
```bash
npm install -g @anthropic-ai/sdk
figma-ds-cli agent set claude
fig-start  # Ready to go!
```

### Try Different Agent
```bash
fig-start --agent gemini          # Try Gemini once
# If you like it:
figma-ds-cli agent set gemini     # Make it default
```

### Quick Agent Switch
```bash
FIGMA_AGENT=qwini fig-start       # One-liner to try Qwini
figma-ds-cli agent set qwini      # Make it permanent
```

### Safe Mode with Preferred Agent
```bash
fig-start --safe --agent claude   # Your preferred agent + plugin mode
```

---

**Need more info?** See `AGENTS_GUIDE.md` for detailed guide or `AGENT_SETUP.md` for technical documentation.
