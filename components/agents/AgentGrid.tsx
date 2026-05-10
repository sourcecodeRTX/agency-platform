'use client';

import { Agent } from '@/lib/types';
import { AgentCard } from './AgentCard';

interface AgentGridProps {
  agents: Agent[];
  limit?: number;
}

export function AgentGrid({ agents, limit }: AgentGridProps) {
  const displayedAgents = limit ? agents.slice(0, limit) : agents;

  if (agents.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl mb-2">🔍</p>
        <p className="text-lg text-text-secondary">No agents found</p>
        <p className="text-sm text-text-muted mt-2">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayedAgents.map((agent, index) => (
        <AgentCard key={agent.slug} agent={agent} index={index} />
      ))}
    </div>
  );
}
