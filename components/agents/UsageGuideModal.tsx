'use client';

import { Agent } from '@/lib/types';
import { X, Download } from 'lucide-react';
import { useEffect } from 'react';
import { getEditorConfig } from '@/lib/editors-config-v2';

interface UsageGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
  editorId: string;
}

export function UsageGuideModal({
  isOpen,
  onClose,
  agent,
  editorId,
}: UsageGuideModalProps) {
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

    const blob = new Blob([agent.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${agent.slug}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
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
        className="relative w-full max-w-2xl bg-surface border border-border rounded-xl shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="usage-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-surface">
          <h2
            id="usage-modal-title"
            className="text-xl font-semibold text-text-primary font-mono"
          >
            {editorConfig.name} Usage Guide
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-raised transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Editor Info Section */}
          <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-raised border border-border">
            <span className="text-4xl flex-shrink-0" role="img" aria-label={editorConfig.name}>
              {editorConfig.icon}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary text-lg">
                {editorConfig.name}
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                {editorConfig.description}
              </p>
              <p className="text-sm text-text-secondary mt-2 font-medium">
                Here&apos;s how to use your agent prompt in {editorConfig.name}:
              </p>
            </div>
          </div>

          {/* Usage Guide Steps */}
          <div className="space-y-3">
            <h3 className="font-semibold text-text-primary text-sm uppercase tracking-wide">
              Steps to Get Started
            </h3>
            <div className="space-y-2 pl-2">
              {editorConfig.usageGuide.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-3 text-sm text-text-secondary leading-relaxed"
                >
                  <span className="text-accent font-semibold flex-shrink-0 min-w-fit">
                    •
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Info */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label={agent.name}>
                {agent.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">
                  Agent Prompt
                </p>
                <p className="font-semibold text-text-primary">{agent.name}</p>
                <p className="text-sm text-text-secondary mt-0.5 line-clamp-1">
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
            className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm bg-surface-raised hover:bg-border border border-border text-text-primary transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm bg-accent hover:bg-accent/90 text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Now
          </button>
        </div>
      </div>
    </div>
  );
}
