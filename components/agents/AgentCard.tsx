'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Agent } from '@/lib/types';
import { AgentBadge } from './AgentBadge';
import { CopyButton } from './CopyButton';
import { getCategoryMetadata } from '@/lib/categories';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const categoryMeta = getCategoryMetadata(agent.category);

  return (
    <div
      className="group relative h-full p-6 rounded-xl border border-border bg-surface card-hover flex flex-col gap-4 transition-all duration-200 hover:border-accent/50"
      style={{
        '--hover-color': agent.colorHex,
      } as React.CSSProperties}
    >
      {/* Top row: emoji and badge */}
      <div className="flex items-start justify-between gap-3">
        <span className="text-4xl" role="img" aria-label={agent.name}>
          {agent.emoji}
        </span>
        <AgentBadge
          emoji={categoryMeta.emoji}
          category={agent.category}
          categoryLabel={categoryMeta.label}
        />
      </div>

      {/* Agent name and description */}
      <div className="flex-1 space-y-2">
        <h3 className="text-xl font-semibold text-text-primary font-mono group-hover:text-accent transition-colors">
          {agent.name}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
          {agent.description}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Vibe line */}
      <p
        className="text-sm italic min-h-[2.5rem]"
        style={{ color: agent.colorHex }}
      >
        &ldquo;{agent.vibe}&rdquo;
      </p>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {agent.content && (
          <CopyButton content={agent.content} label="Copy" className="flex-1" />
        )}
        <Link
          href={`/agents/${agent.slug}`}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm bg-surface-raised hover:bg-border border border-border transition-colors"
        >
          View
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Hover border glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{
          boxShadow: `0 0 0 1px ${agent.colorHex}, 0 4px 20px ${agent.colorHex}20`,
        }}
      />
    </div>
  );
}
