const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /users
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET /users/:id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST /users
router.post('/', async (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO users (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
