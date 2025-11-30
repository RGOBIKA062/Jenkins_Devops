# AllCollegeEvents - Testing Guide

Complete testing procedures for authentication system.

---

## 🧪 Manual Testing

### Test 1: Create Student Account

**Steps:**
1. Open http://localhost:5173
2. Click "Sign Up" tab
3. Fill in:
   - Full Name: `John Student`
   - Email: `student@example.com`
   - Password: `SecurePass123`
   - Confirm Password: `SecurePass123`
   - User Type: `Student`
4. Click "Sign Up"

**Expected Result:**
- ✅ Toast: "Account created!"
- ✅ Redirect to `/student` page
- ✅ User stored in localStorage
- ✅ Token stored in localStorage

**Verify in MongoDB:**
```bash
# Connect to MongoDB
mongosh

# Switch to database
use allcollegeevents

# Query user
db.users.findOne({ email: "student@example.com" })

# Result should show:
# - Password is hashed (not plain text)
# - userType is "student"
# - isActive is true
# - createdAt timestamp
```

---

### Test 2: Password Mismatch Validation

**Steps:**
1. Go to Sign Up tab
2. Enter:
   - Password: `SecurePass123`
   - Confirm Password: `DifferentPass123`
3. Observe form

**Expected Result:**
- ✅ Red error: "Passwords do not match"
- ✅ Sign Up button disabled
- ✅ Cannot submit form

---

### Test 3: Password Strength Validation

**Steps:**
1. Try passwords:
   - `abc123` ❌ (no uppercase)
   - `ABC123` ❌ (no lowercase)
   - `AbcDef` ❌ (no numbers)
   - `SecurePass123` ✅ (uppercase, lowercase, numbers)

**Expected Result:**
- ✅ Weak passwords rejected with validation message
- ✅ Strong passwords accepted

---

### Test 4: Email Uniqueness

**Steps:**
1. Create first account with `john@example.com`
2. Try creating another with same email
3. Submit form

**Expected Result:**
- ❌ Error: "Email already registered. Please use a different email or login."

---

### Test 5: Login Test

**Steps:**
1. Click "Login" tab
2. Enter:
   - Email: `student@example.com`
   - Password: `SecurePass123`
3. Click "Login"

**Expected Result:**
- ✅ Toast: "Welcome back!"
- ✅ Redirect to `/student`
- ✅ Token stored in localStorage

---

### Test 6: Invalid Login Credentials

**Steps:**
1. Click "Login" tab
2. Try:
   - Correct email, wrong password
   - Wrong email, correct password
   - Both wrong

**Expected Result:**
- ❌ Error: "Invalid email or password"
- ⏸️ Stay on login form

---

### Test 7: Role-Based Redirects

**Create multiple accounts:**

| Email | User Type | Expected Redirect |
|-------|-----------|-------------------|
| student1@test.com | Student | /student |
| faculty1@test.com | Faculty | /faculty |
| industry1@test.com | Industry | /industry |
| freelancer1@test.com | Freelancer | /freelancer |
| admin1@test.com | Organizer | /organizer |

**Steps:**
1. Create each account
2. Verify correct redirect
3. Logout (clear localStorage)
4. Login and verify redirect

**Expected Result:**
- ✅ Each user type redirects to correct page

---

### Test 8: Token Expiration

**Steps:**
1. Login successfully
2. Check token in localStorage
3. Wait for token to expire (JWT_EXPIRE in .env)
4. Try to access protected route

**Expected Result:**
- ✅ Token-expired message
- ✅ Redirect to login
- ✅ Force re-authentication

---

### Test 9: Form Validation - Required Fields

**Steps:**
1. Try submitting signup form with:
   - Empty Full Name
   - Empty Email
   - Empty Password
   - Empty Confirm Password

**Expected Result:**
- ❌ Validation errors for each field
- ⏸️ Form not submitted

---

### Test 10: Email Format Validation

**Steps:**
1. Try emails:
   - `invalidemail` ❌ (no @)
   - `test@` ❌ (no domain)
   - `test@domain` ❌ (no TLD)
   - `test@domain.com` ✅ (valid)

**Expected Result:**
- ✅ Valid format accepted
- ❌ Invalid format rejected

---

## 🧬 API Testing (Postman)

### Test 1: Signup API

```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "fullName": "Test User",
  "email": "test@example.com",
  "password": "TestPass123",
  "confirmPassword": "TestPass123",
  "userType": "student"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "fullName": "Test User",
    "email": "test@example.com",
    "userType": "student"
  }
}
```

---

### Test 2: Signup with Mismatched Passwords

```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "fullName": "Test User",
  "email": "test@example.com",
  "password": "TestPass123",
  "confirmPassword": "DifferentPass123",
  "userType": "student"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "confirmPassword",
      "message": "Passwords do not match"
    }
  ]
}
```

---

### Test 3: Login API

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "TestPass123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Welcome back!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "fullName": "Test User",
    "email": "test@example.com",
    "userType": "student"
  }
}
```

---

### Test 4: Get Current User

```
GET http://localhost:5000/api/auth/me
Authorization: Bearer {token}
```

**Expected Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "fullName": "Test User",
    "email": "test@example.com",
    "userType": "student",
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

---

### Test 5: Without Authentication Token

```
GET http://localhost:5000/api/auth/me
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "No authentication token provided"
}
```

---

### Test 6: Update Profile

```
PUT http://localhost:5000/api/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "phone": "+1-234-567-8900",
  "bio": "Computer Science Student",
  "institution": "XYZ University"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "fullName": "Test User",
    "phone": "+1-234-567-8900",
    "bio": "Computer Science Student",
    "institution": "XYZ University",
    ...
  }
}
```

---

### Test 7: Change Password

```
PUT http://localhost:5000/api/auth/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "oldPassword": "TestPass123",
  "newPassword": "NewSecurePass456",
  "confirmPassword": "NewSecurePass456"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### Test 8: Wrong Old Password

```
PUT http://localhost:5000/api/auth/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "oldPassword": "WrongPassword123",
  "newPassword": "NewSecurePass456",
  "confirmPassword": "NewSecurePass456"
}
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Old password is incorrect"
}
```

---

## 🗄️ Database Testing

### Check User Creation

```bash
# Connect to MongoDB
mongosh

# Use database
use allcollegeevents

# Find user
db.users.findOne({ email: "test@example.com" })

# Expected output:
{
  _id: ObjectId("..."),
  fullName: "Test User",
  email: "test@example.com",
  password: "$2a$10$...", // Hashed, not plain text!
  userType: "student",
  isActive: true,
  isVerified: false,
  createdAt: ISODate("2024-01-15T10:00:00.000Z"),
  updatedAt: ISODate("2024-01-15T10:00:00.000Z"),
  __v: 0
}
```

### Check Indexes

```bash
# Show all indexes on users collection
db.users.getIndexes()

# Should show indexes for: _id, email, userType, createdAt
```

### Check Password Hashing

```bash
# Verify password is hashed
db.users.findOne({ email: "test@example.com" }, { password: 1 })

# Password should start with $2a$ (bcrypt hash), not plain text
```

---

## ⚠️ Error Testing

### Test 1: Invalid Email Format

**Signup with:** `notanemail`

**Expected:** Error message about invalid email

---

### Test 2: Password Too Short

**Signup with:** `Pass1`

**Expected:** Error: "Password must be at least 6 characters"

---

### Test 3: Invalid User Type

**API Request:**
```json
{
  "userType": "invalid_type"
}
```

**Expected:** Error: "Invalid user type"

---

### Test 4: Duplicate Email

**Signup with existing email:** `student@example.com`

**Expected:** Error: "Email already registered"

---

### Test 5: Server Error Handling

**Stop MongoDB:**
```bash
# Stop MongoDB service
```

**Try to login:** 

**Expected:** Connection error message (not system crash)

---

## 📊 Performance Testing

### Test 1: Rapid Signup Attempts

**Steps:**
1. Create 10 accounts rapidly
2. Monitor server logs
3. Check database

**Expected:**
- ✅ All succeed (no race conditions)
- ✅ All emails unique
- ✅ All passwords hashed

---

### Test 2: Large Request Payload

**Test with bio:** 501 characters (max 500)

**Expected:** Validation error

---

### Test 3: Many Concurrent Users

**Simulate multiple logins:**
- 5 users login simultaneously
- Each gets unique token
- Can access protected routes

**Expected:** ✅ All succeed

---

## 🔐 Security Testing

### Test 1: Password Not in Response

**Login and check response:**
```json
// Password should NOT be in response
{
  "user": {
    "id": "...",
    "fullName": "...",
    // NO password field!
  }
}
```

---

### Test 2: Token in Headers

**Check Authorization header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Not in:**
- URL query parameters
- Request body
- Local storage visible in dev tools (should be there but not exploitable)

---

### Test 3: SQL Injection Prevention

**Try email:** `admin@example.com" OR "1"="1`

**Expected:** Treated as literal email, not code injection

---

### Test 4: CORS Enforcement

**Request from unknown origin:**

**Expected:** ❌ CORS error (blocked)

---

## ✅ Testing Checklist

- [ ] Signup with valid data
- [ ] Signup with mismatched passwords
- [ ] Signup with weak password
- [ ] Signup with duplicate email
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials
- [ ] Access protected route with token
- [ ] Access protected route without token
- [ ] Update profile
- [ ] Change password
- [ ] Test all user type redirects
- [ ] Check password is hashed in DB
- [ ] Verify token expiration
- [ ] Test error messages
- [ ] Test validation messages

---

## 📝 Test Report Template

```
Test Date: _______________
Tester: ___________________

Test Cases Passed: _______ / 15
Test Cases Failed: _______ / 15

Issues Found:
- Issue 1: ________________
- Issue 2: ________________

Notes:
_________________________
_________________________

Approved: ☐ Yes ☐ No
Signature: _________________
```

---

## 🚀 Continuous Testing

**Automated tests** (to be added):
- Unit tests for controllers
- Integration tests for API
- E2E tests for user flows
- Load testing for performance

---

**Ready for Testing!** ✅
