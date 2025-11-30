# AllCollegeEvents 🎓

**A comprehensive, production-grade event discovery platform with secure MongoDB authentication, JWT tokens, and role-based user management.**

---

## 🌟 Features

### Authentication & Security ✅
- ✅ MongoDB-backed user management
- ✅ Secure JWT token-based authentication
- ✅ Bcryptjs password hashing (10 salt rounds)
- ✅ **Confirm password validation** (client & server)
- ✅ Password strength requirements (uppercase, lowercase, numbers)
- ✅ Input validation with express-validator
- ✅ CORS security configuration

### User Management ✅
- ✅ Role-based user types (Student, Faculty, Industry, Freelancer, Organizer)
- ✅ Automatic role-based redirects
- ✅ User profile management
- ✅ Password change functionality
- ✅ Last login tracking
- ✅ Account activation status

### API Design ✅
- ✅ RESTful API architecture
- ✅ Centralized error handling
- ✅ Request validation
- ✅ Proper HTTP status codes
- ✅ Meaningful error messages
- ✅ Request logging with Morgan

### Code Quality ✅
- ✅ Production-grade architecture
- ✅ Separation of concerns (MVC pattern)
- ✅ Middleware-based design
- ✅ Comprehensive code documentation
- ✅ Environment-based configuration
- ✅ Graceful error handling

---

## 🚀 Quick Start

### 1. Install MongoDB
**Windows:**
- Download: https://www.mongodb.com/try/download/community
- Run installer, select "Run MongoDB as Windows Service"
- Start service from Services.msc

**Cloud (MongoDB Atlas):**
- Create free account at https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string
- Update `server/.env` with connection string

### 2. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend (new terminal)
cd client
npm install
```

### 3. Configure Environment

**server/.env:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/allcollegeevents
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_environment
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 4. Start Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 5. Access Application

Open: **http://localhost:5173**

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **QUICK_START.md** | Get running in 10 minutes |
| **SETUP_GUIDE.md** | Detailed setup & installation |
| **API_REFERENCE.md** | Complete API documentation |
| **TESTING_GUIDE.md** | Testing procedures |
| **TROUBLESHOOTING.md** | Common issues & solutions |
| **IMPLEMENTATION_SUMMARY.md** | What was implemented |

---

## 📁 Project Structure

```
AllCollegeevents.com/
│
├── server/                              # Node.js + Express Backend
│   ├── config/database.js              # MongoDB connection
│   ├── models/User.js                  # User schema & validation
│   ├── controllers/authController.js   # Authentication logic
│   ├── routes/authRoutes.js            # API endpoints
│   ├── middleware/auth.js              # JWT & error handling
│   ├── utils/validators.js             # Input validation rules
│   ├── index.js                        # Express server
│   ├── package.json                    # Dependencies
│   ├── .env                            # Environment variables
│   └── .gitignore                      # Git ignore
│
├── client/                              # React + Vite Frontend
│   ├── src/
│   │   ├── pages/Auth.jsx              # Login/Signup page
│   │   ├── contexts/AuthContext.jsx    # Auth state management
│   │   ├── lib/api.js                  # API utilities
│   │   ├── components/                 # UI components
│   │   └── hooks/                      # Custom hooks
│   ├── vite.config.js
│   └── package.json
│
├── QUICK_START.md
├── SETUP_GUIDE.md
├── API_REFERENCE.md
├── TESTING_GUIDE.md
├── TROUBLESHOOTING.md
└── IMPLEMENTATION_SUMMARY.md
```

---

## 🔐 Authentication Flow

```
User Visit → Sign Up/Login
     ↓
Client validates & sends to API
     ↓
Server validates & hashes password
     ↓
MongoDB stores user
     ↓
JWT token generated
     ↓
Token stored in localStorage
     ↓
Redirect based on userType
     ├→ /student
     ├→ /faculty
     ├→ /industry
     ├→ /freelancer
     └→ /organizer
```

---

## 🛠️ API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | ❌ | Create account |
| POST | `/api/auth/login` | ❌ | Login user |
| GET | `/api/auth/me` | ✅ | Get current user |
| PUT | `/api/auth/profile` | ✅ | Update profile |
| PUT | `/api/auth/change-password` | ✅ | Change password |
| POST | `/api/auth/logout` | ✅ | Logout user |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |

---

## 🧪 Testing

### Manual Testing
```bash
# 1. Create account with:
Email: student@test.com
Password: TestPass123
Confirm: TestPass123
Type: Student

# 2. Verify redirect to /student

# 3. Logout (clears localStorage)

# 4. Login with same credentials

# 5. Verify redirect to /student
```

### API Testing (Postman)
```bash
# Signup
POST http://localhost:5000/api/auth/signup
{
  "fullName": "John Doe",
  "email": "john@test.com",
  "password": "TestPass123",
  "confirmPassword": "TestPass123",
  "userType": "student"
}

# Login
POST http://localhost:5000/api/auth/login
{
  "email": "john@test.com",
  "password": "TestPass123"
}
```

See **TESTING_GUIDE.md** for complete testing procedures.

---

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  fullName: String (required, 2-100 chars),
  email: String (required, unique),
  password: String (hashed, required),
  userType: String (student|faculty|industry|freelancer|organizer),
  isActive: Boolean (default: true),
  isVerified: Boolean (default: false),
  profileImage: String,
  bio: String (max 500 chars),
  phone: String,
  institution: String,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Security Features

✅ **Password Security**
- Bcryptjs hashing (10 rounds)
- Password strength validation
- Confirm password matching
- Min 6 characters required
- Must include uppercase, lowercase, numbers

✅ **Authentication**
- JWT token-based
- Token expiration (7 days)
- Secure token storage
- Token verification middleware

✅ **Data Validation**
- Server-side validation
- Client-side validation
- Input sanitization
- Email format validation

✅ **API Security**
- CORS configuration
- Error message sanitization
- Rate limiting ready
- Request logging

✅ **Database Security**
- Proper indexing
- Query validation
- Sensitive field exclusion
- Connection pooling

---

## 💻 Tech Stack

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin support
- **Morgan** - Request logging
- **Express-validator** - Input validation

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios/Fetch** - HTTP client
- **Shadcn/UI** - Component library
- **Tailwind CSS** - Styling

---

## 🚢 Deployment

### Backend Deployment (Heroku/Railway)

```bash
# 1. Create .env for production
PORT=5000
MONGODB_URI=<atlas-connection-string>
JWT_SECRET=<strong-random-string>
JWT_EXPIRE=7d
NODE_ENV=production
CLIENT_URL=<frontend-url>

# 2. Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

```bash
# 1. Build
npm run build

# 2. Deploy
vercel deploy --prod
```

---

## 📈 Performance

- Database indexes for fast queries
- Connection pooling for efficiency
- Proper caching headers
- Request timeout handling
- Error recovery mechanisms

---

## 🔄 Workflow

### For Developers

1. **Clone/Setup**
   - Install Node.js & MongoDB
   - Clone project
   - Run `npm install` in both folders

2. **Development**
   - `npm run dev` in server (watch mode)
   - `npm run dev` in client (hot reload)
   - Make changes
   - Test in browser

3. **Testing**
   - Manual testing (TESTING_GUIDE.md)
   - API testing with Postman
   - Database verification
   - Error scenarios

4. **Deployment**
   - Build production files
   - Deploy backend to server
   - Deploy frontend to CDN
   - Verify in production

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Refused**
- Ensure MongoDB is running
- Check connection string
- See TROUBLESHOOTING.md

**Port Already in Use**
- Change PORT in .env
- Or kill existing process
- See TROUBLESHOOTING.md

**CORS Error**
- Verify CLIENT_URL in .env
- Restart both servers
- Clear browser cache

**Email Already Registered**
- Use different email
- Or clear database
- See TROUBLESHOOTING.md

See **TROUBLESHOOTING.md** for complete solutions.

---

## 📦 Installation Script

```bash
# Automated setup
node install.js
```

---

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT Guide](https://jwt.io/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)

---

## 📝 Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/allcollegeevents

# Authentication
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# CORS
CLIENT_URL=http://localhost:5173
```

---

## 🎯 Next Steps

1. **Setup** - Follow QUICK_START.md
2. **Test** - Follow TESTING_GUIDE.md
3. **Deploy** - Deploy guide in SETUP_GUIDE.md
4. **Enhance** - Add more features
5. **Monitor** - Setup error tracking

---

## ✨ Key Highlights

🎉 **Production-Ready Code** - Senior developer standards
🎉 **Complete Documentation** - Setup, API, testing, troubleshooting
🎉 **Secure Authentication** - JWT + bcrypt + validation
🎉 **Role-Based Routing** - Auto-redirect by user type
🎉 **Confirm Password** - Validated on client & server
🎉 **Error Handling** - Comprehensive & user-friendly
🎉 **MongoDB Integrated** - Complete database setup
🎉 **CORS Configured** - Frontend-backend communication

---

## 📞 Support

### Documentation Files
- 📖 **QUICK_START.md** - Get started quickly
- 📖 **SETUP_GUIDE.md** - Detailed installation
- 📖 **API_REFERENCE.md** - API documentation
- 📖 **TESTING_GUIDE.md** - Testing procedures
- 📖 **TROUBLESHOOTING.md** - Fix common issues
- 📖 **IMPLEMENTATION_SUMMARY.md** - What's implemented

### Debug Resources
- Server logs: `npm run dev` output
- Browser console: F12
- Network tab: F12 → Network
- Database: mongosh or MongoDB Compass

---

## 📄 License

MIT License - Free to use and modify

---

## 👥 Contributors

Built by Senior Backend Development Team
Version: 1.0.0
Date: January 2025

---

## 🚀 Ready to Launch!

Everything is set up and ready. Follow **QUICK_START.md** to begin!

```
npm install    # Install dependencies
npm run dev    # Start development
```

**Happy coding!** 🎉
