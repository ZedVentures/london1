# Email Form Setup Instructions

## Overview
This implementation adds email functionality to your existing contact form without changing any visual elements. All form submissions will be sent to zedwork112@gmail.com.

## Setup Steps

### 1. Environment Configuration
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your email credentials:
   ```
   EMAIL_USER=your-gmail-address@gmail.com
   EMAIL_PASS=your-app-specific-password
   PORT=3001
   ```

### 2. Gmail App Password Setup
Since this uses Gmail SMTP, you need to create an App Password:

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. At the bottom, click "App passwords"
4. Generate a new app password for "Mail"
5. Use this 16-character password in your `.env` file (not your regular Gmail password)

### 3. Running the Application

#### Development Mode (Recommended)
Run both the frontend and backend together:
```bash
npm run dev:full
```

This starts:
- Frontend (React) on http://localhost:5173
- Backend (Express) on http://localhost:3001

#### Separate Processes
If you prefer to run them separately:

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run dev:server
```

### 4. Testing the Form
1. Open http://localhost:5173
2. Navigate to the contact form
3. Fill out and submit the form
4. Check that emails are received at zedwork112@gmail.com

## Features Implemented

### Email Functionality
- ✅ All form data sent to zedwork112@gmail.com
- ✅ Formatted email with clear field labels
- ✅ Automatic confirmation email to user
- ✅ Reply-to set to user's email address

### Form Validation
- ✅ Required field validation (name, email, message)
- ✅ Email format validation
- ✅ Real-time error feedback

### User Experience
- ✅ Loading states during submission
- ✅ Success/error status messages
- ✅ Form reset after successful submission
- ✅ No visual changes to existing design

### Error Handling
- ✅ Network error handling
- ✅ Server error responses
- ✅ Email delivery failure handling
- ✅ User-friendly error messages

## File Structure
```
├── server/
│   └── server.js              # Express server with email handling
├── src/
│   ├── components/
│   │   └── ContactForm.tsx    # Updated contact form component
│   └── hooks/
│       └── useContactForm.ts  # Form state and submission logic
├── .env.example               # Environment variables template
├── .env                       # Your actual environment variables (create this)
└── SETUP_INSTRUCTIONS.md      # This file
```

## Production Deployment

### Environment Variables
Ensure these environment variables are set in your production environment:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password
- `PORT`: Server port (default: 3001)

### Build Process
```bash
npm run build
```

### Server Deployment
The Express server (`server/server.js`) needs to be deployed alongside your built React application. Most hosting platforms support Node.js applications.

## Troubleshooting

### Common Issues

1. **"Invalid login" error**
   - Ensure you're using an App Password, not your regular Gmail password
   - Verify 2-Step Verification is enabled on your Google account

2. **CORS errors**
   - The server includes CORS middleware to handle cross-origin requests
   - In production, configure CORS to only allow your domain

3. **Form not submitting**
   - Check browser console for errors
   - Verify the backend server is running on port 3001
   - Ensure the proxy configuration in `vite.config.ts` is correct

4. **Emails not received**
   - Check spam/junk folder
   - Verify the EMAIL_USER environment variable is correct
   - Check server logs for error messages

### Testing Email Configuration
You can test the email configuration by making a direct API call:

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **Email Credentials**: Use App Passwords, not regular passwords
3. **Rate Limiting**: Consider adding rate limiting for production use
4. **Input Validation**: Server-side validation is implemented for all inputs
5. **CORS**: Configure CORS properly for production domains

## Support
If you encounter any issues during setup, check the server logs and browser console for detailed error messages.