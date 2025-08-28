# Deployment Guide

## Quick Deploy

### Vercel (Recommended)
1. Fork this repository
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables:
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automatically

### Netlify
1. Build: `npm run build`
2. Upload `dist/` folder to Netlify
3. Add environment variables in site settings

### Manual Hosting
```bash
npm run build
# Upload dist/ folder to any static hosting service
```

## Environment Variables
```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Build Requirements
- Node.js 18+
- npm or yarn
- 1GB RAM minimum