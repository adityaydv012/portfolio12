// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const nodemailer = require('nodemailer');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // POST /contact route
// app.post('/contact', async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ success: false, message: 'All fields are required.' });
//   }

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.MAIL_USER,   // e.g. your@gmail.com
//       pass: process.env.MAIL_PASS    // app password from Gmail
//     }
//   });

//   const mailOptions = {
//     from: `"${name}" <${email}>`,
//     to: process.env.MAIL_USER,
//     subject: `Portfolio Query from ${name}`,
//     text: message,
//     replyTo: email
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully from:", email);
//     res.status(200).json({ success: true, message: 'Email sent successfully!' });
//   } catch (err) {
//     console.error('Email error:', err);
//     res.status(500).json({ success: false, message: 'Failed to send email.' });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });
