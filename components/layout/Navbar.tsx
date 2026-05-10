'use client';

import Link from 'next/link';
import { Github } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-3xl">🎭</span>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
                The Agency
              </span>
              <span className="text-xs text-text-muted">
                AI Specialists Directory
              </span>
            </div>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* GitHub link */}
            <a
              href="https://github.com/yourusername/agency-agents"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-surface hover:bg-surface-raised border border-border transition-colors duration-200 flex items-center justify-center"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5 text-text-secondary" />
            </a>

            {/* Theme toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
