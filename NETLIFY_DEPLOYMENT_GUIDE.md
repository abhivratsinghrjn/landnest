# 🚀 Complete Netlify Deployment Guide - LandNest.in

## **3 Methods to Deploy to Netlify**

---

## 📋 **Method 1: GitHub + Netlify (Recommended - Auto Deploy)**

### **Step 1: Push Code to GitHub**

1. **Go to GitHub**: https://github.com
2. **Create New Repository**:
   - Name: `landnest-properties`
   - Visibility: Private
   - Click "Create Repository"

3. **Push your code**:
   ```bash
   # In your project folder
   git init
   git add .
   git commit -m "Deploy LandNest to Netlify"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/landnest-properties.git
   git push -u origin main
   ```

### **Step 2: Connect to Netlify**

1. **Go to Netlify**: https://app.netlify.com
2. **Log in** with GitHub
3. **Click "Add new site"** → **"Import an existing project"**
4. **Choose GitHub**
5. **Select** `landnest-properties` repository
6. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
   - **Functions directory**: `netlify/functions`

7. **Add Environment Variables** (Click "Show advanced"):
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_Hywb0pWBQ6qj@ep-plain-sound-a4yf1j7l-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
   
   SESSION_SECRET=landnest-production-secret-random-string
   
   CLOUDINARY_CLOUD_NAME=dzmkbr7mg
   CLOUDINARY_API_KEY=938544127771342
   CLOUDINARY_API_SECRET=4E2Dbw5Fez1rTY17VTRyvgo6PWw
   
   RESEND_API_KEY=re_emrLJHeh_CYLPUfbnhbAXNx8LR65p2hUM
   
   APP_URL=https://landnest.in
   
   NODE_ENV=production
   ```

8. **Click "Deploy site"**

**Benefits**:
- ✅ Auto-deploy on every Git push
- ✅ Preview deployments for branches
- ✅ Easy rollbacks
- ✅ CI/CD built-in

---

## 📋 **Method 2: Netlify CLI (Without GitHub)**

### **Step 1: Install Netlify CLI**

```bash
npm install -g netlify-cli
```

### **Step 2: Login to Netlify**

```bash
netlify login
```

This will open browser for authentication.

### **Step 3: Initialize Site**

```bash
# In your project folder
netlify init
```

Choose:
- **Create & configure a new site**
- **Team**: Your team
- **Site name**: landnest-properties (or custom)

### **Step 4: Set Environment Variables**

```bash
# Set each variable
netlify env:set DATABASE_URL "postgresql://neondb_owner:npg_Hywb0pWBQ6qj@ep-plain-sound-a4yf1j7l-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"

netlify env:set SESSION_SECRET "landnest-production-secret"

netlify env:set CLOUDINARY_CLOUD_NAME "dzmkbr7mg"
netlify env:set CLOUDINARY_API_KEY "938544127771342"
netlify env:set CLOUDINARY_API_SECRET "4E2Dbw5Fez1rTY17VTRyvgo6PWw"

netlify env:set RESEND_API_KEY "re_emrLJHeh_CYLPUfbnhbAXNx8LR65p2hUM"

netlify env:set APP_URL "https://landnest.in"
netlify env:set NODE_ENV "production"
```

### **Step 5: Deploy**

```bash
# Build first
npm run build

# Deploy
netlify deploy --prod
```

**Benefits**:
- ✅ No GitHub needed
- ✅ Deploy from local machine
- ✅ Quick updates
- ✅ Full control

---

## 📋 **Method 3: Netlify Drop (Drag & Drop - Simplest)**

### **Step 1: Build Locally**

```bash
npm run build
```

This creates `dist` folder.

### **Step 2: Deploy via Netlify Drop**

1. **Go to**: https://app.netlify.com/drop
2. **Drag and drop** the `dist/public` folder
3. **Site is live!** (temporary URL)

### **Step 3: Configure Site**

1. **Go to Site Settings**
2. **Add Environment Variables**:
   - Site Settings → Environment Variables
   - Add all variables listed above

3. **Add Custom Domain**:
   - Domain Settings → Add custom domain
   - Enter: `landnest.in`

**Limitations**:
- ❌ No auto-deploy
- ❌ Manual updates needed
- ❌ No serverless functions (API won't work)

**Note**: This method is NOT recommended for your full-stack app. Use Method 1 or 2.

---

## 🌐 **Connect Custom Domain (landnest.in)**

### **Step 1: Add Domain in Netlify**

1. **Go to your site** in Netlify
2. **Domain Settings** → **Add custom domain**
3. **Enter**: `landnest.in`
4. **Click "Verify"**
5. **Also add**: `www.landnest.in`

### **Step 2: Configure DNS in HostingRaja**

1. **Log in to HostingRaja**: https://www.hostingraja.in/
2. **Go to Domain Management**
3. **Select**: landnest.in
4. **Manage DNS**

5. **Add these records**:

   **For landnest.in:**
   ```
   Type: A
   Name: @ (or blank)
   Value: 75.2.60.5
   TTL: 3600
   ```

   **For www.landnest.in:**
   ```
   Type: CNAME
   Name: www
   Value: [your-site-name].netlify.app
   TTL: 3600
   ```

   **Example**: If your Netlify site is `landnest-properties.netlify.app`, use that.

6. **Save changes**

### **Step 3: Enable HTTPS**

1. **In Netlify** → Domain Settings
2. **HTTPS** → **Verify DNS configuration**
3. **Enable HTTPS** (automatic, free SSL)
4. **Force HTTPS** (redirect HTTP to HTTPS)

**Wait 5-30 minutes** for DNS propagation.

---

## 🔧 **Alternative to GitHub: GitLab or Bitbucket**

### **Using GitLab:**

1. **Create account**: https://gitlab.com
2. **Create new project**
3. **Push code**:
   ```bash
   git remote add origin https://gitlab.com/YOUR_USERNAME/landnest-properties.git
   git push -u origin main
   ```
4. **In Netlify**: Choose GitLab instead of GitHub
5. **Follow same steps** as GitHub method

### **Using Bitbucket:**

1. **Create account**: https://bitbucket.org
2. **Create repository**
3. **Push code**:
   ```bash
   git remote add origin https://bitbucket.org/YOUR_USERNAME/landnest-properties.git
   git push -u origin main
   ```
4. **In Netlify**: Choose Bitbucket
5. **Follow same steps** as GitHub method

---

## 📝 **Complete Step-by-Step (Recommended Method)**

### **PART 1: Prepare Code**

1. **Ensure all files are ready**:
   - ✅ `netlify.toml` (created)
   - ✅ `netlify/functions/server.ts` (created)
   - ✅ All dependencies installed

2. **Test locally**:
   ```bash
   npm run dev
   ```
   Make sure everything works.

### **PART 2: Push to GitHub**

1. **Create GitHub repository**
2. **Push code**:
   ```bash
   git init
   git add .
   git commit -m "Initial deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/landnest-properties.git
   git push -u origin main
   ```

### **PART 3: Deploy to Netlify**

1. **Go to Netlify**: https://app.netlify.com
2. **New site from Git**
3. **Choose GitHub**
4. **Select repository**
5. **Configure**:
   - Build: `npm run build`
   - Publish: `dist/public`
   - Functions: `netlify/functions`

6. **Add environment variables** (all 7 variables)
7. **Deploy**

### **PART 4: Connect Domain**

1. **Add custom domain** in Netlify
2. **Update DNS** in HostingRaja
3. **Enable HTTPS**
4. **Wait for propagation**

### **PART 5: Test**

1. **Visit**: https://landnest.in
2. **Test all features**:
   - Sign up (check email)
   - List property
   - Upload images
   - Dashboard
   - Mobile view

---

## 🔍 **Troubleshooting**

### **Issue: Build fails**

**Solution**:
```bash
# Check build locally
npm run build

# Check for errors
# Fix any TypeScript errors
npm run check
```

### **Issue: API not working**

**Solution**:
- Check environment variables in Netlify
- Verify `netlify.toml` is correct
- Check function logs in Netlify dashboard

### **Issue: Images not uploading**

**Solution**:
- Verify Cloudinary credentials
- Check CORS settings
- Test Cloudinary API key

### **Issue: Emails not sending**

**Solution**:
- Verify Resend API key
- Check email logs in Resend dashboard
- Verify domain (if using custom email domain)

### **Issue: Domain not working**

**Solution**:
- Check DNS records in HostingRaja
- Wait for DNS propagation (up to 48 hours)
- Use https://dnschecker.org/ to verify
- Clear browser cache

---

## 📊 **Netlify Dashboard Features**

### **After Deployment:**

1. **Site Overview**:
   - Live URL
   - Deploy status
   - Build logs

2. **Deploys**:
   - Deploy history
   - Rollback to previous version
   - Preview deployments

3. **Functions**:
   - Function logs
   - Invocation count
   - Error tracking

4. **Domain Settings**:
   - Custom domains
   - SSL certificates
   - DNS management

5. **Environment Variables**:
   - Add/edit variables
   - Different values for production/preview

---

## 💰 **Netlify Pricing**

### **Free Tier** (Perfect for you):
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ HTTPS included
- ✅ Serverless functions (125k requests/month)
- ✅ Custom domains

### **Pro Tier** ($19/month):
- 400 GB bandwidth
- 1000 build minutes
- More function invocations
- Priority support

**You'll be fine with free tier!**

---

## 🎯 **Recommended: Method 1 (GitHub + Netlify)**

**Why?**
- ✅ Automatic deployments
- ✅ Version control
- ✅ Easy rollbacks
- ✅ Team collaboration
- ✅ Preview deployments
- ✅ CI/CD pipeline

**Steps**:
1. Push to GitHub (5 minutes)
2. Connect to Netlify (5 minutes)
3. Add environment variables (5 minutes)
4. Configure domain (10 minutes)
5. Wait for DNS (15-30 minutes)

**Total time**: ~1 hour (mostly waiting for DNS)

---

## 📞 **Support**

### **Netlify Support**:
- **Docs**: https://docs.netlify.com
- **Community**: https://answers.netlify.com
- **Status**: https://www.netlifystatus.com

### **HostingRaja Support**:
- **Website**: https://www.hostingraja.in
- **Support**: Check their support portal

---

## ✅ **Deployment Checklist**

- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] Netlify site created
- [ ] Build settings configured
- [ ] Environment variables added (all 7)
- [ ] Site deployed successfully
- [ ] Custom domain added (landnest.in)
- [ ] DNS records updated in HostingRaja
- [ ] HTTPS enabled
- [ ] Website tested (all features)
- [ ] Email tested (welcome & reset)
- [ ] Mobile tested
- [ ] Domain propagated

---

## 🎉 **You're Done!**

Once DNS propagates, your website will be live at:
- **https://landnest.in**
- **https://www.landnest.in**

With:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Serverless functions
- ✅ Auto-deploy on push
- ✅ Professional email
- ✅ Cloud storage

**Your LandNest Properties website is production-ready!** 🚀✨
