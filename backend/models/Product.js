const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  originalPrice: Number,     // ✅ MRP
  discountPrice: Number,     // ✅ Selling price
  imageUrl: String,
  inStock: Boolean,
  category: String,
  pack: String               // optional: for "1 pkt", "2 pcs", etc.
});

module.exports = mongoose.model('Product', productSchema);
