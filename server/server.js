require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// Connect to MongoDB (removed deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Create a schema for contact messages
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const ContactMessage = mongoose.model("ContactMessage", contactSchema);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',    // Create React App
    'http://localhost:5173',    // Vite
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// POST /send-email route (matching your frontend)
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('📧 Received request:', { name, email, message });

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // 1️⃣ Test MongoDB connection first
    console.log('🔍 Testing database connection...');
    console.log('Database state:', mongoose.connection.readyState); // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
    
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected. State: ' + mongoose.connection.readyState);
    }

    // 2️⃣ Try saving to MongoDB
    console.log('💾 Attempting to save to database...');
    const newMessage = new ContactMessage({ name, email, message });
    const savedMessage = await newMessage.save();
    console.log('✅ Message saved successfully:', savedMessage._id);

    // 3️⃣ Try sending email
    console.log('📨 Attempting to send email...');
    console.log('Email config:', {
      user: process.env.MAIL_USER ? 'SET' : 'NOT SET',
      pass: process.env.MAIL_PASS ? 'SET' : 'NOT SET'
    });

    const transporter = nodemailer.createTransport({  // Remove 'er'
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    // Test transporter
    console.log('🔍 Verifying email transporter...');
    await transporter.verify();
    console.log('✅ Email transporter verified');

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.MAIL_USER,
      subject: `Portfolio Query from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Sent from your portfolio website</em></p>
      `,
      text: message,
      replyTo: email
    };

    const emailResult = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', emailResult.messageId);
    
    res.status(200).json({ 
      success: true, 
      message: 'Message saved & email sent successfully!' 
    });

  } catch (err) {
    console.error('❌ DETAILED ERROR:');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Error code:', err.code);
    console.error('Full error:', err);
    
    // More specific error messages
    let errorMessage = 'Failed to save message or send email.';
    if (err.message.includes('Database')) {
      errorMessage = 'Database connection failed: ' + err.message;
    } else if (err.code === 'EAUTH' || err.message.includes('auth')) {
      errorMessage = 'Email authentication failed. Check your Gmail credentials.';
    } else if (err.message.includes('SMTP')) {
      errorMessage = 'Email server error: ' + err.message;
    }
    
    res.status(500).json({ 
      success: false, 
      message: errorMessage
    });
  }
});

// GET /contact-messages route (to view all messages - optional)
app.get('/contact-messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ date: -1 });
    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch messages.' });
  }
});
// ADD THE TEST ROUTES HERE 👇
// Test database only
app.get('/test-db', async (req, res) => {
  try {
    console.log('Testing database connection...');
    console.log('MongoDB state:', mongoose.connection.readyState);
    
    const testMessage = new ContactMessage({
      name: 'Test User',
      email: 'test@test.com',
      message: 'Database test message'
    });
    const saved = await testMessage.save();
    
    res.json({ 
      success: true, 
      message: 'Database working!',
      dbState: mongoose.connection.readyState,
      savedId: saved._id 
    });
  } catch (err) {
    console.error('Database test error:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message,
      dbState: mongoose.connection.readyState 
    });
  }
});

// Test email only
app.post('/test-email', async (req, res) => {
  try {
    console.log('Testing email...');
    console.log('MAIL_USER:', process.env.MAIL_USER ? 'SET' : 'NOT SET');
    console.log('MAIL_PASS:', process.env.MAIL_PASS ? 'SET (length: ' + process.env.MAIL_PASS.length + ')' : 'NOT SET');
    
    const transporter = nodemailer.createTransport({  // Remove 'er'
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    // Verify connection
    await transporter.verify();
    console.log('Email connection verified');

    // Send test email
    const result = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: 'Test Email from Portfolio',
      text: 'This is a test email to verify email functionality.'
    });

    res.json({ 
      success: true, 
      message: 'Email sent successfully!',
      messageId: result.messageId 
    });
  } catch (err) {
    console.error('Email test error:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message,
      code: err.code 
    });
  }
});
// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});