import Link from 'next/link';
import { Github, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-text-primary">
              The Agency
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              A curated directory of expertly crafted AI agent personalities ready to deploy
              in Claude, Copilot, Cursor, and other AI tools.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-text-primary">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Browse Agents
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/sourcecodeRTX/agency-platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sourcecodeRTX/agency-platform/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Contributing Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-text-primary">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/sourcecodeRTX/agency-platform/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            Made with <Heart className="w-4 h-4 text-red-500 inline" /> by the community
          </p>
          <p className="text-sm text-text-muted">
            © {currentYear} The Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
