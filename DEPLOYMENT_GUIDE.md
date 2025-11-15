# Admin Backend Deployment Guide

## Free Python Hosting Options (No Credit Card Required)

### 1. **Replit** (BEST FOR BEGINNERS)
- **URL**: https://replit.com
- **Free Tier**: Unlimited projects, 50GB storage
- **Pros**: Easy UI, auto-deploys, persistent storage
- **Cons**: Sleep after 1 hour inactivity (stays awake if pinged)
- **Setup**:
  1. Sign up with email
  2. Create new Replit project, select Python
  3. Upload `backend_replit.py`
  4. Upload `requirements.txt`
  5. Click Run - it deploys automatically
  6. Copy the URL from preview (e.g., `https://your-replit.repl.co`)

### 2. **Railway** (MOST RELIABLE)
- **URL**: https://railway.app
- **Free Tier**: $5 credits/month (enough for small projects)
- **Pros**: Good uptime, persistent storage in /tmp
- **Cons**: Credits refill monthly (need to use them)
- **Setup**:
  1. Sign up with GitHub
  2. Create new project → Deploy from GitHub
  3. Push `backend_railway.py` to your repo
  4. Railway auto-deploys from main branch
  5. Get URL from deployment

### 3. **Render** (GOOD ALTERNATIVE)
- **URL**: https://render.com
- **Free Tier**: 750 hours/month (basically always on)
- **Pros**: Simple deployment, good performance
- **Cons**: Spins down after 15 mins inactivity
- **Setup**:
  1. Sign up with GitHub
  2. New Web Service → Connect repository
  3. Select Python environment
  4. Build: `pip install -r requirements.txt`
  5. Start: `python backend_render.py`
  6. Deploy automatically

### 4. **PythonAnywhere** (TRADITIONAL HOSTING)
- **URL**: https://pythonanywhere.com
- **Free Tier**: 100MB storage, one web app
- **Pros**: Always on, reliable
- **Cons**: Limited storage, older interface
- **Setup**:
  1. Sign up with email
  2. Web app → Add new web app
  3. Choose Flask framework
  4. Upload files via console
  5. Reload app

### 5. **Glitch** (EASY BUT LIMITED)
- **URL**: https://glitch.com
- **Free Tier**: Runs on remix
- **Pros**: Instant deploy, web editor
- **Cons**: Very limited compute
- **Setup**:
  1. Sign up
  2. New project → Import from GitHub
  3. Add `server.py` with backend code
  4. Auto-deploys to `your-project.glitch.me`

### 6. **Heroku Alternative - Cyclic**
- **URL**: https://www.cyclic.sh
- **Free Tier**: Deploy for free with GitHub
- **Pros**: Simple, good for small projects
- **Cons**: Less storage than Replit
- **Setup**:
  1. Connect GitHub account
  2. Select repository
  3. Auto-deploys with `package.json` or `requirements.txt`

## Configuration for Your Frontend

### Using Local Backend (Development)
\`\`\`
Backend URL: http://localhost:5000
\`\`\`

### Using Replit
\`\`\`
Backend URL: https://your-project.repl.co
\`\`\`

### Using Railway
\`\`\`
Backend URL: https://your-project.railway.app
\`\`\`

### Using Render
\`\`\`
Backend URL: https://your-project.onrender.com
\`\`\`

### Changing Backend URL in Admin Panel
1. Go to Admin Dashboard (press S-H-E on portfolio)
2. Login
3. Click "Edit" next to Backend Status
4. Paste the new URL
5. Click "Save URL"

## Environment Variables Setup

Add these to your hosting platform:

\`\`\`
SECRET_KEY=your-super-secret-key-change-me
FLASK_ENV=production
\`\`\`

## File Storage Solutions (FREE)

### If you need more file storage:

1. **Supabase** (PostgreSQL + Storage)
   - https://supabase.com
   - 500MB storage free
   - Add to backend easily

2. **Firebase Storage**
   - https://firebase.google.com
   - 5GB free
   - Google-backed

3. **Cloudinary** (Images)
   - https://cloudinary.com
   - 25GB free
   - Best for images/media

4. **AWS S3 with free tier**
   - 5GB first year
   - Requires credit card

## Quick Start (Recommended Path)

**Best Free Option for Your Use Case:**

1. **Use Replit for Backend**
   - Easiest setup (5 mins)
   - Auto-deploy
   - 50GB storage included
   - URL: `https://your-project.repl.co`

2. **Use Frontend on Vercel** (already done)
   - Free, unlimited bandwidth
   - Auto-deploy from GitHub

3. **Connect them**
   - Update admin panel with Replit URL
   - Works locally or hosted!

## Monthly Costs
- **Fully Free**: Replit + Vercel = $0/month
- **Better Performance**: Railway $5 + Vercel = $5/month
- **Most Reliable**: Render (free tier) + Vercel = $0/month

## Troubleshooting

**Backend shows offline?**
- Check server is running
- Verify URL is correct (click Edit in admin)
- Check CORS is enabled in backend

**Files not uploading?**
- Ensure backend is online
- Check file size (max 5MB on Replit)
- Verify storage folder exists

**Token invalid?**
- Clear localStorage: `localStorage.clear()`
- Login again
- Check SECRET_KEY matches
