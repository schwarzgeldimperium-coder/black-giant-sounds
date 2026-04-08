# BLACK GIANT SOUNDS — Vercel Deployment Guide

## Overview

This guide will help you deploy BLACK GIANT SOUNDS to Vercel with a custom domain, removing the "Made with Manus" branding and improving SEO visibility.

## Step 1: Prepare Your GitHub Repository

Your code is already pushed to GitHub at:
```
https://github.com/schwarzgeldimperium-coder/black-giant-sounds
```

✅ Ready to deploy!

## Step 2: Create Vercel Account & Import Project

1. Go to **https://vercel.com**
2. Click **"Sign Up"** → Choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub repositories
4. Click **"New Project"** in your Vercel dashboard
5. Select **"Import Git Repository"**
6. Find and click **`schwarzgeldimperium-coder/black-giant-sounds`**
7. Click **"Import"**

## Step 3: Configure Environment Variables

Vercel will show an "Environment Variables" section. You need to add the following variables:

### Required Variables

| Variable | Description | Where to Find |
|----------|-------------|----------------|
| `DATABASE_URL` | MySQL connection string | Manus → Management UI → Database (bottom-left, enable SSL) |
| `JWT_SECRET` | Session signing secret | Generate: `openssl rand -base64 32` |
| `VITE_APP_ID` | OAuth App ID | Manus → Settings → Secrets |
| `OAUTH_SERVER_URL` | OAuth server URL | Usually: `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | OAuth login portal | Usually: `https://oauth.manus.im` |
| `BUILT_IN_FORGE_API_URL` | Manus API endpoint | Usually: `https://api.manus.im/forge` |
| `BUILT_IN_FORGE_API_KEY` | Manus API key | Manus → Settings → Secrets |
| `VITE_FRONTEND_FORGE_API_URL` | Frontend API endpoint | Usually: `https://api.manus.im/forge` |
| `VITE_FRONTEND_FORGE_API_KEY` | Frontend API key | Manus → Settings → Secrets |
| `OWNER_OPEN_ID` | Your Manus account ID | Manus → Settings → General |
| `OWNER_NAME` | Your name | Manus → Settings → General |
| `VITE_APP_TITLE` | Website title | `BLACK GIANT SOUNDS` |
| `VITE_APP_LOGO` | Logo URL | `https://d2xsxph8kpxj0f.cloudfront.net/310519663520895993/U3dMJYzFtBD7XBUPYHqXha/logo_b4cba9d4.png` |
| `VITE_ANALYTICS_ENDPOINT` | Analytics endpoint (optional) | Leave blank if not using |
| `VITE_ANALYTICS_WEBSITE_ID` | Analytics website ID (optional) | Leave blank if not using |

### How to Get These Values

**From Manus Management UI:**
1. Open your Manus project dashboard
2. Go to **Settings** → **Secrets** panel
3. Copy each secret value and paste into Vercel

**Database URL:**
1. Go to **Database** panel in Manus
2. Click settings (bottom-left corner)
3. Enable **SSL**
4. Copy the full connection string

**Generate JWT_SECRET:**
```bash
openssl rand -base64 32
```

## Step 4: Deploy

1. After adding all environment variables, click **"Deploy"**
2. Vercel will build and deploy your site
3. You'll get a URL like: `black-giant-sounds.vercel.app`
4. Wait 3-5 minutes for deployment to complete

## Step 5: Connect Custom Domain

Once deployment is successful:

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your custom domain (e.g., `blackgiant-sounds.de`)
4. Vercel will show DNS records to add to your domain registrar
5. Update your domain's DNS settings (usually takes 24-48 hours to propagate)

### Domain Options

- **Buy from Vercel:** Click "Purchase Domain" during setup
- **Use existing domain:** Add DNS records from your current registrar
- **Use Vercel's free domain:** `black-giant-sounds.vercel.app` (temporary, not recommended for SEO)

## Step 6: Verify Deployment

Once deployed:

1. Visit your new domain/URL
2. Check that the site loads correctly
3. Verify contact form works (test by submitting a form)
4. Check that there's **NO "Made with Manus" branding**

## Step 7: Update GitHub (Optional)

If you want to keep GitHub in sync:

```bash
git remote add vercel https://github.com/schwarzgeldimperium-coder/black-giant-sounds.git
git push vercel main
```

## Troubleshooting

### Build Fails
- Check that all environment variables are filled in
- Ensure `DATABASE_URL` has `?ssl={"rejectUnauthorized":true}`
- Verify `JWT_SECRET` is at least 32 characters

### Site Shows 500 Error
- Check Vercel logs: **Deployments** → **View Logs**
- Most common: Missing or incorrect environment variables
- Verify database connection is working

### Contact Form Not Sending Emails
- Check that `BUILT_IN_FORGE_API_KEY` is correct
- Verify `OWNER_NAME` and `OWNER_OPEN_ID` are set
- Check Vercel logs for error messages

### Custom Domain Not Working
- DNS changes take 24-48 hours to propagate
- Use https://dnschecker.org to verify DNS is updated
- Vercel provides SSL certificate automatically (HTTPS)

## Next Steps

After deployment:

1. **Set up Google Search Console** — https://search.google.com/search-console
   - Add your custom domain
   - Submit sitemap.xml
   - Monitor keyword rankings

2. **Create Google Business Profile** — https://business.google.com
   - Add Wuppertal location
   - Service areas: Germany, Austria, Switzerland
   - Encourage customer reviews

3. **Monitor Analytics** — Check Vercel Analytics dashboard
   - Track visitor traffic
   - Monitor conversion funnel

## Support

If you encounter issues:
- Check Vercel documentation: https://vercel.com/docs
- Review Manus project logs in Management UI
- Contact Vercel support: https://vercel.com/support

---

**Your site is now live on your own domain with full SEO control!** 🚀
