require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const messageRoutes = require("./route/messageRoutes")
const auth = require('./route/auth');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use("/api/msz",messageRoutes);
app.use("/api/auth",auth)
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
