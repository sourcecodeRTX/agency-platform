#!/usr/bin/env node
// Script to validate agent structure and naming

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const VALID_CATEGORIES = [
  'academic',
  'design',
  'engineering',
  'finance',
  'game-development',
  'marketing',
  'paid-media',
  'product',
  'project-management',
  'sales',
  'spatial-computing',
  'specialized',
  'strategy',
  'support',
  'testing',
];

interface ValidationIssue {
  file: string;
  type: 'error' | 'warning';
  message: string;
}

const issues: ValidationIssue[] = [];

/**
 * Validate a single agent file
 */
function validateAgentFile(filePath: string): void {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const filename = path.basename(filePath);
    const relativePath = path.relative(CONTENT_DIR, filePath);

    // Check filename format
    if (!filename.match(/^[a-z0-9-]+\.md$/)) {
      issues.push({
        file: relativePath,
        type: 'error',
        message: `Invalid filename format: "${filename}" (use lowercase with hyphens)`,
      });
    }

    // Check frontmatter fields
    const required = ['name', 'description', 'emoji', 'category'];
    for (const field of required) {
      if (!data[field]) {
        issues.push({
          file: relativePath,
          type: 'error',
          message: `Missing required field: ${field}`,
        });
      }
    }

    // Check category is valid
    if (data.category && !VALID_CATEGORIES.includes(data.category)) {
      issues.push({
        file: relativePath,
        type: 'error',
        message: `Invalid category: "${data.category}" (valid: ${VALID_CATEGORIES.join(', ')})`,
      });
    }

    // Check field lengths
    if (data.name && (data.name.length < 5 || data.name.length > 100)) {
      issues.push({
        file: relativePath,
        type: 'warning',
        message: `Name length is ${data.name.length} (recommended 5-100 chars)`,
      });
    }

    if (data.description && (data.description.length < 20 || data.description.length > 200)) {
      issues.push({
        file: relativePath,
        type: 'warning',
        message: `Description length is ${data.description.length} (recommended 20-200 chars)`,
      });
    }

    // Check content length
    const wordCount = content.trim().split(/\s+/).length;
    if (wordCount < 50) {
      issues.push({
        file: relativePath,
        type: 'warning',
        message: `Content is too short: ${wordCount} words (recommended 150-500)`,
      });
    }

    if (wordCount > 2000) {
      issues.push({
        file: relativePath,
        type: 'warning',
        message: `Content is very long: ${wordCount} words (recommended 150-500)`,
      });
    }

    // Check for emoji
    if (data.emoji && data.emoji.length > 2) {
      issues.push({
        file: relativePath,
        type: 'warning',
        message: `Emoji should be single character: "${data.emoji}"`,
      });
    }
  } catch (error) {
    issues.push({
      file: path.relative(CONTENT_DIR, filePath),
      type: 'error',
      message: `Failed to parse: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

/**
 * Recursively validate all agents
 */
function validateAgents(dir: string): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      validateAgents(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      validateAgentFile(fullPath);
    }
  }
}

// Run validation
console.log('🔍 Validating agent files...\n');

if (!fs.existsSync(CONTENT_DIR)) {
  console.error('❌ Content directory not found:', CONTENT_DIR);
  process.exit(1);
}

validateAgents(CONTENT_DIR);

// Report results
if (issues.length === 0) {
  console.log('✅ All agents are valid!\n');
  process.exit(0);
}

// Group by type
const errors = issues.filter(i => i.type === 'error');
const warnings = issues.filter(i => i.type === 'warning');

if (errors.length > 0) {
  console.log(`❌ ERRORS (${errors.length}):\n`);
  for (const issue of errors) {
    console.log(`  ${issue.file}`);
    console.log(`    → ${issue.message}\n`);
  }
}

if (warnings.length > 0) {
  console.log(`⚠️  WARNINGS (${warnings.length}):\n`);
  for (const issue of warnings) {
    console.log(`  ${issue.file}`);
    console.log(`    → ${issue.message}\n`);
  }
}

console.log(`\n📊 Summary: ${errors.length} errors, ${warnings.length} warnings\n`);

process.exit(errors.length > 0 ? 1 : 0);
