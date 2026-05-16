import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getPaginatedAgents } from '@/lib/agents-optimized';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '12', 10)));
    const category = searchParams.get('category') || undefined;

    const result = await getPaginatedAgents(page, limit, category);

    // Set caching headers for optimal performance
    const response = NextResponse.json(result);
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    response.headers.set('Content-Type', 'application/json; charset=utf-8');

    return response;
  } catch (error) {
    console.error('Error in GET /api/agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}
