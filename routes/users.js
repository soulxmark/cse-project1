const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);

module.exports = router; // ✅ Ensure you're exporting only the router!
