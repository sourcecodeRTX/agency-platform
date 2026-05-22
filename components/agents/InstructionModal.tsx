'use client';

import { Agent } from '@/lib/types';
import { X, Download } from 'lucide-react';
import { useEffect } from 'react';
import { getEditorConfig } from '@/lib/editors-config-v2';

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
  editorId: string;
}

export function InstructionModal({
  isOpen,
  onClose,
  agent,
  editorId,
}: InstructionModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    if (!agent.content) return;

    // Create markdown file with frontmatter
    const markdown = `---
name: ${agent.name}
description: ${agent.description}
category: ${agent.category}
emoji: ${agent.emoji}
color: ${agent.colorHex}
vibe: ${agent.vibe}
---

${agent.content}`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${agent.slug}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  const editorConfig = getEditorConfig(editorId);
  if (!editorConfig) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-2xl bg-surface border border-border rounded-xl shadow-xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="instruction-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-surface z-10">
          <div className="flex items-center gap-4">
            <span className="text-3xl" role="img" aria-label={editorConfig.name}>
              {editorConfig.icon}
            </span>
            <div>
              <h2
                id="instruction-modal-title"
                className="text-xl font-semibold text-text-primary font-mono"
              >
                {editorConfig.name}
              </h2>
              <p className="text-text-secondary text-sm">
                Setup Instructions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-raised transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-text-secondary hover:text-text-primary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Editor Info Section */}
          <div className="p-4 rounded-lg bg-surface-raised border-l-4 border-accent">
            <p className="text-text-primary leading-relaxed text-sm">
              {editorConfig.description}
            </p>
          </div>

          {/* Instructions Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">
              Setup Steps
            </h3>
            <div className="space-y-3 bg-surface-raised p-5 rounded-lg border border-border">
              {editorConfig.usageGuide.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-3 text-text-secondary text-sm"
                >
                  <span className="text-text-primary font-medium flex-shrink-0 min-w-fit">
                    {step.split('.')[0]}.
                  </span>
                  <span>{step.split('. ').slice(1).join('. ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Info */}
          <div className="p-4 rounded-lg bg-surface-raised border border-border">
            <div className="flex items-start gap-3">
              <span className="text-3xl flex-shrink-0" role="img" aria-label={agent.name}>
                {agent.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-text-secondary text-xs uppercase tracking-wider font-semibold">
                  Agent Prompt
                </p>
                <p className="font-semibold text-text-primary mt-1">{agent.name}</p>
                <p className="text-text-secondary text-sm mt-1 line-clamp-2">
                  {agent.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border sticky bottom-0 bg-surface flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm text-text-primary bg-surface-raised hover:bg-border border border-border transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm bg-accent hover:bg-accent/90 text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Download File
          </button>
        </div>
      </div>
    </div>
  );
}
