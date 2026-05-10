import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAgentBySlug } from '@/lib/agents-optimized';
import { marked } from 'marked';

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Invalid slug' },
        { status: 400 }
      );
    }

    const agent = await getAgentBySlug(slug);

    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    // Render HTML content
    const contentHtml = agent.content ? await marked(agent.content) : '';

    const response = NextResponse.json({
      ...agent,
      contentHtml,
    });

    // Cache individual agents longer (they change infrequently)
    response.headers.set('Cache-Control', 'public, max-age=7200, stale-while-revalidate=604800');
    response.headers.set('Content-Type', 'application/json; charset=utf-8');

    return response;
  } catch (error) {
    console.error(`Error in GET /api/agents/[slug]:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch agent' },
      { status: 500 }
    );
  }
}
