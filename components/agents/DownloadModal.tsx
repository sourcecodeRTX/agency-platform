'use client';

import { Agent } from '@/lib/types';
import { X, Download } from 'lucide-react';
import { useEffect } from 'react';

interface DownloadModalProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ agent, isOpen, onClose }: DownloadModalProps) {
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

  const handleDownload = (format: 'txt' | 'md') => {
    if (!agent.content) return;

    const blob = new Blob([agent.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${agent.slug}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-surface border border-border rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary font-mono">
            Download Agent
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-raised transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl" role="img" aria-label={agent.name}>
              {agent.emoji}
            </span>
            <div>
              <h3 className="font-semibold text-text-primary">{agent.name}</h3>
              <p className="text-sm text-text-secondary">{agent.description}</p>
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-sm text-text-secondary">
              Choose a format to download the agent prompt:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => handleDownload('txt')}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-surface-raised hover:bg-border transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
                  <div className="text-left">
                    <div className="font-medium text-text-primary">Plain Text (.txt)</div>
                    <div className="text-xs text-text-secondary">
                      Compatible with any text editor
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleDownload('md')}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-surface-raised hover:bg-border transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
                  <div className="text-left">
                    <div className="font-medium text-text-primary">Markdown (.md)</div>
                    <div className="text-xs text-text-secondary">
                      Preserves formatting and structure
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-lg font-medium text-sm bg-surface-raised hover:bg-border border border-border text-text-primary transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
