import { getAllAgents, getCategoryCounts } from '@/lib/agents';
import { buildCategories } from '@/lib/categories';
import { HomeClient } from './HomeClient';

export default async function HomePage() {
  // Fetch all agents at build time
  const agents = await getAllAgents();
  const categoryCounts = await getCategoryCounts();
  const categories = buildCategories(categoryCounts);

  return <HomeClient agents={agents} categories={categories} />;
}
