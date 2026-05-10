'use client';

import { useState } from 'react';
import { Copy, Check, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CopyButtonProps {
  content: string;
  label?: string;
  className?: string;
}

type CopyState = 'idle' | 'copying' | 'copied' | 'error';

export function CopyButton({ content, label = 'Copy Prompt', className = '' }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>('idle');

  const handleCopy = async () => {
    setState('copying');
    
    try {
      await navigator.clipboard.writeText(content);
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      setState('error');
      setTimeout(() => setState('idle'), 2000);
    }
  };

  const getIcon = () => {
    switch (state) {
      case 'copying':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'copied':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'error':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <Copy className="w-4 h-4" />;
    }
  };

  const getLabel = () => {
    switch (state) {
      case 'copying':
        return 'Copying...';
      case 'copied':
        return 'Copied!';
      case 'error':
        return 'Failed';
      default:
        return label;
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={state === 'copying'}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
        state === 'copied'
          ? 'bg-green-500/10 text-green-500 border border-green-500/20'
          : state === 'error'
          ? 'bg-red-500/10 text-red-500 border border-red-500/20'
          : 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20'
      } ${className}`}
      aria-label={getLabel()}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {getIcon()}
        </motion.span>
      </AnimatePresence>
      <span>{getLabel()}</span>
    </button>
  );
}
