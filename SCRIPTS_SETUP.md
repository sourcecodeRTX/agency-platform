// Add these scripts to package.json "scripts" section:

{
  "scripts": {
    "dev": "next dev",
    "build": "npm run build:agents && next build",
    "build:agents": "node scripts/build-agent-data.js",
    "validate:agents": "node scripts/validate-agents.js",
    "start": "next start",
    "lint": "next lint",
    "analyze": "ANALYZE=true next build",
    "lighthouse": "lighthouse https://localhost:3000 --view"
  }
}

// After installing these scripts, run:
// npm run validate:agents  — to check all agent files
// npm run build:agents     — to generate data files
// npm run build            — to build with optimizations
