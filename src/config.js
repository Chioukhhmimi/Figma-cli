/**
 * Configuration Management
 * Stores settings like default agent in ~/.figma-cli/config.json
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const CONFIG_DIR = join(homedir(), '.figma-cli');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

// Ensure config directory exists
function ensureConfigDir() {
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

// Read entire config
export function readConfig() {
  ensureConfigDir();
  try {
    if (existsSync(CONFIG_FILE)) {
      const data = readFileSync(CONFIG_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    // Silently ignore parse errors, return empty config
  }
  return {};
}

// Write entire config
export function writeConfig(config) {
  ensureConfigDir();
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

// Get a specific config value
export function getConfig(key, defaultValue = null) {
  const config = readConfig();
  return config[key] !== undefined ? config[key] : defaultValue;
}

// Set a specific config value
export function setConfig(key, value) {
  const config = readConfig();
  config[key] = value;
  writeConfig(config);
}

// Get default agent
export function getDefaultAgent() {
  return getConfig('defaultAgent', 'gemini');
}

// Set default agent
export function setDefaultAgent(agent) {
  setConfig('defaultAgent', agent);
}

// Get repo path
export function getRepoPath() {
  return getConfig('repoPath', null);
}

// Set repo path
export function setRepoPath(path) {
  setConfig('repoPath', path);
}
