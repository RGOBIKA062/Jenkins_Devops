# AllCollegeEvents - Troubleshooting Guide

## 🔧 Common Issues & Solutions

---

## MongoDB Issues

### ❌ "Error: connect ECONNREFUSED 127.0.0.1:27017"

**Problem:** MongoDB is not running

**Solutions:**

**Windows - Using Services:**
```
1. Press Win + R
2. Type: services.msc
3. Find "MongoDB Community Server"
4. Right-click → Start
```

**Windows - Using Command Line:**
```bash
# Start MongoDB
mongod

# Or if installed as service
net start MongoDB

# Verify connection
mongosh
```

**Using MongoDB Atlas (Cloud):**
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update server/.env:
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/allcollegeevents
```

---

### ❌ "MongooseError: Cannot connect to database"

**Problem:** MongoDB URI is incorrect

**Solution:**
```bash
# Check .env file
# Verify MONGODB_URI is correct

# Test connection
mongosh "mongodb://localhost:27017/allcollegeevents"

# If using Atlas, verify:
# - Username and password are URL-encoded
# - IP whitelist includes your current IP
```

---

### ❌ "Error: connect ECONNREFUSED [::1]:27017"

**Problem:** MongoDB not accessible on IPv6

**Solution:**
```bash
# Use IPv4 explicitly
MONGODB_URI=mongodb://127.0.0.1:27017/allcollegeevents

# Or update MongoDB config for IPv6 support
```

---

### ❌ "Authentication failed"

**Problem:** Incorrect MongoDB credentials (Atlas)

**Solutions:**
```
1. Verify username and password
2. Check for special characters (must be URL-encoded)
3. Example: pass@word becomes pass%40word
4. Check IP whitelist in Atlas:
   - Cluster → Network Access
   - Add your current IP
```

---

## Server Issues

### ❌ "Error: listen EADDRINUSE: address already in use :::5000"

**Problem:** Port 5000 is already in use

**Solutions:**

**Option 1: Change Port**
```bash
# Edit server/.env
PORT=5001

# Restart server
npm run dev
```

**Option 2: Kill Process (Windows)**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Example: taskkill /PID 1234 /F
```

**Option 3: Find and Close App**
```
1. Look for applications using port 5000
2. Close the application using that port
3. Restart server
```

---

### ❌ "Cannot find module 'express'"

**Problem:** Dependencies not installed

**Solution:**
```bash
cd server
npm install

# Or reinstall fresh
rm -r node_modules
npm install
```

---

### ❌ "Error: DOTENV: no .env file found"

**Problem:** `.env` file missing

**Solution:**
```bash
# Create .env file in server directory with:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/allcollegeevents
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

### ❌ "Error: JWT_SECRET is not defined"

**Problem:** Environment variable not set

**Solution:**
1. Check `.env` file exists in server directory
2. Verify `JWT_SECRET` is defined
3. Restart server after .env changes

---

### ❌ "TypeError: Cannot read property 'password' of undefined"

**Problem:** User not found or password not selected in query

**Solution:**
```javascript
// Make sure query includes password selection:
const user = await User.findOne({ email }).select('+password');
// NOT:
const user = await User.findOne({ email }); // password excluded!
```

---

### ❌ "Error: Server crashed after starting"

**Problem:** Port not available or crash on startup

**Solutions:**
1. Check for syntax errors in code
2. Verify all dependencies installed
3. Check database connection
4. Look at full error message in console

---

## Frontend Issues

### ❌ "Error: Failed to fetch"

**Problem:** Backend server not running or CORS issue

**Solutions:**
```bash
# 1. Start backend server
cd server
npm run dev

# 2. Verify CLIENT_URL in server/.env matches frontend URL
# Should be: http://localhost:5173

# 3. Check frontend is running
cd client
npm run dev

# Should show: ➜ Local: http://localhost:5173/
```

---

### ❌ "CORS error: blocked by CORS policy"

**Problem:** Frontend and backend CORS mismatch

**Solutions:**
```bash
# 1. Verify server .env CLIENT_URL
CLIENT_URL=http://localhost:5173

# 2. Check server/index.js CORS config
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
};

# 3. Restart both servers

# 4. Clear browser cache (Ctrl+Shift+Del)
```

---

### ❌ "Cannot find module '@supabase'"

**Problem:** Old Supabase reference in frontend

**Solution:**
Already fixed in Auth.jsx. If error persists:
1. Clear node_modules: `rm -r node_modules`
2. Install dependencies: `npm install`
3. Restart dev server

---

### ❌ "Blank page / Nothing renders"

**Problem:** React or Vite issue

**Solutions:**
```bash
# 1. Check browser console for errors (F12)
# 2. Clear browser cache
# 3. Restart Vite dev server
npm run dev

# 4. Check if running on correct port
# Should be: http://localhost:5173

# 5. Check vite.config.js
# Verify port and config are correct
```

---

### ❌ "localStorage is not defined"

**Problem:** Accessing localStorage in server-side context

**Solution:**
```javascript
// Add check before accessing localStorage
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('authToken');
}
```

---

### ❌ "Password doesn't match but fields are same"

**Problem:** Whitespace or special characters

**Solution:**
```javascript
// Trim whitespace
password = password.trim()
confirmPassword = confirmPassword.trim()

// Then compare
```

---

## Authentication Issues

### ❌ "Email already registered" on first signup

**Problem:** Email exists in database (from previous test)

**Solutions:**
```bash
# Option 1: Use different email
test+new@example.com

# Option 2: Clear database
# Connect to MongoDB
mongosh
use allcollegeevents
db.users.deleteMany({})
exit

# Option 3: Backup and create new database
# Edit .env to use different database name
MONGODB_URI=mongodb://localhost:27017/allcollegeevents_test
```

---

### ❌ "Invalid email or password" on login

**Problem:** Incorrect credentials or email mismatch

**Solutions:**
```bash
# 1. Verify email exists in database
mongosh
use allcollegeevents
db.users.findOne({ email: "your@email.com" })

# 2. Try exact email and password used at signup
# 3. Check for extra spaces
# 4. Email is case-insensitive, password is not

# 5. If still fails, try resetting
db.users.deleteOne({ email: "your@email.com" })
# Then create new account
```

---

### ❌ "Token is invalid" or "No token provided"

**Problem:** Token missing or expired

**Solutions:**
```bash
# 1. Check if token stored in localStorage
# Open DevTools (F12) → Application → localStorage
# Should see 'authToken' key

# 2. Token expired (default 7 days)
# Login again to get new token

# 3. Token malformed
# Clear localStorage and login again
```

---

### ❌ "Cannot read property 'userType' of null"

**Problem:** User data not returned or null

**Solution:**
```javascript
// Add null check
if (!data.user) {
  throw new Error('User data not found');
}

// Or safe access
const userType = data?.user?.userType || 'student';
```

---

### ❌ "Passwords don't match" error but they are same

**Problem:** One field has spaces, typo, or invisible characters

**Solutions:**
1. Clear both password fields
2. Type slowly and carefully
3. Use copy-paste from same source
4. Check Caps Lock is off
5. Clear browser cache

---

## Network Issues

### ❌ "Network request timeout"

**Problem:** Server or network is slow

**Solutions:**
```bash
# 1. Check if server is running
npm run dev

# 2. Increase timeout in requests
# Edit client/src/lib/api.js
const response = await fetch(..., { 
  signal: AbortSignal.timeout(30000) // 30 seconds
})

# 3. Check network connection
ping localhost

# 4. Reduce server load
# Close other applications
```

---

### ❌ "ERR_CONNECTION_REFUSED"

**Problem:** Cannot connect to backend

**Solutions:**
1. Verify backend is running: `npm run dev`
2. Check backend port: `http://localhost:5000/health`
3. Check firewall allowing port 5000
4. Verify API URL in frontend code

---

## Browser Issues

### ❌ "localStorage is full" error

**Problem:** Too much data stored

**Solution:**
```javascript
// Clear old data
localStorage.clear()

// Or specific item
localStorage.removeItem('authToken')
```

---

### ❌ "Cookies not working"

**Problem:** Browser or site settings

**Solutions:**
1. Allow cookies for localhost
2. Disable private browsing mode
3. Check browser cookie settings
4. Use different browser to test

---

### ❌ "Page not found" 404

**Problem:** Route doesn't exist or frontend not running

**Solutions:**
```bash
# 1. Frontend not running
cd client
npm run dev

# 2. Wrong URL
# Should be: http://localhost:5173

# 3. Route not created
# Add missing route in App.jsx or main router
```

---

## Development Issues

### ❌ "Hot reload not working"

**Problem:** Vite changes not reflecting

**Solutions:**
```bash
# 1. Save file (sometimes needed twice)
# 2. Hard refresh browser (Ctrl+Shift+R)
# 3. Restart Vite server
npm run dev

# 4. Check file is in src/ directory
```

---

### ❌ "Syntax errors in backend"

**Problem:** Code errors in Node.js

**Solution:**
```bash
# Check console output for error location
# Fix the error
# Server should auto-restart with nodemon

# If not:
npm run dev
```

---

### ❌ "Import errors in frontend"

**Problem:** Path or module import incorrect

**Solutions:**
```javascript
// Use correct path alias (configured in tsconfig.json)
import { Button } from '@/components/ui/button'  // ✅ Correct
import { Button } from './components/ui/button'   // ❌ Wrong

// Or relative path
import { Button } from '../components/ui/button'  // ✅ Also correct
```

---

## Performance Issues

### ❌ "Application is very slow"

**Solutions:**
1. Reduce database queries
2. Add request caching
3. Use database indexes (already implemented)
4. Check network tab in DevTools (F12)
5. Close unnecessary browser tabs

---

### ❌ "Too many database connections"

**Problem:** Connection pool exhausted

**Solution:**
```javascript
// Limit concurrent connections
// Already handled in mongoose config
mongoose.connect(url, {
  maxPoolSize: 10,
  minPoolSize: 5
})
```

---

## Debugging Techniques

### 1. Check Server Logs
```bash
# Look for error in terminal running: npm run dev
# Example errors:
# - MongoDB connection failed
# - Syntax errors
# - Port already in use
```

### 2. Check Browser Console
```
F12 → Console
Look for:
- Fetch errors
- JSON parse errors
- Missing resources
```

### 3. Check Network Tab
```
F12 → Network
Look for:
- Failed requests (red)
- 401/403 errors
- CORS errors
```

### 4. Check Database
```bash
mongosh
use allcollegeevents
db.users.find()
```

### 5. Use MongoDB Compass (GUI)
```
1. Download: https://www.mongodb.com/products/compass
2. Connect to local or Atlas
3. Visual database browser
```

---

## Getting Help

### Resources:
1. **QUICK_START.md** - Setup help
2. **SETUP_GUIDE.md** - Detailed setup
3. **API_REFERENCE.md** - API help
4. **Server logs** - `npm run dev` output
5. **Browser console** - F12

### Check These Files:
- `server/.env` - Environment variables
- `server/index.js` - Server configuration
- `client/src/pages/Auth.jsx` - Frontend authentication
- Console errors - F12 in browser

---

## Quick Fixes Checklist

- [ ] Restart server
- [ ] Restart frontend
- [ ] Check MongoDB is running
- [ ] Clear browser cache
- [ ] Clear localStorage
- [ ] Check .env file
- [ ] Verify all dependencies installed
- [ ] Check firewall/ports
- [ ] Restart computer (last resort)

---

## 📞 Support

If issues persist:

1. **Check logs thoroughly** - Most answers are in console output
2. **Verify setup** - Follow SETUP_GUIDE.md again
3. **Test each component** - Use TESTING_GUIDE.md
4. **Check dependencies** - `npm list`
5. **Use debugging tools** - Browser DevTools (F12)

---

**Happy Debugging!** 🔧✨
