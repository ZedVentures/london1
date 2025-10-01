import express from 'express';
import { createTransport } from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email configuration
const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, phone, message, service } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields'
      });
    }

    // Email content
    const emailContent = `
      New Contact Form Submission from Purple Guard Advisory Website
      
      ═══════════════════════════════════════════════════════════════
      
      CONTACT DETAILS:
      ────────────────────────────────────────────────────────────
      Name: ${name}
      Email: ${email}
      Company: ${company || 'Not provided'}
      Phone: ${phone || 'Not provided'}
      Service Interest: ${service || 'Not specified'}
      
      MESSAGE:
      ────────────────────────────────────────────────────────────
      ${message}
      
      ═══════════════════════════════════════════════════════════════
      
      This message was sent from the Purple Guard Advisory contact form.
      Please respond directly to the customer's email address: ${email}
      
      Timestamp: ${new Date().toLocaleString('en-GB', { 
        timeZone: 'Europe/London',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })}
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'zedwork112@gmail.com',
      subject: `New Contact Form Submission - ${name} from ${company || 'Individual'}`,
      text: emailContent,
      replyTo: email
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the user
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Purple Guard Advisory',
      text: `
        Dear ${name},
        
        Thank you for your interest in Purple Guard Advisory. We have received your message and will respond within 24 hours.
        
        Your message:
        "${message}"
        
        We look forward to discussing how we can help transform your business.
        
        Best regards,
        Purple Guard Advisory Team
        
        ---
        This is an automated confirmation email. Please do not reply to this message.
      `
    };

    await transporter.sendMail(confirmationEmail);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later or contact us directly.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});