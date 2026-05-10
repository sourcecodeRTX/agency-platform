import { NextResponse } from 'next/server';
import { getAllAgentsMetadata } from '@/lib/agents-optimized';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://theagency.dev';

/**
 * Generate XML sitemap for all agents
 * Accessed via: /sitemap.xml
 */
export async function GET() {
  try {
    const agents = await getAllAgentsMetadata();

    const urls = [
      // Home page
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      // Agent listing pages
      {
        url: `${BASE_URL}/agents`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      // Individual agent pages
      ...agents.map(agent => ({
        url: `${BASE_URL}/agents/${agent.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })),
    ];

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      ({ url, lastModified, changeFrequency, priority }) => `
  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastModified.toISOString().split('T')[0]}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
