# 🚀 Vercel Deployment Guide - Three Separate Domains

## Current Setup

The app now has **3 different routes**:
- `/variant1` - Background 1
- `/variant2` - Background 2
- `/variant3` - Background 3

## Option 1: Single Deployment with Different URLs (Easiest)

Deploy once to Vercel, then access via:
- `https://your-app.vercel.app/variant1`
- `https://your-app.vercel.app/variant2`
- `https://your-app.vercel.app/variant3`

### Steps:
1. Install Vercel CLI (one time):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project folder:
   ```bash
   cd "d:\paymment pages"
   vercel
   ```

4. Follow prompts:
   - Set up and deploy? **Yes**
   - Which scope? **Select your account**
   - Link to existing project? **No**
   - Project name? **payment-form** (or any name)
   - Directory? **Press Enter** (current directory)
   - Override settings? **No**

5. Vercel will give you a URL like: `https://payment-form-xyz.vercel.app`

## Option 2: Three Separate Domains (Custom Domains)

After deploying, add custom domains in Vercel dashboard:

### Steps:
1. Deploy the app (follow Option 1)

2. Go to your Vercel dashboard: https://vercel.com/dashboard

3. Select your project

4. Go to **Settings** → **Domains**

5. Add three custom domains:
   - `variant1.yourdomain.com` → Route to `/variant1`
   - `variant2.yourdomain.com` → Route to `/variant2`
   - `variant3.yourdomain.com` → Route to `/variant3`

6. Configure DNS records (in your domain provider):
   - Type: **CNAME**
   - Name: **variant1** (or variant2, variant3)
   - Value: **cname.vercel-dns.com**

## Option 3: Three Separate Vercel Projects

Deploy 3 times with different configurations:

### Project 1 (Variant 1):
1. Create folder: `payment-variant1`
2. Copy all files
3. Edit `src/App.tsx` to only show `<PaymentForm variant={1} />`
4. Deploy: `vercel --name payment-variant1`

### Project 2 (Variant 2):
1. Create folder: `payment-variant2`
2. Copy all files
3. Edit `src/App.tsx` to only show `<PaymentForm variant={2} />`
4. Deploy: `vercel --name payment-variant2`

### Project 3 (Variant 3):
1. Create folder: `payment-variant3`
2. Copy all files
3. Edit `src/App.tsx` to only show `<PaymentForm variant={3} />`
4. Deploy: `vercel --name payment-variant3`

Each will get its own URL:
- `https://payment-variant1.vercel.app`
- `https://payment-variant2.vercel.app`
- `https://payment-variant3.vercel.app`

## 🎯 Recommended Approach

**I recommend Option 1** (Single deployment with different routes):
- ✅ Easier to maintain
- ✅ One deployment to manage
- ✅ Automatic updates for all variants
- ✅ Can add custom domains later if needed

## 📝 Current URLs After Deployment

After deploying, you'll have:
- **Homepage**: `https://your-app.vercel.app` (redirects to /variant1)
- **Variant 1**: `https://your-app.vercel.app/variant1`
- **Variant 2**: `https://your-app.vercel.app/variant2`
- **Variant 3**: `https://your-app.vercel.app/variant3`

## 🔧 Quick Deploy Commands

```bash
# First time setup
npm install -g vercel
vercel login

# Deploy to production
cd "d:\paymment pages"
vercel --prod

# Deploy to preview (for testing)
vercel
```

## ✅ Pre-Deployment Checklist

- [x] React Router installed
- [x] Routes configured in App.tsx
- [x] vercel.json configured for SPA routing
- [x] All 3 background images in public folder
- [ ] Run `npm run build` to test production build
- [ ] Test locally: `npm run preview`
- [ ] Deploy to Vercel: `vercel --prod`

## 🌐 Testing Locally Before Deployment

```bash
# Build production version
npm run build

# Preview production build locally
npm run preview
```

Then test:
- http://localhost:4173/variant1
- http://localhost:4173/variant2
- http://localhost:4173/variant3

## 📱 Custom Domains with Vercel (Optional)

If you own domains and want:
- `payment1.yourdomain.com`
- `payment2.yourdomain.com`
- `payment3.yourdomain.com`

1. Go to Vercel Dashboard → Your Project → Domains
2. Add each domain
3. Point DNS to Vercel (they'll provide instructions)
4. Configure redirects in Vercel dashboard

## 🎨 Environment Variables (Optional)

If you need different settings per variant:

1. Create `.env.production`:
   ```
   VITE_DEFAULT_VARIANT=1
   ```

2. Access in code:
   ```typescript
   const defaultVariant = import.meta.env.VITE_DEFAULT_VARIANT || 1;
   ```

## 🚨 Important Notes

- **SPA Routing**: The `vercel.json` file ensures all routes work correctly
- **Custom Domains**: You need to own domains to use Option 2
- **Free Tier**: Vercel free tier includes unlimited deployments
- **Automatic Deploys**: Connect to GitHub for auto-deploy on push

## 📞 Support

After deployment, your URLs will be:
- Production: `https://[project-name].vercel.app/variant1`
- With custom domain: `https://variant1.yourdomain.com`

---

**Ready to Deploy!** 🚀

Run: `vercel --prod` in your project folder
