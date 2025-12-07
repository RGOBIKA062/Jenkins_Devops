# Faculty Portal - Quick Start Testing Guide

## Overview

This guide helps you quickly test and verify the complete Faculty Portal implementation.

---

## Step 1: Start the Backend Server

```bash
cd server
npm install  # Only needed first time
npm start
```

Expected output:
```
✓ Server running on port 5000
✓ MongoDB connected
✓ Faculty routes registered
```

---

## Step 2: Start the Frontend

In a new terminal:

```bash
cd client
npm install  # Only needed first time
npm run dev
```

Expected output:
```
✓ Vite dev server running
✓ Local: http://localhost:8080
```

---

## Step 3: Access the Application

1. Open browser: `http://localhost:8080`
2. Login with faculty credentials
3. You'll be redirected to Faculty Portal

---

## Testing Checklist

### Dashboard Tab
- [ ] Page loads without errors
- [ ] Statistics cards display
- [ ] Profile information shows
- [ ] Quick overview section visible
- [ ] All icons display correctly

### My Events Tab
- [ ] Empty state shows when no events
- [ ] "Create First Event" button works
- [ ] Event list loads after creating event
- [ ] Event details display correctly
- [ ] Event metrics (date, registrations, views) show

### Create Event
- [ ] Click "Create Event" button
- [ ] Modal opens with form
- [ ] Fill all required fields
- [ ] Click "Create Event"
- [ ] Success toast appears
- [ ] Event appears in My Events list

**Test Data:**
```
Title: Python Workshop
Description: Learn Python programming basics
Category: Workshop
Location: Room 101
Start Date: Tomorrow at 10:00 AM
End Date: Tomorrow at 12:00 PM
Capacity: 50
```

### Participants Tab
- [ ] Click "View" button on an event
- [ ] Participants table shows
- [ ] Table columns display (Name, Email, Institution, Status, Action)
- [ ] "Mark Present" button works
- [ ] Status changes to "✓ Attended"

### Profile Tab
- [ ] Profile information displays
- [ ] All fields show correctly
- [ ] Email and department visible
- [ ] Designation shows
- [ ] "Edit Profile" button available

### Featured Tab
- [ ] Featured faculty cards display
- [ ] Faculty name and department show
- [ ] Star ratings visible
- [ ] Events count displays
- [ ] Cards are responsive

### Search Events
- [ ] Click "Search Events" button
- [ ] Modal opens
- [ ] Enter search query (e.g., "Workshop")
- [ ] Click "Search" button
- [ ] Results display in modal
- [ ] Result count shows

### Modals & Interactions
- [ ] All modals open smoothly
- [ ] Forms validate required fields
- [ ] Toast notifications appear
- [ ] Error messages display
- [ ] Buttons are clickable
- [ ] Close buttons work

---

## API Testing

### Test Profile Endpoint
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/faculty/profile
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "fullName": "Dr. John Smith",
    "email": "john@university.edu",
    "department": "Computer Science",
    "designation": "Professor"
  }
}
```

### Test Create Event
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Event",
    "description": "Test description",
    "category": "Workshop",
    "startDate": "2024-12-15T10:00:00Z",
    "endDate": "2024-12-15T12:00:00Z"
  }' \
  http://localhost:5000/api/faculty/events
```

### Test Search Events
```bash
curl "http://localhost:5000/api/faculty/search-events?query=Workshop&category=Workshop"
```

### Test Get Statistics
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/faculty/statistics
```

---

## Error Scenarios to Test

### 1. Missing Token
```bash
curl http://localhost:5000/api/faculty/profile
# Expected: 401 Unauthorized
```

### 2. Invalid Event ID
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/faculty/events/invalid123
# Expected: 404 Not Found
```

### 3. Missing Required Fields
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test"
  }' \
  http://localhost:5000/api/faculty/events
# Expected: 400 Bad Request
```

---

## Browser Console Testing

Open browser DevTools (F12) and check:

- [ ] No JavaScript errors
- [ ] No console warnings
- [ ] Network tab shows successful responses
- [ ] No broken image references
- [ ] CSS styles applied correctly

---

## Performance Testing

### Measure Load Time
1. Open DevTools → Network tab
2. Reload page
3. Check total load time
4. Expected: < 2 seconds

### Check API Response Times
1. Open DevTools → Network tab
2. Click buttons to trigger API calls
3. Check response times
4. Expected: < 500ms per request

---

## Browser Compatibility

Test on:
- [ ] Chrome (Latest)
- [ ] Firefox (Latest)
- [ ] Safari (Latest)
- [ ] Edge (Latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

All should work identically.

---

## Mobile Responsiveness

1. Open DevTools → Device Toolbar
2. Test at different screen sizes:
   - [ ] iPhone SE (375px)
   - [ ] iPhone 12 (390px)
   - [ ] iPad (768px)
   - [ ] iPad Pro (1024px)
   - [ ] Desktop (1920px)

Expected:
- [ ] Layout adjusts properly
- [ ] Buttons remain clickable
- [ ] Text is readable
- [ ] No horizontal scroll
- [ ] Modals fit screen

---

## Feature Verification Checklist

### Backend Features
- [ ] 14 controller methods working
- [ ] 13 routes functioning
- [ ] Authentication middleware active
- [ ] Authorization checks working
- [ ] Error handling on all endpoints
- [ ] Logging to console/file
- [ ] Database operations successful

### Frontend Features
- [ ] 5 tabs navigation working
- [ ] 4 statistics cards displaying
- [ ] Create event modal functional
- [ ] Search events modal functional
- [ ] Event list displaying
- [ ] Participants table showing
- [ ] Attendance marking working
- [ ] Profile information displaying
- [ ] Featured faculty showing

### UI/UX Features
- [ ] Animations smooth
- [ ] Colors consistent
- [ ] Typography readable
- [ ] Spacing proper
- [ ] Icons aligned
- [ ] Buttons accessible
- [ ] Forms validated
- [ ] Error messages clear

---

## Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
# On Windows:
netstat -ano | findstr :5000

# Kill the process:
taskkill /PID <PID> /F

# Try starting again
npm start
```

### Frontend Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### MongoDB Connection Error
```bash
# Check MongoDB is running
# On Windows: Services → MongoDB → Start
# Or run mongod manually
mongod
```

### 401 Unauthorized
```bash
# Get new token
# Login again
# Check localStorage for token:
localStorage.getItem('token')
```

### CORS Errors
```javascript
// Check CORS configuration in server/index.js
// Verify frontend URL is in allowedOrigins
// Restart server after changes
```

---

## Testing Results Template

Save your testing results:

```
Date: ____________
Tester: ___________

Backend Tests:
- Profile endpoint: PASS / FAIL
- Create event: PASS / FAIL
- Search events: PASS / FAIL
- Statistics: PASS / FAIL

Frontend Tests:
- Dashboard loads: PASS / FAIL
- Create event works: PASS / FAIL
- Search works: PASS / FAIL
- Participants display: PASS / FAIL
- Attendance marking: PASS / FAIL

UI/UX Tests:
- Responsive: PASS / FAIL
- Animations smooth: PASS / FAIL
- No errors: PASS / FAIL
- All icons show: PASS / FAIL

Performance:
- Page load time: _____ ms
- API response time: _____ ms
- No lag: PASS / FAIL

Overall Status: ✅ PASS / ❌ FAIL
```

---

## Success Criteria

All tests should show:

✅ **Backend**
- All 14 controller methods responding
- All 13 routes accessible
- Proper error handling
- Authentication working

✅ **Frontend**
- All 5 tabs functional
- All modals opening/closing
- All buttons clickable
- All data displaying

✅ **Integration**
- Frontend talking to backend
- Data flowing correctly
- Errors handled gracefully
- No console errors

✅ **Performance**
- Page loads in < 2s
- API calls in < 500ms
- Smooth animations
- No lag or stuttering

✅ **UI/UX**
- Responsive on all devices
- Beautiful design
- Professional appearance
- Intuitive navigation

---

## Next Steps

After successful testing:

1. **Development Testing** → ✅ Complete
2. **User Acceptance Testing** → Ready to start
3. **Performance Testing** → Ready to start
4. **Security Testing** → Ready to start
5. **Production Deployment** → Ready

---

## Support

For issues or questions:
1. Check browser console for errors
2. Check server console for logs
3. Review API response status
4. Check MongoDB connection
5. Verify environment variables

---

**Faculty Portal is production-ready!** 🚀

Once all tests pass, you can deploy with confidence.

