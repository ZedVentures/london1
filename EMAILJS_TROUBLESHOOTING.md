# EmailJS Troubleshooting Guide

## Current Configuration
- **Service ID**: `service_jtv7h1a`
- **Template ID**: `template_sl400g1`
- **Public Key**: `6HSQ5K2lYPap8SuCc`
- **Target Email**: `zedwork112@gmail.com`

## How to Test

### 1. Check Browser Console
1. Open the website: https://purple-guard-advisor-hmm9.bolt.host
2. Navigate to the contact form
3. Open browser Developer Tools (F12)
4. Go to the Console tab
5. Fill out and submit the form
6. Watch for detailed logs starting with "=== Form Submission Started ==="

### 2. What to Look For

**Success Indicators:**
- Console shows "✅ Email sent successfully!"
- Form displays green success message
- Form fields reset automatically

**Error Indicators:**
- Console shows "❌ Email sending failed"
- Red error message appears
- Specific error details in console

### 3. Common Issues & Solutions

**Issue: 401 Authentication Error**
- **Cause**: EmailJS service not properly connected to Gmail
- **Solution**: Reconnect Gmail service in EmailJS dashboard

**Issue: 404 Template Not Found**
- **Cause**: Template ID doesn't match
- **Solution**: Verify template ID in EmailJS dashboard

**Issue: 400 Bad Request**
- **Cause**: Template parameters don't match template variables
- **Solution**: Check template variables match the parameters being sent

**Issue: Network/CORS Errors**
- **Cause**: Browser blocking requests
- **Solution**: Check if ad blockers or privacy extensions are interfering

### 4. EmailJS Dashboard Checks

1. **Service Status**: Ensure Gmail service is connected and active
2. **Template Variables**: Verify these variables exist in your template:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{title}}`
   - `{{business}}`
   - `{{numberemployees}}`
   - `{{turnover}}`
   - `{{company}}`
   - `{{phone}}`
   - `{{service}}`
   - `{{message}}`
   - `{{current_date}}`

3. **Email Logs**: Check the EmailJS dashboard for delivery logs

### 5. Template Configuration

Your EmailJS template should have:
- **To Email**: `zedwork112@gmail.com`
- **Reply To**: `{{from_email}}`
- **Subject**: `New Contact Form Submission - {{from_name}} from {{company}}`

### 6. Testing Steps

1. **Fill out minimal form**:
   - Name: "Test User"
   - Email: "test@example.com"
   - Message: "Test message"

2. **Submit and check**:
   - Browser console for logs
   - EmailJS dashboard for delivery status
   - Target email inbox (including spam folder)

### 7. Alternative Solutions

If EmailJS continues to fail:

1. **Direct Email Link**: Add a "mailto:" link as backup
2. **Contact Information**: Display phone/email directly
3. **Third-party Forms**: Consider Formspree, Netlify Forms, or similar

### 8. Current Implementation Features

- ✅ Comprehensive error handling
- ✅ Detailed console logging
- ✅ Form validation
- ✅ User-friendly error messages
- ✅ Automatic form reset on success
- ✅ Loading states
- ✅ Fallback contact information in error messages

## Next Steps

1. Test the form on the live site
2. Check browser console for detailed logs
3. Verify EmailJS dashboard configuration
4. Check email delivery (including spam folder)
5. Report specific error messages if issues persist