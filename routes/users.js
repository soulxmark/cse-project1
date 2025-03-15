const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
//Database Routes
router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);

//----------- CRUD Section------------------
router.get('/', userController.createUser);

router.get('/:id', userController.updateUser);

router.get('/:id', userController.deleteUser);

module.exports = router; // ✅ Ensure you're exporting only the router!
