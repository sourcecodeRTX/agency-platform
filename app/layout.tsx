import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'The Agency — AI Agent Specialists',
  description: 'A curated directory of AI agent personalities ready to deploy in Claude, Copilot, Cursor, and other AI tools. Browse, filter, and copy specialized agents for engineering, design, marketing, and more.',
  keywords: ['AI agents', 'Claude', 'Copilot', 'Cursor', 'AI assistants', 'prompts', 'agent directory'],
  authors: [{ name: 'The Agency Community' }],
  openGraph: {
    title: 'The Agency — AI Agent Specialists',
    description: 'Browse and deploy specialized AI agents for any task',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Agency — AI Agent Specialists',
    description: 'Browse and deploy specialized AI agents for any task',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F8FC' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0F' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash script for theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const t = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', t);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        style={{
          '--font-geist-sans': GeistSans.style.fontFamily,
          '--font-geist-mono': GeistMono.style.fontFamily,
        } as React.CSSProperties}
      >
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
