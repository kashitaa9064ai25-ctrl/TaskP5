const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configure the email transporter using your EMAIL_USER and EMAIL_PASS
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const mailOptions = {
    from: `"DEV@Deakin" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to DEV@Deakin Daily Insider!',
    html: `
      <h2>Welcome to DEV@Deakin!</h2>
      <p>Thank you for subscribing to our Daily Insider newsletter.</p>
      <p>Stay tuned for daily updates on articles, tutorials, and community events.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // Required for your report screenshot: terminal log showing 200 OK
    console.log('Status: 200 OK - Email successfully sent to:', email, 'MessageID:', info.messageId);
    return res.status(200).json({ message: 'Subscribed successfully! Welcome email sent.' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    return res.status(500).json({ error: 'Failed to send welcome email. Please try again later.' });
  }
});

module.exports = router;