const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

const craftRouter = require('./routes/craft.js');
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);
app.use('/api/craft', craftRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port} :fireworks:`));