# Performance Optimization Guide — The Agency Platform

## Executive Summary
Current platform: **172 agents**, load time **~3.2s**, build time **~60s**
Target platform: **300+ agents**, load time **~1.2s**, build time **~5s**

---

## 🎯 Priority 1: CRITICAL (Implement First)

### 1.1 Implement Agent Metadata Cache
**Problem**: Every build recursively reads all 172 .md files
**Solution**: Create lightweight `agents.json` manifest

```
agents/
├── agents.json          # Metadata only (minimal)
├── agents-full.json     # With content (optional)
├── search-index.json    # Fuse.js index
└── categories.json      # Category metadata
```

**Impact**: Build time 60s → 5s | First load 3.2s → 1.5s

### 1.2 Server-Side Search API
**Problem**: All agents loaded for client-side search
**Solution**: Create `/api/agents/search` endpoint

```typescript
// app/api/agents/search/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  // Load pre-built index, search, return results only
}
```

**Impact**: Search response 500ms → 50ms | Payload reduction 60%

### 1.3 Incremental Static Regeneration (ISR)
**Problem**: Adding one agent rebuilds entire site
**Solution**: Implement ISR with fallback rendering

```typescript
export const revalidate = 3600; // Revalidate hourly
export const dynamicParams = true; // Enable fallback rendering
```

**Impact**: New agents visible immediately | No rebuild needed

### 1.4 Create Agents API Routes
**Problem**: No structured data endpoint
**Solution**: New API endpoints

```
GET  /api/agents              # List (paginated)
GET  /api/agents/[slug]       # Single agent
GET  /api/agents/category/[cat]  # By category
GET  /api/agents/search?q=x   # Search
```

**Impact**: Enables caching | CDN-friendly | App-to-API decoupling

---

## 🎯 Priority 2: HIGH (Implement Second)

### 2.1 Dynamic Component Loading
**Problem**: All UI components imported upfront
**Solution**: Use Next.js dynamic imports

```typescript
// Before: import { AgentGrid } from '@/components'
// After:
const AgentGrid = dynamic(() => import('@/components/agents/AgentGrid'), {
  loading: () => <AgentGridSkeleton />,
  ssr: false,
});
```

**Impact**: JS bundle reduction 25% | Faster TTI

### 2.2 Image Optimization
**Problem**: No next/image optimization
**Solution**: Configure responsive images

```javascript
// next.config.js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**' },
  ],
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
}
```

**Impact**: Image load time 40% faster | Bandwidth -50%

### 2.3 Font Optimization
**Problem**: Loading full Geist font
**Solution**: Subset only used characters

```typescript
// In layout.tsx
const geistSans = Geist_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap', // Prevent CLS
});
```

**Impact**: Font load time 60% faster | CLS elimination

### 2.4 Streaming Response
**Problem**: Waiting for all agents before rendering
**Solution**: Stream agents data progressively

```typescript
export async function GET(request: Request) {
  const stream = new ReadableStream({
    async start(controller) {
      const agents = await getAgents();
      for (const agent of agents) {
        controller.enqueue(JSON.stringify(agent));
      }
      controller.close();
    },
  });
}
```

**Impact**: Time to first byte (TTFB) -40% | Better UX

---

## 🎯 Priority 3: MEDIUM (Implement Third)

### 3.1 Markdown Optimization
**Problem**: Large HTML content in memory
**Solution**: Lazy load content on demand

```typescript
// Change: Load contentHtml only on detail page
// agents/[slug]/page.tsx loads full content
// Home page loads excerpt only
```

**Impact**: Initial payload reduction 65% | Home page -2MB

### 3.2 Add SitemapGeneration
**Problem**: No sitemap for SEO
**Solution**: Generate sitemap from agents

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const agents = await getAllAgents();
  return agents.map(agent => ({
    url: `${BASE_URL}/agents/${agent.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
```

**Impact**: SEO improvement | Faster crawling

### 3.3 Add Robots & Meta Tags
**Problem**: Missing robots.txt and advanced meta
**Solution**: Create robots.txt and enhance metadata

```typescript
// public/robots.txt
User-agent: *
Allow: /
Sitemap: https://theagency.dev/sitemap.xml
```

**Impact**: Better bot indexing | Improved SEO

### 3.4 Database Layer
**Problem**: File system doesn't scale
**Solution**: Optional SQLite/PostgreSQL

```
Benefits:
- Full-text search
- Relationship queries
- Better analytics
- Version history
- User contributions
```

**Impact**: Enables new features | Better scalability

---

## 📊 Implementation Order & Effort

| Priority | Feature | Effort | Impact | Deadline |
|----------|---------|--------|--------|----------|
| P0 | Agent metadata cache | 2h | 🟥🟥🟥 | TODAY |
| P0 | Server-side search API | 2h | 🟥🟥🟥 | TODAY |
| P0 | ISR setup | 1h | 🟥🟥 | TODAY |
| P1 | API routes | 3h | 🟥🟥🟥 | This week |
| P1 | Dynamic imports | 1.5h | 🟥🟥 | This week |
| P1 | Image optimization | 1h | 🟥🟥 | This week |
| P2 | Markdown lazy load | 2h | 🟥🟥 | Next week |
| P2 | Database layer | 8h | 🟥 | Next month |

---

## 🚀 Implementation Checklist

### Week 1 (Immediate)
- [ ] Create `agents.json` metadata file
- [ ] Create `/api/agents/search` endpoint
- [ ] Enable ISR in agent pages
- [ ] Add dynamic component loading
- [ ] Setup image optimization

### Week 2
- [ ] Create full API route set
- [ ] Add font optimization
- [ ] Implement streaming
- [ ] Add sitemap generation
- [ ] Performance monitoring

### Week 3+
- [ ] Database evaluation
- [ ] Advanced search features
- [ ] Analytics dashboard
- [ ] Admin panel for agents

---

## 📈 Success Metrics

### Performance
- [ ] Lighthouse score: 90+ all metrics
- [ ] First Contentful Paint (FCP): < 1.5s
- [ ] Time to Interactive (TTI): < 2.5s
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] Build time: < 10s

### SEO
- [ ] Indexed agents: All 172+
- [ ] Keyword rankings: Top 10 for 50+ terms
- [ ] Organic traffic: +200%

### User Experience
- [ ] Search response: < 100ms
- [ ] Load time: Mobile < 2.5s, Desktop < 1.5s
- [ ] Bounce rate: < 30%

---

## 🔍 Monitoring Tools

- **Lighthouse CI**: `npm run lighthouse`
- **Bundle Analysis**: `npm run analyze`
- **Web Vitals**: Next.js Analytics
- **Performance**: Chrome DevTools

---

## 📚 References

- Next.js Performance: https://nextjs.org/learn/foundations/how-nextjs-works/rendering
- Core Web Vitals: https://web.dev/vitals/
- Image Optimization: https://nextjs.org/docs/basic-features/image-optimization
- ISR: https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration
