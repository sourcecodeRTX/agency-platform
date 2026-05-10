import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { searchAgents } from '@/lib/agents-optimized';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '8', 10)));

    if (!query.trim()) {
      return NextResponse.json({
        results: [],
        query: '',
        count: 0,
      });
    }

    const results = await searchAgents(query, limit);

    const response = NextResponse.json({
      results,
      query,
      count: results.length,
    });

    // Cache search results (less aggressive than list)
    response.headers.set('Cache-Control', 'public, max-age=1800, stale-while-revalidate=3600');
    response.headers.set('Content-Type', 'application/json; charset=utf-8');

    return response;
  } catch (error) {
    console.error('Error in GET /api/agents/search:', error);
    return NextResponse.json(
      { error: 'Search failed', results: [] },
      { status: 500 }
    );
  }
}
