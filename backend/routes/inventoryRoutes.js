const express = require('express');
const router = express.Router();
const { addItem, getAllItems, getItemById, updateItem, deleteItem } = require('../controllers/inventoryController');
const auth = require('../middleware/auth');

router.post('/add', auth, addItem);
router.get('/', getAllItems);
router.get('/:id', getItemById);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;
