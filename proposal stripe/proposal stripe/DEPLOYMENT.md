# 🚀 Deploy to Vercel - Step by Step Guide

## Prerequisites

1. ✅ Vercel account (free) - Sign up at https://vercel.com
2. ✅ Git repository (GitHub, GitLab, or Bitbucket)
3. ✅ Stripe account with API keys

---

## 📋 Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

#### Step 1: Install Vercel CLI

```powershell
npm install -g vercel
```

#### Step 2: Login to Vercel

```powershell
vercel login
```

Follow the prompts to authenticate.

#### Step 3: Deploy from Project Directory

```powershell
cd "d:\paymment pages\proposal stripe\proposal stripe"
vercel
```

#### Step 4: Follow the Prompts

- **Set up and deploy?** → Yes
- **Which scope?** → Your account/team
- **Link to existing project?** → No (first time)
- **Project name?** → Choose a name (e.g., `payment-proposals`)
- **Directory?** → `.` (current directory)
- **Override settings?** → No

#### Step 5: Set Environment Variables

After first deployment, add your environment variables:

```powershell
vercel env add STRIPE_SECRET_KEY
```
Paste your Stripe secret key when prompted.

```powershell
vercel env add STRIPE_PUBLISHABLE_KEY
```
Paste your Stripe publishable key.

```powershell
vercel env add BASE_URL
```
Enter your Vercel URL (e.g., `https://payment-proposals.vercel.app`)

**Select environments:** Production, Preview, Development (use spacebar to select all)

#### Step 6: Redeploy with Environment Variables

```powershell
vercel --prod
```

Your app is now live! 🎉

---

### Option 2: Deploy via Vercel Dashboard

#### Step 1: Push Code to Git

First, initialize git and push to GitHub (if not already done):

```powershell
cd "d:\paymment pages\proposal stripe\proposal stripe"
git init
git add .
git commit -m "Initial commit - Payment proposals app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

#### Step 2: Import Project in Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Select your Git provider (GitHub/GitLab/Bitbucket)
4. Find and import your repository
5. Click **"Import"**

#### Step 3: Configure Project

Vercel will auto-detect it's a Node.js project.

**Framework Preset:** Other
**Root Directory:** `./`
**Build Command:** (leave default or empty)
**Output Directory:** (leave default)

#### Step 4: Add Environment Variables

In the project configuration page, add:

| Name | Value |
|------|-------|
| `STRIPE_SECRET_KEY` | `sk_test_...` (your Stripe secret key) |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` (your Stripe publishable key) |
| `BASE_URL` | Will update after deployment |

#### Step 5: Deploy

Click **"Deploy"**

Wait for deployment to complete (1-2 minutes).

#### Step 6: Update BASE_URL

1. Copy your deployment URL (e.g., `https://payment-proposals.vercel.app`)
2. Go to **Settings** → **Environment Variables**
3. Edit `BASE_URL` and paste your deployment URL
4. Click **"Redeploy"** to apply changes

---

## 🔧 Post-Deployment Configuration

### 1. Update Stripe Webhook

If using webhooks for subscription management:

1. Go to https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. **Endpoint URL:** `https://your-app.vercel.app/webhook`
4. **Events to send:** Select `invoice.payment_succeeded`
5. Copy the **Signing secret**
6. Add to Vercel environment variables:
   ```powershell
   vercel env add STRIPE_WEBHOOK_SECRET
   ```
   Paste the webhook signing secret

7. Update `server.js` to verify webhook signatures (for production security)

### 2. Test Your Deployment

Visit your proposal URLs:
- `https://your-app.vercel.app/p/ivan-001`
- `https://your-app.vercel.app/p/olya-002`
- `https://your-app.vercel.app/p/petro-003`

### 3. Use Live Stripe Keys (For Production)

When ready to go live:

1. Get live keys from https://dashboard.stripe.com/apikeys
2. Update environment variables in Vercel:
   - `STRIPE_SECRET_KEY` → `sk_live_...`
   - `STRIPE_PUBLISHABLE_KEY` → `pk_live_...`
3. Redeploy

---

## 🔄 Future Updates

### Deploy Changes

```powershell
# Push changes to git
git add .
git commit -m "Update proposals"
git push

# Vercel auto-deploys on push (if connected to git)
# OR deploy manually:
vercel --prod
```

---

## 📊 Monitor Your App

**Vercel Dashboard:**
- View deployments: https://vercel.com/dashboard
- Check logs
- Monitor performance
- View analytics

**Stripe Dashboard:**
- View customers: https://dashboard.stripe.com/customers
- Check payments: https://dashboard.stripe.com/payments
- Monitor subscriptions: https://dashboard.stripe.com/subscriptions

---

## 🛠 Troubleshooting

### Issue: Environment variables not working
**Solution:** Make sure you redeployed after adding env variables

### Issue: 404 errors
**Solution:** Check `vercel.json` routes are correct

### Issue: Webhook not receiving events
**Solution:** 
1. Verify webhook URL in Stripe dashboard
2. Check webhook signing secret is set
3. View Vercel function logs for errors

### Issue: Static files (images) not loading
**Solution:** Ensure images are in `/public` folder and routes are correct in `vercel.json`

---

## 🎯 Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Update DNS records as instructed
5. Update `BASE_URL` environment variable
6. Redeploy

---

## ✅ Deployment Checklist

- [ ] Vercel account created
- [ ] Project deployed
- [ ] Environment variables set (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, BASE_URL)
- [ ] Deployment URL tested
- [ ] Stripe webhook configured (if using subscriptions)
- [ ] All proposal URLs working
- [ ] Test payment completed successfully
- [ ] Customer data visible in Stripe Dashboard
- [ ] (Optional) Custom domain configured
- [ ] (Production) Switched to live Stripe keys

---

## 🎉 You're Live!

Your payment proposal system is now deployed and accessible worldwide!

Share your proposal URLs with clients:
- `https://your-app.vercel.app/p/client-001`
- `https://your-app.vercel.app/p/client-002`

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Stripe Docs:** https://stripe.com/docs
- **Vercel Support:** https://vercel.com/support

---

## 💡 Pro Tips

1. **Use Preview Deployments:** Every git branch gets a preview URL
2. **Environment Variables per Environment:** Set different keys for development/preview/production
3. **Monitor Function Logs:** Check Vercel dashboard for real-time logs
4. **Enable Analytics:** See how many visitors your proposals get
5. **Set up Notifications:** Get notified when deployments succeed/fail
