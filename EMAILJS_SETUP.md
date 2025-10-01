# EmailJS Setup Instructions

## Overview
To make the contact form work on the published website, you need to set up EmailJS, which allows sending emails directly from the frontend without a backend server.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Connect Your Gmail Account
1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect Account** and authorize EmailJS to access your Gmail
5. Note down the **Service ID** (e.g., `service_abc1234`)

### 3. Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template content:

**Subject:** New Contact Form Submission - {{from_name}} from {{company}}

**Content:**
```
New Contact Form Submission from Purple Guard Advisory Website

═══════════════════════════════════════════════════════════════

CONTACT DETAILS:
────────────────────────────────────────────────────────────
Name: {{from_name}}
Job Title: {{title}}
Email: {{from_email}}
Company: {{company}}
Number of Employees: {{numberemployees}}
Annual Turnover: {{turnover}}
Phone: {{phone}}

MESSAGE:
────────────────────────────────────────────────────────────
{{message}}

═══════════════════════════════════════════════════════════════

This message was sent from the Purple Guard Advisory contact form.
Please respond directly to: {{from_email}}

Timestamp: {{current_date}}
```

4. Set the **To Email** to: `zedwork112@gmail.com`
5. Set the **Reply To** to: `{{from_email}}`
6. Save the template and note down the **Template ID** (e.g., `template_abc1234`)

### 4. Get Your Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abc123def456`)

### 5. Update the Code
Replace the placeholder values in `src/hooks/useContactForm.ts`:

```javascript
const serviceId = 'your_actual_service_id';
const templateId = 'your_actual_template_id'; 
const publicKey = 'your_actual_public_key';
```

### 6. Test and Deploy
1. Test the form locally with `npm run dev`
2. If it works, rebuild and redeploy: `npm run build`

## Security Notes
- EmailJS public keys are safe to expose in frontend code
- The free plan allows 200 emails per month
- Consider upgrading for higher volume

## Troubleshooting
- Check the browser console for any errors
- Verify all IDs and keys are correct
- Ensure your Gmail account is properly connected
- Check EmailJS dashboard for delivery logs