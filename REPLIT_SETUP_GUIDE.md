# Complete Replit Setup Guide for Your Portfolio Backend

## What is Replit?
Replit is a free online IDE where you can host Python backends. Perfect for your use case - runs 24/7 when you keep the tab open, has 50GB free storage, no credit card required.

---

## Step 1: Create Replit Account & Project

1. Go to **https://replit.com**
2. Sign up (free, no credit card needed)
3. Click **Create** → **New Replit**
4. Choose **Python** as language
5. Name it: `portfolio-backend` (or any name)
6. Click **Create Replit**

---

## Step 2: Upload Backend Files to Replit

### Option A: Copy-Paste Method (Easiest)

1. In your Replit project, you'll see a file editor on the left
2. Create a new file called `main.py`:
   - Right-click in the file list
   - Select "New File"
   - Type: `main.py`

3. Open `main.py` and paste the entire code from `scripts/backend_replit.py`

4. Create `requirements.txt`:
   - Right-click → New File
   - Type: `requirements.txt`
   - Paste the dependencies from `scripts/requirements.txt`

### Option B: Direct Upload (If available)
- Click the file icon in Replit
- Upload `main.py` and `requirements.txt` directly

---

## Step 3: Install Dependencies

1. Click the **Run** button (green play button at top)
2. Replit will automatically read `requirements.txt` and install dependencies
3. Wait for the installation to complete (takes ~30 seconds)

---

## Step 4: Start Your Backend

1. Click the **Run** button again
2. You should see output like:
   \`\`\`
   * Running on http://0.0.0.0:5000
   \`\`\`

3. Replit automatically generates a public URL in the top-right (like: `https://portfolio-backend.username.repl.co`)
4. Keep the tab open - your backend stays online as long as Replit tab is active

---

## Step 5: Get Your Public Replit URL

1. In Replit, look at the top-right corner
2. You'll see a **URL/link** - this is your public backend URL
3. Example: `https://portfolio-backend.yourname.repl.co`
4. Copy this URL

---

## Step 6: Connect Frontend to Replit Backend

1. Open your portfolio website
2. Press **S → H → E** (keys in sequence) to open Admin Login
3. Click **Edit** button next to "Backend: OFFLINE"
4. Paste your Replit URL: `https://portfolio-backend.yourname.repl.co`
5. Click **Save URL**
6. Login with:
   - **Username:** `admin`
   - **Password:** `admin123`

---

## Step 7: Start Uploading!

Once logged in:
- Upload photos and documents
- Files are stored on Replit's servers
- View all uploaded files in the dashboard

---

## Important Notes

### Keeping Backend Online
- Replit keeps your code running as long as the **tab is open** in your browser
- If you close the tab, the backend goes offline
- Files stay saved on Replit's server
- To keep it always online, Replit offers paid options (~$7/month), but free tier works great for your needs

### File Storage
- You get **50GB free** on Replit
- Perfect for storing photos and documents
- Files are automatically saved to `/tmp/uploads` directory

### Changing Credentials
To change admin password, edit `main.py`:
\`\`\`python
USERS = {
    'admin': 'your-new-password'
}
\`\`\`

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend shows OFFLINE | Make sure Replit tab is open and "Run" is active |
| Can't login | Check username/password (default: admin/admin123) |
| Upload fails | Make sure backend is online; check if file is < 5MB |
| Wrong URL | Copy the exact URL from Replit top-right corner |
| CORS error | Backend already has CORS enabled, should work |

---

## What Happens in Replit?

- **Login endpoint:** Creates JWT token for authentication
- **Upload endpoint:** Stores files in `/tmp/uploads` directory
- **Files endpoint:** Lists all uploaded files
- **Health endpoint:** Checks if backend is online

---

## Next Steps (Optional)

Want your backend ALWAYS online even when you're not using it?
- **Option 1:** Keep Replit tab open 24/7
- **Option 2:** Upgrade to Replit's Always On feature (~$7/month)
- **Option 3:** Deploy to other services (Railway, Render) - see DEPLOYMENT_GUIDE.md

---

## Quick Reference

| Item | Value |
|------|-------|
| Default Username | admin |
| Default Password | admin123 |
| Replit URL | https://portfolio-backend.[yourname].repl.co |
| File Size Limit | 5MB per file |
| Storage | 50GB free |
| Cost | Completely FREE |

That's it! You now have a working backend hosted on Replit!
