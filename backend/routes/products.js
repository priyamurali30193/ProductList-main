const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// POST - Add new product
router.post('/add', async (req, res) => {
  try {
    const prod = new Product(req.body);
    await prod.save();
    res.status(201).json(prod);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ PUT - Update existing product by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );
    if (!updated) return res.status(404).send('Product not found');
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// (Optional) DELETE - Remove product by ID
router.delete('/:id', async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send('Product not found');
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
