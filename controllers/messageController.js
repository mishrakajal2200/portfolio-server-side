const Contact = require("../models/Message");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Save message to database
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your preferred service
      auth: {
        user: process.env.EMAIL_USER, // Email address
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "km3165487@gmail.com", // Your recipient email
      subject: "New Contact Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    // Handle specific errors
    if (error.code === "EAUTH") {
      console.error("Authentication Error: Check email credentials.");
    } else if (error.message.includes("ENOTFOUND") || error.message.includes("ECONNREFUSED")) {
      console.error("Network Error: Check your SMTP server configuration or network connection.");
    } else {
      console.error("Error sending message:", error);
    }

    res.status(500).json({ success: false, message: "An error occurred while sending the message." });
  }
};
