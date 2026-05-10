// Category metadata and utilities

import { Category } from './types';

// Category metadata with emojis and descriptions
export const CATEGORY_METADATA: Record<string, Omit<Category, 'id' | 'count'>> = {
  engineering: {
    label: 'Engineering',
    emoji: '💻',
    description: 'Software development, architecture, and technical implementation specialists',
  },
  design: {
    label: 'Design',
    emoji: '🎨',
    description: 'UI/UX design, visual systems, and creative direction experts',
  },
  marketing: {
    label: 'Marketing',
    emoji: '📢',
    description: 'Content strategy, growth, SEO, and digital marketing professionals',
  },
  'paid-media': {
    label: 'Paid Media',
    emoji: '💰',
    description: 'PPC, paid social, programmatic advertising, and media buying specialists',
  },
  product: {
    label: 'Product',
    emoji: '🚀',
    description: 'Product management, strategy, and user research experts',
  },
  'project-management': {
    label: 'Project Management',
    emoji: '📋',
    description: 'Project coordination, agile methodologies, and delivery management',
  },
  sales: {
    label: 'Sales',
    emoji: '💼',
    description: 'Sales strategy, pipeline management, and deal closing specialists',
  },
  finance: {
    label: 'Finance',
    emoji: '💵',
    description: 'Financial analysis, accounting, investment, and tax strategy experts',
  },
  support: {
    label: 'Support',
    emoji: '🛟',
    description: 'Customer support, infrastructure maintenance, and operational assistance',
  },
  testing: {
    label: 'Testing',
    emoji: '🧪',
    description: 'QA, testing automation, performance benchmarking, and quality assurance',
  },
  specialized: {
    label: 'Specialized',
    emoji: '🎯',
    description: 'Domain-specific experts for unique industries and use cases',
  },
  academic: {
    label: 'Academic',
    emoji: '📚',
    description: 'Research, analysis, and academic writing specialists',
  },
  'game-development': {
    label: 'Game Development',
    emoji: '🎮',
    description: 'Game design, development, and interactive entertainment specialists',
  },
  'spatial-computing': {
    label: 'Spatial Computing',
    emoji: '🥽',
    description: 'AR/VR/XR development and immersive experience specialists',
  },
  strategy: {
    label: 'Strategy',
    emoji: '🎲',
    description: 'Strategic planning, coordination, and executive guidance',
  },
};

/**
 * Get category metadata by ID
 */
export function getCategoryMetadata(categoryId: string): Omit<Category, 'count'> {
  const metadata = CATEGORY_METADATA[categoryId];
  
  if (!metadata) {
    return {
      id: categoryId,
      label: categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, ' '),
      emoji: '📁',
      description: 'Specialized agents',
    };
  }
  
  return {
    id: categoryId,
    ...metadata,
  };
}

/**
 * Get all categories with counts
 */
export function buildCategories(agentCounts: Record<string, number>): Category[] {
  const categories: Category[] = [];
  
  for (const [categoryId, count] of Object.entries(agentCounts)) {
    const metadata = getCategoryMetadata(categoryId);
    categories.push({
      ...metadata,
      count,
    });
  }
  
  // Sort by count descending, then alphabetically
  return categories.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.label.localeCompare(b.label);
  });
}
