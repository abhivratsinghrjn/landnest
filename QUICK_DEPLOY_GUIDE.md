# ⚡ Quick Deploy Guide - Update Your Existing Netlify Site

Since you already have landnest.in deployed on Netlify, here's how to update it with your new code:

---

## 🎯 **Option A: Update via GitHub (Easiest)**

### **Step 1: Update Your GitHub Repository**

```bash
# In your project folder
git add .
git commit -m "Update LandNest with new features"
git push origin main
```

**That's it!** Netlify will automatically detect the push and redeploy.

---

### **Step 2: Update Environment Variables**

1. **Go to Netlify**: https://app.netlify.com
2. **Select your site** (landnest.in)
3. **Site Settings** → **Environment Variables**
4. **Add these new variables**:

```
RESEND_API_KEY=re_emrLJHeh_CYLPUfbnhbAXNx8LR65p2hUM
CLOUDINARY_CLOUD_NAME=dzmkbr7mg
CLOUDINARY_API_KEY=938544127771342
CLOUDINARY_API_SECRET=4E2Dbw5Fez1rTY17VTRyvgo6PWw
```

5. **Update existing variables** (if any):
```
DATABASE_URL=postgresql://neondb_owner:npg_Hywb0pWBQ6qj@ep-plain-sound-a4yf1j7l-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
APP_URL=https://landnest.in
NODE_ENV=production
SESSION_SECRET=your-secret-key
```

6. **Click "Save"**

---

### **Step 3: Trigger Redeploy**

1. **Go to Deploys** tab
2. **Click "Trigger deploy"** → **"Deploy site"**
3. **Wait 2-3 minutes** for build to complete

---

## 🎯 **Option B: Fresh Deploy (If Starting Over)**

### **Step 1: Delete Old Site (Optional)**

1. **Go to Netlify Dashboard**
2. **Select old site**
3. **Site Settings** → **General** → **Delete site**

### **Step 2: Create New Site**

1. **Click "Add new site"** → **"Import an existing project"**
2. **Choose GitHub**
3. **Select your repository**
4. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
   - Functions directory: `netlify/functions`

5. **Add all environment variables** (see above)
6. **Deploy**

### **Step 3: Connect Domain**

1. **Domain Settings** → **Add custom domain**
2. **Enter**: `landnest.in`
3. **Netlify will detect** it's already yours
4. **Confirm**

---

## 🎯 **Option C: Deploy Without GitHub**

### **Step 1: Install Netlify CLI**

```bash
npm install -g netlify-cli
```

### **Step 2: Login**

```bash
netlify login
```

### **Step 3: Link to Existing Site**

```bash
# In your project folder
netlify link
```

Choose your existing site from the list.

### **Step 4: Deploy**

```bash
# Build
npm run build

# Deploy
netlify deploy --prod
```

---

## 📋 **What Changed in Your Code**

### **New Files Created**:
1. `netlify.toml` - Netlify configuration
2. `netlify/functions/server.ts` - Serverless function for API
3. `server/email.ts` - Email service
4. `client/src/pages/Dashboard.tsx` - Updated dashboard
5. `client/src/pages/ForgotPassword.tsx` - Password reset

### **New Dependencies**:
- `resend` - Email service
- `serverless-http` - Netlify functions
- `@netlify/functions` - Netlify SDK

### **Environment Variables Needed**:
```env
DATABASE_URL=your_neon_url
SESSION_SECRET=random_secret
CLOUDINARY_CLOUD_NAME=dzmkbr7mg
CLOUDINARY_API_KEY=938544127771342
CLOUDINARY_API_SECRET=4E2Dbw5Fez1rTY17VTRyvgo6PWw
RESEND_API_KEY=re_emrLJHeh_CYLPUfbnhbAXNx8LR65p2hUM
APP_URL=https://landnest.in
NODE_ENV=production
```

---

## ✅ **Quick Checklist**

- [ ] Code pushed to GitHub
- [ ] Environment variables updated in Netlify
- [ ] Site redeployed
- [ ] Test website: https://landnest.in
- [ ] Test signup (check email)
- [ ] Test dashboard features
- [ ] Test on mobile

---

## 🚨 **Common Issues & Fixes**

### **Issue: Build fails**

**Check**:
1. Build logs in Netlify
2. Make sure `netlify.toml` is in root folder
3. Verify all dependencies in `package.json`

**Fix**:
```bash
# Test build locally
npm run build

# If errors, fix them and push again
git add .
git commit -m "Fix build errors"
git push
```

### **Issue: API not working**

**Check**:
1. Environment variables in Netlify
2. Function logs in Netlify dashboard
3. `netlify/functions/server.ts` exists

**Fix**:
- Verify all environment variables are set
- Check function logs for errors
- Redeploy site

### **Issue: Old version still showing**

**Fix**:
1. Clear browser cache (Ctrl+Shift+R)
2. Check deploy status in Netlify
3. Verify correct branch is deployed
4. Try incognito/private window

---

## 🎯 **Recommended Steps (Right Now)**

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update with new features"
   git push origin main
   ```

2. **Update Netlify Environment Variables**:
   - Add Resend API key
   - Add Cloudinary credentials
   - Update DATABASE_URL

3. **Wait for Auto-Deploy** (2-3 minutes)

4. **Test**: https://landnest.in

**That's it!** Your site will be updated with all new features.

---

## 📞 **Need Help?**

If something doesn't work:
1. Check Netlify deploy logs
2. Check browser console for errors
3. Verify environment variables
4. Test locally first: `npm run dev`

---

## 🎉 **What You'll Have After Deploy**

✅ Live website at landnest.in
✅ Automatic HTTPS
✅ Email functionality (welcome & reset)
✅ Dashboard with full features
✅ Image uploads to Cloudinary
✅ Mobile responsive
✅ Auto-deploy on every push

**Your website will be production-ready!** 🚀
