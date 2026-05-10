'use client';

import { useState, useEffect, useMemo } from 'react';
import { Agent, Category } from '@/lib/types';
import { AgentGrid } from '@/components/agents/AgentGrid';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { createSearchIndex } from '@/lib/search-index';
import Fuse from 'fuse.js';

interface HomeClientProps {
  agents: Agent[];
  categories: Category[];
}

export function HomeClient({ agents, categories }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchIndex, setSearchIndex] = useState<Fuse<Agent> | null>(null);

  // Initialize search index
  useEffect(() => {
    setSearchIndex(createSearchIndex(agents));
  }, [agents]);

  // Filter and search agents
  const filteredAgents = useMemo(() => {
    let result = agents;

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((agent) => agent.category === selectedCategory);
    }

    // Apply search
    if (searchQuery.trim() && searchIndex) {
      const searchResults = searchIndex.search(searchQuery, { limit: 100 });
      const searchedSlugs = new Set(searchResults.map((r) => r.item.slug));
      result = result.filter((agent) => searchedSlugs.has(agent.slug));
    }

    return result;
  }, [agents, selectedCategory, searchQuery, searchIndex]);

  return (
    <div className="py-12">
      {/* Hero section */}
      <section className="container-custom mb-16">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary">
            <span className="text-6xl md:text-7xl block mb-2">🎭</span>
            The Agency
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary text-balance">
            200+ AI Specialists Ready to Deploy
          </p>
          <p className="text-base text-text-muted max-w-2xl mx-auto">
            Browse specialized AI agent personalities for engineering, design, marketing, and more.
            Copy any agent and drop it into Claude, Copilot, Cursor, or your favorite AI tool.
          </p>

          {/* Search bar */}
          <div className="pt-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search agents by name, description, or category..."
            />
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="container-custom mb-12">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          totalCount={agents.length}
        />
      </section>

      {/* Results count */}
      <section className="container-custom mb-6">
        <p className="text-sm text-text-muted">
          Showing {filteredAgents.length} of {agents.length} agents
          {selectedCategory && (
            <span>
              {' '}
              in{' '}
              <span className="text-accent font-medium">
                {categories.find((c) => c.id === selectedCategory)?.label}
              </span>
            </span>
          )}
          {searchQuery && (
            <span>
              {' '}
              matching{' '}
              <span className="text-accent font-medium">&ldquo;{searchQuery}&rdquo;</span>
            </span>
          )}
        </p>
      </section>

      {/* Agent grid */}
      <section className="container-custom">
        <AgentGrid agents={filteredAgents} />
      </section>
    </div>
  );
}
