#!/usr/bin/env node
// Script to build agent data files for fast loading

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllAgents, getAllAgentsMetadata } from '../lib/agents-optimized.js';
import Fuse from 'fuse.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log('✅ Created data directory');
}

async function buildAgentData() {
  try {
    console.log('📦 Building agent data files...');

    // Load all agents (metadata only for speed)
    console.log('  → Loading agents...');
    const agents = await getAllAgentsMetadata();
    console.log(`  ✅ Loaded ${agents.length} agents`);

    // Write agents.json (metadata only)
    const agentsFile = path.join(DATA_DIR, 'agents.json');
    fs.writeFileSync(agentsFile, JSON.stringify(agents, null, 2), 'utf-8');
    const agentsSize = (fs.statSync(agentsFile).size / 1024).toFixed(2);
    console.log(`  ✅ Written agents.json (${agentsSize}KB)`);

    // Build search index (optional, if using Fuse.js)
    console.log('  → Building search index...');
    const searchOptions = {
      keys: [
        { name: 'name', weight: 3 },
        { name: 'description', weight: 2 },
        { name: 'vibe', weight: 1.5 },
        { name: 'category', weight: 1 },
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    };

    const fuse = new Fuse(agents, searchOptions);
    const indexFile = path.join(DATA_DIR, 'search-index.json');
    fs.writeFileSync(indexFile, JSON.stringify(fuse.getIndex()), 'utf-8');
    const indexSize = (fs.statSync(indexFile).size / 1024).toFixed(2);
    console.log(`  ✅ Built search-index.json (${indexSize}KB)`);

    // Build categories.json
    console.log('  → Building categories...');
    const categories = {};
    for (const agent of agents) {
      if (!categories[agent.category]) {
        categories[agent.category] = {
          name: agent.category,
          count: 0,
          emoji: '', // Will be set by categories.ts
        };
      }
      categories[agent.category].count++;
    }

    const categoriesFile = path.join(DATA_DIR, 'categories.json');
    fs.writeFileSync(categoriesFile, JSON.stringify(categories, null, 2), 'utf-8');
    console.log(`  ✅ Built categories.json`);

    // Build manifest
    console.log('  → Building manifest...');
    const manifest = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      totalAgents: agents.length,
      categories: Object.keys(categories).length,
      files: {
        agents: agentsFile,
        searchIndex: indexFile,
        categories: categoriesFile,
      },
    };

    const manifestFile = path.join(DATA_DIR, 'manifest.json');
    fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2), 'utf-8');
    console.log(`  ✅ Built manifest.json`);

    console.log('');
    console.log('✨ Agent data build complete!');
    console.log(`   • ${agents.length} agents indexed`);
    console.log(`   • ${Object.keys(categories).length} categories`);
    console.log(`   • Data files: ${agentsSize}KB total`);
    console.log('');
  } catch (error) {
    console.error('❌ Error building agent data:', error);
    process.exit(1);
  }
}

// Run build
buildAgentData();
