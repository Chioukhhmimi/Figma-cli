# Multi-Agent Support Implementation Guide

## Overview

The figma-ds-cli now supports multiple AI agents (Gemini, Claude, Qwini) with dynamic selection. Users can choose their preferred agent through CLI commands, environment variables, or configuration files.

## Files Modified/Created

### New Files
- **`src/agent-manager.js`** - Agent abstraction layer and management
- **`src/config.js`** - Configuration management for storing default agent

### Modified Files
- **`bin/fig-start`** - Updated to support agent selection in both normal and safe modes
- **`src/index.js`** - Added agent management commands

## Features Implemented

### 1. Agent Management Commands

```bash
# List all supported agents and their installation status
node src/index.js agent list

# Show current default agent and available agents
node src/index.js agent current

# Set a specific agent as default
node src/index.js agent set gemini
node src/index.js agent set claude
node src/index.js agent set qwini
```

### 2. Configuration System

Configuration is stored in `~/.figma-cli/config.json`:

```json
{
  "defaultAgent": "gemini",
  "repoPath": "/path/to/figma-cli"
}
```

### 3. Agent Selection Priority

The system uses this priority order to determine which agent to use:

1. **CLI Flag**: `fig-start --agent claude`
2. **Environment Variable**: `FIGMA_AGENT=qwini fig-start`
3. **Configuration File**: `~/.figma-cli/config.json`
4. **Default**: `gemini`

### 4. Multi-Mode Support

Works in both modes:

```bash
# Normal mode with agent selection
fig-start                          # Uses default agent
fig-start --agent claude           # Override with claude
FIGMA_AGENT=qwini fig-start        # Override with environment

# Safe mode with agent selection
fig-start --safe                   # Uses default agent in safe mode
fig-start --safe --agent claude    # Safe mode with claude
```

### 5. Agent Availability Detection

The system automatically:
- Detects which agents are installed
- Falls back to available agents if configured agent isn't installed
- Provides user selection if multiple agents are available
- Shows helpful installation instructions if no agents are found

## Architecture

### Agent Manager (`src/agent-manager.js`)

Provides:
- `SUPPORTED_AGENTS` - List of supported agent names
- `AGENT_CONFIG` - Configuration for each agent (command, docs path, description)
- `isAgentAvailable(name)` - Check if agent is installed
- `getAvailableAgents()` - Get list of installed agents
- `launchAgent(name, options)` - Launch an agent subprocess
- `getEffectiveAgent(override)` - Get agent to use considering priority

### Config Manager (`src/config.js`)

Provides:
- `readConfig()` - Read entire config
- `writeConfig(config)` - Write entire config
- `getConfig(key, default)` - Get specific value
- `setConfig(key, value)` - Set specific value
- `getDefaultAgent()` - Get default agent
- `setDefaultAgent(agent)` - Set default agent

## Usage Examples

### Example 1: Set Claude as Default
```bash
node src/index.js agent set claude
fig-start
# Now fig-start will launch Claude by default
```

### Example 2: One-time Override
```bash
fig-start --agent qwini
# Launches Qwini this time, doesn't change default
```

### Example 3: Environment Variable Override
```bash
FIGMA_AGENT=claude fig-start
# Uses Claude for this session only
```

### Example 4: Safe Mode with Specific Agent
```bash
fig-start --safe --agent claude
# Connects to Figma in safe mode, then launches Claude
```

## Integration Details

### bin/fig-start Flow

```
1. Parse flags (--safe, --here, --agent)
2. Resolve agent to use (override → env var → config → default)
3. Check if agent is available
4. If not available, offer selection or graceful fallback
5. Connect to Figma (normal or safe mode)
6. Launch selected agent
```

### src/index.js Agent Commands

```
agent set <name>      - Set default agent (with validation)
agent current         - Show current agent and available options
agent list            - List all supported agents
launch-agent <name>   - Internal command used by fig-start
```

## Environment Variables

- `FIGMA_AGENT` - Override default agent (e.g., `claude`, `qwini`)

## Configuration File

Location: `~/.figma-cli/config.json`

Example:
```json
{
  "defaultAgent": "claude",
  "repoPath": "/Users/sil/projects/figma-cli"
}
```

## Adding New Agents

To add a new agent (e.g., `myai`):

1. **Update `src/agent-manager.js`**:
   ```javascript
   export const SUPPORTED_AGENTS = ['gemini', 'claude', 'qwini', 'myai'];
   
   myai: {
     command: 'myai',
     docs: 'MYAI.md',
     description: 'MyAI Assistant'
   }
   ```

2. **Create documentation**: `MYAI.md` with commands reference

3. **Update `bin/fig-start`**: Add 'myai' to agent checks (auto-handled by loop)

4. **Test**:
   ```bash
   node src/index.js agent list        # Should show myai (unavailable)
   npm install -g myai-cli             # Install the agent
   node src/index.js agent list        # Should show myai (available)
   node src/index.js agent set myai
   fig-start
   ```

## Error Handling

The system handles:
- Agent not installed → Shows available alternatives
- No agents installed → Shows installation instructions
- Agent subprocess fails → Clear error message with exit code
- Configuration file missing → Uses sensible defaults

## Backward Compatibility

✅ Fully backward compatible:
- Old scripts still work (default to gemini)
- Manual `gemini` commands still work
- Environment without config file works fine
- Safe mode unchanged (except agent selection)

## Testing

Verify the implementation:

```bash
# Test agent listing
node src/index.js agent list

# Test current agent
node src/index.js agent current

# Test setting agent (will fail if agent not installed)
node src/index.js agent set claude    # Should show error if Claude not installed

# Test launcher command
node src/index.js launch-agent gemini # Should fail if gemini not installed

# Test help
node src/index.js agent --help
node src/index.js agent set --help
```

## Future Enhancements

Potential improvements:
- Agent switching during session
- Per-project agent selection
- Agent quality/cost metrics
- Agent plugin system for custom implementations
- Cache agent-specific settings (API keys, preferences)
