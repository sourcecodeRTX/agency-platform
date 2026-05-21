'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Download, Copy } from 'lucide-react';
import { Agent } from '@/lib/types';
import { AgentBadge } from './AgentBadge';
import { getCategoryMetadata } from '@/lib/categories';
import { DownloadModal } from './DownloadModal';
import { EditorSelectionModal } from './EditorSelectionModal';
import { UsageGuideModal } from './UsageGuideModal';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const categoryMeta = getCategoryMetadata(agent.category);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [selectedEditorId, setSelectedEditorId] = useState<string | null>(null);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!agent.content) return;
    
    try {
      await navigator.clipboard.writeText(agent.content);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditorModalOpen(true);
  };

  const handleEditorSelected = (editorId: string) => {
    setSelectedEditorId(editorId);
    setIsEditorModalOpen(false);
  };

  const handleUsageGuideClose = () => {
    setSelectedEditorId(null);
  };

  return (
    <>
      <div
        className="group relative h-full p-6 lg:p-7 rounded-xl border border-border bg-surface card-hover flex flex-col gap-4 transition-all duration-200 hover:border-accent/50"
        style={{
          '--hover-color': agent.colorHex,
        } as React.CSSProperties}
      >
        {/* Top row: emoji and badge */}
        <div className="flex items-start justify-between gap-3">
          <span className="text-4xl lg:text-5xl" role="img" aria-label={agent.name}>
            {agent.emoji}
          </span>
          <AgentBadge
            emoji={categoryMeta.emoji}
            category={agent.category}
            categoryLabel={categoryMeta.label}
          />
        </div>

        {/* Agent name and description */}
        <div className="flex-1 space-y-2 cursor-pointer" onClick={() => window.location.href = `/agents/${agent.slug}`}>
          <h3 className="text-xl lg:text-2xl font-semibold text-text-primary font-mono group-hover:text-accent transition-colors">
            {agent.name}
          </h3>
          <div className="space-y-2">
            <p className={`text-sm lg:text-base text-text-secondary leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
              {agent.description}
            </p>
            {agent.description && agent.description.length > 80 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="text-xs lg:text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Vibe line */}
        <p
          className="text-sm lg:text-base italic min-h-[2.5rem] cursor-pointer"
          onClick={() => window.location.href = `/agents/${agent.slug}`}
          style={{ color: agent.colorHex }}
        >
          &ldquo;{agent.vibe}&rdquo;
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href={`/agents/${agent.slug}`}
            className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-md font-medium text-xs bg-surface-raised hover:bg-border border border-border text-text-primary transition-colors flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowRight className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">View</span>
          </Link>
          
          <button
            onClick={handleCopy}
            disabled={!agent.content}
            className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-md font-medium text-xs bg-surface-raised hover:bg-border border border-border text-text-primary transition-colors flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-surface-raised"
            aria-label="Copy prompt"
            title="Copy prompt"
          >
            <Copy className="w-3 h-3 flex-shrink-0" />
            <span className="truncate text-xs">{copyState === 'copied' ? 'Copied' : 'Copy'}</span>
          </button>
          
          <button
            onClick={handleDownloadClick}
            disabled={!agent.content}
            className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-md font-medium text-xs bg-surface-raised hover:bg-border border border-border text-text-primary transition-colors flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-surface-raised"
            aria-label="Download agent"
            title="Download agent"
          >
            <Download className="w-3 h-3 flex-shrink-0" />
            <span className="truncate text-xs">Download</span>
          </button>
        </div>

        {/* Hover border glow effect */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{
            boxShadow: `0 0 0 1px ${agent.colorHex}, 0 4px 20px ${agent.colorHex}20`,
          }}
        />
      </div>

      {/* Download Modal */}
      <DownloadModal
        agent={agent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Editor Selection Modal */}
      <EditorSelectionModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        onEditorSelected={handleEditorSelected}
      />

      {/* Usage Guide Modal */}
      {selectedEditorId && (
        <UsageGuideModal
          isOpen={selectedEditorId !== null}
          onClose={handleUsageGuideClose}
          agent={agent}
          editorId={selectedEditorId}
        />
      )}
    </>
  );
}
