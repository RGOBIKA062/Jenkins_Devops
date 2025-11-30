# AllCollegeEvents - Quick Start Guide

Get the application running in under 10 minutes!

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Quick Start Steps

### 1️⃣ Install Dependencies

```bash
# Backend
cd c:\AllCollegeevents.com\server
npm install

# Frontend
cd c:\AllCollegeevents.com\client
npm install
```

### 2️⃣ Setup MongoDB

**Option A: Local MongoDB (Windows)**
```bash
# Start MongoDB Service
# Open Services → Find "MongoDB Community Server" → Right-click → Start
# Or run:
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Go to https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update in `server/.env`:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/allcollegeevents
```

### 3️⃣ Start Backend Server

```bash
cd c:\AllCollegeevents.com\server
npm run dev
```

Expected output:
```
╔════════════════════════════════════════╗
║   AllCollegeEvents Server Started      ║
║   🚀 Port: 5000                        ║
║   🌍 Environment: development          ║
║   📦 MongoDB: Connected                ║
╚════════════════════════════════════════╝
```

### 4️⃣ Start Frontend Server (New Terminal)

```bash
cd c:\AllCollegeevents.com\client
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### 5️⃣ Open Application

Open browser → **http://localhost:5173**

---

## Testing the Application

### Create Student Account

1. Click **Sign Up** tab
2. Fill in details:
   - **Full Name:** John Doe
   - **Email:** student@example.com
   - **Password:** SecurePass123
   - **Confirm Password:** SecurePass123
   - **User Type:** Student
3. Click **Sign Up**
4. Should redirect to `/student` page

### Test Login

1. Click **Login** tab
2. Enter:
   - **Email:** student@example.com
   - **Password:** SecurePass123
3. Click **Login**
4. Should redirect to `/student` page

### Test Other User Types

Try creating accounts with different user types:

| Type | Redirect |
|------|----------|
| Student | /student |
| Faculty | /faculty |
| Industry Professional | /industry |
| Freelancer | /freelancer |
| Admin | /organizer |

---

## Key Features Implemented

✅ **MongoDB Integration** - Complete database setup
✅ **JWT Authentication** - Secure token-based auth
✅ **Confirm Password** - Password validation & matching
✅ **Role-Based Redirects** - Automatic routing by user type
✅ **Password Hashing** - bcrypt security
✅ **Input Validation** - Server-side validation
✅ **Error Handling** - Comprehensive error management
✅ **CORS Support** - Cross-origin requests
✅ **Professional Code** - Production-grade implementation

---

## Folder Structure

```
AllCollegeevents.com/
├── server/                  # Backend (Node.js + Express)
│   ├── config/             # Database config
│   ├── models/             # MongoDB schemas
│   ├── controllers/        # Business logic
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth & error handling
│   ├── utils/              # Validators
│   ├── index.js            # Main server
│   └── .env                # Environment variables
│
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # Auth context
│   │   ├── lib/            # API utilities
│   │   └── hooks/          # Custom hooks
│   └── vite.config.js      # Vite configuration
│
├── SETUP_GUIDE.md          # Detailed setup guide
├── API_REFERENCE.md        # Complete API docs
└── QUICK_START.md          # This file

```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/allcollegeevents
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_environment
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get profile |
| PUT | `/api/auth/profile` | Update profile |
| PUT | `/api/auth/change-password` | Change password |
| POST | `/api/auth/logout` | Logout |

---

## Troubleshooting

### ❌ "MongoDB connection refused"

**Solution:**
```bash
# Start MongoDB
mongod

# OR use MongoDB Atlas and update MONGODB_URI in .env
```

### ❌ "Port 5000 already in use"

**Solution:**
```bash
# Change PORT in server/.env
PORT=5001

# OR kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### ❌ "CORS error in browser"

**Solution:**
- Verify CLIENT_URL in `.env` matches frontend URL
- Clear browser cache
- Restart both servers

### ❌ "Email already registered"

**Solution:**
- Use a different email for signup
- Or login with existing credentials

---

## Production Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas instead of local MongoDB
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Set up environment-specific `.env` files
- [ ] Enable rate limiting
- [ ] Setup error logging/monitoring
- [ ] Configure email service (for password reset)
- [ ] Setup automated backups for database

---

## Useful Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# View production build
npm run preview

# Linting (frontend)
npm run lint

# Clean MongoDB database (backend - use with caution!)
# db.users.deleteMany({})
```

---

## Next Steps

1. **Explore the code** - Check controllers, models, and routes
2. **Add more features** - Create events, comments, RSVP system
3. **Deploy** - Use Vercel/Netlify (frontend) + Heroku/Railway (backend)
4. **Monitoring** - Setup error tracking (Sentry)
5. **Analytics** - Add user behavior tracking

---

## Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [JWT Documentation](https://jwt.io/)

---

## Support

Need help? Check these files:

1. `SETUP_GUIDE.md` - Detailed setup instructions
2. `API_REFERENCE.md` - Complete API documentation
3. Server logs - `npm run dev` output
4. Browser console - Frontend errors

---

**Happy Coding! 🚀**

For detailed information, see `SETUP_GUIDE.md`
