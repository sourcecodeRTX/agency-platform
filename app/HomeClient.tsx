'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Agent, Category } from '@/lib/types';
import { AgentGrid } from '@/components/agents/AgentGrid';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { Pagination } from '@/components/ui/Pagination';
import { createSearchIndex } from '@/lib/search-index';
import Fuse from 'fuse.js';

interface HomeClientProps {
  agents: Agent[];
  categories: Category[];
}

const AGENTS_PER_PAGE = 12;

export function HomeClient({ agents, categories }: HomeClientProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchIndex, setSearchIndex] = useState<Fuse<Agent> | null>(null);

  // Initialize search index
  useEffect(() => {
    setSearchIndex(createSearchIndex(agents));
  }, [agents]);

  // Load pagination state from URL
  useEffect(() => {
    const page = searchParams.get('page');
    const category = searchParams.get('category');
    
    if (page) {
      setCurrentPage(Math.max(1, parseInt(page, 10)));
    }
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

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

  // Paginate results
  const paginationData = useMemo(() => {
    const total = filteredAgents.length;
    const pages = Math.ceil(total / AGENTS_PER_PAGE);
    const validPage = Math.min(currentPage, pages || 1);
    const startIdx = (validPage - 1) * AGENTS_PER_PAGE;
    const endIdx = startIdx + AGENTS_PER_PAGE;
    
    return {
      agents: filteredAgents.slice(startIdx, endIdx),
      total,
      pages,
      currentPage: validPage,
    };
  }, [filteredAgents, currentPage]);

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
            {paginationData.total}+ AI Specialists Ready to Deploy
          </p>
          <p className="text-base text-text-muted max-w-2xl mx-auto">
            Browse specialized AI agent personalities for engineering, design, marketing, and more.
            Copy any agent and drop it into Claude, Copilot, Cursor, or your favorite AI tool.
          </p>

          {/* Search bar */}
          <div className="pt-4">
            <SearchBar
              value={searchQuery}
              onChange={(query) => {
                setSearchQuery(query);
                setCurrentPage(1);
              }}
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
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
          totalCount={agents.length}
        />
      </section>

      {/* Results count */}
      <section className="container-custom mb-6">
        <p className="text-sm text-text-muted">
          Showing {paginationData.agents.length} of {paginationData.total} agents
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
        <AgentGrid agents={paginationData.agents} />
      </section>

      {/* Pagination */}
      {paginationData.pages > 1 && (
        <Pagination
          currentPage={paginationData.currentPage}
          totalPages={paginationData.pages}
          baseUrl="/"
          category={selectedCategory || undefined}
        />
      )}
    </div>
  );
}
