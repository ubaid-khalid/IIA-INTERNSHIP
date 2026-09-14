const express = require('express');
const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory data array
let products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Headphones' }
];

// GET endpoint: Retrieve all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// POST endpoint: Create a new product
app.post('/api/products', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Product name is required' });
  }

  const newProduct = {
    id: products.length + 1,
    name: req.body.name
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});