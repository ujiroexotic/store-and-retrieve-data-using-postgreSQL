const express = require('express');
require('dotenv').config();
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
