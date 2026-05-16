import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, FileText, Download } from 'lucide-react';
import { getAllAgentsMetadata, getAgentBySlug } from '@/lib/agents-optimized';
import { getCategoryMetadata } from '@/lib/categories';
import { AgentBadge } from '@/components/agents/AgentBadge';
import { CopyButton } from '@/components/agents/CopyButton';
import { AgentCard } from '@/components/agents/AgentCard';
import { DownloadButton } from '@/components/agents/DownloadButton';
import { marked } from 'marked';

interface AgentPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all agents
export async function generateStaticParams() {
  const agents = await getAllAgentsMetadata();
  return agents.map((agent) => ({
    slug: agent.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: AgentPageProps) {
  const agent = await getAgentBySlug(params.slug);

  if (!agent) {
    return {
      title: 'Agent Not Found',
    };
  }

  return {
    title: `${agent.name} — The Agency`,
    description: agent.description,
    openGraph: {
      title: `${agent.name} — The Agency`,
      description: agent.vibe,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${agent.name} — The Agency`,
      description: agent.vibe,
    },
  };
}

export default async function AgentPage({ params }: AgentPageProps) {
  const agent = await getAgentBySlug(params.slug);

  if (!agent) {
    notFound();
  }

  const categoryMeta = getCategoryMetadata(agent.category);
  
  // Render HTML content
  const contentHtml = agent.content ? await marked(agent.content) : '';
  
  // Get related agents (same category, limit 3)
  const allAgents = await getAllAgentsMetadata();
  const relatedAgents = allAgents
    .filter((a) => a.category === agent.category && a.slug !== agent.slug)
    .slice(0, 3);

  return (
    <div className="pt-20 pb-12">
      <div className="container-custom">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to agents
        </Link>

        {/* Agent header */}
        <div
          className="rounded-2xl p-8 md:p-12 mb-12 border border-border"
          style={{
            background: `linear-gradient(135deg, rgba(${agent.colorRgb}, 0.1) 0%, rgba(${agent.colorRgb}, 0.05) 100%)`,
          }}
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Emoji */}
            <div className="text-7xl">{agent.emoji}</div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary font-mono">
                  {agent.name}
                </h1>
                <AgentBadge
                  emoji={categoryMeta.emoji}
                  category={agent.category}
                  categoryLabel={categoryMeta.label}
                />
              </div>

              <p className="text-lg text-text-secondary leading-relaxed">
                {agent.description}
              </p>

              <p
                className="text-base italic"
                style={{ color: agent.colorHex }}
              >
                &ldquo;{agent.vibe}&rdquo;
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{agent.readingTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>{agent.wordCount.toLocaleString()} words</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4">
                {agent.content && (
                  <>
                    <CopyButton
                      content={agent.content}
                      label="Copy Full Prompt"
                      className="text-base px-6 py-3"
                    />
                    <DownloadButton
                      agent={agent}
                      className="text-base px-6 py-3"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div
              className="markdown-content max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick info */}
            <div className="p-6 rounded-xl bg-surface border border-border">
              <h3 className="text-lg font-semibold mb-4 text-text-primary">
                Quick Info
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-text-muted">Category</dt>
                  <dd className="text-text-primary font-medium">
                    {categoryMeta.emoji} {categoryMeta.label}
                  </dd>
                </div>
                {agent.tools && (
                  <div>
                    <dt className="text-text-muted">Tools</dt>
                    <dd className="text-text-primary">{agent.tools}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Related agents */}
            {relatedAgents.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-text-primary">
                  Related Agents
                </h3>
                <div className="space-y-4">
                  {relatedAgents.map((relatedAgent) => (
                    <AgentCard key={relatedAgent.slug} agent={relatedAgent} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
