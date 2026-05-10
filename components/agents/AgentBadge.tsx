interface AgentBadgeProps {
  emoji: string;
  category: string;
  categoryLabel?: string;
}

export function AgentBadge({ emoji, category, categoryLabel }: AgentBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-raised border border-border text-xs font-medium text-text-secondary">
      <span>{emoji}</span>
      <span>{categoryLabel || category}</span>
    </div>
  );
}
