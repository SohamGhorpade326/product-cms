// backend/routes/products.js

const express = require('express');
const db = require('../db');
const router = express.Router();

const FAKE_USER = 'cms_admin'; // In a real app, this would come from auth middleware

// GET all products for the CMS (admin view)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM Products WHERE is_deleted = FALSE ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all LIVE products for the public website
router.get('/live', async (req, res) => {
    try {
      const [rows] = await db.query(
        "SELECT product_id, product_name, product_desc FROM Products WHERE status = 'Published' AND is_deleted = FALSE"
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


// GET a single product by ID
router.get('/:id', async (req, res) => {
    try {
      const [rows] = await db.query(
        "SELECT * FROM Products WHERE product_id = ? AND is_deleted = FALSE",
        [req.params.id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


// POST (add) a new product
router.post('/', async (req, res) => {
  const { product_name, product_desc, status } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO Products (product_name, product_desc, status, created_by) VALUES (?, ?, ?, ?)",
      [product_name, product_desc, status, FAKE_USER]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) an existing product
router.put('/:id', async (req, res) => {
  const { product_name, product_desc, status } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE Products SET product_name = ?, product_desc = ?, status = ?, updated_by = ? WHERE product_id = ?",
      [product_name, product_desc, status, FAKE_USER, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (soft delete) a product
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE Products SET is_deleted = TRUE, updated_by = ? WHERE product_id = ?",
      [FAKE_USER, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;