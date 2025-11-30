# AllCollegeEvents - Complete Setup Guide

A professional event discovery platform with MongoDB authentication, JWT tokens, and role-based redirects.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [API Documentation](#api-documentation)
7. [Project Architecture](#project-architecture)

---

## Prerequisites

### Required Software

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** (v4.4 or higher) - [Download Community Edition](https://www.mongodb.com/try/download/community)

### Installation Check

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB version
mongod --version
```

---

## Database Setup

### Option 1: Local MongoDB Installation (Windows)

1. **Download MongoDB Community Edition**
   - Visit: https://www.mongodb.com/try/download/community
   - Select Windows and download the MSI installer

2. **Run the Installer**
   - Double-click the MSI file
   - Choose "Complete" setup
   - Select "Run the MongoDB Community Server as a Windows Service"
   - Click "Install"

3. **Verify Installation**
   ```bash
   mongosh
   # You should see a MongoDB prompt
   ```

4. **Create Database**
   ```bash
   mongosh
   > use allcollegeevents
   > db.createCollection("users")
   > show dbs
   ```

### Option 2: MongoDB Atlas (Cloud) - Recommended for Production

1. **Create Account**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster**
   - Create a new project
   - Create a new cluster (M0 free tier)
   - Wait for cluster to deploy (~5 minutes)

3. **Get Connection String**
   - Go to "Connect" → "Drivers"
   - Copy connection string
   - Update in `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/allcollegeevents?retryWrites=true&w=majority
   ```

---

## Backend Setup

### 1. Navigate to Server Directory

```bash
cd c:\AllCollegeevents.com\server
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `morgan` - Request logging
- `express-validator` - Input validation

### 3. Configure Environment Variables

Edit `.env` file in server directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/allcollegeevents

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_environment
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

### 4. Verify Server Starts

```bash
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

---

## Frontend Setup

### 1. Navigate to Client Directory

```bash
cd c:\AllCollegeevents.com\client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## Running the Application

### Start Both Servers (Recommended Setup)

**Terminal 1 - Backend:**
```bash
cd c:\AllCollegeevents.com\server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd c:\AllCollegeevents.com\client
npm run dev
```

### Access Application

- **Frontend**: http://localhost:5173/
- **Backend Health Check**: http://localhost:5000/health
- **API Base URL**: http://localhost:5000/api

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "userType": "student"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully! Welcome to AllCollegeEvents.",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "userType": "student",
    "profileImage": null,
    "isVerified": false
  }
}
```

---

#### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Welcome back! You have successfully logged in.",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "userType": "student",
    "profileImage": null,
    "isVerified": false
  }
}
```

---

#### 3. Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "userType": "student",
    "isActive": true,
    "isVerified": false,
    "lastLogin": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### 4. Update Profile
```http
PUT /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "fullName": "Jane Doe",
  "phone": "+1-234-567-8900",
  "bio": "Computer Science Student",
  "institution": "XYZ University",
  "profileImage": "https://example.com/image.jpg"
}
```

---

#### 5. Change Password
```http
PUT /auth/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "oldPassword": "SecurePass123",
  "newPassword": "NewSecurePass456",
  "confirmPassword": "NewSecurePass456"
}
```

---

#### 6. Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

---

## Project Architecture

### Backend Structure

```
server/
├── config/
│   └── database.js              # MongoDB connection setup
├── models/
│   └── User.js                  # User schema & validation
├── controllers/
│   └── authController.js        # Authentication logic
├── routes/
│   └── authRoutes.js            # API endpoints
├── middleware/
│   └── auth.js                  # JWT & error handling
├── utils/
│   └── validators.js            # Input validation rules
├── index.js                     # Main server file
├── package.json                 # Dependencies
└── .env                         # Environment variables
```

### Frontend Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── Auth.jsx             # Login/Signup page (with confirm password)
│   │   ├── StudentFeed.jsx      # Student dashboard
│   │   ├── FacultyDashboard.jsx # Faculty dashboard
│   │   ├── IndustryDashboard.jsx # Industry dashboard
│   │   └── OrganizerDashboard.jsx # Admin dashboard
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ui/                  # Shadcn UI components
│   └── hooks/
│       └── use-toast.js         # Toast notifications
└── package.json
```

---

## User Types & Redirects

After successful authentication:

| User Type | Redirect |
|-----------|----------|
| `student` | `/student` |
| `faculty` | `/faculty` |
| `industry` | `/industry` |
| `freelancer` | `/freelancer` |
| `organizer` | `/organizer` |

---

## Key Features Implemented

✅ **MongoDB Integration** - Complete database setup with connection pooling
✅ **JWT Authentication** - Secure token-based authentication
✅ **Password Hashing** - bcrypt with salt rounds for security
✅ **Confirm Password** - Validation on both client and server
✅ **Role-Based Redirects** - Automatic routing based on user type
✅ **Input Validation** - Express-validator with comprehensive rules
✅ **Error Handling** - Centralized error handling middleware
✅ **CORS Configuration** - Cross-origin request support
✅ **Environment Variables** - Secure configuration management
✅ **Request Logging** - Morgan middleware for debugging
✅ **Password Strength** - Requires uppercase, lowercase, numbers
✅ **Professional Code** - Production-grade with comments and best practices

---

## Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running: `mongod` (Windows Services → MongoDB)
- Check MONGODB_URI in .env file

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Windows - Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Or change PORT in .env
PORT=5001
```

### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Verify CLIENT_URL in backend .env matches frontend URL
- Check CORS middleware in index.js

---

## Production Deployment

### Before Deploying:

1. Update environment variables
2. Change JWT_SECRET to a strong random string
3. Set NODE_ENV=production
4. Use MongoDB Atlas instead of local MongoDB
5. Enable HTTPS
6. Set up environment-specific .env files

---

## Security Best Practices

✅ Store JWT_SECRET securely (use strong random string)
✅ Use HTTPS in production
✅ Implement rate limiting
✅ Validate all inputs on both client and server
✅ Use secure password hashing (bcrypt)
✅ Set secure cookie flags
✅ Implement CSRF protection
✅ Regular security audits

---

## Support & Documentation

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)

---

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Developed by:** Senior Backend Development Team
