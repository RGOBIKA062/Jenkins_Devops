# AllCollegeEvents API Reference

## Overview

Complete REST API for authentication and user management with MongoDB backend.

**Base URL:** `http://localhost:5000/api`

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    }
  ]
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## Authentication Endpoints

### 1. Sign Up

**Endpoint:** `POST /auth/signup`

**Description:** Create a new user account

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "userType": "student"
}
```

**Validation Rules:**
- `fullName`: Required, 2-100 characters
- `email`: Required, valid email format
- `password`: Required, min 6 characters, must contain uppercase, lowercase, and numbers
- `confirmPassword`: Required, must match password
- `userType`: One of: `student`, `faculty`, `industry`, `freelancer`, `organizer`

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Account created successfully! Welcome to AllCollegeEvents.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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

**Error Responses:**
```json
{
  "success": false,
  "message": "Email already registered. Please use a different email or login.",
  "errors": [{"field": "email", "message": "Email already exists"}]
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123",
    "userType": "student"
  }'
```

---

### 2. Login

**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `password`: Required, non-empty

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Welcome back! You have successfully logged in.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

---

### 3. Get Current User

**Endpoint:** `GET /auth/me`

**Description:** Get authenticated user's profile information

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response (200 OK):**
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
    "profileImage": null,
    "bio": "",
    "phone": null,
    "institution": null,
    "lastLogin": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "No authentication token provided"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"
```

---

### 4. Update Profile

**Endpoint:** `PUT /auth/profile`

**Description:** Update user profile information

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "fullName": "Jane Doe",
  "phone": "+1-234-567-8900",
  "bio": "Computer Science Student at XYZ University",
  "institution": "XYZ University",
  "profileImage": "https://example.com/profile.jpg"
}
```

**Validation Rules:**
- `fullName`: 2-100 characters
- `phone`: Valid phone number format
- `bio`: Max 500 characters
- `institution`: Any string
- `profileImage`: Valid URL

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "Jane Doe",
    "email": "john@example.com",
    "userType": "student",
    "phone": "+1-234-567-8900",
    "bio": "Computer Science Student at XYZ University",
    "institution": "XYZ University",
    "profileImage": "https://example.com/profile.jpg",
    ...
  }
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Doe",
    "phone": "+1-234-567-8900",
    "bio": "Computer Science Student",
    "institution": "XYZ University"
  }'
```

---

### 5. Change Password

**Endpoint:** `PUT /auth/change-password`

**Description:** Change user's password

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "oldPassword": "SecurePass123",
  "newPassword": "NewSecurePass456",
  "confirmPassword": "NewSecurePass456"
}
```

**Validation Rules:**
- `oldPassword`: Required, must match current password
- `newPassword`: Required, min 6 characters
- `confirmPassword`: Required, must match newPassword

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Old password is incorrect"
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:5000/api/auth/change-password \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "oldPassword": "SecurePass123",
    "newPassword": "NewSecurePass456",
    "confirmPassword": "NewSecurePass456"
  }'
```

---

### 6. Logout

**Endpoint:** `POST /auth/logout`

**Description:** Logout user (token invalidation handled on client-side)

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "You have been successfully logged out"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"
```

---

## User Types & Role-Based Redirects

After successful login/signup, users are redirected based on their `userType`:

| User Type | Redirect Route | Description |
|-----------|----------------|-------------|
| `student` | `/student` | Student dashboard - Browse events, RSVP |
| `faculty` | `/faculty` | Faculty dashboard - Manage events, student interactions |
| `industry` | `/industry` | Industry dashboard - Post opportunities, collaborate |
| `freelancer` | `/freelancer` | Freelancer dashboard - Find gigs, manage projects |
| `organizer` | `/organizer` | Admin dashboard - Manage platform, users, events |

---

## Authentication Token

**JWT Token Format:**
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTcwNTMwNDAwMCwiZXhwIjoxNzA2MTY4MDAwfQ.signature
```

**Token Expiration:** 7 days (configurable via `JWT_EXPIRE` in .env)

**Using Token in Requests:**
```
Authorization: Bearer {token}
```

---

## Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  userType: String (enum: ['student', 'faculty', 'industry', 'freelancer', 'organizer']),
  isActive: Boolean (default: true),
  isVerified: Boolean (default: false),
  profileImage: String (URL),
  bio: String (max 500 chars),
  phone: String,
  institution: String,
  lastLogin: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## Rate Limiting (Future Enhancement)

```
Rate Limit: 100 requests per 15 minutes per IP
Headers:
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 99
  X-RateLimit-Reset: 1705304099
```

---

## Testing with Postman

1. **Import Collection:**
   - Create new collection "AllCollegeEvents"

2. **Set Variables:**
   ```
   {{base_url}}: http://localhost:5000/api
   {{token}}: (will be set automatically after login)
   {{user_id}}: (will be set automatically after login)
   ```

3. **Test Workflow:**
   - POST /auth/signup → GET token
   - POST /auth/login → GET token
   - GET /auth/me (with token)
   - PUT /auth/profile (with token)
   - PUT /auth/change-password (with token)
   - POST /auth/logout (with token)

---

## Security Considerations

✅ **Passwords** are hashed using bcryptjs with 10 salt rounds
✅ **JWT tokens** are signed with a strong secret
✅ **Password validation** requires uppercase, lowercase, and numbers
✅ **Input sanitization** with express-validator
✅ **CORS** properly configured
✅ **Sensitive fields** excluded from responses

---

## Support

For issues or questions:
- Check SETUP_GUIDE.md for detailed setup instructions
- Review error responses for troubleshooting
- Check MongoDB connection if database errors occur
- Verify JWT_SECRET in .env file

