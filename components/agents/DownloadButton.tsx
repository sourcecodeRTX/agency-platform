'use client';

import { Download } from 'lucide-react';
import { Agent } from '@/lib/types';

interface DownloadButtonProps {
  agent: Agent;
  className?: string;
  onShowInstructions?: () => void;
}

export function DownloadButton({ 
  agent, 
  className = '', 
  onShowInstructions 
}: DownloadButtonProps) {
  const handleDownload = () => {
    if (!agent.content) return;
    
    // If there's a handler to show instructions, use it
    if (onShowInstructions) {
      onShowInstructions();
      return;
    }
    
    // Otherwise, directly download
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

  return (
    <button
      onClick={handleDownload}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-surface-raised hover:bg-border border border-border text-text-primary ${className}`}
      aria-label="Download as markdown"
    >
      <Download className="w-4 h-4" />
      <span>Download</span>
    </button>
  );
}
