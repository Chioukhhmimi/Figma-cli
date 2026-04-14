/**
 * Agent Manager
 * Handles multi-agent support (gemini, claude, qwencode)
 * Executes CLI agents, handles verification, and provides abstraction
 */

import { spawn, execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { getDefaultAgent, getConfig, setConfig } from './config.js';
import { homedir } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Resolve the repo root (works whether CWD is figma-cli or elsewhere)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = join(__dirname, '..');

export const SUPPORTED_AGENTS = ['gemini', 'claude', 'qwencode'];

const AGENT_ALIASES = {
  qwini: 'qwencode',
  qwen: 'qwencode',
  'qwen-code': 'qwencode'
};

export function normalizeAgentName(agentName) {
  if (!agentName) return agentName;
  const key = String(agentName).toLowerCase();
  return AGENT_ALIASES[key] || key;
}

export const AGENT_CONFIG = {
  gemini: {
    command: 'gemini',
    // Gemini CLI reads GEMINI.md from cwd automatically
    docsFile: 'GEMINI.md',
    description: 'Google Gemini AI 2.0'
  },
  claude: {
    command: 'claude',
    // Claude Code reads CLAUDE.md from cwd automatically
    docsFile: 'CLAUDE.md',
    description: 'Anthropic Claude'
  },
  qwencode: {
    command: 'qwen',
    // Qwen Code reads QWENCODE.md from cwd automatically
    docsFile: 'QWENCODE.md',
    description: 'Alibaba Qwen Code (qwen.ai/qwencode)'
  }
};

// ─────────────────────────────────────────────
// FIGMA_CONTEXT injection
// ─────────────────────────────────────────────

/**
 * Load FIGMA_CONTEXT.md from repo root.
 * Returns empty string (with a warning) if the file doesn't exist yet.
 */
function loadFigmaContext() {
  const contextPath = join(REPO_ROOT, 'FIGMA_CONTEXT.md');
  if (!existsSync(contextPath)) {
    console.warn('[agent-manager] FIGMA_CONTEXT.md not found at:', contextPath);
    console.warn('[agent-manager] Create it at the project root to inject design context into all agents.');
    return '';
  }
  return readFileSync(contextPath, 'utf-8');
}

/**
 * Merge FIGMA_CONTEXT.md into the agent's docs file so the agent
 * receives design context automatically when it starts.
 *
 * Strategy:
 *  - Read FIGMA_CONTEXT.md (shared design rules)
 *  - Read the agent's existing docs file (agent-specific commands)
 *  - Write a merged version back to the docs file in REPO_ROOT
 *
 * The merge is non-destructive: we look for a marker so we don't
 * keep appending on every launch.
 */
function injectContextIntoDocs(agentName) {
  const figmaContext = loadFigmaContext();
  if (!figmaContext) return; // nothing to inject

  const { docsFile } = AGENT_CONFIG[agentName];
  const docsPath = join(REPO_ROOT, docsFile);

  // Read existing docs (empty string if file doesn't exist yet)
  const existingDocs = existsSync(docsPath)
    ? readFileSync(docsPath, 'utf-8')
    : '';

  const MARKER_START = '<!-- FIGMA_CONTEXT:START -->';
  const MARKER_END   = '<!-- FIGMA_CONTEXT:END -->';

  const injectedBlock =
    `${MARKER_START}\n` +
    `<!-- Auto-injected from FIGMA_CONTEXT.md — edit that file, not this block -->\n` +
    `${figmaContext}\n` +
    `${MARKER_END}`;

  let mergedDocs;

  if (existingDocs.includes(MARKER_START)) {
    // Replace existing injected block
    const regex = new RegExp(
      `${MARKER_START}[\\s\\S]*?${MARKER_END}`,
      'g'
    );
    mergedDocs = existingDocs.replace(regex, injectedBlock);
  } else {
    // Prepend to the top so the agent reads design context first
    mergedDocs = `${injectedBlock}\n\n${existingDocs}`;
  }

  writeFileSync(docsPath, mergedDocs, 'utf-8');
  console.log(`[agent-manager] ✓ FIGMA_CONTEXT injected into ${docsFile}`);
}

// ─────────────────────────────────────────────
// Agent availability
// ─────────────────────────────────────────────

/**
 * Check if an agent is installed/available
 */
export function isAgentAvailable(agentName) {
  try {
    const normalized = normalizeAgentName(agentName);
    const packageMap = {
      gemini:   '@google/generative-ai',
      claude:   '@anthropic-ai/sdk',
      qwencode: '@qwen-code/qwen-code'
    };

    const packageName = packageMap[normalized];
    if (!packageName) return false;

    const npmList = execSync('npm list -g --depth=0', { encoding: 'utf8', stdio: 'pipe' });
    return npmList.includes(packageName);
  } catch {
    return false;
  }
}

/**
 * Get list of available agents
 */
export function getAvailableAgents() {
  return SUPPORTED_AGENTS.filter(isAgentAvailable);
}

/**
 * Get agent configuration
 */
export function getAgentConfig(agentName) {
  const normalized = normalizeAgentName(agentName);
  if (!SUPPORTED_AGENTS.includes(normalized)) {
    throw new Error(`Unknown agent: ${agentName}`);
  }
  return AGENT_CONFIG[normalized];
}

// ─────────────────────────────────────────────
// Launch
// ─────────────────────────────────────────────

/**
 * Get the npm global bin directory
 */
function getNpmBinDir() {
  try {
    const npmPrefixOutput = execSync('npm config get prefix', { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    }).trim();
    
    if (!npmPrefixOutput) return null;

    const IS_WIN = process.platform === 'win32';
    // On Windows, bins are directly in prefix; on Unix, they're in prefix/bin
    return IS_WIN ? npmPrefixOutput : join(npmPrefixOutput, 'bin');
  } catch {
    return null;
  }
}

/**
 * Launch an AI agent as a subprocess.
 * Before spawning, FIGMA_CONTEXT.md is merged into the agent's docs file
 * so the agent boots with full design context.
 *
 * @param {string} agentName - 'gemini' | 'claude' | 'qwencode'
 * @param {object} options   - { stdio, env, cwd }
 */
export function launchAgent(agentName, options = {}) {
  const normalized = normalizeAgentName(agentName);
  if (!SUPPORTED_AGENTS.includes(normalized)) {
    throw new Error(`Unknown agent: ${agentName}`);
  }

  if (!isAgentAvailable(normalized)) {
    throw new Error(`Agent not installed: ${agentName}`);
  }

  // ← Key step: inject shared design context before the agent starts
  injectContextIntoDocs(normalized);

  const agent = AGENT_CONFIG[normalized];

  // Ensure npm global bin is in PATH so agent command can be found
  const npmBinDir = getNpmBinDir();
  const env = { ...process.env };
  if (npmBinDir) {
    env.PATH = npmBinDir + (process.platform === 'win32' ? ';' : ':') + (env.PATH || '');
  }

  const defaultOptions = {
    stdio: 'inherit',
    env,
    // Run from repo root so the agent finds its docs file
    cwd: REPO_ROOT,
    // On Windows, allow .cmd files to be executed via shell
    shell: process.platform === 'win32'
  };

  const finalOptions = { ...defaultOptions, ...options };

  // Use the command name directly - npm installations should add to PATH
  const child = spawn(agent.command, [], finalOptions);
  return child;
}

// ─────────────────────────────────────────────
// Config helpers
// ─────────────────────────────────────────────

/**
 * Set and verify default agent
 */
export function setDefaultAgentWithValidation(agentName) {
  const normalized = normalizeAgentName(agentName);
  if (!SUPPORTED_AGENTS.includes(normalized)) {
    throw new Error(`Unknown agent: ${agentName}. Supported: ${SUPPORTED_AGENTS.join(', ')}`);
  }

  if (!isAgentAvailable(normalized)) {
    throw new Error(`Agent not installed: ${agentName}`);
  }

  setConfig('defaultAgent', normalized);
  return true;
}

/**
 * Get the effective agent to use (from env, param, or config default)
 */
export function getEffectiveAgent(envOverride = null) {
  const candidate = envOverride || process.env.FIGMA_AGENT;
  if (candidate) {
    const normalized = normalizeAgentName(candidate);
    if (SUPPORTED_AGENTS.includes(normalized)) {
      return normalized;
    }
  }

  return getDefaultAgent();
}

/**
 * Get docs file path for an agent
 */
export function getAgentDocsPath(agentName, repoPath) {
  const agent = getAgentConfig(agentName);
  return join(repoPath || REPO_ROOT, agent.docsFile);
}

/**
 * Verify agent docs exist
 */
export function verifyAgentDocs(agentName, repoPath) {
  const docsPath = getAgentDocsPath(agentName, repoPath);
  return existsSync(docsPath);
}