# Project Analysis: figma-ds-cli

## 1. Project Overview
- **Purpose**: A CLI tool for managing Figma design systems, providing direct control over Figma Desktop without requiring API keys.
- **Main Features**:
  - Generate shadcn/ui components with real Lucide icons and variable binding
  - Create design tokens, variables, collections, and modes (Light/Dark)
  - Create frames, text, shapes, icons (150k+ from Iconify), and components
  - Manage Figma's Slots feature for flexible component content
  - Import and use components, styles, and variables from team libraries
  - Analyze designs (colors, typography, spacing, patterns)
  - Lint and accessibility checks (contrast, touch targets)
  - Export capabilities (PNG, SVG, JSX, Storybook, CSS variables, Tailwind config)
  - Batch operations (rename layers, find/replace, create variables)
  - FigJam integration for collaborative features
- **Type of Application**: CLI tool with Figma Desktop integration via Chrome DevTools Protocol (CDP)

## 2. Tech Stack
- **Languages**: JavaScript (ES modules)
- **Frameworks and Libraries**:
  - Commander.js for CLI interface
  - WebSocket (ws) for CDP communication
  - Ora for spinners
  - Chalk for terminal colors
  - Figma Plugin API for direct Figma manipulation
- **Tools and Environments**:
  - Node.js (>=18)
  - Chrome DevTools Protocol for Figma Desktop connection
  - npm for package management
  - Bash scripts for setup and aliases

## 3. Architecture & Structure
- **Folder Structure**:
  - `src/`: Core source code
    - `index.js`: Main CLI entry point with all commands
    - `figma-client.js`: CDP client for Figma Desktop connection
    - `figjam-client.js`: Specialized client for FigJam features
    - `figma-patch.js`: Handles Figma binary patching for debugging
    - `shadcn.js`: shadcn/ui component generation logic
    - `blocks/`: Predefined component blocks (e.g., dashboard-01.js)
    - `daemon.js`: Persistent daemon for connection management
  - `bin/`: Executable scripts
    - `fig-start`: Launcher script that connects to Figma and launches AI CLI
    - `setup-alias.sh`: Alias setup script
  - `plugin/`: Figma plugin bridge
    - `manifest.json`: Plugin configuration
    - `code.js`: Plugin backend logic
    - `ui.html`: Plugin UI
  - `docs/`: Documentation
    - `ARCHITECTURE.md`: Technical architecture details
    - `COMMANDS.md`: Command reference
    - `CLAUDE-SESSION.md`: Claude-specific integration guide
    - `FIGJAM.md`: FigJam features
    - `TECHNIQUES.md`: Advanced usage techniques
  - `tests/`: Test files
    - `figma-client.test.js`: Unit tests for Figma client

- **Key Modules and Responsibilities**:
  - `FigmaClient`: Handles WebSocket connection to Figma via CDP, executes JavaScript against Figma Plugin API
  - `FigJamClient`: Specialized client for FigJam-specific operations
  - `Daemon`: Manages persistent connection and authentication tokens
  - `Shadcn.js`: Component generation and management
  - `Blocks`: Registry of predefined complex components

- **Component Interactions**:
  - CLI (Commander.js) parses commands and delegates to appropriate clients
  - Clients connect to Figma Desktop via CDP on localhost:9222
  - Plugin acts as bridge for complex operations requiring UI interaction
  - Daemon provides persistent session management

## 4. Key Workflows
- **Entry Points**:
  - `node src/index.js` or `figma-ds-cli` command
  - `bin/fig-start` for AI-assisted workflow (connects to Figma + launches AI CLI)

- **Important Flows**:
  - **Connection**: Patch Figma binary → Restart with debugging → Connect via WebSocket → Execute commands
  - **Component Creation**: Parse component specs → Generate Figma nodes → Apply styling/variables → Convert to components
  - **Token Management**: Create variable collections → Add variables with modes → Bind to node properties
  - **Export**: Query nodes → Generate export requests → Handle format conversion
  - **AI Integration**: AI agent reads documentation files → Translates natural language to CLI commands → Executes via subprocess

## 5. AI / Agent Integration
- **Current AI Agents**:
  - **Gemini CLI**: Primary integration via `bin/fig-start` script
    - Launches after Figma connection
    - Reads `GEMINI.md` for command reference
    - Uses subprocess execution (`exec gemini`)
  - **Claude Code**: Secondary integration
    - Reads `CLAUDE-SESSION.md` for command reference
    - Designed for natural language interaction
    - Commands documented for Claude to execute directly

- **Integration Method**:
  - **Documentation-Driven**: AI agents read Markdown files (GEMINI.md, CLAUDE-SESSION.md) containing command references
  - **Subprocess Execution**: AI CLIs are launched as separate processes after Figma connection
  - **No Direct API**: Agents interact via CLI commands, not programmatic APIs
  - **Session Management**: Daemon provides persistent connection that agents can reuse

## 6. How to Add Multi-Agent Support
To support dynamic selection between gemini, claude, and qwini CLIs:

### ✅ IMPLEMENTATION COMPLETE

**Files Created:**
- `src/agent-manager.js` - Agent abstraction layer
- `src/config.js` - Configuration management
- `AGENT_SETUP.md` - Technical documentation
- `AGENTS_GUIDE.md` - User guide

**Files Modified:**
- `bin/fig-start` - Added agent selection logic for both normal and safe modes
- `src/index.js` - Added agent management CLI commands

### Features Implemented

1. **Agent Management Commands**
   ```bash
   node src/index.js agent list       # List all supported agents
   node src/index.js agent current    # Show current default agent
   node src/index.js agent set <name> # Set default agent
   ```

2. **CLI Flag Support**
   ```bash
   fig-start --agent claude           # Override with specific agent
   fig-start --safe --agent qwini     # Safe mode with agent selection
   ```

3. **Environment Variable Support**
   ```bash
   FIGMA_AGENT=claude fig-start       # Override via env var
   ```

4. **Configuration System**
   - Stored in `~/.figma-cli/config.json`
   - Persistent configuration
   - Automatic fallback if configured agent unavailable

5. **Availability Detection**
   - Automatically detects installed agents
   - Offers selection if default unavailable
   - Shows installation instructions if none available

### Selection Priority

1. **CLI Flag** (highest) - `fig-start --agent claude`
2. **Environment Variable** - `FIGMA_AGENT=qwini fig-start`
3. **Configuration File** - `~/.figma-cli/config.json`
4. **Default** (lowest) - `gemini`

### Both Modes Supported

✅ Normal mode: `fig-start [--agent NAME]`
✅ Safe mode: `fig-start --safe [--agent NAME]`

## 7. Suggested Refactor
- **Extract Agent Logic**: Move hardcoded Gemini references to configurable agent system
- **Add Agent Validation**: Check if selected agent CLI is installed before launching
- **Improve Documentation**: Create unified agent documentation format
- **Add Agent Plugins**: Allow custom agents via plugin system
- **Environment Detection**: Auto-detect available agents and offer selection
- **Fallback Handling**: Graceful degradation if preferred agent unavailable

This refactor would make the system more modular and support multiple AI assistants seamlessly.</content>
<parameter name="filePath">e:\figma-cli\PROJECT_ANALYSIS.md