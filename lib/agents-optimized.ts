// Optimized agent data loading with caching and streaming support
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Agent } from './types';
import { normalizeColor, hexToRgb } from './colors';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const DATA_DIR = path.join(process.cwd(), 'data');
const AGENTS_DATA_FILE = path.join(DATA_DIR, 'agents.json');
const SEARCH_INDEX_FILE = path.join(DATA_DIR, 'search-index.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
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
 * @param filePath Path to the markdown file
 * @param category Category name
 * @param includeContent Whether to include full content (default: false for faster loading)
 */
export async function parseAgentFile(
  filePath: string,
  category: string,
  includeContent: boolean = false
): Promise<Agent | null> {
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

    const agent: Partial<Agent> = {
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
      excerpt,
    };

    // Only include content if requested (for metadata-only queries)
    if (includeContent) {
      agent.content = content;
    }

    return agent as Agent;
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all markdown files from a directory recursively
 */
function getMarkdownFiles(dir: string): string[] {
  const files: string[] = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...getMarkdownFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    return [];
  }

  return files;
}

/**
 * Load all agents from metadata cache (fast, for listings)
 */
export async function getAllAgentsMetadata(): Promise<Agent[]> {
  ensureDataDir();

  // Try to load from cache
  if (fs.existsSync(AGENTS_DATA_FILE)) {
    try {
      const cached = JSON.parse(fs.readFileSync(AGENTS_DATA_FILE, 'utf-8'));
      return cached;
    } catch (error) {
      console.warn('Failed to read agents cache, regenerating...');
    }
  }

  // Generate from scratch
  return getAllAgents(false);
}

/**
 * Get all agents (with optional content)
 * @param includeContent Whether to include full markdown content
 */
export async function getAllAgents(includeContent: boolean = false): Promise<Agent[]> {
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

  const agents: Agent[] = [];

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIR, category);

    if (!fs.existsSync(categoryPath)) {
      continue;
    }

    const files = getMarkdownFiles(categoryPath);

    for (const file of files) {
      const agent = await parseAgentFile(file, category, includeContent);
      if (agent) {
        agents.push(agent);
      }
    }
  }

  // Sort by name
  const sorted = agents.sort((a, b) => a.name.localeCompare(b.name));

  // Cache metadata (for faster future loads)
  if (!includeContent) {
    ensureDataDir();
    try {
      fs.writeFileSync(AGENTS_DATA_FILE, JSON.stringify(sorted), 'utf-8');
    } catch (error) {
      console.warn('Failed to write agents cache:', error);
    }
  }

  return sorted;
}

/**
 * Get a single agent by slug (with content)
 */
export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  const agents = await getAllAgents(true);
  return agents.find(agent => agent.slug === slug) || null;
}

/**
 * Get agents by category (metadata only, fast)
 */
export async function getAgentsByCategory(category: string): Promise<Agent[]> {
  const agents = await getAllAgentsMetadata();
  return agents.filter(agent => agent.category === category);
}

/**
 * Get category counts
 */
export async function getCategoryCounts(): Promise<Record<string, number>> {
  const agents = await getAllAgentsMetadata();
  const counts: Record<string, number> = {};

  for (const agent of agents) {
    counts[agent.category] = (counts[agent.category] || 0) + 1;
  }

  return counts;
}

/**
 * Get paginated agents (optimized for home page)
 */
export async function getPaginatedAgents(
  page: number = 1,
  pageSize: number = 12,
  category?: string
): Promise<{ agents: Agent[]; total: number; pages: number; currentPage: number }> {
  let agents = await getAllAgentsMetadata();

  if (category) {
    agents = agents.filter(agent => agent.category === category);
  }

  const total = agents.length;
  const pages = Math.ceil(total / pageSize);
  const validPage = Math.min(Math.max(1, page), pages || 1);
  const startIdx = (validPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedAgents = agents.slice(startIdx, endIdx);

  return {
    agents: paginatedAgents,
    total,
    pages,
    currentPage: validPage,
  };
}

/**
 * Search agents (server-side, can use pre-built index)
 */
export async function searchAgents(
  query: string,
  limit: number = 8
): Promise<Agent[]> {
  if (!query.trim()) return [];

  const agents = await getAllAgentsMetadata();
  const queryLower = query.toLowerCase();

  // Simple search across name, description, category
  return agents
    .filter(
      agent =>
        agent.name.toLowerCase().includes(queryLower) ||
        agent.description.toLowerCase().includes(queryLower) ||
        agent.category.toLowerCase().includes(queryLower) ||
        (agent.vibe?.toLowerCase().includes(queryLower) ?? false)
    )
    .slice(0, limit);
}

/**
 * Invalidate cache (call after adding new agents)
 */
export async function invalidateCache(): Promise<void> {
  ensureDataDir();
  try {
    if (fs.existsSync(AGENTS_DATA_FILE)) {
      fs.unlinkSync(AGENTS_DATA_FILE);
    }
    if (fs.existsSync(SEARCH_INDEX_FILE)) {
      fs.unlinkSync(SEARCH_INDEX_FILE);
    }
    console.log('✅ Agent cache invalidated');
  } catch (error) {
    console.warn('Failed to invalidate cache:', error);
  }
}
