const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const products = [
  { id: 1, name: 'Laptop', category: 'tech' },
  { id: 2, name: 'Coffee Mug', category: 'home' },
  { id: 3, name: 'Headphones', category: 'tech' }
];

// 1. Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API!');
});

// 2. Get all products (with optional query param: /api/products?category=tech)
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  if (category) {
    const filtered = products.filter(p => p.category === category);
    return res.json(filtered);
  }
  res.json(products);
});

// 3. Get single product by route parameter: /api/products/1
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});