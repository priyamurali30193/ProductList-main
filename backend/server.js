const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const cors = require('cors');

const app = express();
app.use(cors(), express.json());

mongoose.connect('mongodb://localhost:27017/advay', {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'));

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
