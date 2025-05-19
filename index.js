const express = require('express');
const app = express();
const itemRoutes = require('./routes/items');
require('dotenv').config();

app.use(express.json());
app.use('/items', itemRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
