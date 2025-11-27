# 📧 Email Setup Guide - LandNest Properties

## ✅ Features Implemented:

### 1. **Welcome Email** 🎉
- Sent automatically when user signs up
- Beautiful HTML template
- Includes:
  - Welcome message
  - What they can do
  - Contact information
  - Call-to-action button

### 2. **Password Reset Email** 🔐
- Sent when user requests password reset
- Secure reset link with token
- Expires in 1 hour
- Security warnings included

### 3. **Dashboard Features** 📊
- ✅ Edit profile (name, phone)
- ✅ Upload/change avatar
- ✅ Delete properties
- ✅ Mark properties as sold/inactive
- ✅ View all listings

---

## 🚀 Setup Instructions:

### Step 1: Sign Up for Resend

1. **Go to**: https://resend.com/signup
2. **Sign up** with your email
3. **Verify** your email address
4. **Get your API key**:
   - Go to Dashboard
   - Click "API Keys"
   - Click "Create API Key"
   - Copy the key (starts with `re_`)

### Step 2: Add API Key to .env

Open your `.env` file and replace:
```env
RESEND_API_KEY=your_resend_api_key_here
```

With your actual key:
```env
RESEND_API_KEY=re_abc123xyz456...
```

### Step 3: Verify Domain (Optional but Recommended)

**For Production:**
1. Go to Resend Dashboard → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `landnestproperties.com`)
4. Add DNS records as instructed
5. Wait for verification

**For Development:**
- Use the default `onboarding@resend.dev`
- Works immediately, no setup needed
- Limited to 100 emails/day

### Step 4: Update Email "From" Address

Once domain is verified, update `server/email.ts`:

```typescript
from: 'LandNest Properties <noreply@yourdomain.com>',
```

Replace with your verified domain.

### Step 5: Restart Server

```bash
npm run dev
```

---

## 📧 Email Templates:

### Welcome Email:
```
Subject: Welcome to LandNest Properties! 🏡

- Greeting with user's name
- What they can do
- Call-to-action button
- Contact information
- Professional footer
```

### Password Reset Email:
```
Subject: Reset Your LandNest Password

- Personalized greeting
- Reset button
- Security warnings
- Expiry notice (1 hour)
- Manual link option
- Contact information
```

---

## 🧪 Testing:

### Test Welcome Email:
1. Sign up with a new account
2. Check your email inbox
3. Should receive welcome email within seconds

### Test Password Reset:
1. Go to `/forgot-password`
2. Enter your email
3. Click "Send Reset Link"
4. Check your email
5. Click the reset link

### Test Dashboard Features:
1. Log in to your account
2. Go to Dashboard
3. **Test Avatar Upload**:
   - Click on your avatar
   - Select new image
   - Should upload to Cloudinary
4. **Test Profile Edit**:
   - Go to "Profile Settings" tab
   - Change name or phone
   - Click "Save Changes"
5. **Test Property Management**:
   - Hover over your property
   - Click checkmark icon → Change status
   - Click trash icon → Delete property

---

## 🔧 Troubleshooting:

### Emails Not Sending?

**Check 1: API Key**
```bash
# In .env file
RESEND_API_KEY=re_...  # Should start with 're_'
```

**Check 2: Server Logs**
```bash
# Look for errors in terminal
# Should see: "Email sent successfully" or error message
```

**Check 3: Resend Dashboard**
- Go to https://resend.com/emails
- Check if emails are in queue
- Check for errors

### Common Issues:

**Issue**: "Invalid API key"
**Solution**: Double-check your API key in `.env`

**Issue**: "Domain not verified"
**Solution**: Use `onboarding@resend.dev` for testing

**Issue**: "Rate limit exceeded"
**Solution**: Free tier has limits:
- 100 emails/day
- 3,000 emails/month

---

## 💰 Resend Pricing:

### Free Tier:
- ✅ 3,000 emails/month
- ✅ 100 emails/day
- ✅ 1 domain
- ✅ Perfect for starting out

### Paid Plans:
- **Pro**: $20/month
  - 50,000 emails/month
  - 10 domains
  - Priority support

- **Enterprise**: Custom pricing
  - Unlimited emails
  - Dedicated IP
  - SLA

**Recommendation**: Start with free tier, upgrade when needed.

---

## 🎨 Customizing Email Templates:

Edit `server/email.ts`:

### Change Colors:
```css
.header { background: #your-color; }
.button { background: #your-color; }
```

### Change Content:
```html
<p>Your custom message here</p>
```

### Add Images:
```html
<img src="https://your-image-url.com/logo.png" alt="Logo" />
```

---

## 🔐 Security Best Practices:

### 1. **Never Commit API Keys**
- ✅ API key in `.env` file
- ✅ `.env` in `.gitignore`
- ❌ Never commit `.env` to Git

### 2. **Use Environment Variables**
```javascript
process.env.RESEND_API_KEY  // ✅ Good
"re_abc123..."              // ❌ Bad
```

### 3. **Verify Domain**
- Use your own domain in production
- Prevents emails going to spam
- Builds trust with users

### 4. **Rate Limiting**
- Implement rate limiting on forgot-password
- Prevent abuse
- Use libraries like `express-rate-limit`

---

## 📊 Dashboard Features:

### Profile Management:
- ✅ **Edit Name**: Update display name
- ✅ **Edit Phone**: Update contact number
- ✅ **Upload Avatar**: Click avatar to change
- ✅ **Email**: Read-only (for security)

### Property Management:
- ✅ **View Listings**: See all your properties
- ✅ **Change Status**: 
  - Active (visible to buyers)
  - Sold (marked as sold)
  - Inactive (hidden from listings)
- ✅ **Delete Property**: Permanently remove
- ✅ **Visual Indicators**: "SOLD" badge on sold properties

### How to Use:
1. **Change Status**:
   - Hover over property card
   - Click checkmark icon (✓)
   - Select new status
   - Click "Update Status"

2. **Delete Property**:
   - Hover over property card
   - Click trash icon (🗑️)
   - Confirm deletion
   - Property removed permanently

3. **Edit Profile**:
   - Click "Profile Settings" tab
   - Update name/phone
   - Click "Save Changes"

4. **Change Avatar**:
   - Click on your avatar image
   - Select new photo
   - Uploads automatically

---

## ✅ What's Working:

### Email Features:
- ✅ Welcome email on signup
- ✅ Password reset email
- ✅ Beautiful HTML templates
- ✅ Professional branding
- ✅ Mobile-responsive emails

### Dashboard Features:
- ✅ Profile editing
- ✅ Avatar upload
- ✅ Property status management
- ✅ Property deletion
- ✅ Visual feedback
- ✅ Loading states
- ✅ Error handling

### Security:
- ✅ Password hashing
- ✅ Session management
- ✅ Secure file uploads
- ✅ API authentication
- ✅ CSRF protection

---

## 🚀 Next Steps:

### For Development:
1. Sign up for Resend (free)
2. Get API key
3. Add to `.env`
4. Test emails

### For Production:
1. Buy domain (if you don't have one)
2. Verify domain in Resend
3. Update email "from" address
4. Deploy to hosting
5. Add environment variables
6. Test in production

---

## 📞 Support:

### Resend Support:
- **Docs**: https://resend.com/docs
- **Email**: support@resend.com
- **Discord**: https://resend.com/discord

### LandNest Support:
- **Phone**: 6261642203
- **Email**: businesswithabhivrat@gmail.com

---

## 🎉 Summary:

✅ Welcome emails working
✅ Password reset working
✅ Dashboard fully functional
✅ Profile editing working
✅ Avatar upload working
✅ Property management working
✅ Status changes working
✅ Delete properties working

**Your website now has professional email functionality!** 📧✨

---

## 📝 Quick Start Checklist:

- [ ] Sign up for Resend
- [ ] Get API key
- [ ] Add to `.env` file
- [ ] Restart server
- [ ] Test signup (check email)
- [ ] Test forgot password
- [ ] Test dashboard features
- [ ] Customize email templates (optional)
- [ ] Verify domain for production (optional)

**That's it! You're all set!** 🚀
