# Vercel Deployment Fix Guide

## 🔴 Issue Identified: 404 NOT_FOUND Error

The 404 error on `aha-bojanam.vercel.app` occurs because:
1. Missing or incorrect `vercel.json` configuration
2. Vercel not detecting the build output directory
3. React Router needs rewrites to serve `index.html` for all routes

## ✅ Solution Applied

Created `vercel.json` with proper configuration for Vite + React Router.

## 📝 Required Vercel Project Settings

Go to your Vercel project settings and verify:

### Build & Development Settings:
- **Framework Preset:** `Vite` (or Auto-detect)
- **Root Directory:** `./` (root of repository)
- **Build Command:** `npm run build` (should auto-detect)
- **Output Directory:** `dist` (Vite's default output)
- **Install Command:** `npm install` (should auto-detect)

### Environment Variables:
Add these in Vercel Dashboard → Settings → Environment Variables:

**Production:**
```
VITE_API_URL=https://aha-bojanam-backend.onrender.com
```

**Preview/Development:** (optional, can use same)
```
VITE_API_URL=https://aha-bojanam-backend.onrender.com
```

## 🔄 Steps to Fix Deployment

### Option 1: Redeploy from Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your `aha-bojanam` project
3. Go to **Settings** → **General**
4. Verify build settings match above
5. Click **Redeploy** from **Deployments** tab

### Option 2: Push Changes to Git

1. Commit the new `vercel.json` file:
   ```bash
   git add vercel.json
   git commit -m "Add vercel.json for proper frontend deployment"
   git push
   ```

2. Vercel will auto-deploy after push

### Option 3: Manual Deployment via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## ✅ Verification Checklist

After redeployment, verify:

- [ ] Site loads without 404 error
- [ ] Menu items load from Render backend
- [ ] Navigation works (React Router)
- [ ] API calls work (check browser console)
- [ ] Login/signup works
- [ ] All routes work (no 404s on direct URL access)

## 🐛 Common Issues

### Issue: Still getting 404
**Solution:** 
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check Vercel deployment logs for build errors

### Issue: Build fails
**Solution:**
- Check Node.js version (should be 18.x or 20.x)
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Issue: API calls fail (CORS error)
**Solution:**
- Verify `VITE_API_URL` is set in Vercel environment variables
- Check Render backend CORS settings allow your Vercel domain
- Backend should already be configured (we updated CORS earlier)

### Issue: Routes work but API calls fail
**Solution:**
- Verify `src/utils/api.js` uses the correct backend URL
- Check browser Network tab for actual request URLs
- Ensure Render backend is running and accessible

## 📚 Additional Notes

- **Frontend:** Deployed on Vercel (`aha-bojanam.vercel.app`)
- **Backend:** Deployed on Render (`aha-bojanam-backend.onrender.com`)
- **Database:** MongoDB Atlas (connected to Render backend)

The `vercel.json` file I created will:
- ✅ Tell Vercel to build with `npm run build`
- ✅ Use `dist` as output directory
- ✅ Rewrite all routes to `index.html` for React Router
- ✅ Serve the built static files correctly

