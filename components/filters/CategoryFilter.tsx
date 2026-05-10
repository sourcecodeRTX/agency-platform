'use client';

import { Category } from '@/lib/types';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  totalCount: number;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  totalCount,
}: CategoryFilterProps) {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {/* All category */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === null
              ? 'bg-accent text-white'
              : 'bg-surface hover:bg-surface-raised border border-border text-text-secondary'
          }`}
        >
          All {totalCount}
        </button>

        {/* Category pills */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-accent text-white'
                : 'bg-surface hover:bg-surface-raised border border-border text-text-secondary'
            }`}
          >
            <span>{category.emoji}</span>
            <span>
              {category.label} {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Fade gradient for scroll indication */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}
