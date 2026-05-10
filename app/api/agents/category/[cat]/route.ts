import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getPaginatedAgents } from '@/lib/agents-optimized';

interface RouteParams {
  params: {
    cat: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { cat } = params;
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '12', 10)));

    if (!cat || typeof cat !== 'string') {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const result = await getPaginatedAgents(page, limit, cat);

    const response = NextResponse.json(result);
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    response.headers.set('Content-Type', 'application/json; charset=utf-8');

    return response;
  } catch (error) {
    console.error(`Error in GET /api/agents/category/[cat]:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch category agents' },
      { status: 500 }
    );
  }
}
