// Fuse.js search index builder

import Fuse, { IFuseOptions } from 'fuse.js';
import { Agent } from './types';

/**
 * Fuse.js configuration for agent search
 */
export const SEARCH_OPTIONS: IFuseOptions<Agent> = {
  keys: [
    { name: 'name', weight: 3 },
    { name: 'description', weight: 2 },
    { name: 'vibe', weight: 1.5 },
    { name: 'category', weight: 1 },
    { name: 'tools', weight: 0.5 },
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

/**
 * Create a Fuse.js search index from agents
 */
export function createSearchIndex(agents: Agent[]): Fuse<Agent> {
  return new Fuse(agents, SEARCH_OPTIONS);
}

/**
 * Search agents using Fuse.js
 */
export function searchAgents(
  fuse: Fuse<Agent>,
  query: string,
  limit: number = 8
): Array<{ item: Agent; score?: number }> {
  if (!query.trim()) return [];
  
  const results = fuse.search(query, { limit });
  return results.map(result => ({
    item: result.item,
    score: result.score,
  }));
}
