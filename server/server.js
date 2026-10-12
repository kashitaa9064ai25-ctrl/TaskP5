const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const newsletterRoutes = require('./routes/newsletter');
app.use('/', newsletterRoutes);

app.get('/', (req, res) => {
  res.send('DEV@Deakin Newsletter Server is running.');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});