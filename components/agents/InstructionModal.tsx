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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-blue-500/50 rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="instruction-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b-2 border-blue-500/30 sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 z-10">
          <div className="flex items-center gap-4">
            <span className="text-4xl" role="img" aria-label={editorConfig.name}>
              {editorConfig.icon}
            </span>
            <div>
              <h2
                id="instruction-modal-title"
                className="text-2xl font-bold text-white font-mono"
              >
                {editorConfig.name}
              </h2>
              <p className="text-blue-300 text-sm mt-1">
                Setup Instructions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-blue-500/20 transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-blue-300 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Editor Info Section */}
          <div className="p-5 rounded-lg bg-blue-900/40 border-l-4 border-blue-500">
            <p className="text-gray-200 leading-relaxed font-medium">
              {editorConfig.description}
            </p>
          </div>

          {/* Instructions Steps */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-lg uppercase tracking-wider">
              Setup Steps
            </h3>
            <div className="space-y-2 bg-slate-800/50 p-6 rounded-lg border border-blue-500/20">
              {editorConfig.usageGuide.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-3 text-gray-100 leading-relaxed"
                >
                  <span className="text-blue-400 font-bold flex-shrink-0 min-w-fit">
                    {step.split('.')[0]}.
                  </span>
                  <span className="text-gray-200">{step.split('. ').slice(1).join('. ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Info */}
          <div className="p-5 rounded-lg bg-green-900/30 border-l-4 border-green-500">
            <div className="flex items-start gap-3">
              <span className="text-3xl flex-shrink-0" role="img" aria-label={agent.name}>
                {agent.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-green-300 text-xs uppercase tracking-wider font-bold">
                  Agent Prompt
                </p>
                <p className="font-bold text-white text-lg mt-1">{agent.name}</p>
                <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                  {agent.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t-2 border-blue-500/30 sticky bottom-0 bg-gradient-to-r from-slate-900 to-slate-800 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg font-semibold text-base text-gray-200 bg-slate-700 hover:bg-slate-600 border border-slate-600 transition-all"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white transition-all shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download File
          </button>
        </div>
      </div>
    </div>
  );
}
