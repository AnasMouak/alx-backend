const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

// Create Express app
const app = express();
const port = 1245;

// Define the list of products
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
];

// Helper function to get product by id
const getItemById = (id) => listProducts.find(product => product.itemId === id);

// Create Redis client and promisify necessary commands
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

// Function to reserve stock by item ID
const reserveStockById = (itemId, stock) => {
  client.set(`item.${itemId}`, stock);
};

// Async function to get current reserved stock by item ID
const getCurrentReservedStockById = async (itemId) => {
  const stock = await getAsync(`item.${itemId}`);
  return stock;
};

// Route to get the list of all products
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

// Route to get a specific product by its id, including current stock
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const currentStock = await getCurrentReservedStockById(itemId) || product.initialAvailableQuantity;
  res.json({
    itemId: product.itemId,
    itemName: product.itemName,
    price: product.price,
    initialAvailableQuantity: product.initialAvailableQuantity,
    currentQuantity: parseInt(currentStock)
  });
});

// Route to reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  let currentStock = await getCurrentReservedStockById(itemId) || product.initialAvailableQuantity;

  if (currentStock <= 0) {
    return res.json({ status: 'Not enough stock available', itemId: product.itemId });
  }

  reserveStockById(itemId, currentStock - 1);
  res.json({ status: 'Reservation confirmed', itemId: product.itemId });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
