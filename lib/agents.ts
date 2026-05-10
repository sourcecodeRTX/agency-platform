// Core agent data parsing and indexing with caching and ISR optimization

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Agent } from './types';
import { normalizeColor, hexToRgb } from './colors';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'agents-cache.json');

// Ensure cache directory exists
function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

/**
 * Calculate reading time in minutes
 */
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Get excerpt from content (first 160 characters)
 */
function getExcerpt(content: string): string {
  const plainText = content.replace(/[#*`\[\]]/g, '').trim();
  return plainText.slice(0, 160) + (plainText.length > 160 ? '...' : '');
}

/**
 * Parse a single agent markdown file
 */
export async function parseAgentFile(filePath: string, category: string): Promise<Agent | null> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    // Validate required fields
    if (!data.name || !data.description || !data.emoji) {
      console.warn(`Skipping ${filePath}: missing required frontmatter fields`);
      return null;
    }
    
    // Generate slug from filename
    const filename = path.basename(filePath, '.md');
    const slug = filename;
    
    // Normalize color
    const colorHex = normalizeColor(data.color || 'indigo');
    const colorRgb = hexToRgb(colorHex);
    
    // Calculate metrics
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = calculateReadingTime(content);
    const excerpt = getExcerpt(content);
    
    // Render HTML
    const contentHtml = await marked(content);
    
    const agent: Agent = {
      slug,
      name: data.name,
      description: data.description,
      color: data.color || 'indigo',
      emoji: data.emoji,
      vibe: data.vibe || data.description,
      category,
      tools: data.tools,
      services: data.services,
      colorHex,
      colorRgb,
      readingTime,
      wordCount,
      content,
      contentHtml,
      excerpt,
    };
    
    return agent;
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all markdown files from a directory
 */
function getMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively get files from subdirectories
        files.push(...getMarkdownFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
    return [];
  }
  
  return files;
}

/**
 * Get all agents from all category folders with caching
 */
export async function getAllAgents(): Promise<Agent[]> {
  ensureCacheDir();
  
  // Check if cache exists and is fresh (within 1 hour)
  if (fs.existsSync(CACHE_FILE)) {
    const cacheStats = fs.statSync(CACHE_FILE);
    const cacheAge = Date.now() - cacheStats.mtimeMs;
    const oneHour = 60 * 60 * 1000;
    
    if (cacheAge < oneHour && process.env.NODE_ENV === 'production') {
      try {
        const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
        return cached;
      } catch (error) {
        console.warn('Failed to read cache, regenerating...');
      }
    }
  }
  
  const agents: Agent[] = [];
  
  // Category folders to scan
  const categories = [
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
  
  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIR, category);
    
    if (!fs.existsSync(categoryPath)) {
      continue;
    }
    
    const files = getMarkdownFiles(categoryPath);
    
    for (const file of files) {
      const agent = await parseAgentFile(file, category);
      if (agent) {
        agents.push(agent);
      }
    }
  }
  
  // Sort by name
  const sorted = agents.sort((a, b) => a.name.localeCompare(b.name));
  
  // Write to cache
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(sorted), 'utf-8');
  } catch (error) {
    console.warn('Failed to write cache:', error);
  }
  
  return sorted;
}

/**
 * Get a single agent by slug
 */
export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  const agents = await getAllAgents();
  return agents.find(agent => agent.slug === slug) || null;
}

/**
 * Get agents by category
 */
export async function getAgentsByCategory(category: string): Promise<Agent[]> {
  const agents = await getAllAgents();
  return agents.filter(agent => agent.category === category);
}

/**
 * Get category counts
 */
export async function getCategoryCounts(): Promise<Record<string, number>> {
  const agents = await getAllAgents();
  const counts: Record<string, number> = {};
  
  for (const agent of agents) {
    counts[agent.category] = (counts[agent.category] || 0) + 1;
  }
  
  return counts;
}

/**
 * Get paginated agents
 */
export async function getPaginatedAgents(
  page: number = 1,
  pageSize: number = 12,
  category?: string
): Promise<{ agents: Agent[]; total: number; pages: number; currentPage: number }> {
  let agents = await getAllAgents();
  
  if (category) {
    agents = agents.filter(agent => agent.category === category);
  }
  
  const total = agents.length;
  const pages = Math.ceil(total / pageSize);
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedAgents = agents.slice(startIdx, endIdx);
  
  return {
    agents: paginatedAgents,
    total,
    pages,
    currentPage: page,
  };
}

/**
 * Get lightweight agent index (no HTML content)
 */
export async function getAgentIndex(): Promise<Array<Omit<Agent, 'contentHtml' | 'content'>>> {
  const agents = await getAllAgents();
  return agents.map(({ content, contentHtml, ...agent }) => agent);
}

/**
 * Prefetch agents for a category (for background loading)
 */
export async function prefetchCategory(category: string): Promise<void> {
  const categoryPath = path.join(CONTENT_DIR, category);
  if (fs.existsSync(categoryPath)) {
    const files = getMarkdownFiles(categoryPath);
    for (const file of files) {
      await parseAgentFile(file, category);
    }
  }
}

