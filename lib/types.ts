// Core TypeScript types for the Agency platform

export interface Agent {
  // From frontmatter
  slug: string;           // derived from filename: "engineering-frontend-developer"
  name: string;           // "Frontend Developer"
  description: string;    // one-line summary
  color: string;          // "#2563EB" or "cyan" — normalized to hex
  emoji: string;          // "🖥️"
  vibe: string;           // personality hook line
  category: string;       // derived from folder: "engineering"
  tools?: string;         // optional tools field
  services?: Service[];   // optional external service dependencies

  // Derived at build time
  colorHex: string;       // always a valid hex, even if input was "cyan"
  colorRgb: string;       // "37, 99, 235" — for CSS rgba() usage
  readingTime: number;    // estimated minutes to read full agent
  wordCount: number;

  // Content
  content: string;        // full markdown body
  contentHtml: string;    // rendered HTML for detail view
  excerpt: string;        // first 160 chars of body for meta description
}

export interface Category {
  id: string;             // "engineering"
  label: string;          // "Engineering"
  emoji: string;          // "💻"
  count: number;
  description: string;
}

export interface Service {
  name: string;
  url: string;
  tier: 'free' | 'freemium' | 'paid';
}

export interface SearchResult {
  item: Agent;
  score?: number;
  matches?: Array<{
    indices: Array<[number, number]>;
    value?: string;
    key?: string;
  }>;
}

export interface FilterState {
  category: string | null;
  searchQuery: string;
  favorites: string[];
}
