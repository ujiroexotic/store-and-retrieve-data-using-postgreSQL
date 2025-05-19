const express = require('express');
require('dotenv').config();
const app = express();
const usersRoutes = require('./routes/users');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/users', usersRoutes);

// 404 Not Found handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
