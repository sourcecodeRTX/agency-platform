'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Download, Copy } from 'lucide-react';
import { Agent } from '@/lib/types';
import { AgentBadge } from './AgentBadge';
import { getCategoryMetadata } from '@/lib/categories';
import { EditorSelectionModal } from './EditorSelectionModal';
import { InstructionModal } from './InstructionModal';

interface AgentCardProps {
  agent: Agent;
  downloadOnly?: boolean;
}

export function AgentCard({ agent, downloadOnly = false }: AgentCardProps) {
  const categoryMeta = getCategoryMetadata(agent.category);
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [selectedEditorId, setSelectedEditorId] = useState<string | null>(null);
  const [agentContent, setAgentContent] = useState<string | undefined>(agent.content);
  const [isLoadingContent, setIsLoadingContent] = useState(!agent.content);

  // Load full agent content if not already loaded
  useEffect(() => {
    if (agent.content) {
      setAgentContent(agent.content);
      setIsLoadingContent(false);
      return;
    }

    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/agents/${agent.slug}`);
        if (response.ok) {
          const data = await response.json();
          setAgentContent(data.content);
        }
      } catch (error) {
        console.error('Failed to fetch agent content:', error);
      } finally {
        setIsLoadingContent(false);
      }
    };

    fetchContent();
  }, [agent.slug, agent.content]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!agentContent) return;
    
    try {
      await navigator.clipboard.writeText(agentContent);
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

  const handleInstructionModalClose = () => {
    setSelectedEditorId(null);
  };

  return (
    <>
      {downloadOnly ? (
        // Download-only mode (for detail page)
        <button
          onClick={handleDownloadClick}
          disabled={isLoadingContent || !agentContent}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-base bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Download agent"
          title="Download agent"
        >
          <Download className="w-5 h-5" />
          <span>Download Agent</span>
        </button>
      ) : (
        // Full card mode
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
              disabled={isLoadingContent || !agentContent}
              className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-md font-medium text-xs bg-surface-raised hover:bg-border border border-border text-text-primary transition-colors flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-surface-raised"
              aria-label="Copy prompt"
              title="Copy prompt"
            >
              <Copy className="w-3 h-3 flex-shrink-0" />
              <span className="truncate text-xs">{copyState === 'copied' ? 'Copied' : 'Copy'}</span>
            </button>
            
            <button
              onClick={handleDownloadClick}
              disabled={isLoadingContent || !agentContent}
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
      )}

      {/* Editor Selection Modal */}
      <EditorSelectionModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        onEditorSelected={handleEditorSelected}
      />

      {/* Instruction Modal */}
      {selectedEditorId && (
        <InstructionModal
          isOpen={selectedEditorId !== null}
          onClose={handleInstructionModalClose}
          agent={{...agent, content: agentContent || agent.content}}
          editorId={selectedEditorId}
        />
      )}
    </>
  );
}
