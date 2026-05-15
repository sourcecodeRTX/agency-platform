'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search agents...',
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Focus input after a brief delay to ensure scroll starts
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
          isFocused
            ? 'border-accent bg-surface-raised'
            : 'border-border bg-surface'
        }`}
      >
        <Search className="w-5 h-5 text-text-muted flex-shrink-0" />
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-muted"
        />

        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleClear}
              className="flex-shrink-0 p-1 rounded-md hover:bg-surface transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-text-muted" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Keyboard shortcut hint */}
        {!isFocused && !value && (
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-surface-raised border border-border text-xs text-text-muted">
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </div>
        )}
      </div>
    </div>
  );
}
