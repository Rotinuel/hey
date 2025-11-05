# 🚀 Deployment Guide for Abuja Detty December

This guide will help you deploy your Abuja Detty December website to Vercel.

## Prerequisites

1. **GitHub Account** - Your code needs to be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Node.js** - Version 18 or higher (already installed)

## Deployment Steps

### Step 1: Push to GitHub

1. **Initialize Git Repository** (if not already done):
   ```bash
   cd /Users/solomonoyekunle/Desktop/addec/frontend
   git init
   git add .
   git commit -m "Initial commit: Abuja Detty December website"
   ```

2. **Create GitHub Repository**:
   - Go to [GitHub.com](https://github.com)
   - Click "New Repository"
   - Name it: `abuja-detty-december`
   - Make it public
   - Don't initialize with README (since you already have files)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/abuja-detty-december.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. **Sign in to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**:
   - Click "New Project"
   - Import your `abuja-detty-december` repository
   - Vercel will auto-detect it's a Next.js project

3. **Configure Settings**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./frontend` (if deploying from monorepo) or `./` (if deploying frontend only)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (auto-detected)

4. **Environment Variables** (Optional):
   - Add any environment variables from `env.example`
   - These are optional for basic deployment

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd /Users/solomonoyekunle/Desktop/addec/frontend
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set up project settings
   - Deploy

### Step 3: Configure Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain (e.g., `abujadettydecember.com`)

2. **Update DNS**:
   - Point your domain's DNS to Vercel
   - Follow Vercel's DNS configuration guide

## Post-Deployment

### Automatic Deployments

- **Every push to main branch** will trigger a new deployment
- **Preview deployments** are created for pull requests
- **Rollback** to previous deployments if needed

### Monitoring

- **Analytics**: View visitor stats in Vercel dashboard
- **Performance**: Monitor Core Web Vitals
- **Logs**: Check function logs and errors

### Environment Variables

Add these in Vercel dashboard under Settings → Environment Variables:

```
NEXT_PUBLIC_APP_NAME=Abuja Detty December
NEXT_PUBLIC_CONTACT_EMAIL=info@abujadettydecember.com
NEXT_PUBLIC_CONTACT_PHONE=+234 801 234 5678
```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check `npm run build` works locally
   - Review build logs in Vercel dashboard

2. **Image Loading Issues**:
   - Ensure images are in `public` folder
   - Use absolute URLs for external images

3. **Environment Variables**:
   - Make sure all `NEXT_PUBLIC_` variables are set in Vercel

### Performance Optimization

1. **Image Optimization**:
   - Use Next.js Image component
   - Optimize image sizes

2. **Bundle Analysis**:
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```

## Quick Deploy Commands

```bash
# Build locally to test
npm run build

# Deploy to Vercel
vercel --prod

# Check deployment status
vercel ls
```

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Support**: [vercel.com/help](https://vercel.com/help)

---

🎉 **Your Abuja Detty December website will be live at**: `https://your-project-name.vercel.app`













