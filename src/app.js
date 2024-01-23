const express = require('express');
const ProductManager = require('../ProductManager'); 
const app = express();
const port = 8080; 

const productManager = new ProductManager('productos.json');

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts();
  res.json({ products });
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);  
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
