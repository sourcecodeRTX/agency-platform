import { getAllAgentsMetadata, getCategoryCounts } from '@/lib/agents-optimized';
import { buildCategories } from '@/lib/categories';
import { HomeClient } from './HomeClient';

// ISR configuration: revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

// Generate static parameters for better performance
export async function generateMetadata() {
  return {
    title: 'The Agency — AI Agent Specialists',
    description: 'A curated directory of AI agent personalities ready to deploy in Claude, Copilot, Cursor, and other AI tools.',
  };
}

export default async function HomePage() {
  // Fetch all agents at build time with ISR
  const agents = await getAllAgentsMetadata();
  const categoryCounts = await getCategoryCounts();
  const categories = buildCategories(categoryCounts);

  return <HomeClient agents={agents} categories={categories} />;
}
