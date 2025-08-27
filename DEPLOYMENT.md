# ForAll Herbals - Deployment Guide

This guide covers deploying the ForAll Herbals e-commerce website to various platforms.

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub repository (✅ already set up at https://github.com/akshat1234e/forall)
- Vercel account
- Supabase project

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your ForAll Herbals repository
5. Configure project settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 2: Environment Variables
Add these environment variables in Vercel dashboard:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME=ForAll Herbals
VITE_APP_URL=https://your-domain.vercel.app
```

### Step 3: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your site will be available at `https://forall-herbals.vercel.app`

### Step 4: Custom Domain (Optional)
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Enable SSL (automatic)

## 🗄️ Supabase Setup

### Database Setup
1. Create new Supabase project
2. Go to SQL Editor
3. Run the following schema:

```sql
-- Enable Row Level Security
ALTER TABLE public.kv_store_9c9fcc04 ENABLE ROW LEVEL SECURITY;

-- Create policies for the KV store
CREATE POLICY "Allow anonymous read access" ON public.kv_store_9c9fcc04
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous write access" ON public.kv_store_9c9fcc04
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update access" ON public.kv_store_9c9fcc04
    FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous delete access" ON public.kv_store_9c9fcc04
    FOR DELETE USING (true);
```

### Authentication Setup
1. Go to Authentication > Settings
2. Configure email templates (optional)
3. Set up social providers if needed:
   - Google OAuth (recommended)
   - GitHub OAuth
   - Facebook OAuth

### Storage Setup
1. Go to Storage
2. Create bucket: `make-9c9fcc04-products`
3. Set bucket as private
4. Configure CORS if needed

### API Keys
Get your API keys from Settings > API:
- `SUPABASE_URL` - Your project URL
- `SUPABASE_ANON_KEY` - Your anonymous public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your service role key (keep secret!)

## 🌐 Alternative Deployment Options

### Netlify
1. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

2. **Environment Variables:**
   Add the same environment variables as Vercel

3. **Deploy:**
   ```bash
   npm run build
   npx netlify deploy --prod --dir=dist
   ```

### Railway
1. Connect GitHub repository
2. Set environment variables
3. Railway will auto-deploy on push

### DigitalOcean App Platform
1. Create new app from GitHub
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables
4. Deploy

## 🔧 Local Development

### Setup
```bash
# Clone repository
git clone https://github.com/akshat1234e/forall.git
cd forall

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
nano .env.local

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

## 📊 Performance Optimization

### Before Deployment
- [ ] Run Lighthouse audit
- [ ] Optimize images (WebP format)
- [ ] Minimize bundle size
- [ ] Enable gzip compression
- [ ] Configure CDN (Vercel handles this automatically)

### Performance Checklist
- [ ] Core Web Vitals scores > 75
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Bundle size < 1MB

## 🔒 Security Considerations

### Environment Variables
- ✅ Never commit `.env` files
- ✅ Use different keys for development/production
- ✅ Rotate keys regularly
- ✅ Use service role key only on server

### Content Security Policy
Add to `vercel.json` for enhanced security:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' *.supabase.co;"
        }
      ]
    }
  ]
}
```

## 🚨 Troubleshooting

### Common Issues

**Build Fails:**
- Check Node.js version (use 18+)
- Clear node_modules and reinstall
- Check for TypeScript errors

**Environment Variables Not Working:**
- Ensure variables start with `VITE_`
- Restart development server
- Check Vercel environment variable settings

**Supabase Connection Issues:**
- Verify URL and API keys
- Check network connectivity
- Ensure CORS is configured

**Performance Issues:**
- Optimize images
- Implement lazy loading
- Check bundle analyzer

### Getting Help
- Check GitHub Issues
- Review Vercel deployment logs
- Check Supabase dashboard logs
- Join community Discord

## 📈 Monitoring

### Analytics
Add Google Analytics or Vercel Analytics:
```env
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Error Tracking
Consider adding Sentry for error monitoring:
```bash
npm install @sentry/react @sentry/vite-plugin
```

### Performance Monitoring
- Vercel Analytics (built-in)
- Google PageSpeed Insights
- Lighthouse CI (already configured)

---

🌿 **Happy Deploying!** Your ForAll Herbals website will be live and serving customers in no time.